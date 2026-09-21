import { useEffect, useMemo, useState } from "react";

const PRODUCTS_PER_PAGE = 12;

/* ----------------------------------
   Product Card
---------------------------------- */
const ProductCard = ({ product, onWishlist, isWishlisted }) => {
  return (
    <article className="group">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#f5f3ef]">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Discount */}
        {product.discountPercentage > 0 && (
          <span className="absolute left-2 top-2 bg-[#b85b32] px-2 py-1 text-[9px] font-medium text-white">
            -{product.discountPercentage}%
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => onWishlist(product.id)}
          aria-label="Add to wishlist"
          className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-xs shadow-sm transition ${
            isWishlisted
              ? "text-[#b85b32]"
              : "text-gray-500 hover:text-[#b85b32]"
          }`}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>

        {/* New Arrival */}
        {product.newArrival && (
          <span className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 text-[8px] uppercase tracking-wider text-gray-600">
            New
          </span>
        )}
      </div>

      {/* Content */}
      <div className="pt-3">
        <p className="mb-1 text-[9px] uppercase tracking-[0.14em] text-gray-400">
          {product.category}
        </p>

        <h3 className="line-clamp-1 text-xs font-medium text-[#222]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mt-1.5 flex items-center gap-1">
          <span className="text-[9px] tracking-tight text-[#b85b32]">
            {"★".repeat(Math.round(product.rating))}
            <span className="text-gray-300">
              {"★".repeat(5 - Math.round(product.rating))}
            </span>
          </span>

          <span className="text-[9px] text-gray-400">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-xs font-semibold text-[#222]">
            ৳{product.discountPrice?.toLocaleString()}
          </span>

          {product.price !== product.discountPrice && (
            <span className="text-[10px] text-gray-400 line-through">
              ৳{product.price?.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

/* ----------------------------------
   Shop Component
---------------------------------- */
const Shop = ({
  products: productsProp = null,
  title = "Ceramics & Stoneware",
  description = "Handcrafted tableware and decor inspired by Japanese, Portuguese, and Danish design. Our collections celebrate organic materials and quiet beauty.",
}) => {
  const [products, setProducts] = useState(productsProp || []);
  const [loading, setLoading] = useState(!productsProp);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  const [sortBy, setSortBy] = useState("featured");

  const [currentPage, setCurrentPage] = useState(1);

  const [wishlist, setWishlist] = useState([]);

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  /* ----------------------------------
       Load Products
    ---------------------------------- */
  useEffect(() => {
    if (productsProp) {
      setProducts(productsProp);
      setLoading(false);
      return;
    }

    fetch("/data/products.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Products loading error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productsProp]);

  /* ----------------------------------
       Categories
    ---------------------------------- */
  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((product) => product.category))];
  }, [products]);

  /* ----------------------------------
       Price Range
    ---------------------------------- */
  const priceRange = useMemo(() => {
    if (!products.length) {
      return {
        min: 0,
        max: 100000,
      };
    }

    const prices = products.map(
      (product) => product.discountPrice || product.price || 0,
    );

    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [products]);

  /* ----------------------------------
       Set initial price
    ---------------------------------- */
  useEffect(() => {
    if (products.length) {
      setMinPrice(priceRange.min);
      setMaxPrice(priceRange.max);
    }
  }, [priceRange.min, priceRange.max, products.length]);

  /* ----------------------------------
       Filter + Search + Sort
    ---------------------------------- */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      const searchValue = search.toLowerCase();

      result = result.filter((product) => {
        return (
          product.name?.toLowerCase().includes(searchValue) ||
          product.category?.toLowerCase().includes(searchValue) ||
          product.brand?.toLowerCase().includes(searchValue) ||
          product.tags?.some((tag) => tag.toLowerCase().includes(searchValue))
        );
      });
    }

    // Category
    if (selectedCategory !== "All") {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // Price
    result = result.filter((product) => {
      const price = product.discountPrice || product.price || 0;

      return price >= minPrice && price <= maxPrice;
    });

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort(
          (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price),
        );
        break;

      case "price-high":
        result.sort(
          (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price),
        );
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      case "newest":
        result.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
        break;

      case "featured":
      default:
        result.sort((a, b) => Number(b.featured) - Number(a.featured));
        break;
    }

    return result;
  }, [products, search, selectedCategory, minPrice, maxPrice, sortBy]);

  /* ----------------------------------
       Pagination
    ---------------------------------- */
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  /* ----------------------------------
       Reset Page When Filter Changes
    ---------------------------------- */
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, minPrice, maxPrice, sortBy]);

  /* ----------------------------------
       Wishlist
    ---------------------------------- */
  const handleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  /* ----------------------------------
       Clear Filters
    ---------------------------------- */
  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setMinPrice(priceRange.min);
    setMaxPrice(priceRange.max);
    setSortBy("featured");
  };

  /* ----------------------------------
       Loading
    ---------------------------------- */
  if (loading) {
    return (
      <section className="min-h-screen bg-[#fcfbf9] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="mx-auto h-6 w-64 bg-gray-200" />
            <div className="mx-auto mt-3 h-3 w-96 max-w-full bg-gray-200" />

            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index}>
                  <div className="aspect-square bg-gray-200" />
                  <div className="mt-3 h-3 w-2/3 bg-gray-200" />
                  <div className="mt-2 h-3 w-1/2 bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcfbf9]">
      {/* ----------------------------------
                Header
            ---------------------------------- */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-2 text-[9px] text-gray-400">
            <span>Home</span>
            <span>/</span>
            <span>Shop</span>
            <span>/</span>
            <span className="text-gray-600">{title}</span>
          </div>

          <h1 className="text-2xl font-medium tracking-tight text-[#181818] sm:text-3xl">
            {title}
          </h1>

          <p className="mt-2 max-w-2xl text-xs leading-5 text-gray-500">
            {description}
          </p>
        </div>
      </section>

      {/* ----------------------------------
                Main Shop Area
            ---------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* ----------------------------------
                        Sidebar
                    ---------------------------------- */}
          <aside
            className={`w-full shrink-0 lg:block lg:w-48 ${
              mobileFilterOpen ? "block" : "hidden"
            }`}
          >
            <div className="sticky top-6">
              {/* Search */}
              <div className="mb-7">
                <label className="mb-3 block text-[9px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                  Search
                </label>

                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="h-9 w-full border-b border-gray-200 bg-transparent pr-6 text-xs outline-none placeholder:text-gray-400 focus:border-[#b85b32]"
                  />

                  <span className="absolute right-0 top-2 text-xs text-gray-400">
                    ⌕
                  </span>
                </div>
              </div>

              {/* Category */}
              <div className="mb-7 border-b border-gray-100 pb-6">
                <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                  Category
                </p>

                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`block text-left text-[10px] transition ${
                        selectedCategory === category
                          ? "font-medium text-[#b85b32]"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-7 border-b border-gray-100 pb-6">
                <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                  Price Range
                </p>

                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[8px] text-gray-400">Min</p>

                    <p className="text-[10px] font-medium">
                      ৳{minPrice.toLocaleString()}
                    </p>
                  </div>

                  <span className="text-gray-300">—</span>

                  <div className="text-right">
                    <p className="text-[8px] text-gray-400">Max</p>

                    <p className="text-[10px] font-medium">
                      ৳{maxPrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <input
                    type="range"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={minPrice}
                    onChange={(e) =>
                      setMinPrice(Math.min(Number(e.target.value), maxPrice))
                    }
                    className="w-full accent-[#b85b32]"
                  />

                  <input
                    type="range"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={maxPrice}
                    onChange={(e) =>
                      setMaxPrice(Math.max(Number(e.target.value), minPrice))
                    }
                    className="w-full accent-[#b85b32]"
                  />
                </div>
              </div>

              {/* Clear */}
              <button
                type="button"
                onClick={clearFilters}
                className="text-[9px] font-medium uppercase tracking-wider text-gray-500 underline underline-offset-4 transition hover:text-[#b85b32]"
              >
                Clear all filters
              </button>
            </div>
          </aside>

          {/* ----------------------------------
                        Products Area
                    ---------------------------------- */}
          <div className="min-w-0 flex-1">
            {/* Toolbar */}
            <div className="mb-6 flex flex-col gap-4 border-b border-gray-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[10px] text-gray-500">
                  Showing{" "}
                  <span className="font-medium text-gray-800">
                    {filteredProducts.length}
                  </span>{" "}
                  products
                </p>

                {/* Mobile Filter */}
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  className="text-[9px] font-medium uppercase tracking-wider text-gray-600 lg:hidden"
                >
                  {mobileFilterOpen ? "Hide Filters" : "Show Filters"}
                </button>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-gray-400">Sort by:</span>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="cursor-pointer border-0 bg-transparent text-[10px] font-medium text-gray-700 outline-none"
                >
                  <option value="featured">Featured</option>

                  <option value="newest">Newest</option>

                  <option value="price-low">Price: Low to High</option>

                  <option value="price-high">Price: High to Low</option>

                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* ----------------------------------
                            Product Grid
                        ---------------------------------- */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onWishlist={handleWishlist}
                    isWishlisted={wishlist.includes(product.id)}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex min-h-100 flex-col items-center justify-center text-center">
                <div className="mb-4 text-3xl text-gray-300">◌</div>

                <h3 className="text-sm font-medium text-gray-800">
                  No products found
                </h3>

                <p className="mt-2 text-xs text-gray-400">
                  Try changing your filters or search keyword.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 border border-gray-300 px-5 py-2 text-[9px] font-medium uppercase tracking-wider transition hover:border-black hover:bg-black hover:text-white"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* ----------------------------------
                            Pagination
                        ---------------------------------- */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-1">
                {/* Previous */}
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className="flex h-8 min-w-8 items-center justify-center border border-gray-200 px-2 text-[9px] text-gray-500 transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                >
                  Prev
                </button>

                {/* Pages */}
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-8 min-w-8 items-center justify-center border text-[9px] transition ${
                      currentPage === page
                        ? "border-[#b85b32] bg-[#b85b32] text-white"
                        : "border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next */}
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  className="flex h-8 min-w-8 items-center justify-center border border-gray-200 px-2 text-[9px] text-gray-500 transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Shop;

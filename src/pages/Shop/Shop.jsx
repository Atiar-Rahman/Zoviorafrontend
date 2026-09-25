import { useEffect, useMemo, useState } from "react";
import ProductCard from "../../components/shop/ProductCard";
import Loading from "../../components/shop/Loading";
import FilterSection from "../../components/shop/FilterSection";
import HeaderSection from "../../components/shop/HeaderSection";
import SortFilter from "../../components/shop/SortFilter";
import Pagination from "../../components/shop/Pagination";
import EmptyState from "../../components/shop/EmptyState";

const PRODUCTS_PER_PAGE = 12;


/* ----------------------------------
   Shop Component
---------------------------------- */
const Shop = ({
  products: productsProp = null
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      <Loading/>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcfbf9]">
      {/* ----------------------------------
                Header
            ---------------------------------- */}
      <HeaderSection title = "Ceramics & Stoneware"
  description = "Handcrafted tableware and decor inspired by Japanese, Portuguese, and Danish design. Our collections celebrate organic materials and quiet beauty."/>

      {/* ----------------------------------
                Main Shop Area
            ---------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* ----------------------------------
                        Sidebar
                    ---------------------------------- */}
          <FilterSection mobileFilterOpen={mobileFilterOpen} search={search} setSearch={setSearch} categories={categories} maxPrice={maxPrice} setMaxPrice={setMaxPrice} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} minPrice={minPrice} setMinPrice={setMinPrice} priceRange={priceRange} clearFilters={clearFilters}/>

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
              <SortFilter sortBy={sortBy} setSortBy={setSortBy}/>
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
              <EmptyState clearFilters={clearFilters}/>
            )}

            {/* ----------------------------------
                            Pagination
                        ---------------------------------- */}
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Shop;

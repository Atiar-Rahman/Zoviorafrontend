import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/data/products.json");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        const foundProduct = data.find(
          (item) => String(item.id) === String(id),
        );

        setProduct(foundProduct);

        if (foundProduct) {
          setSelectedImage(foundProduct.thumbnail || foundProduct.images?.[0]);

          setSelectedColor(foundProduct.colors?.[0] || "");
          setSelectedSize(foundProduct.sizes?.[0] || "");
        }
      } catch (error) {
        console.error("Product loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfbf9] px-4 py-20">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="aspect-square bg-gray-200" />

            <div className="space-y-5 py-8">
              <div className="h-3 w-24 bg-gray-200" />
              <div className="h-8 w-3/4 bg-gray-200" />
              <div className="h-5 w-32 bg-gray-200" />
              <div className="h-20 w-full bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#fcfbf9] px-4">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Product Not Found
          </p>

          <h1 className="mt-3 text-2xl font-medium text-gray-900">
            We couldn't find this product.
          </h1>

          <Link
            to="/shop"
            className="mt-6 inline-flex bg-black px-6 py-3 text-xs font-medium uppercase tracking-wider text-white transition hover:bg-[#b85b32]"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const images =
    product.images?.length > 0 ? product.images : [product.thumbnail];

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(product.stock || 10, prev + 1));
  };

  return (
    <main className="min-h-screen bg-[#fcfbf9]">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 text-[10px] text-gray-400">
          <Link to="/" className="transition hover:text-black">
            Home
          </Link>

          <span>/</span>

          <Link to="/shop" className="transition hover:text-black">
            Shop
          </Link>

          <span>/</span>

          <span className="text-gray-600">{product.name}</span>
        </div>
      </div>

      {/* Product Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          {/* =========================
                        Product Images
                    ========================== */}
          <div>
            <div className="aspect-square overflow-hidden bg-[#f3f0eb]">
              <img
                src={selectedImage}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    className={`aspect-square overflow-hidden border transition ${
                      selectedImage === image
                        ? "border-black"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* =========================
                        Product Information
                    ========================== */}
          <div className="flex flex-col justify-center">
            {/* Category */}
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#b85b32]">
              {product.category}
            </p>

            {/* Product Name */}
            <h1 className="mt-3 text-3xl font-medium tracking-tight text-[#181818] sm:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
              <div className="text-sm text-[#b85b32]">
                {"★".repeat(Math.round(product.rating))}
                <span className="text-gray-300">
                  {"★".repeat(5 - Math.round(product.rating))}
                </span>
              </div>

              <span className="text-xs text-gray-400">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-2xl font-semibold text-[#181818]">
                ৳{product.discountPrice?.toLocaleString()}
              </span>

              {product.price !== product.discountPrice && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    ৳{product.price?.toLocaleString()}
                  </span>

                  <span className="bg-[#b85b32] px-2 py-1 text-[9px] font-medium text-white">
                    -{product.discountPercentage}%
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="mt-6 text-sm leading-7 text-gray-500">
              {product.shortDescription}
            </p>

            <div className="my-7 border-t border-gray-200" />

            {/* Color */}
            {product.colors?.length > 0 && (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-medium text-gray-800">Color</p>

                  <span className="text-[10px] text-gray-400">
                    {selectedColor}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`border px-4 py-2 text-[10px] transition ${
                        selectedColor === color
                          ? "border-black bg-black text-white"
                          : "border-gray-200 text-gray-600 hover:border-black"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            {product.sizes?.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 text-xs font-medium text-gray-800">Size</p>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-12 border px-4 py-2 text-[10px] transition ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-200 text-gray-600 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-6">
              <p className="mb-3 text-xs font-medium text-gray-800">Quantity</p>

              <div className="flex h-11 w-32 items-center border border-gray-200 bg-white">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="flex h-full w-10 items-center justify-center text-gray-500 transition hover:bg-gray-100"
                >
                  −
                </button>

                <span className="flex flex-1 items-center justify-center text-xs font-medium">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="flex h-full w-10 items-center justify-center text-gray-500 transition hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Stock */}
            <div className="mt-4">
              {product.stock > 0 ? (
                <p className="text-[10px] text-green-600">
                  ● In stock — {product.stock} available
                </p>
              ) : (
                <p className="text-[10px] text-red-500">● Out of stock</p>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={product.stock <= 0}
                className="h-12 bg-black text-xs font-medium uppercase tracking-wider text-white transition hover:bg-[#b85b32] disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Add to Cart
              </button>

              <button
                type="button"
                className="h-12 border border-black bg-white text-xs font-medium uppercase tracking-wider text-black transition hover:bg-black hover:text-white"
              >
                ♡ Wishlist
              </button>
            </div>

            {/* Product Meta */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="grid grid-cols-2 gap-y-4 text-xs">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-gray-400">
                    SKU
                  </p>

                  <p className="mt-1 text-gray-700">{product.sku}</p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-wider text-gray-400">
                    Brand
                  </p>

                  <p className="mt-1 text-gray-700">{product.brand}</p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-wider text-gray-400">
                    Material
                  </p>

                  <p className="mt-1 text-gray-700">{product.material}</p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-wider text-gray-400">
                    Availability
                  </p>

                  <p className="mt-1 text-gray-700">{product.availability}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
                Description
            ========================== */}
      <section className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#b85b32]">
            Product Story
          </p>

          <h2 className="mt-3 text-2xl font-medium text-gray-900">
            About this piece
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500">
            {product.description}
          </p>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;

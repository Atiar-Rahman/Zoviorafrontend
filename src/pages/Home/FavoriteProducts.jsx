import { Link2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FavoriteProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Failed to load products:", error);
      });
  }, []);

  // Each category থেকে 2টা করে product
  const favoriteProducts = Object.values(
    products.reduce((acc, product) => {
      if (!acc[product.categoryId]) {
        acc[product.categoryId] = [];
      }

      if (acc[product.categoryId].length < 2) {
        acc[product.categoryId].push(product);
      }

      return acc;
    }, {}),
  ).flat();

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Products */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {favoriteProducts.map((product) => (
            <div key={product.id} className="group overflow-hidden bg-white">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Discount */}
                {product.discountPercentage > 0 && (
                  <span className="absolute left-3 top-3 bg-black px-2 py-1 text-[10px] font-medium text-white">
                    -{product.discountPercentage}%
                  </span>
                )}

                {/* Wishlist */}
                <button
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm transition hover:bg-black hover:text-white"
                  aria-label="Add to wishlist"
                >
                  ♡
                </button>
              </div>

              {/* Product Info */}
              <div className="pt-4">
                <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  {product.category}
                </p>

                <h3 className="line-clamp-1 text-sm font-medium text-gray-900">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-xs text-yellow-500">★</span>

                  <span className="text-xs text-gray-500">
                    {product.rating}
                  </span>

                  <span className="text-xs text-gray-400">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">
                    ৳{product.discountPrice.toLocaleString()}
                  </span>

                  <span className="text-xs text-gray-400 line-through">
                    ৳{product.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="mt-10 text-center">
          <Link to={'/shop'} className="flex justify-center items-center">
            <button className="border border-black px-7 py-3 text-xs font-medium uppercase tracking-wider transition hover:bg-black hover:text-white flex justify-center items-center gap-4">
              <Link2 />
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FavoriteProducts;
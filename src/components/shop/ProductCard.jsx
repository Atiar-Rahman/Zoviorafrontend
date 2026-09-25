import { Link } from "react-router-dom";

const ProductCard = ({ product, onWishlist, isWishlisted }) => {
  return (
    <Link to={`/shop/${product.id}`}>
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
    </Link>
  );
};


export default ProductCard;
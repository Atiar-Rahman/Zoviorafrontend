const PriceFilter = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  priceRange,
}) => (
  <div className="mb-7 border-b border-gray-100 pb-6">
    <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-gray-500">
      Price Range
    </p>
    <div className="flex items-center justify-between gap-2">
      <div>
        <p className="text-[8px] text-gray-400">Min</p>
        <p className="text-[10px] font-medium">৳{minPrice.toLocaleString()}</p>
      </div>
      <span className="text-gray-300">—</span>
      <div className="text-right">
        <p className="text-[8px] text-gray-400">Max</p>
        <p className="text-[10px] font-medium">৳{maxPrice.toLocaleString()}</p>
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
);
export default PriceFilter;



const SortFilter = ({setSortBy,sortBy}) => {
    return (
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
    );
};

export default SortFilter;
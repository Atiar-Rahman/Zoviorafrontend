const CategoryFilter = ({
  categories = [],
  selectedCategory,
  setSelectedCategory,
}) => (
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
          className={
            "block text-left text-[10px] transition " +
            (selectedCategory === category
              ? "font-medium text-[#b85b32]"
              : "text-gray-500 hover:text-gray-900")
          }
        >
          {category}
        </button>
      ))}
    </div>
  </div>
);
export default CategoryFilter;

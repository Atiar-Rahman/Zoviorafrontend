import SearchFilter from "./SearchFilter";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
const FilterSection = ({
  mobileFilterOpen,
  search,
  setSearch,
  categories = [],
  setMaxPrice,
  maxPrice,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  priceRange,
  clearFilters,
}) => (
  <aside
    className={
      "w-full shrink-0 lg:block lg:w-48 " +
      (mobileFilterOpen ? "block" : "hidden")
    }
  >
    <div className="sticky top-6">
      <SearchFilter search={search} setSearch={setSearch} />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <PriceFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        priceRange={priceRange}
      />
      <button
        type="button"
        onClick={clearFilters}
        className="text-[9px] font-medium uppercase tracking-wider text-gray-500 underline underline-offset-4 transition hover:text-[#b85b32]"
      >
        Clear all filters
      </button>
    </div>
  </aside>
);
export default FilterSection;

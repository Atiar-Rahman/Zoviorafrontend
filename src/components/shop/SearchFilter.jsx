const SearchFilter = ({ search, setSearch }) => (
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
      <span className="absolute right-0 top-2 text-xs text-gray-400">⌕</span>
    </div>
  </div>
);
export default SearchFilter;

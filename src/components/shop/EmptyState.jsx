

const EmptyState = ({clearFilters}) => {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center text-center">
        <div className="mb-4 text-3xl text-gray-300">◌</div>

        <h3 className="text-sm font-medium text-gray-800">No products found</h3>

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
    );
};

export default EmptyState;
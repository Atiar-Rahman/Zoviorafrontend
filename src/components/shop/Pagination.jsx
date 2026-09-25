

const Pagination = ({totalPages, currentPage, setCurrentPage}) => {
    return (
      <div>
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-1">
            {/* Previous */}
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className="flex h-8 min-w-8 items-center justify-center border border-gray-200 px-2 text-[9px] text-gray-500 transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-500"
            >
              Prev
            </button>

            {/* Pages */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-8 min-w-8 items-center justify-center border text-[9px] transition ${
                    currentPage === page
                      ? "border-[#b85b32] bg-[#b85b32] text-white"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            {/* Next */}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              className="flex h-8 min-w-8 items-center justify-center border border-gray-200 px-2 text-[9px] text-gray-500 transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-500"
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
};

export default Pagination;
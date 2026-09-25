

const Loading = () => {
    return (
      <section className="min-h-screen bg-[#fcfbf9] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="mx-auto h-6 w-64 bg-gray-200" />
            <div className="mx-auto mt-3 h-3 w-96 max-w-full bg-gray-200" />

            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index}>
                  <div className="aspect-square bg-gray-200" />
                  <div className="mt-3 h-3 w-2/3 bg-gray-200" />
                  <div className="mt-2 h-3 w-1/2 bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
};

export default Loading;
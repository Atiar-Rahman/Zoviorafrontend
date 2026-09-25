

const HeaderSection = ({title,description}) => {
    return (
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-2 text-[9px] text-gray-400">
            <span>Home</span>
            <span>/</span>
            <span>Shop</span>
            <span>/</span>
            <span className="text-gray-600">{title}</span>
          </div>

          <h1 className="text-2xl font-medium tracking-tight text-[#181818] sm:text-3xl">
            {title}
          </h1>

          <p className="mt-2 max-w-2xl text-xs leading-5 text-gray-500">
            {description}
          </p>
        </div>
      </section>
    );
};

export default HeaderSection;
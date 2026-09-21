const PhilosophySection = () => {
  return (
      <section className="w-full overflow-hidden bg-[#f8eee8]">
        <div className="grid min-h-[420px] grid-cols-1 md:grid-cols-2">
          {/* Content */}
          <div className="flex items-center px-8 py-16 sm:px-12 md:px-14 lg:px-16 xl:px-20">
            <div className="max-w-xl">
              {/* Small Label */}
              <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#b4512b]">
                Our Philosophy
              </p>

              {/* Heading */}
              <h2 className="text-3xl font-medium leading-tight tracking-[-0.02em] text-[#181818] sm:text-4xl">
                Honoring slow-crafted artistry
              </h2>

              {/* Description */}
              <p className="mt-5 max-w-lg text-sm leading-6 text-[#77706c]">
                Every single product in our catalog tells the story of an artisan.
                We partner with small multi-generational studio kilns and family
                weaving co-ops around the globe to curate limited objects of quiet
                timeless luxury.
              </p>

              {/* Link */}
              <a
                  href="/artisans"
                  className="group mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#222] underline underline-offset-4 transition-all duration-300 hover:text-[#b4512b]"
              >
                Meet Our Artisans
                <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative min-h-80 overflow-hidden md:min-h-105">
            <img
                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1200&auto=format&fit=crop"
                alt="Artisan crafting pottery by hand"
                className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-black/5" />
          </div>
        </div>
      </section>
  );
};

export default PhilosophySection;
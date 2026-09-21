import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CategoryCollection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/data/categorycollection.json")
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((error) => console.error("Category loading error:", error));
  }, []);

  return (
      <section className="bg-[#FAF8F5] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-8 flex items-end justify-between border-b border-stone-200/60 pb-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C86D51]">
                EXPLORE COLLECTIONS
              </p>
              <h2 className="mt-1 text-2xl font-serif font-medium text-stone-900 md:text-3xl">
                Shop by Category
              </h2>
            </div>

            <div className="flex items-center gap-4">
              {/* Custom Navigation Arrows */}
              <div className="hidden items-center gap-2 sm:flex">
                <button className="swiper-prev-btn flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 text-stone-700 transition hover:border-stone-900 hover:bg-stone-900 hover:text-white">
                  <ChevronLeft size={16} />
                </button>
                <button className="swiper-next-btn flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 text-stone-700 transition hover:border-stone-900 hover:bg-stone-900 hover:text-white">
                  <ChevronRight size={16} />
                </button>
              </div>

              <Link
                  to="/categories"
                  className="text-xs font-medium text-stone-700 underline underline-offset-4 hover:text-stone-900"
              >
                View All
              </Link>
            </div>
          </div>

          {/* Category Swiper */}
          <Swiper
              slidesPerView={1.2}
              spaceBetween={16}
              loop={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: ".swiper-next-btn",
                prevEl: ".swiper-prev-btn",
              }}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 20 },
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="categorySwiper !pb-10"
          >
            {categories.map((category) => (
                <SwiperSlide key={category.id}>
                  <Link
                      to={category.primaryButton?.link || "/shop"}
                      className="group block"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-200">
                      <img
                          src={category.image}
                          alt={category.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Gentle Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      {/* Text Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-stone-300">
                      {category.subtitle || "CATEGORY"}
                    </span>
                        <h3 className="mt-0.5 text-base font-serif font-medium text-white">
                          {category.subtitle ? category.subtitle.split(" ")[0] : "Explore"}
                        </h3>
                        <span className="mt-1 inline-block text-[11px] font-medium underline underline-offset-4 text-stone-200 group-hover:text-white">
                      Explore Collection →
                    </span>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </section>
  );
};

export default CategoryCollection;
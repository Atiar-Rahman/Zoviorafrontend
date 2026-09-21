import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";

import { Autoplay, Pagination, Grid } from "swiper/modules";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CategoryCollection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/data/categorycollection.json")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Category loading error:", error);
      });
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Section Heading */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
            Explore Categories
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
            Shop by Category
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
            Discover thoughtfully selected collections designed for modern
            everyday living.
          </p>
        </div>

        <Link
          to="/categories"
          className="hidden text-sm font-medium text-black underline underline-offset-4 sm:block"
        >
          View All
        </Link>
      </div>

      {/* Category Slider */}
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        grid={{
          rows: 2,
          fill: "row",
        }}
        loop={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            grid: {
              rows: 2,
              fill: "row",
            },
          },

          1024: {
            slidesPerView: 3,
            grid: {
              rows: 2,
              fill: "row",
            },
          },

          1280: {
            slidesPerView: 4,
            grid: {
              rows: 2,
              fill: "row",
            },
          },
        }}
        modules={[Autoplay, Pagination, Grid]}
        className="categorySwiper"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <Link to={category.link} className="group block">
              {/* Image */}
              <div className="relative h-80 overflow-hidden bg-gray-100">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/70">
                    {category.category}
                  </p>

                  <h3 className="text-2xl font-medium">{category.title}</h3>

                  <p className="mt-2 max-w-xs text-sm leading-5 text-white/75">
                    {category.description}
                  </p>

                  <div className="mt-4 text-sm font-medium underline underline-offset-4">
                    Explore Collection →
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Mobile View All */}
      <div className="mt-8 text-center">
        <Link
          to="/categories"
          className="text-sm font-medium text-black underline underline-offset-4"
        >
          View All Categories
        </Link>
      </div>
    </section>
  );
};

export default CategoryCollection;

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useState } from "react";
import { useEffect } from "react";

const Banner = () => {
    const [heroData, setHeroData] = useState([]);
    
    useEffect(()=>{
        fetch('/data/hero.json')
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setHeroData(data)
        })
    },[])
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {heroData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative min-h-150 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-black/30" />

              <div className="relative z-10 mx-auto flex min-h-150 max-w-7xl items-center px-6">
                <div className="max-w-xl text-white">
                  <p className="mb-4 text-xs tracking-[0.25em]">
                    {slide.subtitle}
                  </p>

                  <h1 className="text-4xl font-medium leading-tight md:text-6xl">
                    {slide.title}
                  </h1>

                  <p className="mt-5 max-w-lg text-sm leading-6 text-white/80">
                    {slide.description}
                  </p>

                  <div className="mt-7 flex gap-3">
                    <a
                      href={slide.primaryButton.link}
                      className="bg-white px-5 py-3 text-xs font-medium text-black"
                    >
                      {slide.primaryButton.text}
                    </a>

                    <a
                      href={slide.secondaryButton.link}
                      className="border border-white/70 px-5 py-3 text-xs font-medium text-white"
                    >
                      {slide.secondaryButton.text}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Banner;

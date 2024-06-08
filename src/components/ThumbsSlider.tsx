import Image, { StaticImageData } from "next/image";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperType } from "swiper/types";
import { Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import clsx from "clsx";

export default function ThumbsSlider({
  images,
  heading,
}: {
  heading?: string;
  images: string[] | StaticImageData[];
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isActiveIndex, setIsActiveIndex] = useState(0);

  return (
    <aside className="w-full space-y-3">
      {/* main swiper */}
      <Swiper
        // loop
        autoplay={{
          delay: 20000,
          pauseOnMouseEnter: true,
        }}
        modules={[Thumbs, Autoplay]}
        thumbs={{ swiper: thumbsSwiper }}
        onSlideChange={(swiper) => setIsActiveIndex(swiper.activeIndex)}
        className="size-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            {typeof src === "string" ? (
              <a
                href={src}
                //   download
                target="_blank"
                rel="noopener noreferrer"
                title="Click to view larger image"
                className="block border border-blue-100 hover:border-primary rounded-md p-1 xs:hover:p-1.5 transition-all duration-300"
              >
                <Image
                  src={src}
                  alt={heading ?? "Chemistry department university of uyo"}
                  width={300}
                  height={200}
                  className={"w-full h-52 xs:h-60 md:h-72 rounded-md"}
                />
              </a>
            ) : (
              <Image
                src={src}
                alt={heading ?? "Chemistry department university of uyo"}
                width={300}
                height={200}
                className={"w-full h-96 md:h-screen rounded"}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail(s) */}
      <Swiper
        spaceBetween={5}
        slidesPerView={images.length}
        modules={[Thumbs]}
        watchSlidesProgress
        onSwiper={setThumbsSwiper}
      >
        {images.map((src, index) => (
          <SwiperSlide
            key={index}
            className="bg-white border border-blue-100 rounded-md max-w-fit"
          >
            <Image
              src={src}
              alt={heading ?? "Chemistry department"}
              width={56}
              height={56}
              className={clsx("size-12 scale-90 rounded-md", {
                "ring ring-primary p-0.5": isActiveIndex === index,
                "cursor-pointer": isActiveIndex !== index,
              })}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </aside>
  );
}

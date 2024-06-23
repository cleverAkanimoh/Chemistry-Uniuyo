"use client";
import React from "react"
import { RecentNews } from "@/lib";
import { notFound } from "next/navigation";
import "swiper/css";
import { CiCalendar } from "react-icons/ci";
import { Breadcrumbs } from "@/components";
import SwiperWithNavigation from "@/components/SwiperWithNavigation";

const newsTitles = RecentNews.map((news) => news.title);
const Page = ({ params }: { params: { slug: string } }) => {

 
  const newsTitleFormatted = params.slug;
  const filteredNews = RecentNews.filter(
    (news) =>
      news.title.toLocaleLowerCase() ===
      newsTitleFormatted.replaceAll("-", " ").toLocaleLowerCase()
  )[0];

  if (!filteredNews) notFound();

  const { title, pictures, date, description } = filteredNews;
  return (
    <div className="bg-slate-100  px-4 pt-4 pb-10 md:p-10">
       
       <Breadcrumbs
          root={{ title: "News", href: `/recent-news` }}
          array={[
                { title: `${newsTitleFormatted.split("-").slice(0,4).join(" ")}...`, href: `/recent-news/${newsTitleFormatted}` },
          ]}
        />

      <section className="w-full md:w-10/12 mx-auto space-y-6 mt-4">
        <h1 className="text-xl xs:text-2xl font-semibold text-center text-blue-950 mb-2">
          {title}
        </h1>
        {date && (
          <p className="mt-2 text-primary text-center text-base flex items-center gap-2">
            <CiCalendar className="text-lg" />
            {date}
          </p>
        )}
        <SwiperWithNavigation pictures={pictures} />
      </section>
      <div className="mt-4 md:w-10/12 mx-auto">
        <p className="text-base text-gray-700 leading-loose"> {description.map((item, index) => (
        <React.Fragment key={index}>
          {item.split(/(".*?")/).map((part, partIndex) => (
            partIndex % 2 === 1 ? <span className="font-semibold" key={partIndex}>{part.slice(1, -1)}</span> : part
          ))}
          {/* <br /> */}
         <span className="block h-[1rem]"></span>
        </React.Fragment>
      ))}</p>
     
      </div>
        
      <Breadcrumbs
          root={{ title: "News", href: `/recent-news` }}
          array={[
                { title: `${newsTitleFormatted.split("-").slice(0,4).join(" ")}...`, href: `/recent-news/${newsTitleFormatted}` },
          ]}
        />
    </div>
  );
};

export default Page;

"use client";
import React from "react";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import "../../app/style/Hero.css"
const Hero = () => {
  {
    /*****Carousal fun********/
  }
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <div className="container">
      <div className="HeroSEC flex justify-between items-start gap-5">
        <div className="heroSEC1">
          <div className="border w-[15rem] mt-3">
            <ul className="p-4">
              <li className="pb-5">
                <Image
                  src="/icons/Beverages.png"
                  width={20}
                  height={20}
                  alt="Beverages icon"
                  className="inline mr-3"
                />
                Beverages
              </li>
              <li className="pb-5">
                <Image
                  src="/icons/Biscuits.png"
                  width={20}
                  height={20}
                  alt="Biscuits icon"
                  className="inline mr-3"
                />
                Biscuits & Snacks
              </li>
              <li className="pb-5">
                <Image
                  src="/icons/bakery.png"
                  width={20}
                  height={20}
                  alt="bakery icon"
                  className="inline mr-3"
                />
                Breads & Bakery
              </li>
              <li className="pb-5">
                <Image
                  src="/icons/breakfast.svg"
                  width={20}
                  height={20}
                  alt="breakfast icon"
                  className="inline mr-3"
                />
                Breadfast & Dairy
              </li>
              <li className="pb-5">
                <Image
                  src="/icons/Frozanfood.svg"
                  width={20}
                  height={20}
                  alt="Frozanfood icon"
                  className="inline mr-3"
                />
                Frozan Foods
              </li>
              <li className="pb-5">
                <Image
                  src="/icons/Fruits&veg.png"
                  width={20}
                  height={20}
                  alt="Fruits and Vegetables icon"
                  className="inline mr-3"
                />
                Fruits & Vegetables
              </li>
              <li className="pb-5">
                <Image
                  src="/icons/Grocery.png"
                  width={20}
                  height={20}
                  alt="Grocery and Staples icon"
                  className="inline mr-3"
                />
                Grocery & Staples
              </li>
              <li className="pb-5">
                <Image
                  src="/icons/meat.png"
                  width={20}
                  height={20}
                  alt="meat icon"
                  className="inline mr-3"
                />
                Meats & Seafood
              </li>
            </ul>
            <hr className="border-gray-300 mt-3 mb-3" />
            <ul className="p-4">
              <li className="pb-5 cursor-pointer">
                <link rel="stylesheet" href="#" />
                Value of the Day
              </li>
              <li className="pb-5 cursor-pointer">
                <link rel="stylesheet" href="#" />
                Top 100 Offers
              </li>
              <li className="pb-5 cursor-pointer">
                <link rel="stylesheet" href="#" />
                New Arrivals
              </li>
            </ul>
          </div>
        </div>

        <div>
          {/*************Carousal********************/}
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-220 CarousalImg"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="">
                  <div className="p-1 relative">
                    <Card className="hCard w-[870px] h-[483px] border-0 p-0">
                      <CardContent className="NavImage borer-0 p-0">
                        <div className="pt-20 pl-20 mb-1">
                          <p>Exclusive Offer</p>
                          <h1 className="font-bold text-4xl mb-1">
                            Specialist in the <br /> grocery store
                          </h1>
                          <p className="mb-1">Only this week. Don’t miss...</p>
                          <p className="mb-3">
                            from{" "}
                            <span className="text-[#D51243] text-xl ">
                              $7.99
                            </span>
                          </p>

                          <div className="text-white rounded-full bg-[#35AFA0] p-2 w-32 cursor-pointer flex gap-2 text-center items-center">
                            Shop Now <FaArrowRightLong />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="previous"/>
            <CarouselNext  className="next"/>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Hero;

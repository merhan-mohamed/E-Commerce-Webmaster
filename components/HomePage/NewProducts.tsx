import Image from "next/image";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { StarIcon } from "lucide-react";

const NewProducts = () => {
    return (
        <div className="container">
            {/* - Stacks vertically on mobile (flex-col)
        - Becomes a row layout on large screens (lg:flex-row)
      */}
            <div className="New flex flex-col lg:flex-row justify-between gap-10">

                {/* Left Column */}
                {/* - Removed ml-[60px]
          - Added lg:max-w-xs to constrain width on large screens
          - Added flex-shrink-0 to prevent shrinking
        */}
                <div className="Trend mt-[30px] lg:max-w-xs w-full flex-shrink-0">
                    <h2 className="font-semibold ">TRENDING SEARCH</h2>
                    <ul className="border p-3 mt-4">
                        {/* Using Array.from for clean iteration */}
                        {Array.from({ length: 5 }).map((_, index) => (
                            <li
                                key={index}
                                className="text-sm font-semibold flex gap-4 sm:gap-10 items-center mb-8 last:mb-0"
                            >
                                <Image
                                    src="/images/Trending.png"
                                    width={70}
                                    height={62}
                                    alt="Trending Image"
                                    className="flex-shrink-0"
                                />
                                <div>
                                    <p className="text-sm font-semibold">
                                        USDA Choice Angus <br /> Beef Stew Meat
                                    </p>
                                    <p className="text-[#D51243] mt-3">
                                        <span className="text-[#C2C2D3] mr-1">$79.99</span>$49.99
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-12">
                        <h2 className="font-bold mb-5">CUSTOMER COMMENT</h2>
                        {/* Removed fixed width and height */}
                        <div className="w-full bg-[#FFFBEC] p-8">
                            <h3 className="font-semibold">The Best Marketplace</h3>
                            <p className="text-[#71778E] text-sm">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut.
                            </p>
                            <div className="flex mt-5">
                                <Image
                                    src="/images/salesManger.PNG"
                                    width={50}
                                    height={50}
                                    alt="sales manger"
                                    className="rounded-full mr-3"
                                />
                                <div>
                                    <h6 className="font-bold">Tina Mcdonnell</h6>
                                    <p className="text-sm text-[#202435]">Sales Manager</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                {/* - Added flex-1 to fill remaining space */}
                <div className="flex-1">
                    <div>
                        <h1 className="font-bold">New Products</h1>
                        <p className="text-[#9B9BB4]">New products with updated stocks.</p>

                        {/***********Products Grid***************/}
                        {/* - Fully responsive grid definition
              - Removed 'grid-rows-2' for simplicity
            */}
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2
             mt-8 text-center"
                        >
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div className="" key={index}>
                                    <div className="">
                                        {/*******Cards*************/}
                                        {/* Removed all fixed-width classes (e.g., 2xl:w-48) */}
                                        <Card className="w-full mb-2">
                                            <CardContent className="p-4">
                                                <div className="aspect-square rounded-md mb-2">
                                                    <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                                                        <Image
                                                            src="/images/seller1.png"
                                                            width={1000}
                                                            height={1000}
                                                            alt="Product Image"
                                                            className="relative"
                                                        />
                                                    </div>
                                                </div>
                                                <CardTitle className="text-sm mb-1 h-12 line-clamp-2">
                                                    All Natural Italian-Style Chicken Meatballs
                                                </CardTitle>
                                                <CardDescription className="text-xs mb-2 line-clamp-2 text-[#00B853]">
                                                    IN STOCK
                                                </CardDescription>
                                                <div className="flex items-center justify-start space-x-1 mb-2">
                                                    <div className="flex">
                                                        {[1, 2, 3, 4].map((star) => (
                                                            <StarIcon
                                                                key={star}
                                                                className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                                            />
                                                        ))}
                                                        <StarIcon className="h-3 w-3 text-gray-300" />
                                                    </div>
                                                    <span className="stars text-xs text-muted-foreground">
                            1 review
                          </span>
                                                </div>
                                                <div className="flex items-center justify-start">
                          <span className="text-sm font-bold text-[#D51243]">
                            <span className="line-through mr-2 text-[#C2C2D3] text-xs">
                              $300
                            </span>
                            $199
                          </span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        {/********End******************/}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Banners Section */}
                        {/* - Stacks on mobile (flex-col)
              - Becomes a row on medium screens (md:flex-row)
            */}
                        <div className="Banner flex flex-col md:flex-row justify-between mt-5 gap-5">
                            <div className="relative">
                                <Image
                                    src="/images/banner.png"
                                    height={230}
                                    width={420}
                                    alt="banner photo"
                                    // Responsive image
                                    className="w-full h-auto"
                                />
                                {/* Responsive padding and text */}
                                <div className="pad absolute inset-0 p-4 sm:p-8">
                                    <p className="text-[#00B853] text-xs">WEEKEND DISCOUNT 40%</p>
                                    <h3 className="text-[#3E445A] text-xl sm:text-2xl">
                                        Legumes & Cereals
                                    </h3>
                                    <p className="text-[#9B9BB4] text-xs">
                                        Feed your family the best
                                    </p>
                                    <button className="text-white rounded-full bg-[#C2C2D3] p-2 w-24 text-sm mt-8 cursor-pointer">
                                        Shop Now
                                    </button>
                                </div>
                            </div>
                            <div className="secondBanner relative">
                                <Image
                                    src="/images/egg.png"
                                    height={230}
                                    width={420}
                                    alt="banner photo"
                                    // Responsive image
                                    className="w-full h-auto"
                                />
                                {/* Responsive padding and text */}
                                <div className="pad absolute inset-0 p-4 sm:p-8">
                                    <p className="text-[#00B853] text-xs">WEEKEND DISCOUNT 40%</p>
                                    <h3 className="text-[#3E445A] text-xl sm:text-2xl">
                                        Dairy & Eggs
                                    </h3>
                                    <p className="text-[#9B9BB4] text-xs">
                                        A different kind of grocery store
                                    </p>
                                    <button className="text-white rounded-full bg-[#C2C2D3] p-2 w-24 text-sm mt-8 cursor-pointer">
                                        Shop Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewProducts;
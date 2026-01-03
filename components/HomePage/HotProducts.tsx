import React from "react";
import Image from "next/image";

const Hotproducts = () => {
    return (
        <div className="container">
            {/* - Stacks vertically on mobile (flex-col)
        - Becomes a row layout on large screens (lg:flex-row)
      */}
            <div className="HotProd flex flex-col lg:flex-row justify-between gap-8 ">
                {/* Left Column */}
                {/* Use flex-1 to allow columns to grow/shrink, lg:max-w-xs to constrain width on large screens */}
                <div className="flex-1 lg:max-w-xs">
                    <div className="bgImage">
                        <div className="p-5 mt-5">
                            <p className="text-[#71778E] mb-1">Best bakery products</p>
                            <h3 className="text-2xl mb-1">Freshest products</h3>
                            <h2 className="font-extrabold text-2xl mb-1">every hour.</h2>
                            <p className="text-xs mb-1">only-from</p>
                            <p className="text-3xl mb-1 text-[#D51243] font-extrabold">
                                $14.99
                            </p>
                            <button className="text-white rounded-full bg-[#35AFA0] p-1 w-24 cursor-pointer">
                                shop now
                            </button>
                        </div>
                    </div>
                    {/* - Removed ml-[60px] to make it full-width on mobile
            - Kept mt-[30px] (mt-8)
          */}
                    <ul className="border mt-8">
                        <li className="flex justify-start gap-4 items-center p-3">
                            <Image
                                src="/icons/BaclonApp.png"
                                height={28}
                                width={18.42}
                                alt="App Image"
                            />
                            Download the Bacola App to <br/>
                            your Phone.
                        </li>
                        <hr className="border-gray-300 mt-3 mb-3"/>
                        <li className="flex justify-start gap-4 items-center p-3">
                            <Image
                                src="/icons/BaclonApp.png"
                                height={28}
                                width={18.42}
                                alt="product image"
                            />
                            Download the Bacola App to <br/>
                            your Phone.
                        </li>
                        <hr className="border-gray-300 mt-3 mb-3"/>
                        <li className="flex justify-start gap-4 items-center p-3">
                            <Image
                                src="/icons/BaclonApp.png"
                                height={28}
                                width={18.42}
                                alt="product image"
                            />
                            Download the Bacola App to <br/>
                            your Phone.
                        </li>
                    </ul>
                </div>

                {/* Right Column */}
                {/* flex-1 allows it to take remaining space */}
                <div className="mt-5 flex-1">
                    <div className="takecare">
                        <Image
                            src="/images/Takecare.png"
                            width={840}
                            height={126}
                            alt="Takecare Image"
                            // Added responsive classes:
                            className="w-full h-auto"
                        />
                        <div className="mt-8 md:mt-20">
                            {" "}
                            {/* More margin on desktop */}
                            <h1 className="font-bold">HOT PRODUCT FOR THIS WEEK</h1>
                            {/* FIX: Replaced "Don't" with "Don&apos;t" to fix react/no-unescaped-entities
              */}
                            <p className="text-[#9B9BB4]">
                                Don&apos;t miss this opportunity at a special discount just for
                                this week.
                            </p>
                        </div>

                        {/* - Removed fixed w-[850px]
              - Stacks on mobile (flex-col), row on medium screens (md:flex-row)
              - Center-aligned on mobile (items-center), start-aligned on desktop (md:items-start)
              - Responsive padding (p-4 for mobile, sm:p-10 for larger)
            */}
                        <div
                            className="yoghrut w-full h-auto mt-4 rounded-sm flex flex-col md:flex-row items-center md:items-start gap-10 border border-[#ED174A] p-4 sm:p-10">
                            <Image
                                src="/images/HotProductOffer.png"
                                width={140}
                                height={125.18}
                                alt="offer image"
                                // Prevents image from shrinking
                                className="flex-shrink-0"
                            />
                            <div className="details w-full">
                <span className="text-[#D51243]">
                  <span className="line-through text-[#C2C2D3] mr-2">
                    $5.49
                  </span>
                  $4.49
                </span>
                                <h2>Chobani Complete Vanilla Greek Yogurt</h2>
                                <p className="text-[#00B853] text-xs mt-3 mb-3">INSTOCK</p>
                                <Image
                                    src="/images/slider.png"
                                    width={568}
                                    height={10}
                                    alt="slider image"
                                    // Added responsive classes:
                                    className="slider w-full h-auto"
                                />
                                {/* - Added flex-wrap to allow timer and text to stack on small screens
                 */}
                                <ul className="flex flex-wrap items-center mt-5 gap-y-2">
                                    <li className="bg-[#EDEEF5] w-8 h-8 text-center pt-1 rounded">
                                        70
                                    </li>
                                    <span className="mx-1">:</span>
                                    <li className="bg-[#EDEEF5] w-8 h-8 text-center pt-1 rounded">
                                        14
                                    </li>
                                    <span className="mx-1">:</span>
                                    <li className="bg-[#EDEEF5] w-8 h-8 text-center pt-1 rounded">
                                        44
                                    </li>
                                    <span className="mx-1">:</span>
                                    <li className="bg-[#EDEEF5] w-8 h-8 text-center pt-1 rounded">
                                        54
                                    </li>
                                    <div className="timing text-xs ml-2">
                                        Remains until the end <br/> of the offer
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* - Removed fixed w-[850px]
            - Stacks on mobile (flex-col), row on small screens (sm:flex-row)
            - Added gap-y-2 for vertical spacing when stacked
          */}
                    <div
                        className="yoghrut mt-5 w-full h-auto bg-[#FFEEF2] text-center flex flex-col sm:flex-row items-center gap-x-3 gap-y-2 justify-center p-4">
                        <p className="text-[#ED174A] p1">
                            Super discount for your{" "}
                            <span className="font-bold text-[#ED174A] border-b border-[#ED174A]">
                first purchase.
              </span>
                        </p>
                        <p className="text-[#ED174A] outline-dashed rounded-full outline-[#ED174A] px-3 py-1 p2">
                            FREE25BAC
                        </p>
                        <p className="text-[#9B9BB4] p3 ">
                            Use discount code in checkout!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hotproducts;
import React from "react";
import Image from "next/image";

const Beverages = () => {
    return (
        <>
            <div className="container mt-16">
                {/* - This is now a responsive grid
          - 'grid-cols-2' on mobile
          - 'lg:grid-cols-5' on large screens
          - Removed ml-[60px] and mt-[30px], replaced with my-8
        */}
                <div className="bevSEC grid grid-cols-2 lg:grid-cols-5 my-8">

                    {/* 1. BEVERAGES BLOCK */}
                    {/* - 'col-span-2' makes it full-width on mobile
            - 'lg:col-span-1 lg:row-span-2' creates the 1x2 sidebar on large screens
            - Responsive padding and image sizing
          */}
                    <div className="yellow flex flex-col items-center justify-center p-4 sm:p-10 text-center border border-[#E4E5EE] col-span-2 lg:col-span-1 lg:row-span-2">
                        <Image
                            src="/images/B1.png"
                            // Responsive image size
                            height={195}
                            width={195}
                            alt="product image"
                            className="w-24 h-24 sm:w-32 sm:h-32 lg:w-[195px] lg:h-[195px]"
                        />
                        <p className="font-bold text-center">Beverages</p>
                    </div>

                    {/* 2. BISCUITS & SNACKS */}
                    {/* - Stacks vertically on mobile (flex-col), horizontal on tablet+ (sm:flex-row)
            - Responsive padding and gap
          */}
                    <div className="bev flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6 border border-[#E4E5EE] text-center sm:text-left">
                        <Image
                            src="/images/beverages1.png"
                            height={70}
                            width={70}
                            alt="product image"
                            className="flex-shrink-0"
                        />
                        <p className="font-bold">
                            Biscuits& <br /> Snacks
                        </p>
                    </div>

                    {/* 3. FRUITS & VEGETABLES */}
                    <div className="bev flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6 border border-[#E4E5EE] text-center sm:text-left">
                        <Image
                            src="/images/B2.png"
                            height={70}
                            width={70}
                            alt="product image"
                            className="flex-shrink-0"
                        />
                        <p className="font-bold">
                            Fruits&
                            <br /> Vegetables
                        </p>
                    </div>

                    {/* 4. BREADS & BAKERY */}
                    <div className="bev flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6 border border-[#E4E5EE] text-center sm:text-left">
                        <Image
                            src="/images/B3.png"
                            height={70}
                            width={70}
                            alt="product image"
                            className="flex-shrink-0"
                        />
                        <p className="font-bold">
                            Breads&
                            <br />
                            Bakery
                        </p>
                    </div>

                    {/* 5. GROCERY & STAPLES */}
                    <div className="bev flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6 border border-[#E4E5EE] text-center sm:text-left">
                        <Image
                            src="/images/B4.png"
                            height={70}
                            width={70}
                            alt="product image"
                            className="flex-shrink-0"
                        />
                        <p className="font-bold">
                            Grocery&
                            <br />
                            Staples
                        </p>
                    </div>

                    {/* 6. BREAKFAST & DAIRY */}
                    <div className="bev flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6 border border-[#E4E5EE] text-center sm:text-left">
                        <Image
                            src="/images/B5.png"
                            height={70}
                            width={70}
                            alt="product image"
                            className="flex-shrink-0"
                        />
                        <p className="font-bold">
                            Breakfast&
                            <br />
                            Dairy{" "}
                        </p>
                    </div>

                    {/* 7. HOUSEHOLD NEEDS */}
                    <div className="bev flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6 border border-[#E4E5EE] text-center sm:text-left">
                        <Image
                            src="/images/B6.png"
                            height={70}
                            width={70}
                            alt="product image"
                            className="flex-shrink-0"
                        />
                        <p className="font-bold">Household Needs</p>
                    </div>

                    {/* 8. FROZEN FOODS */}
                    <div className="bev flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6 border border-[#E4E5EE] text-center sm:text-left">
                        <Image
                            src="/images/B7.png"
                            height={70}
                            width={70}

                            alt="product image"
                            className="flex-shrink-0"
                        />
                        <p className="font-bold">Frozen Foods</p>
                    </div>

                    {/* 9. MEATS & SEAFOOD */}
                    <div className="bev flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6 border border-[#E4E5EE] text-center sm:text-left">
                        <Image
                            src="/images/B8.png"
                            height={70}
                            width={70}
                            alt="product image"
                            className="flex-shrink-0"
                        />
                        <p className="font-bold">
                            Meats& <br />
                            Seafood
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Beverages;
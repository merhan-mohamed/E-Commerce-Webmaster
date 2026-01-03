import Image from "next/image";
import "../../app/style/Bestsellers.css";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

// get BestSeller Data From API
async function getBestSellerData() {
    const response = await fetch(
        "https://e-commarce-website-eight.vercel.app/api/v1/product/get-bestseller",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed To Fetch Data");
    }
    return response.json();
}

// Define a type for the product item to avoid 'any'
type ProductItem = {
    productId: string | number;
    image: string;
    name: string;
    totalSold: number;
    price: number | string;
};

const Bestsellers = async () => {
    const data = await getBestSellerData();

    return (
        <div className="container">
            {/* Main layout container:
        - Stacks vertically on mobile (flex-col)
        - Becomes horizontal on large screens (lg:flex-row)
        - Centers items when stacked, aligns top when horizontal
      */}
            <div className="myBEST flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
                {/* Decorative Image:
          - Hidden on mobile (hidden)
          - Appears on large screens (lg:block)
          - flex-shrink-0 prevents it from shrinking
        */}
                <div className="hidden lg:block flex-shrink-0">
                    <Image
                        src="/images/BestSeller.png"
                        height={430.13}
                        width={270}
                        alt="Best Seller Decorative Image"
                        className="mt-2"
                    />
                </div>

                {/* Content Section (Heading + Carousel):
          - Takes full width on mobile (w-full)
          - Takes remaining space on large screens
        */}
                <div className="w-full">
                    <h1 className="font-bold text-2xl">BEST SELLERS</h1>
                    <p className="text-[#9B9BB4]">
                        Do not miss the current offers until the end of March
                    </p>

                    {/***********Carousel***************/}
                    <div className="mt-5 mb-5">
                        <Carousel
                            opts={{
                                align: "start",
                            }}
                            // Fills the width of its parent container
                            className="w-full"
                        >
                            <CarouselContent>
                                {data.data.length > 0 &&
                                    // FIX: Replaced 'any' with the specific 'ProductItem' type
                                    data.data.map((item: ProductItem) => (
                                        <CarouselItem
                                            key={item.productId}
                                            // Responsive item sizing:
                                            // - 1 item on mobile (basis-full)
                                            // - 2 items on tablet (sm:basis-1/2)
                                            // - 3 items on desktop (lg:basis-1/3)
                                            // - 4 items on large desktop (2xl:basis-1/4)
                                            className="basis-full sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
                                        >
                                            <div className="p-1">
                                                {/*******Cards*************/}
                                                {/* - Added 'group' for hover effects on children
                          - Removed fixed widths to be responsive
                          - Added 'overflow-hidden' for clean rounded corners
                        */}
                                                <Card className="group w-full overflow-hidden">
                                                    <CardContent className="p-4">
                                                        {/* Image Container:
                              - 'relative' for positioning the discount badge
                              - 'overflow-hidden' for the image zoom effect
                            */}
                                                        <div className="aspect-square rounded-md mb-3 relative overflow-hidden">
                                                            {/* Discount Badge: Positioned responsively */}
                                                            <span className="w-10 h-6 text-center p-1 bg-[#35AFA0] text-white absolute left-3 top-3 z-10 text-xs rounded">
                                22%
                              </span>
                                                            <Image
                                                                src={item.image}
                                                                width={1000}
                                                                height={1000}
                                                                alt={item.name} // Better alt text
                                                                // Image fills container, zooms on hover
                                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                            />
                                                        </div>

                                                        {/* Title: Fixed 2-line height with truncation */}
                                                        <CardTitle className="text-sm mb-1 h-12 line-clamp-2 font-semibold">
                                                            {item.name}
                                                        </CardTitle>

                                                        {/* Description: Removed unnecessary line-clamp */}
                                                        <CardDescription className="text-xs mb-2 text-[#00B853]">
                                                            IN STOCK: {item.totalSold}
                                                        </CardDescription>

                                                        <div className="flex items-center space-x-1 mb-2">
                                                            <div className="flex">
                                                                {[1, 2, 3, 4].map((star) => (
                                                                    <StarIcon
                                                                        key={star}
                                                                        className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                                                    />
                                                                ))}
                                                                <StarIcon className="h-3 w-3 text-gray-300" />
                                                            </div>
                                                            <span className="text-xs text-muted-foreground">
                                1 review
                              </span>
                                                        </div>

                                                        <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-[#D51243]">
                                <span className="line-through mr-2 text-[#C2C2D3] text-xs">
                                  $300
                                </span>
                                  {item.price}
                              </span>
                                                        </div>

                                                        {/*********Quantity***********/}
                                                        {/* - 'items-stretch' makes the ButtonGroup full-width
                             */}
                                                        <div className="qty flex flex-col items-stretch mt-5">
                                                            {/* Removed 'mr-10', added 'w-full' */}
                                                            <ButtonGroup className="w-full">
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    style={{
                                                                        borderTopLeftRadius: "15px",
                                                                        borderBottomLeftRadius: "15px",
                                                                    }}
                                                                >
                                                                    -
                                                                </Button>
                                                                {/* - Removed inline style
                                   - 'flex-1' makes it fill available space
                                 */}
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="qtyzero flex-1"
                                                                >
                                                                    0
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    // Changed to 'sm' for consistency
                                                                    size="sm"
                                                                    className="bg-[#FFCD00]"
                                                                    style={{
                                                                        borderTopRightRadius: "15px",
                                                                        borderBottomRightRadius: "15px",
                                                                    }}
                                                                >
                                                                    +
                                                                </Button>
                                                            </ButtonGroup>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                                {/********End******************/}
                                            </div>
                                        </CarouselItem>
                                    ))}
                            </CarouselContent>

                            {/* Navigation:
                - Hidden on mobile (hidden)
                - Appears on tablet and up (md:flex)
              */}
                            <CarouselNext className="BSN right-0 hidden md:flex" />
                            <CarouselPrevious className="BSP left-0 hidden md:flex" />
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bestsellers;
import React from "react";

import blog1 from "../../../public/images/blog 4.png"
import blog2 from "../../../public/images/blog 3.png"
import BlogDetailsCard from "@/components/Blog/BlogDetailsCard";
import {StaticImageData} from "next/image";
const Page = async ({ params }: { params: { id: string } }) => {
    const {id} =params;
    console.log(id);
    const images: StaticImageData[] = [blog2, blog1];
    return (
        <section className={'flex flex-col gap-4'}>
            <BlogDetailsCard image={images[0]} />
        </section>
    );
};

export default Page;


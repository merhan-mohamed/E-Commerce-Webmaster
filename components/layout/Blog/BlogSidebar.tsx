'use client'
import React from 'react';
import blog3 from '../../../public/images/1 (3).png';
import blog4 from '../../../public/images/1 (2).png';
import blog5 from '../../../public/images/1 (1).png';
import Image, {StaticImageData} from "next/image";
import SocialLinks from "@/components/Blog/SocialLinks";

import BlogNewsletter from "@/components/Blog/BlogNewsletter";
import RecentPostsCard from "@/components/Blog/RecentPostsCard";

const BlogSidebar = () => {
    const Sliderimages: StaticImageData[] = [blog3, blog4,blog5];
    return (
        <section className={'flex flex-col gap-y-10'}>
            <div className={'p-2 rounded-lg border border-gray-200 '}>
                <h4 className={'uppercase font-medium text-sm py-3'}>Recent Posts</h4>
                {Sliderimages.map((image: StaticImageData, index: number) => (
                    <RecentPostsCard key={index} image={image} index={index}/>
                ))}
            </div>
            <SocialLinks/>
            <BlogNewsletter/>
        </section>

    )
}
export default BlogSidebar;

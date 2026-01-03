'use client'
import React from 'react';
import Image from "next/image";
import blog from '../../public/images/1 (4).png';
import TagsCard from "@/components/Blog/TagsCard";

const BlogNewsletter = () => {
    const texts:string[] = ['ecommerce','food','grocery','klbtheme','organic','shop','shopify','store']
    return (
        <div>
            <div className={'WidgetBanner'}>
                <h4 className={'uppercase font-medium text-sm py-3'}>Widget Banner</h4>
                <Image src={blog} alt={'blog image'}/>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <h4 className={'uppercase font-medium text-sm py-3 col-span-3'}>Tags</h4>
                {texts.map((text: string, index: number) => (
                    <TagsCard text={text} key={index}/>
                ))}
            </div>
        </div>
    )
}
export default BlogNewsletter;

'use client'
import React from 'react'
import {Card, CardContent, CardDescription} from "@/components/ui/card";
import Image, {StaticImageData} from "next/image";
import {Badge} from "@/components/ui/badge";

const RecentPostsCard = ({image ,index}:{image:StaticImageData,index:number}) => {
    return (
        <Card className={'grid grid-cols-4 justify-start border-0 shadow-none items-center pb-3 pt-0 bg-transparent'}>
            <CardDescription className={'col-span-1 w-[60px] h-[60px] relative'}>
                <Image src={image} alt={'image photo'} className={'rounded-full object-cover object-center'}/>
                <Badge variant="default" className={'absolute top-[-6] end-[-3] px-[6px] bg-Primary border-2 border-white'}>{++index}</Badge>
            </CardDescription>
            <CardContent className={'col-span-3  px-5 pt-1 font-medium text-xs'}>
                <p>But I must explain to
                    you how all this
                    mistaken idea
                </p>
            </CardContent>
        </Card>
    )
}
export default RecentPostsCard

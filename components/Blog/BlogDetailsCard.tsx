'use client'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image, {StaticImageData} from "next/image";
import Link from "next/link";

const BlogDetailsCard = ({image}:{image:StaticImageData}) => {
    return (
        <Card className={'bg-transparent border-0 shadow-none'}>
            <CardHeader>
                <Image src={image} alt={'blog image'} className={'rounded-3xl '}/>
                <p className={'text-xs text-gray-400 px-2'}>Grocery</p>
                <CardTitle className={'text-2xl p-2'}>But I must explain to you how all this mistaken idea</CardTitle>
                <CardDescription className={'text-sm text-gray-500 flex gap-3 font-medium px-2'}>
                    <p>jan 10,2025</p>
                    <p >Sinan ISIK</p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros laoreet libero,
                    vitae suscipit lorem turpis sit amet lectus. Quisque egestas lorem ut mauris ultrices,Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere fugiat et nihil harum quaerat cumque quo tenetur iure enim quos sit ut, laborum possimus quod accusamus iusto magni iste consectetur asperiores autem obcaecati numquam aliquam aut dolores! Saepe obcaecati possimus quam odit assumenda, at suscipit corporis incidunt quibusdam nulla? Rerum voluptate vel odio? Eveniet, dolor quam. Quaerat ea facere similique, eligendi eius quod quia enim illum quasi at commodi! Architecto hic debitis consequuntur facere dolores molestiae suscipit vel eos amet obcaecati quam non eligendi iste consequatur minus impedit vero consectetur asperiores, sint praesentium excepturi alias! Recusandae maxime eius quia corporis obcaecati distinctio, veniam quas beatae nihil quibusdam quod corrupti voluptatum perspiciatis excepturi, facilis, odio rerum voluptatibus magni. Consequatur accusantium error iure earum. Culpa repellendus voluptatum accusantium unde. Necessitatibus vitae sunt corrupti? Expedita fugiat alias aut voluptas molestias placeat doloremque sapiente vero architecto sed? Quaerat quisquam repudiandae eum hic praesentium doloribus, minima corrupti tenetur nesciunt optio maxime ea. Minus ratione recusandae ducimus velit, inventore praesentium minima expedita, molestiae laborum nihil est ipsa obcaecati nostrum. Culpa odit corrupti quod id obcaecati recusandae aspernatur corporis omnis veritatis velit quae voluptate aliquid magni iste laboriosam,
                    ipsa ab necessitatibus! Cumque et aliquid nisi aspernatur dolorumLorem ipsum dolor sit amet consectetur adipisicing elit.
                    Facere fugiat et nihil harum quaerat cumque quo tenetur iure enim quos sit ut, laborum possimus
                    quod accusamus iusto magni iste consectetur asperiores autem obcaecati numquam aliquam aut dolores!
                    Saepe obcaecati possimus quam odit assumenda, at suscipit corporis incidunt quibusdam nulla? Rerum voluptate
                    vel odio? Eveniet, dolor quam. Quaerat ea facere similique, eligendi eius quod quia enim illum quasi at commodi!
                    Architecto hic debitis consequuntur facere dolores molestiae suscipit vel eos amet obcaecati quam non eligendi iste
                    consequatur minus impedit vero consectetur asperiores, sint praesentium excepturi alias! Recusandae maxime eius quia
                    corporis obcaecati distinctio, veniam quas beatae nihil quibusdam quod corrupti voluptatum perspiciatis excepturi, facilis,
                    odio rerum voluptatibus magni. Consequatur accusantium error iure earum. Culpa repellendus voluptatum accusantium unde.
                    Necessitatibus vitae sunt corrupti? Expedita fugiat alias aut voluptas molestias placeat doloremque sapiente vero architecto sed?
                    Quaerat quisquam repudiandae eum hic praesentium doloribus, minima corrupti tenetur nesciunt optio maxime ea. Minus ratione recusandae
                    ducimus velit, inventore praesentium minima expedita, molestiae laborum nihil est ipsa obcaecati nostrum. Culpa odit corrupti quod id
                    obcaecati recusandae aspernatur corporis omnis veritatis velit quae voluptate aliquid magni iste laboriosam.
                </p>
            </CardContent>
        </Card>
    )
}
export default BlogDetailsCard

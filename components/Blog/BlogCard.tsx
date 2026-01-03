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
import { useState } from "react"
import { MoreHorizontalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function BlogCard({image}:{image: string | StaticImageData}) {
    const [DeleteBlog, setDeleteBlog] = useState(false)

    return (
        <>
            <Card className={'bg-transparent relative py-[2rem]'}>
                <Link href={'/blog/1'} >
                    <CardHeader >
                        <Image src={image} alt={'image photo'} className={'w-full '}/>
                        <p className={'text-xs text-gray-400'}>Grocery</p>
                        <CardTitle className={'text-2xl ]'}>But I must explain to you how all this mistaken idea</CardTitle>
                        <CardDescription className={'text-sm text-gray-500 flex gap-3 font-medium'}>
                            <p>jan 10,2025</p>
                            <p >Sinan ISIK</p>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className={'text-sm py-2'}>
                            Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros laoreet libero,
                            vitae suscipit lorem turpis sit amet lectus. Quisque egestas lorem ut mauris ultrices,...
                        </p>
                    </CardContent>
                </Link>
                <div className="absolute top-[-3] end-0">
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild className={'bg-transparent border-0 shadow-none  hover:bg-transparent cursor-pointer'}>
                            <Button variant="outline" aria-label="Open menu" size="icon-lg"  >
                                <MoreHorizontalIcon className="!w-6 !h-6" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40" align="end">
                            {/*<DropdownMenuLabel>Blog Actions</DropdownMenuLabel>*/}
                            <DropdownMenuGroup>
                                <DropdownMenuItem >
                                    <Link href={'/blog/edit/1'}>
                                        Update The Blog
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setDeleteBlog(true)}>
                                    Delete The Blog
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Dialog open={DeleteBlog} onOpenChange={setDeleteBlog} >
                        <DialogContent className="sm:max-w-[425px] bg-Background">
                            <DialogHeader>
                                <DialogTitle>Delete Blog</DialogTitle>
                                <DialogDescription>
                                    Are you Sure you want to delete the Blog?.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" className={'bg-Primary text-white'}>Delete</Button>
                                {/*<Link href={'/blog/edit/1'}>*/}
                                {/*    Update The Blog*/}
                                {/*</Link>*/}
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </Card>

        </>

    )
}

export default BlogCard;

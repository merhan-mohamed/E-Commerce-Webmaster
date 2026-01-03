'use client'
import React from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
    title: z.string().min(3, "Title is required"),
    content: z.string().min(10, "Content is required"),
    tags: z.string().min(2, "Add at least one tag"),
    author: z.string().min(3, "Author name is required"),
    image: z.any().optional(),
})



const BlogForm = ({update}:{update:boolean}) => {
    console.log(update);
    const formuse = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            tags: "",
            author: "",
            image: null,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>):void  {
        console.log(values);
    }

    return (
        <div className={'max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow'}>
            <h1 className="text-2xl font-semibold mb-6 text-center">{update?"Update The Blog":"Add New Blog"}</h1>
            <Form {...formuse}>
                <form onSubmit={formuse.handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
                    <FormField
                        control={formuse.control}
                        name={'title'}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter blog title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    >
                    </FormField>
                    <FormField
                        control={formuse.control}
                        name={'content'}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Write your blog content" {...field} className={'min-h-40 focus:min-h-64'}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    >
                    </FormField>
                    <FormField
                        control={formuse.control}
                        name={'tags'}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                    {/*<Input placeholder={'e.g. food, grocery, ecommerce'} {...field}/>*/}
                                    <Textarea placeholder={'e.g. food, grocery, ecommerce'} {...field} className={'min-h-16'}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    >

                    </FormField>
                    <FormField
                        control={formuse.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Author</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter author name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={formuse.control}
                        name="image"
                        render={() => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <Input type="file" accept="image/*" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full bg-Primary text-white hover:bg-Hover hover:text-Primary hover:border hover:border-Primary/50 hover:shadow-[var(--my-shadow)] transition-all ">
                        {update
                            ?"Update Blog"
                            :"Add Blog"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
export default BlogForm

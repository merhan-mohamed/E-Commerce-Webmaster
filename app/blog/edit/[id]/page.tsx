import React from 'react'
import BlogForm from "@/components/Blog/BlogForm";

async function Page({ params }: { params: { id: string } }) {
    const {id} = await params;
    console.log(id);
    return (
        <div>
            <BlogForm update={true}/>
        </div>
    )
}

export default Page

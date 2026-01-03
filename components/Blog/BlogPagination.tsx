'use client'
import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
} from "@/components/ui/pagination"

const BlogPagination = () => {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationLink href="#"  className={'bg-Primary border-0  rounded-full text-white size-7'}>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
export default BlogPagination

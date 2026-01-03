'use client'
import React from 'react'
import {
    Card,
    CardContent,
} from "@/components/ui/card";

const TagsCard = ({text}:{text:string}) => {
    return (
        <Card className={'col-span-1 px-2 rounded-lg border border-gray-200 shadow-none py-1 bg-transparent'}>
            <CardContent className={'col-span-3 px-0 pt-1 '}>
                <p className={'font-medium text-xs text-center'}>
                    {text}
                </p>
            </CardContent>
        </Card>
    )
}
export default TagsCard

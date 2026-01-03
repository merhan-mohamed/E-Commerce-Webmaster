'use client'
import React from 'react'
import { Instagram ,Twitter} from "lucide-react"
import { FaPinterest, FaReddit ,FaFacebookF} from "react-icons/fa";
import Link from "next/link";

const SocialLinks = () => {
    return (
        <div>
            <h4 className={'uppercase font-medium text-sm py-3'}>Social Media</h4>
            <ul className="SocialLinks flex flex-col gap-y-2 p-2">
                <li >
                    <Link href={'https://www.facebook.com/'} className={'flex gap-5 text-sm font-semibold text-white py-2 bg-Facebook p-2 rounded-lg'}>
                        <FaFacebookF className="text-xl" />
                        Facebook
                    </Link>
                </li>
                <li>
                    <Link href={'https://www.instagram.com/'} className={'flex gap-5 text-sm font-semibold text-white py-2 bg-Instagram p-2 rounded-lg'}>
                        <Instagram/>
                        Instagram
                    </Link>
                </li>
                <li className={'flex gap-5 text-sm font-semibold text-white py-2 bg-Twitter p-2 rounded-lg'}>
                    <Twitter/>
                    Twitter
                </li>
                <li >
                    <Link href={'https://www.Reddit.com/'} className={'flex gap-5 text-sm font-semibold text-white py-2 bg-Reddit p-2 rounded-lg'}>
                        <FaReddit className="text-2xl"/>
                        Reddit
                    </Link>

                </li>
                <li >
                    <Link href={'https://www.Pinterest.com/'} className={'flex gap-5 text-sm font-semibold text-white py-2 bg-Pinterest p-2 rounded-lg'}>
                        <FaPinterest className="text-2xl"/>
                        Pinterest
                    </Link>
                </li>
            </ul>
        </div>
    )
}
export default SocialLinks;

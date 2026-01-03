"use client";
import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/lib/store";
import { logout } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";

// Define a specific type for your auth state to satisfy ESLint
type AuthState = {
    AccessToken?: string | null;
    // You can add other properties from your auth slice here
    // e.g., userId?: string | null;
};

const Navbar = () => {
    const cartCount = useSelector((state: RootState) => state.cart.count);

    // FIX: Replaced 'as any' with a specific type assertion 'as AuthState'
    const auth = useSelector((state: RootState) => state.auth) as AuthState;

    const isAuthed = !!auth?.AccessToken;
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("AccessToken");
            if (token) {
                await fetch("/api/auth/logout", {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
        } catch {}
        // Clear storage and redux
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("expiresAt");
        dispatch(logout());
        router.push("/");
    };

    return (
        <>
            {/*********** 1. Top Announcement Bar ***********/}
            <div className="bg-[#35AFA0] w-full">
                <div className="h-9 text-center ">
                    <p className="parafirst text-white text-xs p-2 ">
                        Due to current circumstances, there may be slight delays in order
                        processing
                    </p>
                </div>
            </div>
            {/******************** End ********************/}

            {/*********** 2. Top Navigation (Help, Language) ***********/}
            <div className="container ">
                {/* Stacks on mobile, row on medium screens+ */}
                <div className="nav flex flex-col md:flex-row justify-between items-center mt-3 gap-2 md:gap-4">
                    <div>
                        <ul className="flex justify-center items-center gap-4 text-xs">
                            <li className="flex justify-center items-center gap-4 text-xs sm:text-[11px]">
                                <Link href="/" className="hover:text-[#35AFA0]">
                                    Home
                                </Link>
                                <Link href="/shop" className="hover:text-[#35AFA0]">
                                    Shop
                                </Link>
                                <Link href="/contact" className="hover:text-[#35AFA0]">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* Hidden on mobile, flex on medium screens+ */}
                    <div className="nav2 hidden md:flex justify-between items-center text-xs pt-[5px]">
                        <Image
                            src="/icons/Icon.png"
                            alt="Secure Icon"
                            width={15}
                            height={15}
                        />
                        <div className=" flex gap-2 divide-x divide-gray-400">
                            <p className="pr-2.5">
                                100% Secure delivery without contacting the courier
                            </p>
                            <p className="pr-2.5">
                                Need help? Call Us:
                                <span className="text-[#35AFA0] font-bold"> +0020500 </span>
                            </p>

                            {/**---Dropdown Languages---***/}
                            <DropdownMenu>
                                <div className="flex justify-between items-start">
                                    <DropdownMenuTrigger>
                                        English
                                        <IoIosArrowDown className="inline" />
                                    </DropdownMenuTrigger>
                                </div>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Arabic</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {/********End Of Dropdown Languages********************/}
                        </div>
                        <div>
                            {/**---Dropdown Currency---***/}
                            <DropdownMenu>
                                <div className="flex justify-between items-start gap-0.5 ml-2.5">
                                    <DropdownMenuTrigger>
                                        USD
                                        <IoIosArrowDown className="inline" />
                                    </DropdownMenuTrigger>
                                </div>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>EGP</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {/********End Of Dropdown Currency********************/}
                        </div>
                    </div>
                </div>
            </div>
            {/******************** End ********************/}

            <hr className="border-gray-300 mt-3 mb-3 NavLine" />

            {/*********** 3. Main Navigation (Logo, Search, Cart) ***********/}
            <div className="container">
                {/* Stacks on mobile, row on large screens+ */}
                <div className="navsec flex flex-col lg:flex-row justify-between items-center gap-4 ">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Image
                            src="/images/log1.png"
                            width={150}
                            height={150}
                            alt="logo1"
                        />
                    </div>

                    {/* Search Bar - Full width on mobile, fixed on large */}
                    <div className="w-full lg:w-auto">
                        <InputGroup className="INPUT bg-[#F3F4F7] w-full lg:w-[36rem]">
                            <InputGroupInput
                                placeholder="Search for Products, meats, fruits, eggs, etc..."
                                className="SearchBTN"
                            />
                            <InputGroupAddon></InputGroupAddon>
                            <InputGroupAddon align="inline-end">
                                <InputGroupButton>
                                    <CiSearch />
                                </InputGroupButton>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>

                    {/* Auth & Cart */}
                    <div className="w-full lg:w-auto">
                        <ul className="flex justify-center lg:justify-between items-center gap-3">
                            {!isAuthed ? (
                                <>
                                    <li>
                                        <Link
                                            href="/auth/login"
                                            className="text-sm hover:text-[#35AFA0]"
                                        >
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/auth/register"
                                            className="text-sm hover:text-[#35AFA0]"
                                        >
                                            Sign Up
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-sm text-red-500 hover:text-red-600"
                                    >
                                        Logout
                                    </button>
                                </li>
                            )}
                            <li className="rounded-full h-10 w-10 bg-[#fff1ee] align-center relative">
                                <Link
                                    href="/shop/cart-checkout"
                                    aria-label="Go to cart"
                                    className="block h-full w-full"
                                >
                                    <div className="">
                    <span className="bg-[#ec462d] absolute -top-2 -right-2 w-6 h-6 rounded-full text-white text-center text-xs flex items-center justify-center">
                      {cartCount || 0}
                    </span>
                                        <CiShoppingCart
                                            size="30px"
                                            color="#ec462d"
                                            className="mt-[5px] mx-auto relative"
                                        />
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/******************** End ********************/}

            {/*********** 4. Category Navigation ***********/}
            <div className="mt-[30px]">
                <div className="nav3 container flex justify-between items-center">
                    {/* Category Dropdown */}
                    <DropdownMenu>
                        <div className="flex justify-between items-start gap-0.5 ml-2.5">
                            <DropdownMenuTrigger>
                                <div className="flex-col items-center justify-center">
                                    <div className="GREENBTN rounded-full bg-[#35AFA0] flex justify-between items-center p-5 gap-3 text-white">
                                        <Image
                                            src="/icons/burger.png"
                                            width={25}
                                            height={25}
                                            alt="burger menu"
                                            className="BURGER"
                                        />
                                        ALL CATEGORIES
                                        <IoIosArrowDown />
                                    </div>
                                    <p className="bg-[#EDEEF5] rounded-full text-center text-[#71778E] p-1 text-[8px] w-30 mx-auto mt-[-5px] totalProd">
                                        TOTAL 50 PRODUCTS
                                    </p>
                                </div>
                            </DropdownMenuTrigger>
                        </div>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <ul className="p-4">
                                    <li className="pb-5">
                                        <Image
                                            src="/icons/Beverages.png"
                                            width={20}
                                            height={20}
                                            alt="Beverages icon"
                                            className="inline mr-3"
                                        />
                                        Beverages
                                    </li>
                                    {/* ... other categories ... */}
                                    <li className="pb-5">
                                        <Image
                                            src="/icons/meat.png"
                                            width={20}
                                            height={20}
                                            alt="meat icon"
                                            className="inline mr-3"
                                        />
                                        Meats & Seafood
                                    </li>
                                </ul>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Desktop Links - Hidden on mobile/tablet */}
                    <div className="NavItem">
                        {/* - Hidden on mobile, flex on large screens
              - Converted all items to semantic <ul> > <li> > <Link> structure
            */}
                        <ul className="NavTHIRD hidden lg:flex justify-between items-center gap-4 font-semibold text-[#3E445A]">
                            <li>
                                <Link
                                    href="/"
                                    className="text-[#3E445A] hover:text-[#35AFA0]"
                                >
                                    HOME
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/shop"
                                    className="text-[#3E445A] hover:text-[#35AFA0]"
                                >
                                    SHOP
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/shop?category=meats" // Example link
                                    className="text-[#3E445A] hover:text-[#35AFA0] flex items-center"
                                >
                                    <Image
                                        src="/icons/meat.png"
                                        width={20}
                                        height={20}
                                        alt="meat icon"
                                        className="inline mr-1"
                                    />
                                    MEATS & SEAFOOD
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/shop?category=bakery" // Example link
                                    className="text-[#3E445A] hover:text-[#35AFA0] flex items-center"
                                >
                                    <Image
                                        src="/icons/bakery.png"
                                        width={20}
                                        height={20}
                                        alt="bakery icon"
                                        className="inline mr-1"
                                    />
                                    BAKERY
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/shop?category=beverages" // Example link
                                    className="text-[#3E445A] hover:text-[#35AFA0] flex items-center"
                                >
                                    <Image
                                        src="/icons/Beverages.png"
                                        width={20}
                                        height={20}
                                        alt="Beverages icon"
                                        className="inline mr-1"
                                    />
                                    BEVERAGES
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/blog"}
                                    className="text-[#3E445A] hover:text-[#35AFA0]"
                                >
                                    BLOG
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/contact"}
                                    className="text-[#3E445A] hover:text-[#35AFA0]"
                                >
                                    CONTACT
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/******************** End ********************/}

            <hr className="border-gray-300 mt-3 mb-3 NavLine" />
        </>
    );
};

export default Navbar;
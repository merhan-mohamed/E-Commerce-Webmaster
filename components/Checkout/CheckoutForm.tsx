// components/CheckoutForm.tsx (Updated)
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { PaymentMethods } from "./PaymentMethods";
import { Button } from "../ui/button";

const CheckoutForm = () => {
  const [hasToken, setHasToken] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("AccessToken");
    setHasToken(!!token);
    const onStorage = (e: StorageEvent) => {
      if (e.key === "AccessToken") setHasToken(!!e.newValue);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    // REMOVED: flex-2 lg:flex-3
    <div className="space-y-6">
      {!hasToken && (
        <div className="w-full rounded-md border border-amber-300 bg-amber-50 p-3 text-amber-900">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-sm">
              You are not signed in. Please log in to checkout.
            </p>
            <Link href="/auth/login" className="text-sm underline underline-offset-4">
              Go to Login
            </Link>
          </div>
        </div>
      )}
      {/* Contact */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold mb-3">Contact</h2>
          {!hasToken && (
            <Link
              href="/auth/login"
              className="underline cursor-pointer text-bluemain text-sm"
            >
              log in
            </Link>
          )}
        </div>

        <input
          type="text"
          placeholder="Email or mobile phone number"
          className="w-full border-2 border-bluemain placeholder:text-graytext rounded-sm p-2.5 mb-3
                       text-sm focus:outline-none"
        />
        <label className="flex items-center space-x-2 text-sm ml-1">
          <Checkbox />
          <span className="">Email me with news and offers</span>
        </label>
      </div>

      {/* Delivery */}
      <div>
        <h2 className="text-xl font-bold mb-4">Delivery</h2>
        <Select>
          <SelectTrigger className="w-full mb-3">
            <SelectValue placeholder="Country / Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="bg-gray-300 rounded-2xl">
              <SelectLabel>Country or Region</SelectLabel>
              <SelectItem value="US">United States</SelectItem>
              <SelectItem value="EG">Egypt</SelectItem>
              <SelectItem value="SA">Saudi Arabia</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-3">
          <Input
            type="text"
            placeholder="First name (optional)"
            className="focus:ring-1 focus:ring-bluemain transition-all duration-200"
          />
          <Input
            type="text"
            placeholder="Last name"
            className="focus:ring-1 focus:ring-bluemain transition-all duration-200"
          />
        </div>

        <Input
          type="text"
          placeholder="Address"
          className="w-full focus:ring-1 focus:ring-bluemain transition-all duration-200 mb-3"
        />
        <Input
          type="text"
          placeholder="Apartment, suite, etc (optional)"
          className="w-full focus:ring-1 focus:ring-bluemain transition-all duration-200 mb-3"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-3">
          <Input
            type="text"
            placeholder="Postal code (optional)"
            className=" focus:ring-1 focus:ring-bluemain transition-all duration-200"
          />
          <Input
            type="text"
            placeholder="City"
            className=" focus:ring-1 focus:ring-bluemain transition-all duration-200"
          />
        </div>

        <label className="flex items-center space-x-2 text-sm ml-1">
          <Checkbox />
          <span>Save this information for next time</span>
        </label>
      </div>

      {/* Shipping Method */}
      <div>
        <h2 className="text-md font-bold mb-4">Shipping method</h2>
        <div className="flex justify-between border-2 border-bluemain bg-bgbluelight text-sm rounded-sm p-3.5">
          <span>Standard</span>
          <span className="font-bold">FREE</span>
        </div>
      </div>

      {/* Payment */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-1.5">Payment</h2>
        <p className="text-sm text-graytext mb-4">
          All transactions are secure and encrypted.
        </p>

        <PaymentMethods />

        <Button className="mt-6 w-full cursor-pointer" disabled={!hasToken}>
          {hasToken ? "Pay now" : "Login to pay"}
        </Button>
        {!hasToken && (
          <div className="mt-2">
            <Link href="/auth/login">
              <Button variant="outline" size="sm">Login to continue</Button>
            </Link>
          </div>
        )}
      </div>
      <div className=" w-full h-px bg-grayborder mb-3"></div>
      <span className="underline cursor-pointer text-bluemain text-sm">
        Privacy policy
      </span>
    </div>
  );
};

export default CheckoutForm;
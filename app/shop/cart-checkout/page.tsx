import CartSummary from "@/components/Cart/CartSummary";
import CheckoutForm from "@/components/Checkout/CheckoutForm";


export default function CheckoutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col-reverse lg:flex-row lg:gap-12">
        
        {/* --- Checkout Form (Main Content) --- */}
        {/* Takes up 2/3 of the width on desktop */}
        {/* On mobile, it appears *after* the summary and has a top margin */}
        <div className="w-full lg:w-2/3 mt-10 lg:mt-0">
          <CheckoutForm />
        </div>

        {/* --- Cart Summary (Sidebar) --- */}
        {/* Takes up 1/3 of the width on desktop */}
        {/* On mobile, it appears *before* the form */}
        <div className="w-full lg:w-1/3">
          <CartSummary />
        </div>

      </div>
    </div>
  );
}
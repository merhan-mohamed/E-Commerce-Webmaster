import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { CreditCard, Wallet } from "lucide-react";

export function PaymentMethods() {
  return (
    <RadioGroup defaultValue="card" className="space-y-3">
      {/* Card Payment */}
      <div className="flex items-center justify-between w-full border-2 rounded-lg p-3 cursor-pointer hover:border-bluemain transition duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border">
            <CreditCard size={20} />
          </div>

          <div>
            <Label htmlFor="card" className="font-semibold text-sm">
              Card Payment
            </Label>
            <p className="text-xs text-graytext">Pay securely with your card</p>
          </div>
        </div>

        <RadioGroupItem id="card" value="card" />
      </div>
      {/* Cash On Delivery */}
      <div className="flex items-center justify-between w-full border-2 rounded-lg p-3 cursor-pointer hover:border-bluemain transition">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border">
            <Wallet size={20} />
          </div>

          <div>
            <Label htmlFor="cash" className="font-semibold text-sm">
              Cash on Delivery
            </Label>
            <p className="text-xs text-graytext">Pay when receiving order</p>
          </div>
        </div>

        <RadioGroupItem id="cash" value="cash" />
      </div>
    </RadioGroup>
  );
}

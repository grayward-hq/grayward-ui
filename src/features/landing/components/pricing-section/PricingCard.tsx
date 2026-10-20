import Image from "next/image";
import { cn } from "@/lib/utils";
import { Plan } from "./types";

interface PricingCardProps {
  plan: Plan;
  index: number;
}

const PricingCard = ({ plan, index }: PricingCardProps) => {
  return (
    <div
      key={`${plan.name}-${index}`}
      className={cn(
        "bg-white relative flex flex-col overflow-hidden rounded-2xl border border-[#0F264F] md:min-h-[416px]",
        "transition-all duration-200 hover:-translate-y-1 hover:shadow-md",
        plan.featured ? "border-[#0F264F] shadow-sm" : "border-[#0F264F]/30",
      )}
    >
      {/* Featured Banner */}
      {plan.featured && (
        <div className="bg-[#0F264F] text-white py-3 text-center text-sm font-semibold tracking-wide">
          Most Popular
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 pt-7">
        {/* Plan Name */}
        <h3 className="text-[#2B2B2B] mb-3 text-[16px] font-medium">
          {plan.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-1.5">
          <span
            className={cn(
              "text-[2.5rem] leading-none font-[400]",
              plan.featured ? "text-[#0F264F]" : "text-[#2E251C]",
            )}
          >
            ${plan.price}
          </span>
          <span className="text-[#666666] text-[14px]">/monthly</span>
        </div>

        {/* Features */}
        <div className="mt-auto">
          <p
            className={cn(
              "text-[#3F3F3F] mb-3 text-sm font-semibold",
              plan.featured ? "pt-10" : "pt-8 md:pt-0",
            )}
          >
            Features:
          </p>
          <ul className="space-y-3">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="text-[#514C4C] flex items-start gap-2.5 text-sm"
              >
                <Image
                  src="/images/checkbox-circle-line.jpg"
                  alt=""
                  width={16}
                  height={16}
                  className="mt-0.5 h-4 w-4 flex-shrink-0"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <button
            className="bg-[#0F264F] text-white hover:bg-[#0a1b38] transition-colors relative block w-full rounded-xl py-3.5 text-center text-sm font-semibold cursor-pointer"
          >
            Try Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;

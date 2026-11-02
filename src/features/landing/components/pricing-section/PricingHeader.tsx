const PricingHeader = () => {
  return (
    <div className="mx-auto mb-14 max-w-[730px] text-center">
      <span className="border-[#E0E0E0] text-[#2B2B2B] mb-6 inline-block rounded-xl border bg-[#FAFAFA] px-4 py-1.5 text-sm font-medium">
        Pricing
      </span>
      <h2 className="text-[#2B2B2B] mx-auto mb-6 text-2xl leading-tight font-bold md:text-[2.5rem]">
        Clear pricing for <span className="text-[#0F264F]">smarter, safer decisions</span>
      </h2>
      <p className="text-[#666666] mx-auto max-w-md pb-5 text-sm md:text-base">
        No hidden fees. No confusion. Just the right plan for your security
        needs.
      </p>
    </div>
  );
};

export default PricingHeader;

import { Check } from "lucide-react";

const items = [
  {
    title: "Built for non-technical users",
    body: "VulnWatch AI is designed for real business teams who need clear answers, not confusing technical reports.",
  },
  {
    title: "AI-powered risk explanations",
    body: "We don't just flag issues, we explain what they mean, why they matter, and what to do next in plain English.",
  },
  {
    title: "Clear prioritization",
    body: "Not every issue deserves the same attention. We help users focus on the highest-impact risks first.",
  },
];

/** Renders the "What makes us different?" section highlighting VulnWatch AI's key differentiators. */
const Different = () => {
  return (
    <section className="bg-white px-5 py-16 md:px-20 md:py-24">
      <div className="mx-auto max-w-300">
        <h2 tabIndex={0} className="font-geist text-[rgba(43,43,43,0.9)] text-center text-3xl font-semibold tracking-[-0.02em] md:text-4xl outline-none focus-visible:ring-2 focus-visible:ring-[#0F264F] focus-visible:ring-offset-2 rounded">
          What makes us different?
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:mt-14 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center rounded-xl border-2 border-[#EFEFEF] bg-white px-6 py-8 text-center"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F264F]">
                <Check className="h-5 w-5 text-white" strokeWidth={3} />
              </div>
              <h3 className="font-geist text-[#172033] mt-5 text-[20px] font-semibold">
                {item.title}
              </h3>
              <p className="font-inter text-[#666666] mt-3 text-[18px] leading-[23px] font-normal">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Different;

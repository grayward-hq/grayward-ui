import Image from "next/image";

interface StepItem {
  step: string;
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const STEPS: StepItem[] = [
  {
    step: "STEP 1",
    number: "01",
    title: "Add Your Domain",
    description:
      "Enter your domain name and verify ownership to begin the security process. Users can choose from multiple verification methods, including DNS verification, Email verification, or File Upload verification. Once verification is successfully completed, you can proceed to the website scanning session.",
    image: "/images/landing-page/01.png",
    imageAlt: "Add your domain preview",
  },
  {
    step: "STEP 2",
    number: "02",
    title: "Scan Your Website",
    description:
      "Scan your website to detect potential attacks, vulnerabilities, and security threats. This stage provides access to advanced features such as security settings, detailed reports, and role-based configurations between admins and users, ensuring complete visibility and control over your website's security.",
    image: "/images/landing-page/02.png",
    imageAlt: "Website scan preview",
  },
  {
    step: "STEP 3",
    number: "03",
    title: "Generate Report",
    description:
      "Expired SSL certificates, misconfigured DNS records, exposed admin panels, and unresolved security vulnerabilities can leave your website vulnerable to attacks, service disruptions, data breaches, and loss of customer trust — potentially impacting your business reputation and operations overnight.",
    image: "/images/landing-page/03.png",
    imageAlt: "Generated report preview",
  },
  {
    step: "STEP 4",
    number: "04",
    title: "Connect Your Repositories",
    description:
      "Authorize VulnWatch with read-only GitHub OAuth. Select the repos you want monitored.",
    image: "/images/landing-page/04.png",
    imageAlt: "Connect your repositories preview",
  },
  {
    step: "STEP 5",
    number: "05",
    title: "Run Your First Scan",
    description:
      "Our Trivy engine analyzes every dependency file: package.json, requirements.txt, go.mod, pom.xml.",
    image: "/images/landing-page/05.png",
    imageAlt: "Run your first scan preview",
  },
  {
    step: "STEP 6",
    number: "06",
    title: "Monitor and Remediate",
    description:
      "Get alerted to new CVEs instantly. Follow AI-generated remediation steps with exact version pins.",
    image: "/images/landing-page/06.png",
    imageAlt: "Monitor and remediate preview",
  },
];

/** Renders the How It Works page with a six-step walkthrough. */
export default function HowItWorks() {
  return (
    <main className="bg-white text-[#111]">
      <section id="how-it-works" className="relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff] via-[#EEF7F9] to-[#C0D7FF]/20" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-14 md:py-24">
          <h1
            tabIndex={0}
            className="mx-auto text-[36px] font-semibold leading-[40px] tracking-[-0.02em] text-[#2B2B2BE5] max-w-[350px] md:max-w-none md:text-[64px] md:font-bold md:leading-[72px] md:tracking-[-2px] outline-none focus-visible:ring-2 focus-visible:ring-[#0F264F] focus-visible:ring-offset-2 rounded"
          >
            How It Works
          </h1>

          <p className="mx-auto mt-3 max-w-[328px] text-[16px] font-normal leading-relaxed text-[#666666] md:max-w-[555px] md:text-[20px] md:leading-[32px] md:tracking-[-1px] md:text-[#2F2F2F] sm:mt-4">
            No installs, no agents, no access to your hosting account. Just a
            domain and a minute of your time.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        <div className="mb-12 text-center md:mb-24">
          <h2 className="mx-auto text-[24px] font-semibold leading-[36px] tracking-[-1.5px] md:text-[40px] md:leading-[48px]">
            Six (6) steps from{" "}
            <span className="text-[#0F264F]">Curious to Confident</span>
          </h2>
        </div>

        <div className="space-y-16 md:space-y-28">
          {STEPS.map((item, index) => {
            const isEven = index % 2 === 1;

            return (
              <div
                key={item.number}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-16 lg:gap-24"
              >
                <div className={isEven ? "order-1 md:order-2" : "order-1"}>
                  <p className="mb-2 text-[14px] font-bold uppercase tracking-[0.2em] text-[#0F264F] leading-[20px] md:text-[20px] md:leading-[28px]">
                    {item.step}
                  </p>

                  <h3 className="text-[44px] font-bold leading-[48px] text-[#2C2C2C] md:text-[64px] md:leading-[64px]">
                    {item.number}
                  </h3>

                  <h4
                    tabIndex={0}
                    className="mt-2 text-[22px] font-semibold leading-tight text-black/90 md:mt-3 md:text-[28px] outline-none focus-visible:ring-2 focus-visible:ring-[#0F264F] focus-visible:ring-offset-2 rounded"
                  >
                    {item.title}
                  </h4>

                  <p className="mt-3 text-[15px] font-normal leading-[24px] text-[#444444] md:mt-4 md:text-[18px] md:leading-[32px] md:tracking-[-0.5px]">
                    {item.description}
                  </p>
                </div>

                <div
                  className={`flex justify-center ${
                    isEven ? "order-2 md:order-1" : "order-2"
                  }`}
                >
                  <div className="relative aspect-[480/300] w-full max-w-[480px] overflow-hidden rounded-[16px] border border-[#D9E0EA] bg-[#FAFAFA] shadow-md transition-shadow hover:shadow-lg md:rounded-[20px]">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

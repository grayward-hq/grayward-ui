import { WaitlistStatusPage } from "@/features/waitlist/views/WaitlistStatusPage";

export const metadata = {
  title: "Check Waitlist Status | Grayward",
  description: "Check your position on the Grayward waitlist.",
};

export default function WaitlistStatusRoute() {
  return <WaitlistStatusPage />;
}

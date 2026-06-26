import { VerifyWaitlistPage } from "@/features/waitlist/views/VerifyWaitlistPage";

export const metadata = {
  title: "Verify Waitlist | VulnWatch",
  description: "Verify your email to join the VulnWatch waitlist.",
};

export default function WaitlistVerifyRoute() {
  return <VerifyWaitlistPage />;
}

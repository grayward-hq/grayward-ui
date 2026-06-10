import { RepositorySecurityPage } from "@/features/repository-security/components/RepositorySecurityPage";

export const metadata = {
  title: "Repository Security | VulnWatch AI",
  description:
    "Monitor your GitHub repositories for vulnerabilities and security risks with VulnWatch AI.",
};

export default function RepositoriesPage() {
  return <RepositorySecurityPage />;
}

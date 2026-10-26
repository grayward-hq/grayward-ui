import { RepositorySecurityPage } from "@/features/repository-security/components/RepositorySecurityPage";

export const metadata = {
  title: "Repository Security | Grayward",
  description:
    "Monitor your GitHub repositories for vulnerabilities and security risks with Grayward.",
};

export default function RepositoriesPage() {
  return <RepositorySecurityPage />;
}

"use client";

import { FileSearch, GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RepositoryCard } from "./RepositoryCard";
import type { Repository } from "../types/repository.types";

interface Props {
  repositories: Repository[];
  searchQuery: string;
  onOpenConnectDialog: () => void;
}

export function RepositoryGrid({ repositories, searchQuery, onOpenConnectDialog }: Props) {
  if (repositories.length > 0) {
    return (
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {repositories.map((repo) => (
          <RepositoryCard key={repo.id} repository={repo} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-brand-light-gray bg-white px-6 py-16 text-center">
      <FileSearch className="mb-4 h-12 w-12 text-brand-muted" />
      <h3 className="mb-2 text-lg font-semibold text-brand-dark">No repositories found</h3>
      <p className="mb-6 text-sm text-brand-gray">
        {searchQuery
          ? "Try adjusting your search or filter"
          : "Connect your GitHub account to start monitoring repositories"}
      </p>
      {!searchQuery && (
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary-hover"
          onClick={onOpenConnectDialog}
        >
          <GitFork className="mr-2 h-4 w-4" />
          Connect GitHub
        </Button>
      )}
    </div>
  );
}

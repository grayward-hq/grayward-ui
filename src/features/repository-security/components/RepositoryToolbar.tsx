"use client";

import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ConnectGithubDialog } from "./ConnectGithubDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type FilterStatus = "all" | "monitored" | "scanned" | "unscanned";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  filter: FilterStatus;
  onFilterChange: (v: FilterStatus) => void;
  dialogOpen: boolean;
  onDialogOpenChange: (open: boolean) => void;
  onConnect: () => void;
}

export function RepositoryToolbar({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  dialogOpen,
  onDialogOpenChange,
  onConnect,
}: Props) {
  return (
    <div className="rounded-lg border border-brand-light-gray bg-white p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
          <Input
            placeholder="Search repositories..."
            className="pl-9 border-brand-border text-brand-dark placeholder:text-brand-muted focus-visible:ring-primary"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Filter + Add */}
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-10 items-center justify-between gap-2 rounded-md border border-brand-border bg-white px-3 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-primary md:w-[180px]">
                {filter === "all" && "All Repositories"}
                {filter === "monitored" && "Monitored"}
                {filter === "scanned" && "Scanned"}
                {filter === "unscanned" && "Unscanned"}
                <ChevronDown className="h-4 w-4 text-brand-muted" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px] bg-white border border-brand-border text-brand-dark">
              <DropdownMenuRadioGroup value={filter} onValueChange={(v) => onFilterChange(v as FilterStatus)}>
                <DropdownMenuRadioItem value="all">All Repositories</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="monitored">Monitored</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="scanned">Scanned</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="unscanned">Unscanned</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <ConnectGithubDialog
            open={dialogOpen}
            onOpenChange={onDialogOpenChange}
            onConnect={onConnect}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { GitFork, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: () => void;
}

const ACCESS_ITEMS = [
  "Read-only access to repository contents",
  "Dependency and package file analysis",
  "Repository metadata (name, visibility, branches)",
];

export function ConnectGithubDialog({ open, onOpenChange, onConnect }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary-hover">
          <GitFork className="mr-2 h-4 w-4" />
          Add Repository
        </Button>
      </DialogTrigger>

      <DialogContent className="border-brand-light-gray bg-white text-brand-dark">
        <DialogHeader>
          <DialogTitle className="text-brand-dark">Connect GitHub Repository</DialogTitle>
          <DialogDescription className="text-brand-gray">
            Grant VulnWatch read-only access to your GitHub repositories for security scanning.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Access list */}
          <div className="rounded-lg border border-brand-light-gray bg-brand-medium-gray p-4">
            <h4 className="mb-3 text-sm font-semibold text-brand-dark">What we&apos;ll access:</h4>
            <ul className="space-y-2">
              {ACCESS_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-brand-gray">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Security note */}
          <div className="rounded-lg border border-brand-light-gray bg-owasp-warn-bg p-4">
            <p className="text-sm text-scan-yellow-900">
              <strong>Security Note:</strong> VulnWatch will never push commits, create pull
              requests, or modify your repositories. Access is strictly read-only for security
              analysis.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 border-brand-border"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary-hover"
            onClick={onConnect}
          >
            <GitFork className="mr-2 h-4 w-4" />
            Connect GitHub
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

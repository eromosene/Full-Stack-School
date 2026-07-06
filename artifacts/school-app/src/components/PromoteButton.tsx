"use client";

import { useTransition } from "react";
import { promoteToAdmin, demoteUser } from "@/lib/actions";

type DomainRole = "teacher" | "student" | "parent";

interface PromoteButtonProps {
  userId: string;
  userName: string;
  /** Role currently stored in the User table for this person */
  currentUserRole: string | undefined;
  /** The domain role this person belongs to (teacher/student/parent) */
  domainRole: DomainRole;
}

export default function PromoteButton({
  userId,
  userName,
  currentUserRole,
  domainRole,
}: PromoteButtonProps) {
  const [isPending, startTransition] = useTransition();

  // No linked User account — promote not applicable
  if (!userId) return null;

  const isAdmin = currentUserRole === "admin";

  const handlePromote = () => {
    if (
      !confirm(
        `Are you sure you want to make ${userName} an Admin?\n\nThis grants full system access.`
      )
    )
      return;
    startTransition(async () => {
      await promoteToAdmin(userId);
    });
  };

  const handleDemote = () => {
    if (
      !confirm(
        `Demote ${userName} back to ${domainRole}?\n\nThey will lose Admin access immediately.`
      )
    )
      return;
    startTransition(async () => {
      await demoteUser(userId, domainRole);
    });
  };

  if (isAdmin) {
    return (
      <button
        onClick={handleDemote}
        disabled={isPending}
        title={`Demote ${userName} back to ${domainRole}`}
        className="text-[10px] px-2 py-0.5 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 font-semibold transition-colors disabled:opacity-50 whitespace-nowrap border border-amber-200"
      >
        {isPending ? "…" : "Admin ✓"}
      </button>
    );
  }

  return (
    <button
      onClick={handlePromote}
      disabled={isPending}
      title={`Promote ${userName} to Admin`}
      className="text-[10px] px-2 py-0.5 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 font-semibold transition-colors disabled:opacity-50 whitespace-nowrap border border-purple-200"
    >
      {isPending ? "…" : "↑ Admin"}
    </button>
  );
}

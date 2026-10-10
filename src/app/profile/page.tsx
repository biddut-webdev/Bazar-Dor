
"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    if (!session?.user.email) return;

    try {
      await navigator.clipboard.writeText(session.user.email);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  if (isPending) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <div className="skeleton h-32 w-full rounded-2xl" />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="p-8 text-center">
        <p>প্রোফাইল দেখতে আগে লগইন করুন।</p>
        <Link href="/signin" className="btn btn-primary mt-4">
          সাইন ইন
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>

        <div className="mt-6 flex items-center gap-4">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt="Profile"
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-700">
              {session.user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <div className="min-w-0">
            <p className="text-lg font-semibold">
              {session.user.name || "নাম দেওয়া হয়নি"}
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <p className="break-all text-sm text-gray-500">
                {session.user.email}
              </p>

              <button
                type="button"
                onClick={copyEmail}
                className="shrink-0 text-sm font-medium text-green-700 hover:underline"
              >
                {copied ? "কপি হয়েছে!" : "ইমেইল কপি"}
              </button>
            </div>
          </div>
        </div>

        <Link
          href="/profile/update"
          className="btn btn-primary mt-6 text-white"
        >
          তথ্য পরিবর্তন করুন
        </Link>
      </section>
    </main>
  );
};

export default ProfilePage;

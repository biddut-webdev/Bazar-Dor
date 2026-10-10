
"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    const email = session?.user?.email;

    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Email copy failed:", error);
      setCopied(false);
    }
  };

  // Loading state
  if (isPending) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:py-10">
        <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="skeleton h-8 w-48" />

          <div className="mt-6 flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full" />

            <div className="flex-1 space-y-3">
              <div className="skeleton h-5 w-40" />
              <div className="skeleton h-4 w-52 max-w-full" />
            </div>
          </div>

          <div className="skeleton mt-6 h-10 w-44 rounded-lg" />
        </section>
      </main>
    );
  }

  // Not logged in
  if (!session) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center px-4 py-10">
        <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">
            আমার প্রোফাইল
          </h1>

          <p className="mt-3 text-gray-600">
            প্রোফাইল দেখতে আগে লগইন করুন।
          </p>

          <Link
            href="/signin"
            className="btn btn-primary mt-5 text-white"
          >
            সাইন ইন
          </Link>
        </section>
      </main>
    );
  }

  const userName = session.user.name?.trim() || "নাম দেওয়া হয়নি";
  const userEmail = session.user.email || "";
  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:py-10">
      <section className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          আমার প্রোফাইল
        </h1>

        {/* User information */}
        <div className="mt-6 flex w-full min-w-0 items-center gap-4">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={`${userName} এর প্রোফাইল ছবি`}
              className="h-16 w-16 shrink-0 rounded-full border border-gray-200 object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-700">
              {firstLetter || "U"}
            </div>
          )}

          <div className="min-w-0 flex-1">
            {/* User name */}
            <p className="break-words text-base font-bold leading-7 text-gray-900 sm:text-lg">
              {userName}
            </p>

            {/* User email and copy button */}
            <div className="mt-1 flex min-w-0 flex-wrap items-center gap-2">
              <p className="min-w-0 break-all text-sm leading-6 text-gray-600">
                {userEmail}
              </p>

              {userEmail && (
                <button
                  type="button"
                  onClick={copyEmail}
                  className="shrink-0 rounded-md px-1 py-1 text-sm font-semibold text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  {copied ? "কপি হয়েছে!" : "ইমেইল কপি"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Update profile button */}
        <Link
          href="/profile/update"
          className="btn btn-primary mt-6 inline-flex max-w-full whitespace-normal text-white"
        >
          তথ্য পরিবর্তন করুন
        </Link>
      </section>
    </main>
  );
};

export default ProfilePage;

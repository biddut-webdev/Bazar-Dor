
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";

const UpdateProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (isPending) {
    return <main className="p-8"><div className="skeleton h-40" /></main>;
  }

  if (!session) {
    return (
      <main className="p-8 text-center">
        <p>তথ্য পরিবর্তন করতে আগে লগইন করুন।</p>
        <Link href="/signin" className="btn btn-primary mt-4">
          সাইন ইন
        </Link>
      </main>
    );
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newName = name.trim();

    if (!newName) {
      setMessage("নাম লিখুন।");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { error } = await authClient.updateUser({ name: newName });

      if (error) {
        setMessage(error.message || "নাম পরিবর্তন করা যায়নি।");
        return;
      }

      setMessage("নাম সফলভাবে পরিবর্তন হয়েছে!");

      setTimeout(() => {
        router.push("/profile");
        router.refresh();
      }, 1000);
    } catch {
      setMessage("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <form
        onSubmit={handleUpdate}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h1 className="text-2xl font-bold">তথ্য পরিবর্তন</h1>

        <label htmlFor="name" className="mt-6 block font-medium">
          নাম
        </label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={session.user.name || "আপনার নাম লিখুন"}
          className="input input-bordered mt-2 w-full"
          required
          maxLength={100}
          disabled={loading}
        />

        {message && (
          <p role="status" className="mt-4 text-sm">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary mt-5 w-full text-white"
        >
          {loading ? "আপডেট হচ্ছে..." : "Update Information"}
        </button>

        <Link href="/profile" className="btn btn-ghost mt-2 w-full">
          ফিরে যান
        </Link>
      </form>
    </main>
  );
};

export default UpdateProfilePage;


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
    return (
      <main className="mx-auto w-full max-w-xl px-4 py-6 sm:py-10">
        <div className="skeleton h-40 w-full rounded-2xl" />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center px-4 py-8">
        <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
          <p className="text-gray-800">
            তথ্য পরিবর্তন করতে আগে লগইন করুন।
          </p>

          <Link href="/signin" className="btn btn-primary mt-4 text-white">
            সাইন ইন
          </Link>
        </section>
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
    <main className="mx-auto w-full max-w-xl px-4 py-6 sm:py-10">
      <form
        onSubmit={handleUpdate}
        className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
      >
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          তথ্য পরিবর্তন
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          আপনার প্রোফাইলের নাম পরিবর্তন করুন।
        </p>

        <label
          htmlFor="name"
          className="mt-6 block text-sm font-semibold text-gray-900"
        >
          নাম
        </label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={session.user.name || "আপনার নাম লিখুন"}
          className="input input-bordered mt-2 w-full bg-white text-gray-900 placeholder:text-gray-500"
          required
          maxLength={100}
          disabled={loading}
        />

        {message && (
          <p
            role="status"
            className={`mt-4 break-words text-sm ${message.includes("সফলভাবে")
                ? "text-green-700"
                : "text-red-600"
              }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary mt-5 w-full text-white"
        >
          {loading ? "আপডেট হচ্ছে..." : "তথ্য পরিবর্তন করুন"}
        </button>

        <Link
          href="/profile"
          className="btn btn-ghost mt-2 w-full text-gray-800"
        >
          ফিরে যান
        </Link>
      </form>
    </main>
  );
};

export default UpdateProfilePage;

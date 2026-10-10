
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";


const AuthButtons = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();


  const [dropdownOpen, setDropdownOpen] = useState(false);


  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );
  const [loading, setLoading] = useState(false);

  const showToast = (text: string, type: "success" | "error") => {
    setMessageType(type);
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        showToast(error.message || "Logout ব্যর্থ হয়েছে", "error");
        return;
      }

      showToast("Logout সফল হয়েছে!", "success");

      setTimeout(() => {
        router.push("/signin");
        router.refresh();
      }, 2000);
    } catch {
      showToast("Logout ব্যর্থ হয়েছে। আবার চেষ্টা করো।", "error");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return <div className="skeleton h-10 w-32" />;
  }

  return (
    <div className="flex items-center gap-2">
      {message && (
        <div
          role="alert"
          className={`fixed right-4 top-4 z-[9999] rounded-lg px-5 py-3 text-white shadow-lg ${messageType === "success" ? "bg-green-600" : "bg-red-600"
            }`}
        >
          {message}
        </div>
      )}



      {session ? (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white p-1.5 pr-3 shadow-sm hover:bg-gray-50"
            aria-expanded={dropdownOpen}
            aria-label="প্রোফাইল মেনু"
          >
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-700 font-bold text-white">
                {session.user.name?.charAt(0).toUpperCase() || "B"}
              </span>
            )}

            <span className="text-sm font-medium text-gray-700">
              {session.user.name || "BIDD App"}
            </span>

            <span className="text-gray-500">⌄</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
              <div className="border-b border-gray-100 px-3 py-2">
                <p className="truncate font-semibold text-gray-800">
                  {session.user.name || "BIDD App"}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {session.user.email}
                </p>
              </div>

              <Link
                href="/profile"
                onClick={() => setDropdownOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                👤 আমার প্রোফাইল
              </Link>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  handleLogout();
                }}
                disabled={loading}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                {loading ? "লগ আউট হচ্ছে..." : "↪ লগ আউট"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <Link href="/signin" className="btn btn-sm sm:btn-md">
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="btn btn-primary btn-sm text-white sm:btn-md"
          >
            সাইন আপ
          </Link>
        </>
      )}


    </div>
  );
};

export default AuthButtons;

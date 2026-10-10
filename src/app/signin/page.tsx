"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("error");

  const showToast = (text: string, type: "success" | "error") => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const email = (form.get("email") as string).trim();
    const password = form.get("password") as string;

    if (!email || !password) {
      showToast("Email ও Password দিতে হবে", "error");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        showToast(error.message || "Login ব্যর্থ হয়েছে", "error");
        return;
      }

      showToast("Login সফল হয়েছে!", "success");

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1500);
    } catch {
      showToast("Login ব্যর্থ হয়েছে। আবার চেষ্টা করো।", "error");
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = async (provider: "google" | "github") => {
    if (loading || socialLoading) return;

    setSocialLoading(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      console.log(`${provider} social login result:`, result);

      if (result.error) {
        console.error(`${provider} login error:`, result.error);
        showToast(
          result.error.message || `${provider} Login ব্যর্থ হয়েছে`,
          "error"
        );
        setSocialLoading(null);
      }
    } catch (error) {
      console.error(`${provider} social login exception:`, error);
      showToast("Social Login ব্যর্থ হয়েছে। Console দেখো।", "error");
      setSocialLoading(null);
    }
  };


  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-base-200 p-4">
      {message && (
        <div
          role="alert"
          className={`fixed right-4 top-4 z-[9999] rounded-lg px-5 py-3 text-white shadow-lg ${messageType === "success" ? "bg-green-600" : "bg-red-600"
            }`}
        >
          {message}
        </div>
      )}

      <form
        onSubmit={handleSignIn}
        className="card w-full max-w-md bg-base-100 shadow-xl"
      >
        <div className="card-body">
          <h1 className="text-center text-3xl font-bold">Login</h1>

          <label className="form-control">
            <span className="label-text mb-2">Email</span>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              required
            />
          </label>

          <label className="form-control mt-3">
            <span className="label-text mb-2">Password</span>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />
          </label>

          <button
            type="submit"
            className="btn btn-success mt-4 text-white"
            disabled={loading || socialLoading !== null}
          >
            {loading ? "অপেক্ষা করো..." : "Login"}
          </button>

          <div className="divider">অথবা</div>

          <button
            type="button"
            className="btn btn-outline"
            disabled={loading || socialLoading !== null}
            onClick={() => socialLogin("google")}
          >
            {socialLoading === "google"
              ? "অপেক্ষা করো..."
              : "Continue with Google"}
          </button>

          <button
            type="button"
            className="btn btn-outline"
            disabled={loading || socialLoading !== null}
            onClick={() => socialLogin("github")}
          >
            {socialLoading === "github"
              ? "অপেক্ষা করো..."
              : "Continue with GitHub"}
          </button>

          <p className="mt-3 text-center text-sm">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="link link-success">
              Register
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}

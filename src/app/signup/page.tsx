
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = (form.get("name") as string).trim();
    const email = (form.get("email") as string).trim();
    const password = form.get("password") as string;

    if (!name || !email || !password) {
      showToast("সবগুলো ঘর পূরণ করো");
      return;
    }

    if (password.length < 8) {
      showToast("Password কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        showToast(error.message || "Registration ব্যর্থ হয়েছে");
        return;
      }

      showToast("Registration সফল হয়েছে!");
      setTimeout(() => {
        router.push("/signin");
      }, 2500);


    } catch {
      showToast("Registration ব্যর্থ হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = async (provider: "google" | "github") => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch {
      showToast("Social Login ব্যর্থ হয়েছে");
    }
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-base-200 p-4">
      {message && (
        <div
          role="alert"
          className="fixed right-4 top-4 z-[9999] rounded-lg bg-red-600 px-5 py-3 text-white shadow-lg"
        >
          {message}
        </div>
      )}

      <form
        onSubmit={handleSignUp}
        className="card w-full max-w-md bg-base-100 shadow-xl"
      >
        <div className="card-body">
          <h1 className="text-center text-3xl font-bold">Sign Up</h1>

          <label className="form-control">
            <span className="label-text mb-2">Name</span>
            <input
              name="name"
              type="text"
              placeholder="তোমার নাম"
              className="input input-bordered w-full"
              required
            />
          </label>

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

          <label className="form-control">
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
            className="btn btn-success mt-3 text-white"
            disabled={loading}
          >
            {loading ? "অপেক্ষা করো..." : "Register"}
          </button>

          <div className="divider">অথবা</div>

          <button
            type="button"
            className="btn btn-outline"
            onClick={() => socialLogin("google")}
          >
            Continue with Google
          </button>

          <button
            type="button"
            className="btn btn-outline"
            onClick={() => socialLogin("github")}
          >
            Continue with GitHub
          </button>

          <p className="mt-3 text-center text-sm">
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="link link-success">
              Login
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}

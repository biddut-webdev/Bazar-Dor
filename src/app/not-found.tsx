import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#eff4ef] px-4">
      <div className="max-w-md text-center">
        <p className="text-8xl font-extrabold text-green-700">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="mt-3 text-gray-500">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
        </p>

        <Link
          href="/"
          className="btn btn-primary mt-6 text-white"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
};

export default NotFound;

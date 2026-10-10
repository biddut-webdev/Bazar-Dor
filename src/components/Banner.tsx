
import Image from "next/image";
import Link from "next/link";
import BanLogo from "../../public/bazar-hero.png";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="px-4 py-5 sm:py-8">
      <div className="mx-auto grid max-w-6xl items-center gap-6 rounded-3xl bg-white px-4 py-6 sm:px-6 md:grid-cols-2 md:gap-8 md:px-8 lg:gap-12">
        {/* Left Content */}
        <div>
          <p className="mb-4 inline-block rounded-sm bg-green-50 px-3 py-2 text-sm font-medium text-green-700">
            {date}
          </p>

          <p className="mb-3 text-sm font-semibold text-green-700">
            আজকের বাজার দর
          </p>

          <h1 className="text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-4 text-base-content/70 sm:mt-5 sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="#সব-পণ্য"
            className="btn btn-primary btn-sm mt-6 sm:btn-md sm:mt-7"
          >
            সব পণ্য দেখুন →
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72 md:h-80 lg:h-96">
          <Image
            src={BanLogo}
            alt="আজকের বাজার দর"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;

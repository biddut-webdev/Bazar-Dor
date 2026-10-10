
import Image from "next/image";
import logo from "../../public/logo-icon.png";
import Marquee from "./Marquee";

import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";


const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <Image
            src={logo}
            alt="Nav logo"
            width={40}
            height={40}
            className="rounded-md bg-green-700 p-2"
          />

          <div>
            <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
              বাজার দর
            </h2>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </div>

        <AuthButtons />
      </div>

      <div className="mx-auto max-w-6xl px-2">
        <NavLinks />
      </div>

      <Marquee />
    </header>
  );
};

export default Navbar;

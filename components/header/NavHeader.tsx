import Link from "next/link";
import { List } from "phosphor-react";
import { AnimatePresence } from "framer-motion";
import PopUpHeader from "./PopUpHeader";
import { useHeaderPopUp } from "../../store";
import NavLink from "./NavLink";
import { useRouter } from "next/router";

const NavHeader = () => {
  const { show, toggle } = useHeaderPopUp();
  const { route } = useRouter();

  const pages = [
    { label: "GALLERY", link: "/#gallery" },
    { label: "ABOUT", link: "/about" },
    { label: "CONTACT", link: "/contact" },
  ];

  const popUpNavPages = [{ label: "HOME", link: "/" }, ...pages];

  return (
    <>
      <div
        className={`w-full flex items-center justify-between ${
          show && "opacity-0"
        }`}
      >
        <h1 className="text-2xl font-bold">
          <Link href="/">CLARA EIZAYAGA</Link>
        </h1>
        <nav className="hidden md:block md:py-2">
          <ul className="md:flex items-center gap-4">
            {pages.map(({ label, link }, ii) => (
              <li key={ii} className="inline">
                <NavLink current={route == link} link={link} label={label} />
              </li>
            ))}
          </ul>
        </nav>
        <div
          className="md:hidden cursor-pointer hover:bg-neutral-600/20 rounded-md p-1 transition-colors"
          onClick={toggle}
        >
          <List size={32} />
        </div>
      </div>
      <AnimatePresence>
        {show && <PopUpHeader togglePopUpNav={toggle} pages={popUpNavPages} />}
      </AnimatePresence>
    </>
  );
};

export default NavHeader;

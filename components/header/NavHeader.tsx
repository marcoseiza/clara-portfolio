import Link from "next/link";

const NavHeader = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">
        <Link href="/">CLARA EIZAYAGA</Link>
      </h1>
      <nav className="flex items-center gap-4">
        <Link href="/#gallery">GALLERY</Link>
        <Link href="/about">ABOUT</Link>
        <Link href="/contact">CONTACT</Link>
      </nav>
    </>
  );
};

export default NavHeader;

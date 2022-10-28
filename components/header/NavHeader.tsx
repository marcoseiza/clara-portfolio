const NavHeader = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">
        <a href="/">CLARA EIZAYAGA</a>
      </h1>
      <nav className="flex items-center gap-4">
        <a href="/#gallery">GALLERY</a>
        <a href="/about">ABOUT</a>
        <a href="/contact">CONTACT</a>
      </nav>
    </>
  );
};

export default NavHeader;

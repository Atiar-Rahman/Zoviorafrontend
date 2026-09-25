const Navbar = ({ onMenu }) => (
  <header className="flex h-20 items-center justify-between border-b border-gray-100 bg-white px-5 sm:px-8">
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={onMenu}
        className="text-xl cursor-pointer px-3 py-2 text-gray-600 lg:hidden"
        aria-label="Open navigation"
      >
        ☰
      </button>
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#b85b32]">
          Workspace
        </p>
        <h1 className="mt-1 text-sm font-medium text-[#181818]">Overview</h1>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <button
        type="button"
        className="relative text-lg text-gray-500"
        aria-label="Notifications"
      >
        ♧
        <span className="absolute -right-1 top-0 h-1.5 w-1.5 rounded-full bg-[#b85b32]" />
      </button>
      <div className="hidden h-7 w-px bg-gray-100 sm:block" />
      <p className="hidden text-xs text-gray-500 sm:block">
        Good morning, Admin
      </p>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#efe7df] text-xs font-semibold text-[#b85b32]">
        Md
      </div>
    </div>
  </header>
);
export default Navbar;

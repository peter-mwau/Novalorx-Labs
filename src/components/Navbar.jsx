import React, { useState } from "react";

function Navbar({ activeSection, setActiveSection }) {
  const menuItems = [
    { label: "Home", section: "hero" },
    { label: "About", section: "about" },
    { label: "Services", section: "services" },
    { label: "Projects", section: "projects" },
    { label: "Team", section: "team" },
    { label: "Contact", section: "contacts" },
  ];

  const navigate = (section) => {
    setActiveSection(section);
  };

  return (
    <nav className="relative z-50 px-8 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <button
          type="button"
          onClick={() => navigate("hero")}
          className="flex gap-3 items-center text-white"
        >
          <img src="/Novalorx Logo.svg" alt="Logo" className="h-24 w-40" />
        </button>

        {/* Desktop menu */}
        <ul className="hidden lg:flex gap-10">
          {menuItems.map((item) => (
            <li key={item.section}>
              <button
                type="button"
                onClick={() => navigate(item.section)}
                className={`text-lg font-normal uppercase tracking-widest transition ${activeSection === item.section
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile menu */}
        <MobileMenu
          menuItems={menuItems}
          activeSection={activeSection}
          onNavigate={navigate}
        />
      </div>
    </nav>
  );
}

function MobileMenu({ menuItems, activeSection, onNavigate }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="p-2 text-white"
      >
        ☰
      </button>

      {open && (
        <div className="absolute right-0 mt-12 w-56 backdrop-blur-md bg-black/70 border border-white/20 rounded-lg shadow-lg shadow-black/30 p-3">
          {/* top center SVG */}
          <div className="flex justify-center mb-2">
            {/* adjust w-12 h-12 for size */}
            <div className="w-12 h-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64"><path fill="#fff" d="M62 23.012H39.082L32 2l-7.08 21.012H2L20.541 36l-7.082 21.01L32 44.023L50.541 57.01L43.459 36z"/><path fill="#fff" d="M46.234 20.344L50.16 8.857l-10.439 7.211l1.461 4.276zM27.912 50.035L32 62l4.09-11.965L32 47.211zM50.68 34.307l-3.825 2.642l1.624 4.752h12.904zM24.277 16.068L13.84 8.857l3.926 11.487h5.052zM13.32 34.307L2.617 41.701H15.52l1.625-4.752z"/></svg>
              
            </div>
          </div>

          <div className="w-36 h-px bg-white/80 mx-auto mt-4 mb-4" />

          {/* menu items */}
          <div className="flex flex-col">
            {menuItems.map((item) => (
              <button
                key={item.section}
                type="button"
                onClick={() => {
                  onNavigate(item.section);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2 text-center ${activeSection === item.section ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/5"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="w-36 h-px bg-white/80 mx-auto mt-4 mb-4" />

        </div>

      )}
    </div>
  );
}

export default Navbar;

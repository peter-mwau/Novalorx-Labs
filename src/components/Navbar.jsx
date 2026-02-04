import React, { useState } from "react";

function Navbar({ activeSection, setActiveSection }) {
  const menuItems = [
    { label: "Home", section: "hero" },
    { label: "Services", section: "services" },
    { label: "Projects", section: "projects" },
    { label: "Team", section: "team" },
    { label: "Contact", section: "contacts" },
  ];

  const navigate = (section) => {
    setActiveSection(section);
  };

  return (
    <nav className="relative z-50 px-8 py-2 backdrop-blur-sm border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <button
          type="button"
          onClick={() => navigate("hero")}
          className="flex gap-3 items-center text-white"
        >
          <img src="/Novalorx Logo.svg" alt="Logo" className="h-32 w-40" />
        </button>

        {/* Desktop menu */}
        <ul className="hidden lg:flex gap-10">
          {menuItems.map((item) => (
            <li key={item.section}>
              <button
                type="button"
                onClick={() => navigate(item.section)}
                className={`text-lg font-normal uppercase tracking-widest transition ${
                  activeSection === item.section
                    ? "text-white"
                    : "text-gray-500 hover:text-white"
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
        <div className="absolute right-0 mt-2 w-56 bg-black/10 border border-white/10 rounded-lg">
          {menuItems.map((item) => (
            <button
              key={item.section}
              type="button"
              onClick={() => {
                onNavigate(item.section);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left ${
                activeSection === item.section
                  ? "bg-white/10 text-white"
                  : "text-white/80 hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;

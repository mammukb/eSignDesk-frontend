"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <nav className="bg-green-700 shadow-lg px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-2xl">eSignDesk</div>
        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
        {/* Desktop menu */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-9">
          {/* Dropdown Button */}
          <div className="relative">
            <button
              className="text-white text-xl hover:underline flex items-center gap-1"
              onClick={() => setDropdownOpen((prev) => !prev)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
            >
              Manage
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-44 bg-white rounded shadow-lg z-20">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => { setDropdownOpen(false); router.push("/admin/manage-student"); }}
                >
                  Manage Student
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => { setDropdownOpen(false); router.push("/admin/manage-staff"); }}
                >
                  Manage Staff
                </button>
                  {/* <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => { setDropdownOpen(false); router.push("/admin/manage-department"); }}
                >
                  Manage Department
                </button> */}
              </div>
            )}
          </div>
          {/* Form Template Button */}
          <button
            className="text-white text-xl hover:underline"
            onClick={() => router.push("/admin/form-template")}
          >
            Form Template
          </button>
        </div>
        {/* Logout Button */}
        <div className="hidden md:flex">
          <button
            onClick={handleLogout}
            className="bg-white text-green-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors ml-4"
          >
            Logout
          </button>
        </div>
      </div>
      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2 items-center px-2">
          {/* Dropdown for mobile */}
          <div className="w-full">
            <button
              className="text-white text-lg py-2 px-2 w-full text-left hover:underline flex items-center justify-between"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              Manage
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="ml-4">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 bg-white hover:bg-gray-100"
                  onClick={() => { setDropdownOpen(false); setMenuOpen(false); router.push("/admin/manage-student"); }}
                >
                  Manage Student
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 bg-white hover:bg-gray-100"
                  onClick={() => { setDropdownOpen(false); setMenuOpen(false); router.push("/admin/manage-staff"); }}
                >
                  Manage Staff
                </button>
              </div>
            )}
          </div>
          <button
            className="text-white text-lg py-2 px-2 w-full text-left hover:underline"
            onClick={() => { setMenuOpen(false); router.push("/admin/form-template"); }}
          >
            Form Template
          </button>
          <button
            onClick={() => { setMenuOpen(false); handleLogout(); }}
            className="bg-white text-green-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors w-full text-left mt-2"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
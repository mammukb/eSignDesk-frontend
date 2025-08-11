"use client";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-red-600 font-bold text-2xl">eSignDesk</div>
        {pathname !== "/login" && (
          <button
            onClick={handleLoginClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 hover:cursor-pointer"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

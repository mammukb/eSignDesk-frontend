"use client";
import AdminNavbar from "../../components/AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-black " >
      <AdminNavbar />
      <main>{children}</main>
    </div>
  );
}
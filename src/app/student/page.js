"use client";

import Navbar from "@/components/AdminNavbar";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Add student dashboard content here */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            My Documents
          </h3>
          <p className="text-3xl font-bold text-blue-600">45</p>
          <p className="text-sm text-gray-600">5 pending signatures</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Team Documents
          </h3>
          <p className="text-3xl font-bold text-green-600">128</p>
          <p className="text-sm text-gray-600">12 require attention</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Completed Today
          </h3>
          <p className="text-3xl font-bold text-purple-600">8</p>
          <p className="text-sm text-gray-600">Documents processed</p>
        </div>
      </div>
    </div>
  );
}

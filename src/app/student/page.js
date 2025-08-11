"use client";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Student Navbar */}
      <nav className="bg-green-700 shadow-lg px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-2xl">eSignDesk Student</div>
          <div className="flex items-center space-x-4">
            <span className="text-white text-sm">Welcome, Student</span>
            <button
              onClick={handleLogout}
              className="bg-white text-green-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Student Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Student Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              My Documents
            </h3>
            <p className="text-3xl font-bold text-green-600">12</p>
            <p className="text-sm text-gray-600">3 pending signatures</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Completed
            </h3>
            <p className="text-3xl font-bold text-blue-600">9</p>
            <p className="text-sm text-gray-600">Documents signed</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Due Soon
            </h3>
            <p className="text-3xl font-bold text-orange-600">2</p>
            <p className="text-sm text-gray-600">Requires attention</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Documents */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Pending Documents
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4 py-3 bg-red-50 rounded-r">
                <p className="text-sm font-medium text-gray-800">
                  Course Registration Form
                </p>
                <p className="text-xs text-gray-600">
                  Due: Today • Priority: High
                </p>
                <button className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors">
                  Sign Now
                </button>
              </div>
              <div className="border-l-4 border-orange-500 pl-4 py-3 bg-orange-50 rounded-r">
                <p className="text-sm font-medium text-gray-800">
                  Financial Aid Agreement
                </p>
                <p className="text-xs text-gray-600">
                  Due: Tomorrow • Priority: Medium
                </p>
                <button className="mt-2 bg-orange-600 text-white px-3 py-1 rounded text-xs hover:bg-orange-700 transition-colors">
                  Review
                </button>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded-r">
                <p className="text-sm font-medium text-gray-800">
                  Student Handbook Acknowledgment
                </p>
                <p className="text-xs text-gray-600">
                  Due: Friday • Priority: Low
                </p>
                <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                  Read & Sign
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                View My Documents
              </button>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Download Forms
              </button>
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                Academic Calendar
              </button>
              <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Course Registration Form signed
                  </p>
                  <p className="text-xs text-gray-600">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    New document received: Financial Aid Agreement
                  </p>
                  <p className="text-xs text-gray-600">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Student Handbook acknowledgment completed
                  </p>
                  <p className="text-xs text-gray-600">3 days ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Account profile updated
                  </p>
                  <p className="text-xs text-gray-600">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Academic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Current Semester
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Semester:</span> Fall 2024
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Status:</span>{" "}
                  <span className="text-green-600">Active</span>
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Credits:</span> 15
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Important Dates
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Registration Deadline:</span>{" "}
                  Dec 20, 2024
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Payment Due:</span> Dec 25, 2024
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Classes Start:</span> Jan 15,
                  2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

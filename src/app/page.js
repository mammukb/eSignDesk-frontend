import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Latest News Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Latest News</h2>
          <div className="relative">
            <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
              <div className="bg-white rounded-full shadow-md p-6 hover:shadow-lg transition-shadow min-w-[300px] flex-shrink-0">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    New eSignature Features Released
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    We&apos;ve just launched advanced digital signature
                    capabilities with enhanced security protocols.
                  </p>
                  <span className="text-sm text-blue-600 font-medium block mb-3">
                    December 15, 2024
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
                    Download PDF
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-full shadow-md p-6 hover:shadow-lg transition-shadow min-w-[300px] flex-shrink-0">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Mobile App Update Available
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Our mobile application now supports offline document signing
                    and improved user interface.
                  </p>
                  <span className="text-sm text-blue-600 font-medium block mb-3">
                    December 12, 2024
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
                    Download PDF
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-full shadow-md p-6 hover:shadow-lg transition-shadow min-w-[300px] flex-shrink-0">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Security Enhancement Announcement
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Enhanced encryption standards implemented across all
                    eSignDesk platforms for better data protection.
                  </p>
                  <span className="text-sm text-blue-600 font-medium block mb-3">
                    December 10, 2024
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
                    Download PDF
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-full shadow-md p-6 hover:shadow-lg transition-shadow min-w-[300px] flex-shrink-0">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    API Integration Launch
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    New REST API endpoints now available for seamless
                    integration with your existing systems.
                  </p>
                  <span className="text-sm text-blue-600 font-medium block mb-3">
                    December 5, 2024
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
                    Download PDF
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-full shadow-md p-6 hover:shadow-lg transition-shadow min-w-[300px] flex-shrink-0">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    User Dashboard Redesign
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Completely redesigned user dashboard with improved
                    navigation and analytics features.
                  </p>
                  <span className="text-sm text-blue-600 font-medium block mb-3">
                    November 28, 2024
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Previous News Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Previous News
          </h2>
          <div className="relative">
            <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
              <div className="bg-white rounded-full shadow-md p-6 hover:shadow-lg transition-shadow min-w-[300px] flex-shrink-0">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Enterprise Plan Launch
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    New enterprise-level subscription plans with advanced
                    features and dedicated support.
                  </p>
                  <span className="text-sm text-blue-600 font-medium block mb-3">
                    November 20, 2024
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
                    Download PDF
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-full shadow-md p-6 hover:shadow-lg transition-shadow min-w-[300px] flex-shrink-0">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Multi-language Support
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    eSignDesk now supports 15 different languages for global
                    accessibility.
                  </p>
                  <span className="text-sm text-blue-600 font-medium block mb-3">
                    November 15, 2024
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
                    Download PDF
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-full shadow-md p-6 hover:shadow-lg transition-shadow min-w-[300px] flex-shrink-0">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Cloud Storage Integration
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Direct integration with Google Drive, Dropbox, and OneDrive
                    for seamless document management.
                  </p>
                  <span className="text-sm text-blue-600 font-medium block mb-3">
                    November 8, 2024
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
                    Download PDF
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-full shadow-md p-6 hover:shadow-lg transition-shadow min-w-[300px] flex-shrink-0">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Performance Optimization
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Significant performance improvements with 50% faster
                    document processing times.
                  </p>
                  <span className="text-sm text-blue-600 font-medium block mb-3">
                    November 1, 2024
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
                    Download PDF
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-full shadow-md p-6 hover:shadow-lg transition-shadow min-w-[300px] flex-shrink-0">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Security Framework Update
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Enhanced security protocols and compliance standards
                    implemented across all platforms.
                  </p>
                  <span className="text-sm text-blue-600 font-medium block mb-3">
                    October 25, 2024
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
                    Download PDF
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-full shadow-md p-6 hover:shadow-lg transition-shadow min-w-[300px] flex-shrink-0">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Mobile App Beta Release
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Beta version of our mobile application now available for
                    testing with new features.
                  </p>
                  <span className="text-sm text-blue-600 font-medium block mb-3">
                    October 18, 2024
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

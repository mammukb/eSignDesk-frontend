import React from "react";
import StudentNavbar from "@/components/AdminNavbar";
import Image from "next/image";

function page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNavbar />
      <div className="flex flex-row gap-10 mt-10">
        <div className="ml-10">
          <button className=" flex items-center gap-3 cursor-pointer hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors text-lg">
            <Image
              src="/iconform.webp" // Make sure this image exists in your public folder as public/iconform.png
              alt="Request Letter Icon"
              // className="w-7 h-7"
              width={200}
              height={200}
            />
          </button>
          <span className="text-gray-700 text-lg mt-4">Request Letter</span>
        </div>
        <div>
          <button className="flex items-center gap-3 cursor-pointer hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors text-lg">
            <Image
              src="/iconform.webp" // Make sure this image exists in your public folder as public/iconform.png
              alt="Request Letter Icon"
              // className="w-7 h-7"
              width={200}
              height={200}
            />
          </button>
          <span className="text-gray-700 text-lg mt-4">Request Letter</span>
        </div>
        <div>
          <button className="flex items-center gap-3 cursor-pointer hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors text-lg">
            <Image
              src="/iconform.webp" // Make sure this image exists in your public folder as public/iconform.png
              alt="Request Letter Icon"
              // className="w-7 h-7"
              width={200}
              height={200}
            />
          </button>
          <span className="text-gray-700 text-lg mt-4">Request Letter</span>
        </div>
        <div>
          <button className="flex items-center gap-3 cursor-pointer hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors text-lg">
            <Image
              src="/iconform.webp" // Make sure this image exists in your public folder as public/iconform.png
              alt="Request Letter Icon"
              // className="w-7 h-7"
              width={200}
              height={200}
            />
          </button>
          <span className="text-gray-700 text-lg mt-4">Request Letter</span>
        </div>
      </div>
    </div>
  );
}

export default page;

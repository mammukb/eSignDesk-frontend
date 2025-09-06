"use client";

import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import Image from "next/image";

const API_URL = "http://localhost:8000/api/staff/";

function ManageStaffPage() {
  const [staffList, setStaffList] = useState([]);
  const [formData, setFormData] = useState({
    staffid: "",
    name: "",
    email: "",
    password: "",
    designation: "",
    department: "",
  });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStaff, setFilteredStaff] = useState([]);
  const fileInputRef = useRef(null);

  // Fetch staff
  const fetchStaff = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setStaffList(data);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Search filter
  useEffect(() => {
    if (!searchTerm) {
      setFilteredStaff(staffList);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredStaff(
        staffList.filter(
          (s) =>
            (s.staffid && s.staffid.toLowerCase().includes(term)) ||
            (s.name && s.name.toLowerCase().includes(term)) ||
            (s.email && s.email.toLowerCase().includes(term))
        )
      );
    }
  }, [searchTerm, staffList]);

  // Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add staff
  const handleAdd = async () => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      fetchStaff();
      setFormData({
        staffid: "",
        name: "",
        email: "",
        password: "",
        designation: "",
        department: "",
      });
    }
  };

  // Save edit
  const handleSaveEdit = async (id) => {
    const res = await fetch(`${API_URL}${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    if (res.ok) {
      fetchStaff();
      setEditId(null);
      setEditData({});
    }
  };

  // Delete
  const handleDelete = async (id) => {
    const res = await fetch(`${API_URL}${id}/`, { method: "DELETE" });
    if (res.ok) fetchStaff();
  };

  // Import Excel
  const handleImportExcel = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet);

      for (const staff of excelData) {
        try {
          await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(staff),
          });
        } catch (err) {
          console.error("Error importing staff:", err);
        }
      }
      fetchStaff();
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Staff</h2>

      {/* Search */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by Staff ID, Name, or Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-64"
        />
        <button
          onClick={() => setSearchTerm("")}
          className="bg-gray-300 text-gray-700 px-3 py-2 rounded hover:bg-gray-400"
        >
          Clear
        </button>
      </div>

      {/* Add & Import */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            type={key === "password" ? "password" : "text"}
            name={key}
            placeholder={key}
            value={formData[key]}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
        ))}
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 col-span-1"
        >
          Add Staff
        </button>
        <input
          type="file"
          accept=".xlsx, .xls"
          ref={fileInputRef}
          onChange={handleImportExcel}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-1"
        >
          Import Excel
        </button>
      </div>

      {/* Staff Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="px-3 py-2 border">Staff ID</th>
              <th className="px-3 py-2 border">Name</th>
              <th className="px-3 py-2 border">Email</th>
              <th className="px-3 py-2 border">Password</th>
              <th className="px-3 py-2 border">Designation</th>
              <th className="px-3 py-2 border">Department</th>
              <th className="px-3 py-2 border">Signature</th>
              <th className="px-3 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No record found
                </td>
              </tr>
            ) : (
              filteredStaff.map((staff) =>
                editId === staff.staffid ? (
                  <tr key={staff.staffid} className="bg-yellow-50">
                    {/* Staff ID */}
                    <td className="border px-2 py-1">
                      <input
                        value={editData.staffid}
                        onChange={(e) =>
                          setEditData({ ...editData, staffid: e.target.value })
                        }
                        className="border rounded px-1 py-0.5"
                      />
                    </td>
                    {/* Name */}
                    <td className="border px-2 py-1">
                      <input
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        className="border rounded px-1 py-0.5"
                      />
                    </td>
                    {/* Email */}
                    <td className="border px-2 py-1">
                      <input
                        value={editData.email}
                        onChange={(e) =>
                          setEditData({ ...editData, email: e.target.value })
                        }
                        className="border rounded px-1 py-0.5"
                      />
                    </td>
                    {/* Password */}
                    <td className="border px-2 py-1">
                      <input
                        type="password"
                        value={editData.password}
                        onChange={(e) =>
                          setEditData({ ...editData, password: e.target.value })
                        }
                        className="border rounded px-1 py-0.5"
                      />
                    </td>
                    {/* Designation */}
                    <td className="border px-2 py-1">
                      <input
                        value={editData.designation}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            designation: e.target.value,
                          })
                        }
                        className="border rounded px-1 py-0.5"
                      />
                    </td>
                    {/* Department */}
                    <td className="border px-2 py-1">
                      <input
                        value={editData.department}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            department: e.target.value,
                          })
                        }
                        className="border rounded px-1 py-0.5"
                      />
                    </td>
                    {/* Signature */}
                    {/* Signature */}
                    {/* Signature */}
                    <td className="border px-2 py-1">
                      {editData.signature_imageurl ? (
                        <Image
                          src={editData.signature_imageurl}
                          alt="Signature"
                          width={50}
                          height={30}
                          className="h-8 w-auto"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>

                    {/* Actions */}
                    <td className="border px-2 py-1 flex gap-2">
                      <button
                        onClick={() => handleSaveEdit(editData.staffid)}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={staff.staffid}>
                    <td className="border px-2 py-1">{staff.staffid}</td>
                    <td className="border px-2 py-1">{staff.name}</td>
                    <td className="border px-2 py-1">{staff.email}</td>
                    <td className="border px-2 py-1">
                      {"*".repeat(staff.password?.length || 0)}
                    </td>
                    <td className="border px-2 py-1">{staff.designation}</td>
                    <td className="border px-2 py-1">{staff.department}</td>
                    {/* Signature */}
                    <td className="border px-2 py-1">
                      {staff.signature_imageurl ? (
                        <Image
                          src={staff.signature_imageurl}
                          alt="Signature"
                          width={50}
                          height={30}
                          className="h-8 w-auto"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>

                    <td className="border px-2 py-1 flex gap-2">
                      <button
                        onClick={() => {
                          setEditId(staff.staffid);
                          setEditData({ ...staff });
                        }}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(staff.staffid)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageStaffPage;

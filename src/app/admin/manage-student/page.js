"use client";
import React, { useRef, useState, useEffect } from "react";
import * as XLSX from "xlsx";

const API_URL = "http://localhost:8000/api/students/";

function ManageStudentPage() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    regno: "",
    email: "",
    course: "",
    year: "",
    phone_no: "",
    password: "",
  });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const fileInputRef = useRef(null);
  const [serialno, setSerialno] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(
        students.filter((student) => {
          const term = searchTerm.toLowerCase();
          return (
            (student.regno && student.regno.toLowerCase().includes(term)) ||
            (student.name && student.name.toLowerCase().includes(term)) ||
            (student.email && student.email.toLowerCase().includes(term))
          );
        })
      );
    }
  }, [searchTerm, students]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add student
  const handleAddStudent = async () => {
    if (!formData.regno || !formData.password) {
      alert("Reg No and Password are required");
      return;
    }
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchStudents();
        setFormData({
          name: "",
          regno: "",
          email: "",
          course: "",
          year: "",
          phone_no: "",
          password: "",
        });
      }
    } catch (err) {
      console.error("Error adding student:", err);
    }
  };

  // Edit student
  const handleSaveEdit = async (id) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (res.ok) {
        fetchStudents();
        setEditId(null);
        setEditData({});
      }
    } catch (err) {
      console.error("Error editing student:", err);
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchStudents();
      }
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  // Import Excel handler
  const handleImportExcel = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(
        event.target && event.target.result ? event.target.result : null
      );
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet);

      // Send each student to backend
      for (const student of excelData) {
        try {
          await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student),
          });
        } catch (err) {
          console.error("Error importing student:", err);
        }
      }
      fetchStudents();
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Students</h2>

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by Reg No, Name, or Email"
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

      {/* Add Student Form */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            type={key === "password" ? "password" : "text"}
            name={key}
            placeholder={
              key.charAt(0).toUpperCase() + key.replace("_", " ").slice(1)
            }
            value={formData[key]}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
        ))}
        <button
          onClick={handleAddStudent}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 col-span-2"
        >
          Add Student
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-2"
        >
          Import Excel
        </button>
      </div>

      {/* Student Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              {/* <th className="px-3 py-2 border">No</th> */}
              <th className="px-3 py-2 border">Name</th>
              <th className="px-3 py-2 border">Reg No</th>
              <th className="px-3 py-2 border">Email</th>
              <th className="px-3 py-2 border">Course</th>
              <th className="px-3 py-2 border">Year</th>
              <th className="px-3 py-2 border">Phone No</th>
              <th className="px-3 py-2 border">Password</th>
              <th className="px-3 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
  {filteredStudents.length === 0 ? (
    <tr>
      <td colSpan={8} className="text-center py-6 text-gray-500">
        No record found
      </td>
    </tr>
  ) : (
    <>
      {filteredStudents.map((student) =>
        editId === (student._id || student.id) ? (
          <tr key={student._id || student.id} className="bg-yellow-50">
            {Object.keys(formData).map((key) => (
              <td key={key} className="border px-2 py-1">
                <input
                  value={editData[key]}
                  onChange={(e) =>
                    setEditData({ ...editData, [key]: e.target.value })
                  }
                  className="border rounded px-1 py-0.5"
                />
              </td>
            ))}
            <td className="border px-2 py-1 flex gap-2">
              <button
                onClick={() => handleSaveEdit(editData["regno"])}
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
          <tr key={student._id || student.id}>
            <td className="border px-2 py-1">{student.name}</td>
            <td className="border px-2 py-1">{student.regno}</td>
            <td className="border px-2 py-1">{student.email}</td>
            <td className="border px-2 py-1">{student.course}</td>
            <td className="border px-2 py-1">{student.year}</td>
            <td className="border px-2 py-1">{student.phone_no}</td>
            <td className="border px-2 py-1">{student.password}</td>
            <td className="border px-2 py-1 flex gap-2">
              <button
                onClick={() => {
                  setEditId(student._id || student.id);
                  setEditData({ ...student });
                }}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(student.regno)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        )
      )}
    </>
  )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageStudentPage;

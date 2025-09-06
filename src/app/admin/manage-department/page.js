"use client";

import React, { useState, useRef, useEffect } from "react";

const API_URL = "http://localhost:8000/api/departments/";

function ManageDepartmentPage() {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    departname: "",
    code: "",
  });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const fileInputRef = useRef(null);

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setDepartments(data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredDepartments(departments);
    } else {
      setFilteredDepartments(
        departments.filter((dept) => {
          const term = searchTerm.toLowerCase();
          return (
            (dept.departname && dept.departname.toLowerCase().includes(term)) ||
            (dept.code && dept.code.toLowerCase().includes(term))
          );
        })
      );
    }
  }, [searchTerm, departments]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add department
  const handleAddDepartment = async () => {
    if (!formData.departname || !formData.code) return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchDepartments();
        setFormData({ departname: "", code: "" });
      }
    } catch (err) {
      console.error("Error adding department:", err);
    }
  };

  // Edit department
  const handleSaveEdit = async () => {
    try {
      const res = await fetch(`${API_URL}${editId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (res.ok) {
        fetchDepartments();
        setEditId(null);
        setEditData({});
      }
    } catch (err) {
      console.error("Error editing department:", err);
    }
  };

  // Delete department
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchDepartments();
      }
    } catch (err) {
      console.error("Error deleting department:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Departments</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          name="departname"
          placeholder="Department Name"
          value={formData.departname}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="code"
          placeholder="Department Code"
          value={formData.code}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <button
          onClick={handleAddDepartment}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Department
        </button>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button
          onClick={() => setSearchTerm("")}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Clear
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="px-3 py-2 border">Department Name</th>
              <th className="px-3 py-2 border">Code</th>
              <th className="px-3 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDepartments.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No record found
                </td>
              </tr>
            ) : (
              <>
                {filteredDepartments.map((dept) =>
                  editId === (dept._id || dept.id) ? (
                    <tr key={dept._id || dept.id} className="bg-yellow-50">
                      <td className="border px-2 py-1">
                        <input
                          value={editData.departname}
                          onChange={(e) =>
                            setEditData({ ...editData, departname: e.target.value })
                          }
                          className="border rounded px-1 py-0.5"
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          value={editData.code}
                          onChange={(e) =>
                            setEditData({ ...editData, code: e.target.value })
                          }
                          className="border rounded px-1 py-0.5"
                        />
                      </td>
                      <td className="border px-2 py-1 flex gap-2">
                        <button
                          onClick={handleSaveEdit}
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
                    <tr key={dept._id || dept.id}>
                      <td className="border px-2 py-1">{dept.departname}</td>
                      <td className="border px-2 py-1">{dept.code}</td>
                      <td className="border px-2 py-1 flex gap-2">
                        <button
                          onClick={() => {
                            setEditId(dept._id || dept.id);
                            setEditData({ ...dept });
                          }}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(dept._id || dept.id)}
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
  )
}

export default ManageDepartmentPage;
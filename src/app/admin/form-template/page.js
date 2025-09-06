"use client";
import React, { useState, useEffect } from "react";

function ManageFormPage() {
  const [formMeta, setFormMeta] = useState({
    title: "",
    issued_by: "",
    description: "",
  });

  const [fields, setFields] = useState([]);
  const [newField, setNewField] = useState({
    label: "",
    type: "text",
    required: false,
    options: "",
  });

  const [forms, setForms] = useState([]);
  const [editFormId, setEditFormId] = useState(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/forms/");
      const data = await res.json();
      setForms(data || []);
    } catch (err) {
      console.error("Error fetching forms:", err);
    }
  };

  // Normalizes options to an array (safe for strings/arrays/undefined)
  const normalizeOptions = (opts) => {
    if (!opts) return [];
    if (Array.isArray(opts)) return opts.filter(Boolean).map(String);
    if (typeof opts === "string") {
      return opts
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return [];
  };

  // Handle metadata change
  const handleMetaChange = (e) => {
    setFormMeta({ ...formMeta, [e.target.name]: e.target.value });
  };

  // Add field to current fields list
  const handleAddField = () => {
    if (!newField.label?.trim()) {
      alert("Field label required");
      return;
    }
    setFields([
      ...fields,
      {
        label: newField.label,
        type: newField.type,
        required: !!newField.required,
        options: newField.options || "",
      },
    ]);
    setNewField({ label: "", type: "text", required: false, options: "" });
  };

  // Delete field by index
  const handleDeleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  // Save or update form
  const handleSaveForm = async () => {
    if (!formMeta.title?.trim()) {
      alert("Form title is required");
      return;
    }

    const payload = {
      ...formMeta,
      fields: fields.map((f) => ({
        label: f.label || "",
        type: f.type || "text",
        required: !!f.required,
        // normalizeOptions ensures array when sending to backend
        options: normalizeOptions(f.options),
      })),
    };

    try {
      const url = editFormId
        ? `http://localhost:8000/api/forms/${editFormId}/`
        : "http://localhost:8000/api/forms/";
      const method = editFormId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert(editFormId ? "Form updated successfully!" : "Form saved successfully!");
        // reset UI
        setFormMeta({ title: "", issued_by: "", description: "" });
        setFields([]);
        setEditFormId(null);
        fetchForms();
      } else {
        const txt = await res.text();
        console.error("Save failed:", res.status, txt);
        alert("Save failed: " + res.status);
      }
    } catch (err) {
      console.error("Error saving form:", err);
      alert("Error saving form (see console).");
    }
  };

  // Start editing a saved form: convert options arrays to comma-strings for UI
  const handleEditForm = (form) => {
    setFormMeta({
      title: form.title || "",
      issued_by: form.issued_by || "",
      description: form.description || "",
    });

    const uiFields = (form.fields || []).map((f) => ({
      label: f.label || "",
      type: f.type || "text",
      required: !!f.required,
      // convert array -> comma string for the input; if already string, keep it
      options: Array.isArray(f.options) ? f.options.join(", ") : f.options || "",
    }));
    setFields(uiFields);
    // id might be _id or id depending on your API response
    setEditFormId(form._id || form.id || null);
  };

  // Delete form (server)
  const handleDeleteForm = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/forms/${id}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchForms();
      } else {
        console.error("Delete failed:", res.status);
      }
    } catch (err) {
      console.error("Error deleting form:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {editFormId ? "Edit Form" : "Create New Form"}
      </h2>

      {/* Form Meta */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          name="title"
          placeholder="Form Title"
          value={formMeta.title || ""}
          onChange={handleMetaChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="issued_by"
          placeholder="Issued By"
          value={formMeta.issued_by || ""}
          onChange={handleMetaChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Form Description"
          value={formMeta.description || ""}
          onChange={handleMetaChange}
          className="border rounded px-3 py-2"
        />
      </div>

      {/* Add Field */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Field Label"
          value={newField.label || ""}
          onChange={(e) => setNewField({ ...newField, label: e.target.value })}
          className="border rounded px-3 py-2"
        />
        <select
          value={newField.type || "text"}
          onChange={(e) => setNewField({ ...newField, type: e.target.value })}
          className="border rounded px-3 py-2"
        >
          <option value="text">Text</option>
          <option value="textarea">Textarea</option>
          <option value="radio">Radio</option>
          <option value="dropdown">Dropdown</option>
        </select>
        {["radio", "dropdown"].includes(newField.type) && (
          <input
            type="text"
            placeholder="Options (comma separated)"
            value={newField.options || ""}
            onChange={(e) =>
              setNewField({ ...newField, options: e.target.value })
            }
            className="border rounded px-3 py-2"
          />
        )}
        <div className="flex items-center gap-2">
          <label>
            <input
              type="checkbox"
              checked={!!newField.required}
              onChange={(e) =>
                setNewField({ ...newField, required: e.target.checked })
              }
            />{" "}
            Required
          </label>
          <button
            onClick={handleAddField}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Field
          </button>
        </div>
      </div>

      {/* Fields List */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Fields</h3>
        {fields.length === 0 ? (
          <p className="text-gray-500">No fields added yet</p>
        ) : (
          <ul className="list-disc pl-6">
            {fields.map((f, i) => (
              <li key={i} className="flex justify-between items-center mb-2">
                <span>
                  {f.label} ({f.type}){" "}
                  {f.required ? <b className="text-red-500">*</b> : ""}
                  {f.options && (
                    <span className="text-sm text-gray-600">
                      {" "}
                      [{Array.isArray(f.options) ? f.options.join(", ") : f.options}]
                    </span>
                  )}
                </span>
                <button
                  onClick={() => handleDeleteField(i)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Save Form */}
      <button
        onClick={handleSaveForm}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {editFormId ? "Update Form" : "Save Form"}
      </button>

      {/* Existing Forms */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Saved Forms</h3>
        {forms.length === 0 ? (
          <p className="text-gray-500">No forms available</p>
        ) : (
          <ul className="space-y-3">
            {forms.map((form) => (
              <li
                key={form._id || form.id}
                className="flex justify-between items-center border p-3 rounded"
              >
                <div>
                  <b>{form.title}</b> - {form.issued_by}
                  <p className="text-sm text-gray-500">{form.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditForm(form)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteForm(form._id || form.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ManageFormPage;

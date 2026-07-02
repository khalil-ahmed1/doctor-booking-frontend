import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createDoctor } from "../../services/adminService";

const AdminAddDoctor = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    specialization: "",
    qualification: "",
    experience: "",
    clinicName: "",
    clinicAddress: "",
    consultationFee: "",
    premiumFee: "",
    homeVisitFee: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createDoctor({
        ...formData,
        experience: Number(formData.experience),
        consultationFee: Number(formData.consultationFee),
        premiumFee: Number(formData.premiumFee),
        homeVisitFee: Number(formData.homeVisitFee),
      });

      toast.success("Doctor created successfully");

      navigate("/admin/doctors");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-700">Add Doctor</h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
          <input
            name="name"
            placeholder="Doctor Name"
            className="border p-3 rounded-xl"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="mobile"
            placeholder="Mobile Number"
            className="border p-3 rounded-xl"
            value={formData.mobile}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border p-3 rounded-xl"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border p-3 rounded-xl"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            name="specialization"
            placeholder="Specialization"
            className="border p-3 rounded-xl"
            value={formData.specialization}
            onChange={handleChange}
            required
          />

          <input
            name="qualification"
            placeholder="Qualification"
            className="border p-3 rounded-xl"
            value={formData.qualification}
            onChange={handleChange}
            required
          />

          <input
            name="experience"
            type="number"
            placeholder="Experience (Years)"
            className="border p-3 rounded-xl"
            value={formData.experience}
            onChange={handleChange}
            required
          />

          <input
            name="clinicName"
            placeholder="Clinic Name"
            className="border p-3 rounded-xl"
            value={formData.clinicName}
            onChange={handleChange}
            required
          />

          <input
            name="clinicAddress"
            placeholder="Clinic Address"
            className="border p-3 rounded-xl md:col-span-2"
            value={formData.clinicAddress}
            onChange={handleChange}
            required
          />

          <input
            name="consultationFee"
            type="number"
            placeholder="Consultation Fee"
            className="border p-3 rounded-xl"
            value={formData.consultationFee}
            onChange={handleChange}
            required
          />

          <input
            name="premiumFee"
            type="number"
            placeholder="Premium Fee"
            className="border p-3 rounded-xl"
            value={formData.premiumFee}
            onChange={handleChange}
            required
          />

          <input
            name="homeVisitFee"
            type="number"
            placeholder="Home Visit Fee"
            className="border p-3 rounded-xl"
            value={formData.homeVisitFee}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Creating Doctor..." : "Create Doctor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddDoctor;

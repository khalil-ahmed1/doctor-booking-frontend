import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/common/Home";
import Doctors from "../pages/patient/Doctors";
import Login from "../pages/common/Login";
import Register from "../pages/common/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOTP from "../pages/auth/VerifyOTP";
import ResetPassword from "../pages/auth/ResetPassword";

import About from "../pages/common/About";
import Services from "../pages/common/Services";
import Contact from "../pages/common/Contact";


import DoctorProfile from "../pages/doctor/DoctorProfile";
import MyAppointments from "../pages/patient/MyAppointments";
import AppointmentTicket from "../pages/patient/AppointmentTicket";

import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import DoctorAppointments from "../pages/doctor/DoctorAppointments";
import DoctorAvailability from "../pages/doctor/DoctorAvailability";
import DoctorEarnings from "../pages/doctor/DoctorEarnings";
import DoctorAnalytics from "../pages/doctor/DoctorAnalytics";

import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminDoctors from "../pages/admin/AdminDoctors";
import AdminPatients from "../pages/admin/AdminPatients";
import AdminAddDoctor from "../pages/admin/AdminAddDoctor";

import ProtectedDoctorRoute from "./protected/ProtectedDoctorRoute";
import ProtectedPatientRoute from "./protected/ProtectedPatientRoute";
import ProtectedAdminRoute from "./protected/ProtectedAdminRoute";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-reset-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/ticket/:id" element={<AppointmentTicket />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        {/* Patient Routes */}

        <Route
          path="/my-appointments"
          element={
            <ProtectedPatientRoute>
              <MyAppointments />
            </ProtectedPatientRoute>
          }
        />

        {/* Doctor Routes */}

        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedDoctorRoute>
              <DoctorDashboard />
            </ProtectedDoctorRoute>
          }
        />

        <Route
          path="/doctor/appointments"
          element={
            <ProtectedDoctorRoute>
              <DoctorAppointments />
            </ProtectedDoctorRoute>
          }
        />

        <Route
          path="/doctor/availability"
          element={
            <ProtectedDoctorRoute>
              <DoctorAvailability />
            </ProtectedDoctorRoute>
          }
        />

        <Route
          path="/doctor/earnings"
          element={
            <ProtectedDoctorRoute>
              <DoctorEarnings />
            </ProtectedDoctorRoute>
          }
        />

        <Route
          path="/doctor/analytics"
          element={
            <ProtectedDoctorRoute>
              <DoctorAnalytics />
            </ProtectedDoctorRoute>
          }
        />

        {/* Admin Routes */}

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="doctors" element={<AdminDoctors />} />
          <Route path="patients" element={<AdminPatients />} />
          <Route path="add-doctor" element={<AdminAddDoctor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

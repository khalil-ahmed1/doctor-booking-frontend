import DoctorNavbar from "../components/doctor/DoctorNavbar";

const DoctorLayout = ({ children }) => {
  return (
    <>
      <DoctorNavbar />

      <main className="bg-slate-100 min-h-screen">{children}</main>
    </>
  );
};

export default DoctorLayout;

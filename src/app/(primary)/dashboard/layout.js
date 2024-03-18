"use client";

import NavBar from "@/components/navigation/NavBar";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default DashboardLayout;

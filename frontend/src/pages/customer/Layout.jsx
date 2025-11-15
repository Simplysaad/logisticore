import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

import React from "react";
import Product from "./Product";
import Employee from "./Employee";
import Navbar from "../../components/Navbar/Navbar";

const CompanyDetails = () => {
  return (
    <div className="flex items-center justify-center flex-col w-full">
      <Navbar />

      <div className=" w-[90%] h-full ">
        <Product />
        <Employee />
      </div>
    </div>
  );
};

export default CompanyDetails;

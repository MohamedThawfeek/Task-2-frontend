import React from "react";

//Third party libraries

import { IoMdClose } from "react-icons/io";
import { PiWarningOctagonFill } from "react-icons/pi";
import {
  CompanyListofEmployee,
  CompanyListofProduct,
  ListofCompany,
  deletCompany,
  deletEmployee,
  deletProduct,
} from "../GlobalApi/Index";
import { useDispatch } from "react-redux";
import { addCompany } from "../../Redux/slices/companyList";
import { addProduct } from "../../Redux/slices/productlist";
import { addEmployee } from "../../Redux/slices/employeelist";

const DeletePopup = ({ close, name, id, company_id }) => {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("Token");

  const deleteApi = async () => {
    if (name === "company") {
      const reqdata = {
        company_id: id,
      };
      const response = await deletCompany(reqdata, userToken);

      if (response.success) {
        const companyList = await ListofCompany(userToken);
        if (companyList.success) {
          dispatch(addCompany(companyList.data));
          close(false);
        }
      }
    } else if (name === "product") {
      const reqdata = {
        product_id: id,
      };
      const response = await deletProduct(reqdata);

      if (response.success) {
        const response = await CompanyListofProduct({
          company_id: company_id,
        });
        if (response.success) {
          dispatch(addProduct(response.data));
          close(false);
        }
      }
    } else {
      const reqdata = {
        employee_id: id,
      };
      const response = await deletEmployee(reqdata);
      if (response.success) {
        const employeeResponse = await CompanyListofEmployee({
          company_id: company_id,
        });
        if (employeeResponse.success) {
          dispatch(addEmployee(employeeResponse.data));
          close(false);
        }
      }
    }
  };

  return (
    <div className=" absolute top-0 left-0 w-full h-[150vh] z-50 flex items-center justify-center bg-[#1111118f]">
      <div className=" relative w-[400px] py-4 rounded-lg bg-white p-3 ">
        <div
          onClick={() => close(false)}
          className=" cursor-pointer absolute -top-3 -right-2 flex items-center justify-center w-[20px] h-[20px] rounded-full bg-red-500"
        >
          <IoMdClose size={16} className=" text-white" />
        </div>

        <PiWarningOctagonFill
          size={100}
          className=" flex items-center justify-center w-full text-yellow-200"
        />

        <p className=" text-center text-lg font-semibold">
          Are you sure want to delete ?{" "}
        </p>

        <div className=" flex items-center justify-center gap-3 my-3">
          <button onClick={() => close(false)} className=" w-[30%] h-[30px] border-[1px] border-blue-500 rounded-lg">
            No
          </button>
          <button onClick={deleteApi} className=" w-[30%] h-[30px] border-[1px] border-blue-500 rounded-lg">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;

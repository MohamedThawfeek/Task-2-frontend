import React, { useState } from "react";

//Third party libraries
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import Repete from "../../../components/RepetContent/Repete";
import { FaPlus } from "react-icons/fa6";
import { LuMinusCircle } from "react-icons/lu";
import CompanyDetails from "../../../components/CompanyDetails/CompanyDetails";
import Select from "react-select";
import { v4 as uuid } from "uuid";
import { AddUserDetails } from "../../../components/GlobalApi/Index";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

const OnBoard = () => {
  const navigate = useNavigate();
  const [dob, setDob] = useState(null);
  const [err, setErr] = useState(false);
  const [qlf, setQlf] = useState([]);
  const [cmpy, setCmpy] = useState([]);
  const [gender, setGender] = useState(null);

  const [loader, setLoader] = useState(false);
  const userToken = localStorage.getItem("Token");

  const onSubmit = async () => {
    if (!dob || !gender) {
      return setErr(true);
    }

    setLoader(true);
    const reqdata = {
      dob: dob,
      gender: gender.value,
      qualification: qlf,
      company: cmpy,
    };

    const response = await AddUserDetails(reqdata, userToken);

    if (response.success) {
      setLoader(false);
      return navigate("/");
    } else {
      setLoader(false);
      return toast.error(response.message);
    }
  };

  //Qualification Functions
  const addQualification = () => {
    setQlf((prevQualifications) => [
      ...prevQualifications,
      { qlalification: "" },
    ]);
  };

  const minusQualification = (id) => {
    const filter = qlf.filter((_, index) => index !== id);
    return setQlf(filter);
  };

  const qualificationData = (title, text, id) => {
    const newFilter = qlf.map((item, index) => {
      if (index === id) {
        return {
          ...item,
          [title]: text,
        };
      }
      return item;
    });

    setQlf(newFilter);
  };

  //Company Functions
  const addCompany = () => {
    setCmpy((prevQualifications) => [
      ...prevQualifications,
      { id: uuid(), Name: "", Address: "", PhoneNumber: "", Gst: "" },
    ]);
  };

  const minusCompany = (id) => {
    const filter = cmpy.filter((_, index) => index !== id);
    return setCmpy(filter);
  };

  const companyData = (title, text, id) => {
    const newFilter = cmpy.map((item, index) => {
      if (index === id) {
        return {
          ...item,
          [title]: text,
        };
      }
      return item;
    });

    setCmpy(newFilter);
  };

  const options = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  return (
    <div className=" w-full h-[100vh] flex items-center justify-center">
      <div className=" relative bg-gray-100 shadow-lg shadow-black lg:w-[30%] w-[80%] max-h-[80%] overflow-auto px-4 py-6 rounded-lg">
        <div>
          <label className=" text-[12px] font-semibold">Select DOB</label>

          <Flatpickr
            id="range-picker"
            className="w-full border border-gray text-[12px] rounded-md py-3 px-2"
            options={{
              mode: "single",
            }}
            placeholder="Select your DOB"
            onChange={(e) => setDob(e[0])}
            value={dob}
          />
          {!dob && err && (
            <p className=" text-[12px] text-red-500">* DOB is required</p>
          )}
        </div>
        <div>
          <label className=" text-[12px] font-semibold">Select Gender</label>
          <Select
            className=" py-1 text-[12px]"
            options={options}
            onChange={setGender}
            value={gender}
            placeholder="Select Gender"
          />
          {!gender && err && (
            <p className=" text-[12px] text-red-500">* Gender is required</p>
          )}
        </div>

        <p
          onClick={addQualification}
          className=" text-[#4F46E5] w-full text-end cursor-pointer text-[12px] flex items-center justify-end gap-1 mt-2 mb-1"
        >
          ADD Qualification Details <FaPlus size={12} />{" "}
        </p>
        {qlf.map((_, index) => {
          return (
            <div className=" w-full flex items-center  gap-2">
              <Repete
                key={index}
                id={index}
                qualificationData={qualificationData}
                qlf={qlf}
              />
              <LuMinusCircle
                onClick={() => minusQualification(index)}
                className="  hover:text-red-500 cursor-pointer"
              />
            </div>
          );
        })}

        <p
          onClick={addCompany}
          className=" text-[#4F46E5] w-full text-end cursor-pointer text-[12px] flex items-center justify-end gap-1 mt-2 mb-1"
        >
          ADD Company Details
          <FaPlus size={12} />{" "}
        </p>

        {cmpy.map((_, index) => {
          return (
            <div className=" w-full flex items-center  gap-2">
              <CompanyDetails
                key={index}
                id={index}
                companyData={companyData}
                cmpy={cmpy}
              />
              <LuMinusCircle
                onClick={() => minusCompany(index)}
                className="  hover:text-red-500 cursor-pointer"
              />
            </div>
          );
        })}

        <button
          onClick={() => {
            if (!loader) {
              return onSubmit();
            }
          }}
          className="flex items-center justify-center w-full px-8 h-[30px] max-h-[30px] mt-5 text-[14px] font-medium text-white transition-all duration-200 bg-[#4F46E5] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray  hover:bg-grayDark"
        >
          {loader ? (
            <div role="status">
              <svg
                aria-hidden="true"
                class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default OnBoard;

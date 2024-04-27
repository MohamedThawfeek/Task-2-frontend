import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserSchema } from "../../utils/Validation";
import Input from "../../components/Input/Input";
import MobileInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  EditCompany,
  UserDetails,
  getFullUserDetails,
  updateFullUserDetails,
  updateUserDetails,
} from "../GlobalApi/Index";
import { login } from "../../Redux/slices/auth";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import Repete from "../RepetContent/Repete";
import { LuMinusCircle } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import CompanyDetails from "../CompanyDetails/CompanyDetails";
import { v4 as uuid } from "uuid";
import { addUserDetails } from "../../Redux/slices/userDetails";
import { addCompany } from "../../Redux/slices/companyList";
import { ListofCompany } from "../GlobalApi/Index";

const UserDetailsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { userexp } = useSelector((state) => state.userDetails);
  const { companylist } = useSelector((state) => state.companylist);

  console.log("companylist", companylist);
  const userToken = localStorage.getItem("Token");
  const dispatch = useDispatch();
  //Form validation
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateUserSchema),
  });

  const [number, setNumber] = useState(null);
  const [err, setErr] = useState(false);
  const [loader, setLoader] = useState(false);

  const [dob, setDob] = useState(null);
  const [qlf, setQlf] = useState([]);
  const [cmpy, setCmpy] = useState([]);
  const [gender, setGender] = useState(null);

  const [userDetails, setuserDetails] = useState("user_info");

  useEffect(() => {
    if (user) {
      reset({
        FirstName: user.firstname,
        LastName: user.lastname,
        Email: user.email,
      });
      setNumber(user.phonenumber);
    }
  }, [user]);

  useEffect(() => {
    const API = async () => {
      const response = await getFullUserDetails(userToken);
      if (response.success) {
        const data = await ListofCompany(userToken);
        if (data.success) {
          dispatch(addCompany(data.data));
          return dispatch(addUserDetails(response.data));
        }
      }
    };
    API();
  }, [userToken]);

  useEffect(() => {
    if (userexp) {
      setDob(userexp?.dob);
      setGender({ label: userexp?.gender, value: userexp?.gender });
      setQlf(userexp?.qualification);
      setCmpy(companylist);
    }
  }, [userexp, companylist]);

  const onSubmit = async (data) => {
    if (!number) {
      return setErr(true);
    }
    setLoader(true);
    const reqdata = {
      firstName: data.FirstName,
      lastName: data.LastName,
      phoneNumber: number,
    };

    const response = await updateUserDetails(reqdata, userToken);

    if (response.success) {
      const data = await UserDetails(userToken);
      dispatch(login(data.data));
      setLoader(false);
      return toast.success(response.message);
    } else {
      setLoader(false);
      return toast.error(response.message);
    }
  };

  const options = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  //Qualification Functions
  const addQualification = () => {
    setQlf((prevQualifications) => [
      ...prevQualifications,
      { qualification: "" },
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
  const addCompanys = () => {
    setCmpy((prevQualifications) => [
      ...prevQualifications,
      {
        company_id: uuid(),
        name: "",
        address: "",
        phonenumber: "",
        gstnumber: "",
      },
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

  const onSubmit1 = async () => {
    if (!dob || !gender) {
      return setErr(true);
    }
    const reqdata = {
      dob: dob,
      gender: gender.value,
      qualification: qlf,
    };
    setLoader(true);

    const response = await updateFullUserDetails(reqdata, userToken);

    if (response.success) {
      const reqdata1 = {
        company: cmpy,
      };
      const data = await EditCompany(reqdata1, userToken);
      if (data.success) {
        const data1 = await getFullUserDetails(userToken);
        if (data1.success) {
          const data2 = await ListofCompany(userToken);
          if (data2.success) {
            dispatch(addCompany(data2.data));
            dispatch(addUserDetails(data1.data));
            setLoader(false);
            return toast.success(response.message);
          }
        }
      }
    } else {
      setLoader(false);
      return toast.error(response.message);
    }
  };

  return (
    <div
      style={{ boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)" }}
      className=" lg:w-[70%] h-[500px] rounded-lg flex overflow-hidden "
    >
      <div className=" w-[25%] border-e-[1px] border-gray-200 h-full flex flex-col justify-start py-3">
        <p
          onClick={() => setuserDetails("user_info")}
          className={` ${
            userDetails === "user_info" ? "text-blue-500" : "text-black"
          } mt-4 text-xl font-semibold text-center cursor-pointer`}
        >
          User Information
        </p>
        <p
          onClick={() => setuserDetails("user_details")}
          className={` ${
            userDetails === "user_details" ? "text-blue-500" : "text-black"
          } mt-4 text-xl font-semibold text-center cursor-pointer`}
        >
          User Details
        </p>
      </div>
      <div className=" w-[75%] h-full overflow-auto">
        {userDetails === "user_info" && (
          <div className=" px-6 py-3">
            <form onSubmit={handleSubmit(onSubmit)} action="">
              <Input
                name="FirstName"
                type="text"
                placeholder="Enter first name"
                register={register}
                error={errors?.FirstName?.message}
              />

              <Input
                name="LastName"
                type="text"
                placeholder="Enter last name"
                register={register}
                error={errors?.LastName?.message}
              />

              <Input
                name="Email"
                type="email"
                placeholder="Enter email address"
                register={register}
                error={errors?.Email?.message}
                disable={true}
              />

              <div className=" my-2">
                <label className=" text-[12px] font-semibold">
                  Phone Number
                </label>
                <MobileInput
                  placeholder="Phone number"
                  className=" customInputSize py-1 block w-full bg-white  text-base text-black border border-[#D4D4D8] rounded-lg focus-within:border-[#4F46E5]"
                  name="phone"
                  enableSearch={true}
                  country={"in"}
                  defaultCountry={"in"}
                  value={number}
                  onChange={setNumber}
                />

                {err && !number && (
                  <p className=" text-[12px] text-red-500">
                    * Phone number is required
                  </p>
                )}
              </div>

              <div className=" w-full flex items-end justify-end">
                <button
                  type="submit"
                  className="flex items-center justify-center w-[15%] px-8 h-[30px] max-h-[30px] mt-5 text-[14px] font-medium text-white transition-all duration-200 bg-[#4F46E5] border border-transparent  rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray  hover:bg-grayDark"
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
                    "Update"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
        {userDetails === "user_details" && (
          <div className=" px-1 py-3 h-full">
            <div className="px-6  h-[90%] overflow-auto">
              <div className=" my-2">
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
              <div className="my-2">
                <label className=" text-[12px] font-semibold">
                  Select Gender
                </label>
                <Select
                  className=" py-1 text-[12px]"
                  options={options}
                  onChange={setGender}
                  value={gender}
                  placeholder="Select Gender"
                />
                {!gender && err && (
                  <p className=" text-[12px] text-red-500">
                    * Gender is required
                  </p>
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
                onClick={addCompanys}
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
            </div>
            <div className=" w-[95%] h-[10%]">
              <div className=" w-full flex items-end justify-end">
                <button
                  onClick={onSubmit1}
                  type="submit"
                  className="flex items-center justify-center w-[15%] px-8 h-[30px] max-h-[30px] mt-5 text-[14px] font-medium text-white transition-all duration-200 bg-[#4F46E5] border border-transparent  rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray  hover:bg-grayDark"
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
                    "Update"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default UserDetailsPage;

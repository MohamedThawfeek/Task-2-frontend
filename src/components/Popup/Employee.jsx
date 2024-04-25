import React, { useEffect, useState } from "react";

//Third party libraries
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addEmployeetchema } from "../../utils/Validation";
import Input from "../../components/Input/Input";
import { IoMdClose } from "react-icons/io";
import Select from "react-select";
import MobileInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  CompanyListofEmployee,
  CreateEmployee,
  EditEmployee,
} from "../GlobalApi/Index";
import { addEmployee } from "../../Redux/slices/employeelist";
import { useDispatch } from "react-redux";

const Employee = ({ close, id, employeeID, edit, datas }) => {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("Token");

  const [gender, setGender] = useState(null);
  const [role, setRole] = useState(null);
  const [number, setNumber] = useState(null);
  const [err, setErr] = useState(false);
  const [loader, setLoader] = useState(false);
  //Form validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addEmployeetchema),
  });

  useEffect(() => {
    if (edit && employeeID) {
      const filter = datas.filter((d) => d.employee_id === employeeID)[0];
      reset({
        Name: filter.name,
        Address: filter.address,
        Age: filter.age,
        Salary: filter.salary,
      });
      setNumber(filter.phonenumber);
      setRole({ label: filter.role, value: filter.role });
      setGender({ label: filter.gender, value: filter.gender });
    }
  }, [employeeID, edit]);

  const onSubmit = async (data) => {
    if (!number || !role || !gender) {
      return setErr(true);
    }

    setLoader(true);
    const reqData = {
      name: data.Name,
      address: data.Address,
      phoneNumber: number,
      age: data.Age,
      gender: gender.value,
      salary: data.Salary,
      role: role.value,
    };

    let response;
    if (!edit) {
      reqData.company_id = id;
      response = await createOrUpdateEmployee(reqData, userToken);
    } else {
      reqData.employee_id = employeeID;
      response = await createOrUpdateEmployee(reqData);
    }

    if (response.success) {
      const employeeResponse = await CompanyListofEmployee({ company_id: id });
      if (employeeResponse.success) {
        dispatch(addEmployee(employeeResponse.data));
        close();
      }
    }
  };

  const createOrUpdateEmployee = async (data, token = null) => {
    const apiFunction = token ? CreateEmployee : EditEmployee;
    return await apiFunction(data, token);
  };

  const options = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const Employee = [
    { value: "Admin", label: "Admin" },
    { value: "Supervisor", label: "Supervisor" },
    { value: "Manager", label: "Manager" },
    { value: "Employee", label: "Employee" },
  ];
  return (
    <div className=" absolute top-0 left-0 w-full h-[150vh] z-50 flex items-center justify-center bg-[#1111118f]">
      <div className=" relative w-[400px] py-4 rounded-lg bg-white p-3 ">
        <div
          onClick={() => close(false)}
          className=" cursor-pointer absolute -top-3 -right-2 flex items-center justify-center w-[20px] h-[20px] rounded-full bg-red-500"
        >
          <IoMdClose size={16} className=" text-white" />
        </div>

        <p className=" text-center font-medium">Add Employee</p>
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <Input
            name="Name"
            type="text"
            placeholder="Enter name"
            register={register}
            error={errors?.Name?.message}
          />

          <Input
            name="Address"
            type="text"
            placeholder="Enter address"
            register={register}
            error={errors?.Address?.message}
          />

          <div className=" my-2">
            <label className=" text-[12px] font-semibold">Phone Number</label>
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

          <div>
            <label className=" text-[12px] font-semibold">Select Gender</label>
            <Select
              className=" py-1 text-[12px]"
              options={options}
              onChange={setGender}
              value={gender}
              placeholder="Select Gender"
            />
            {err && !gender && (
              <p className=" text-[12px] text-red-500">* Gender is required</p>
            )}
          </div>

          <div>
            <label className=" text-[12px] font-semibold">Select Role</label>
            <Select
              className=" py-1 text-[12px]"
              options={Employee}
              onChange={setRole}
              value={role}
              placeholder="Select Role"
            />
            {err && !role && (
              <p className=" text-[12px] text-red-500">* Role is required</p>
            )}
          </div>

          <Input
            name="Age"
            type="number"
            placeholder="Enter age"
            register={register}
            error={errors?.Age?.message}
          />

          <Input
            name="Salary"
            type="number"
            placeholder="Enter salary"
            register={register}
            error={errors?.Salary?.message}
          />
          <button
            type="submit"
            className="flex items-center justify-center w-full px-8 h-[30px] max-h-[30px] mt-5 text-[14px] font-medium text-white transition-all duration-200 bg-[#4F46E5] border border-transparent  rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray"
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
              <>{edit ? "Edit Employee" : "Create employee"}</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Employee;

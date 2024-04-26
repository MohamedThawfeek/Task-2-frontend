import React, { useEffect, useState } from "react";

//Third party libraries
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addCompanyschema } from "../../utils/Validation";
import Input from "../../components/Input/Input";
import { IoMdClose } from "react-icons/io";
import { CreateCompany, EditCompany, EditSingleCompany, ListofCompany } from "../GlobalApi/Index";
import { addCompany } from "../../Redux/slices/companyList";
import { useDispatch } from "react-redux";

const AddCompany = ({ close, id, edit, datas }) => {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("Token");
  const [loader, setLoader] = useState(false);

  //Form validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addCompanyschema),
  });

  useEffect(() => {
    if (edit && id) {
      const filter = datas.filter((d) => d.company_id === id)[0];
      console.log('ddd', filter)
      reset({
        CompanyName: filter.name,
        CompanyAddress: filter.address,
        CompanyPhoneNumber: filter.phonenumber,
        CompanyGst: filter.gstnumber,
      });
    }
  }, [id, edit]);

  const onSubmit = async (data) => {
    const reqData = {
      Name: data.CompanyName,
      Address: data.CompanyAddress,
      PhoneNumber: data.CompanyPhoneNumber,
      Gst: data.CompanyGst,
    };

    setLoader(true);
    let response;
    if (!edit) {
      response = await CreateCompany(reqData, userToken);
    } else {
      reqData.company_id = id;
      response = await EditSingleCompany(reqData, userToken);
    }

    if (response.success) {
      const companyList = await ListofCompany(userToken);
      if (companyList.success) {
        dispatch(addCompany(companyList.data));
        setLoader(false)
        close();
      }
    }
  };

  return (
    <div className=" absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-[#1111118f]">
      <div className=" relative w-[400px] py-4 rounded-lg bg-white p-3">
        <div
          onClick={() => close(false)}
          className=" cursor-pointer absolute -top-3 -right-2 flex items-center justify-center w-[20px] h-[20px] rounded-full bg-red-500"
        >
          <IoMdClose size={16} className=" text-white" />
        </div>

        <p className=" text-center font-medium">Add Company</p>
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <Input
            name="CompanyName"
            type="text"
            placeholder="Enter company name"
            register={register}
            error={errors?.CompanyName?.message}
          />

          <Input
            name="CompanyAddress"
            type="text"
            placeholder="Enter company address"
            register={register}
            error={errors?.CompanyAddress?.message}
          />

          <Input
            name="CompanyPhoneNumber"
            type="text"
            placeholder="Enter Company Phonenumber"
            register={register}
            error={errors?.CompanyPhoneNumber?.message}
          />

          <Input
            name="CompanyGst"
            type="text"
            placeholder="Enter GST numbaer"
            register={register}
            error={errors?.CompanyGst?.message}
          />

          <button
            type="submit"
            className="flex items-center justify-center w-full px-8 h-[30px] max-h-[30px] mt-5 text-[14px] font-medium text-white transition-all duration-200 bg-[#4F46E5] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray"
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
              <>{edit ? "Edit Company" : "Create Company"}</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCompany;

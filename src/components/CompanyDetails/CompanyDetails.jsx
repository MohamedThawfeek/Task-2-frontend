import React from "react";

const CompanyDetails = ({ id, companyData, cmpy }) => {
  return (
    <div className="w-[95%] flex flex-col gap-2 my-2">
      <p>Company Details {id + 1}</p>
      <div className=" w-full flex items-center relative">
        <input
          type="text"
          className=" w-full my-1 px-3 py-2 outline-none border-0 shadow-lg rounded-lg"
          placeholder="Enter company Name"
          value={cmpy && cmpy.filter((_, idx) => idx === id)[0].name}
          onChange={(e) => companyData("name", e.target.value, id)}
          maxLength={100}
        />
        <p className="absolute right-1 bottom-1 text-gray-400 text-[8px]">
          {cmpy && cmpy.filter((_, idx) => idx === id)[0].name?.length}/100
        </p>
      </div>
      <div className=" w-full flex items-center relative">
        <input
          type="text"
          className=" w-full my-1 px-3 py-2 outline-none border-0 shadow-lg rounded-lg"
          placeholder="Enter company address "
          onChange={(e) => companyData("address", e.target.value, id)}
          maxLength={100}
          value={cmpy && cmpy.filter((_, idx) => idx === id)[0].address}

        />
        <p className="absolute right-1 bottom-1 text-gray-400 text-[8px]">
          {cmpy && cmpy.filter((_, idx) => idx === id)[0].address?.length}/100
        </p>
      </div>
      <div className=" w-full flex items-center relative">
        <input
          type="text"
          className=" w-full my-1 px-3 py-2 outline-none border-0 shadow-lg rounded-lg"
          placeholder="Enter company phone number"
          onChange={(e) => companyData("phonenumber", e.target.value, id)}
          maxLength={12}
          value={cmpy && cmpy.filter((_, idx) => idx === id)[0].phonenumber}
        />
        <p className="absolute right-1 bottom-1 text-gray-400 text-[8px]">
          {cmpy && cmpy.filter((_, idx) => idx === id)[0].phonenumber?.length}
          /12
        </p>
      </div>
      <div className=" w-full flex items-center relative">
        <input
          type="text"
          className=" w-full my-1 px-3 py-2 outline-none border-0 shadow-lg rounded-lg"
          placeholder="Enter GST Number"
          onChange={(e) => companyData("gstnumber", e.target.value, id)}
          value={cmpy && cmpy.filter((_, idx) => idx === id)[0].gstnumber}

        />
        <p className="absolute right-1 bottom-1 text-gray-400 text-[8px]">
          {cmpy && cmpy.filter((_, idx) => idx === id)[0].gstnumber?.length}/12
        </p>
      </div>
    </div>
  );
};

export default CompanyDetails;

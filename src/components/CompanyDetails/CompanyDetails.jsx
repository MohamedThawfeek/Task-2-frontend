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
          value={cmpy && cmpy.filter((_, idx) => idx === id)[0].Name}
          onChange={(e) => companyData("Name", e.target.value, id)}
          maxLength={100}
        />
        <p className="absolute right-1 bottom-1 text-gray-400 text-[8px]">
          {cmpy && cmpy.filter((_, idx) => idx === id)[0].Name?.length}/100
        </p>
      </div>
      <div className=" w-full flex items-center relative">
        <input
          type="text"
          className=" w-full my-1 px-3 py-2 outline-none border-0 shadow-lg rounded-lg"
          placeholder="Enter company address "
          onChange={(e) => companyData("Address", e.target.value, id)}
          maxLength={100}
          value={cmpy && cmpy.filter((_, idx) => idx === id)[0].Address}

        />
        <p className="absolute right-1 bottom-1 text-gray-400 text-[8px]">
          {cmpy && cmpy.filter((_, idx) => idx === id)[0].Address?.length}/100
        </p>
      </div>
      <div className=" w-full flex items-center relative">
        <input
          type="number"
          className=" w-full my-1 px-3 py-2 outline-none border-0 shadow-lg rounded-lg"
          placeholder="Enter company phone number"
          onChange={(e) => companyData("PhoneNumber", e.target.value, id)}
          maxLength={12}
          value={cmpy && cmpy.filter((_, idx) => idx === id)[0].PhoneNumber}

        />
        <p className="absolute right-1 bottom-1 text-gray-400 text-[8px]">
          {cmpy && cmpy.filter((_, idx) => idx === id)[0].PhoneNumber?.length}
          /12
        </p>
      </div>
      <div className=" w-full flex items-center relative">
        <input
          type="text"
          className=" w-full my-1 px-3 py-2 outline-none border-0 shadow-lg rounded-lg"
          placeholder="Enter GST Number"
          onChange={(e) => companyData("Gst", e.target.value, id)}
          value={cmpy && cmpy.filter((_, idx) => idx === id)[0].Gst}

        />
        <p className="absolute right-1 bottom-1 text-gray-400 text-[8px]">
          {cmpy && cmpy.filter((_, idx) => idx === id)[0].Gst?.length}/12
        </p>
      </div>
    </div>
  );
};

export default CompanyDetails;

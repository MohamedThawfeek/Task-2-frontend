import React from "react";

const Input = ({ name, type, placeholder, register, error, id, disable }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-[12px] text-[#18181B] font-semibold font-pj"
      >
        {name}
      </label>
      <div className="mt-1">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          disabled={disable !== undefined ? true : false}
          className="block w-full px-4 py-3 text-[12px] rounded-[10px] focus:border-blue focus:outline-none border border-gray font-normal placeholder:text-gray text-black "
          {...register(name === "Confirm Password" ? placeholder : name)}
        />
        {error && (
          <p className="text-red-500 text-xs mt-1">
            {" "}
            <span className=" text-base">*</span> {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;

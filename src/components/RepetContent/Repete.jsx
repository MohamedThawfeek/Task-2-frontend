import React from "react";

const Repete = ({ id, qualificationData, qlf }) => {
  return (
    <div className=" w-[95%] relative">
      <input
        onChange={(e) =>
          qualificationData("qualification", e.target.value, id)
        }
        type="text"
        maxLength={100}
        className=" w-full my-1 px-3 py-2 outline-none border-0 shadow-lg rounded-lg"
        placeholder={`Add Qualification`}
        value={qlf && qlf.filter((_, idx) => idx === id)[0]?.qualification}
      />
      <p className="absolute right-1 bottom-1 text-gray-400 text-[8px]">
      {qlf && qlf.filter((_, idx) => idx === id)[0]?.qualification?.length}/100
      </p>
    </div>
  );
};

export default Repete;

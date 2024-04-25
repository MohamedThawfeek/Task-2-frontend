import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import UserDetails from "../../components/UserDetails/UserDetails";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center flex-col w-full">
      <Navbar />

      <div className=" w-[90%] flex items-start justify-start my-3">
        <button
          onClick={() => {
            navigate("/");
          }}
          className=" flex items-center justify-center gap-2 cursor-pointer bg-[#4F46E5] hover:bg-[#4e46e5d0] text-white w-[100px] h-[35px] rounded-lg"
        >
          <IoMdArrowBack size={16} /> Go Back
        </button>
      </div>

      <UserDetails />
    </div>
  );
};

export default Profile;

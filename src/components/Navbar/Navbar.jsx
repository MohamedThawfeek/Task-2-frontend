import React, { useEffect, useState } from "react";

import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../Redux/slices/auth";
import { UserDetails } from "../GlobalApi/Index";
import { useNavigate } from "react-router";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [dropDown, setdropDown] = useState(false);
  const userToken = localStorage.getItem("Token");

  const getUser = async () => {
    try {
      if (userToken) {
        const data = await UserDetails(userToken);

        if (!data.success) {
          throw new Error("User data not available");
        }

        dispatch(login(data.data));
      } else {
        throw new Error("User token not found");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    getUser();
  }, [userToken]);

  const signOut = async () => {
    localStorage.removeItem("Token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div
      onClick={() => setdropDown(!dropDown)}
      style={{ boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)" }}
      className=" relative cursor-pointer bg-white w-[90%] py-4 rounded-lg flex items-center justify-end px-4 gap-2"
    >
      <p className=" text-[16px] font-medium capitalize">
        {user?.firstname} {user?.lastname}
      </p>
      <img
        src="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg"
        className=" rounded-full w-[40px] h-[40px]"
        alt=""
      />
      {dropDown && (
        <div style={{ boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)" }} className=" flex flex-col absolute bg-white right-0 -bottom-[74px] w-[100px]  text-center items-center justify-center py-1">

        <div
          onClick={() => navigate('/profile')}
          
          className=" hover:text-[#4F46E5]  text-center flex items-center justify-center gap-1 py-1"
          >
          <CgProfile size={20} /> <p className=" font-medium">Profile</p>
          </div>

          
        <div
          onClick={signOut}
          
          className=" hover:text-[#4F46E5]  text-center flex items-center justify-center gap-1 py-1"
          >
          <MdLogout size={20} /> <p className=" font-medium">Logout</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ResendOTP, verifyUser } from "../../../components/GlobalApi/Index";
import toast, { Toaster } from "react-hot-toast";

const Verify = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [reSend, setReSend] = useState(false);
  const [searchParams] = useSearchParams();
  const Email = searchParams.get("email");
  const Token = searchParams.get("token");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      const countdown = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return async () => clearInterval(countdown);
    } else {
      setReSend(false);
    }
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSubmit = async () => {
    const reqdata = {
      otp: otp,
      status: "Verify",
    };

    setLoader(true);
    const response = await verifyUser(reqdata, Token);

    if (response.success) {
      setLoader(false);
      localStorage.setItem("Token", response.token);
      return navigate("/onboard");
    } else {
      setLoader(false);
      return toast.error(response.message);
    }
  };

  const resend = async () => {
    if (seconds === 0) {
      setReSend(true);
      setSeconds(60);
      const reqdata = {
        email: Email,
        status: "Verify",
      };
      const response = await ResendOTP(reqdata);
      if (response.success) {
        return toast.success(response.message);
      }
    }
  };

  return (
    <div className=" w-full h-[100vh] flex items-center justify-center">
      <div
        style={{ boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)" }}
        className=" relative bg-gray-100 lg:w-[25%] w-[80%] px-4 py-6 rounded-lg"
      >
        <p className="font-bold font-pj text-center text-[#18181B] text-[16px]">
          Verify your email
        </p>
        <p className=" text-center text-[15px] text-[#52525B] mt-3 font-pj">
          Please enter the 4 digit code <br />
          {Email !== null ? Email : ""}
        </p>

        <div className="space-y-5 mt-[30px]">
          <div className="flex flex-col items-center justify-center">
            <div className="mt-1 flex items-center justify-center relative">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                inputStyle={"otpInput"}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>
          </div>
        </div>
        {Email !== null && (
          <div onClick={resend} className=" text-center mt-1">
            <p className="text-[14px] text-[#4F46E5] text-center mt-4 cursor-pointer underline">
              Resend OTP {reSend && <>({formatTime(seconds)})</>}
            </p>
          </div>
        )}
        <button
          onClick={handleSubmit}
          type="submit"
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

export default Verify;

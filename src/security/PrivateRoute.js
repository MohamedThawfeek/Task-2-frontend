import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../Redux/slices/auth";
import { UserDetails } from "../components/GlobalApi/Index";

const PrivateRoute = ({ children, route }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const userToken = localStorage.getItem("Token");

  // const getUser = async () => {
  //   try {
  //     if (userToken) {
  //       const data = await UserDetails(userToken);

  //       if (!data.success) {
  //         return navigate("/login");
  //       }
  //       dispatch(login(data.data));
  //     }
  //   } catch (error) {
  //     return navigate("/login");
  //   }
  // };

  useEffect(() => {
    const API = async () => {
      try {
        if (userToken) {
          const data = await UserDetails(userToken);
  
          if (!data.success) {
            return navigate("/login");
          }
          dispatch(login(data.data));
        }
      } catch (error) {
        return navigate("/login");
      }
    }
    API()
  }, [userToken, dispatch, navigate]);

  if (route) {

    if (!userToken) return <Navigate to="/login" />
  }

  if (user) {

    return <Suspense fallback={null}>{children}</Suspense>
  }

};

export default PrivateRoute;

// ** Router imports
import { useRoutes } from "react-router-dom"
import SignIn from "../pages/Authentication/SignIn/SignIn"
import SignUp from "../pages/Authentication/SignUp/SignUp"
import PrivateRoute from "../security/PrivateRoute"
import PublicRoute from "../security/PublicRoute"
import OnBoard from "../pages/Authentication/OnBoard/OnBoard"
import Verify from "../pages/Authentication/Verify/Verify"
import Dashboard from "../pages/Dashboard/Dashboard"
import CompanyDetails from "../pages/CompanyDetails/CompanyDetails"
import Profile from "../pages/Profile/Profile"

const Router = () => {
    const route = [
        {
            element: <PrivateRoute />,
            children: [
                
            ]
        },
        {
            element: <PublicRoute />,
            children: [
                { path: "/", element: <Dashboard /> },
                { path: "/login", element: <SignIn /> },
                { path: "/signup", element: <SignUp /> },
                { path: "/verify", element: <Verify /> },
                { path: "/onboard", element: <OnBoard /> },
                { path: "/companydetails", element: <CompanyDetails /> },
                { path: "/profile", element: <Profile /> }



            ]
        }
    ]

    const routes = useRoutes(route)

    return routes
}

export default Router
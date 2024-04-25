// ** Reducers Imports
import auth from "./slices/auth"
import companylist from './slices/companyList'
import productlist from './slices/productlist'
import employeelist from './slices/employeelist'
import userDetails from './slices/userDetails'





const rootReducer = {
    auth,
    companylist,
    productlist,
    employeelist,
    userDetails
};

export default rootReducer;

import axios from "../../axios";

export const SignUpAPI = async (reqData) => {
  const { data } = await axios.post("/signup", reqData);
  return data;
};

export const LoginAPI = async (reqData) => {
  const { data } = await axios.post("/signin", reqData);
  return data;
};

export const UserDetails = async (token) => {
  const { data } = await axios.get("/userDetails", {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

export const ListofCompany = async (token) => {
  const { data } = await axios.get("/list-company", {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

export const CompanyListofProduct = async (reqdata) => {
  const { data } = await axios.post("/get-all-product", reqdata);
  return data;
};

export const CompanyListofEmployee = async (reqdata) => {
  const { data } = await axios.post("/get-all-employee", reqdata);
  return data;
};

export const CreateProduct = async (reqdata, token) => {
  const { data } = await axios.post("/create-product", reqdata, {
    headers: { Authorization: token },
  });
  return data;
};

export const CreateEmployee = async (reqdata, token) => {
  const { data } = await axios.post("/create-employee", reqdata, {
    headers: { Authorization: token },
  });
  return data;
};

export const CreateCompany = async (reqdata, token) => {
  const { data } = await axios.post("/create-company", reqdata, {
    headers: { Authorization: token },
  });
  return data;
};

export const EditCompany = async (reqdata, token) => {
  const { data } = await axios.post("/edit-company", reqdata, {
    headers: { Authorization: token },
  });
  return data;
};



export const EditSingleCompany = async (reqdata, token) => {
  const { data } = await axios.post("/edit-single-company", reqdata, {
    headers: { Authorization: token },
  });
  return data;
};


export const EditEmployee = async (reqdata) => {
  const { data } = await axios.post("/update-employee", reqdata);
  return data;
};

export const EditProduct = async (reqdata) => {
  const { data } = await axios.post("/update-product", reqdata);
  return data;
};

export const deletCompany = async (reqdata, token) => {
  const { data } = await axios.post("/delete-company", reqdata, {
    headers: { Authorization: token },
  });
  return data;
};

export const deletProduct = async (reqdata) => {
  const { data } = await axios.post("/delete-product", reqdata);
  return data;
};

export const deletEmployee = async (reqdata) => {
  const { data } = await axios.post("/delete-employee", reqdata);
  return data;
};

export const verifyUser = async (reqdata, token) => {
  const { data } = await axios.post("/verifyuser", reqdata, {
    headers: { Authorization: token },
  });
  return data;
};

export const ResendOTP = async (reqdata) => {
  const { data } = await axios.post("/otp-resend", reqdata);
  return data;
};

export const AddUserDetails = async (reqdata, token) => {
  const { data } = await axios.post("/userdetails-add", reqdata, {
    headers: { Authorization: token },
  });
  return data;
};

export const updateUserDetails = async (reqdata, token) => {
  const { data } = await axios.post("/update-userdetails", reqdata, {
    headers: { Authorization: token },
  });
  return data;
};

export const getFullUserDetails = async (token) => {
  const { data } = await axios.get("/userdetails-get", {
    headers: { Authorization: token },
  });
  return data;
};

export const updateFullUserDetails = async (reqdata, token) => {
  const { data } = await axios.post("/userdetails-update", reqdata, {
    headers: { Authorization: token },
  });
  return data;
};

//Third party libraries
import * as Yup from "yup";

export const signUpSchema = Yup.object({
    FirstName: Yup.string()
        .required("FirstName is required")
        // .matches(/^[a-zA-Z_ ]*$/, "No special characters allowed.")
        .min(1, "FirstName must be between 1 and 16 characters.")
        .max(25, "FirstName must be between 2 and 16 characters."),
    LastName: Yup.string()
        .required("LastName is required")
        // .matches(/^[a-zA-Z_ ]*$/, "No special characters allowed.")
        .min(1, "LastName must be between 1 and 16 characters.")
        .max(25, "LastName must be between 2 and 16 characters."),
    Email: Yup.string()
        .required("Email address is required.")
        .email("Invalid email address."),
    Password: Yup.string()
        .required("Password is required.")
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            "Password must contain atleast 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character."
        ),
});


export const signInSchema = Yup.object({
    Email: Yup.string()
        .required("Email address is required.")
        .email("Invalid email address."),
    Password: Yup.string().required("Password is required."),
});


export const passwordSchema = Yup.object({
    Password: Yup.string()
        .required("Password is required.")
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            "Password must contain atleast 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character."
        ),
    ConfirmPassword: Yup.string()
        .required("Confirm Password is required.")
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            "Password must contain atleast 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character."
        ),
});


export const addProductchema = Yup.object({
    Name: Yup.string()
        .required("Name is required.").min(1, "FirstName must be between 1 and 50 characters.")
        .max(50, "FirstName must be between 1 and 50 characters."),
    Category: Yup.string().required("Category is required."),
    Price: Yup.string().required("Price is required."),
    Quantity: Yup.string().required("Quantity is required."),
    Desctiption: Yup.string().required("Desctiption is required.").min(1, "Desctiption must be between 1 and 200 characters.")
        .max(200, "Desctiption must be between 1 and 200 characters."),
    Image: Yup.string().required("Image is required.").url("Enter valid url"),


});


export const addEmployeetchema = Yup.object({
    Name: Yup.string()
        .required("Name is required.").min(1, "FirstName must be between 1 and 50 characters.")
        .max(50, "Name must be between 1 and 50 characters."),
    Address: Yup.string().required("Address is required.").min(1, "Address must be between 1 and 200 characters.")
        .max(12, "Address must be between 1 and 200 characters."),
    Age: Yup.string().required("Age is required.").min(1, "Age must be between 1 and 3 characters.")
        .max(3, "Age must be between 1 and 3 characters."),
    Salary: Yup.string().required("Salary is required"),
});

export const addCompanyschema = Yup.object({
    CompanyName: Yup.string()
        .required("CompanyName is required.").min(1, "FirstName must be between 1 and 50 characters.")
        .max(50, "CompanyName must be between 1 and 50 characters."),
    CompanyAddress: Yup.string().required("CompanyAddress is required.").min(1, "Address must be between 1 and 200 characters.")
        .max(200, "CompanyAddress must be between 1 and 200 characters."),
    CompanyPhoneNumber: Yup.string().required("CompanyPhoneNumber is required."),
    CompanyGst: Yup.string().required("CompanyGst is required"),
});


export const updateUserSchema = Yup.object({
    FirstName: Yup.string()
        .required("FirstName is required")
        // .matches(/^[a-zA-Z_ ]*$/, "No special characters allowed.")
        .min(1, "FirstName must be between 1 and 16 characters.")
        .max(25, "FirstName must be between 2 and 16 characters."),
    LastName: Yup.string()
        .required("LastName is required")
        // .matches(/^[a-zA-Z_ ]*$/, "No special characters allowed.")
        .min(1, "LastName must be between 1 and 16 characters.")
        .max(25, "LastName must be between 2 and 16 characters."),
    Email: Yup.string()
        .required("Email address is required.")
        .email("Invalid email address.").optional(),
});
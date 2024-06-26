import React, { useEffect, useState } from "react";

//Third party libraries
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addProductchema } from "../../utils/Validation";
import Input from "../../components/Input/Input";
import { IoMdClose } from "react-icons/io";
import {
  CompanyListofProduct,
  CreateProduct,
  EditProduct,
} from "../GlobalApi/Index";
import { addProduct } from "../../Redux/slices/productlist";
import { useDispatch } from "react-redux";

const AddProduct = ({ close, id, product_id, edit, datas }) => {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("Token");

  const [loader, setLoader] = useState(false);

  //Form validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addProductchema),
  });

  useEffect(() => {
    if (edit && product_id) {
      const filter = datas.filter((i) => i.product_id === product_id)[0];
      reset({
        Name: filter.name,
        Category: filter.category,
        Price: filter.price,
        Quantity: filter.quantity,
        Desctiption: filter.description,
        Image: filter.image,
      });
    }
  }, [edit, product_id]);

  const onSubmit = async (data) => {
    setLoader(true);
    const reqData = {
      name: data.Name,
      category: data.Category,
      price: data.Price,
      quantity: data.Quantity,
      description: data.Desctiption, // Typo: should be "Description" instead of "Desctiption"
      image: data.Image,
    };

    // Function to fetch company products and dispatch
    const fetchCompanyProducts = async () => {
      const response = await CompanyListofProduct({
        company_id: id,
      });
      if (response.success) {
        setLoader(false);
        dispatch(addProduct(response.data));
        close(false);
      }
    };

    if (!edit) {
      reqData.company_id = id;
      const response = await CreateProduct(reqData, userToken);
      if (response.success) {
        await fetchCompanyProducts();
      }
    } else {
      reqData.product_id = product_id;
      const response = await EditProduct(reqData);
      if (response.success) {
        await fetchCompanyProducts();
      }
    }
  };

  return (
    <div className=" absolute top-0 left-0 w-full z-40 h-[110vh] flex items-center justify-center bg-[#1111118f]">
      <div className=" relative w-[400px] py-4 rounded-lg bg-white p-3">
        <div
          onClick={() => close(false)}
          className=" cursor-pointer absolute -top-3 -right-2 flex items-center justify-center w-[20px] h-[20px] rounded-full bg-red-500"
        >
          <IoMdClose size={16} className=" text-white" />
        </div>

        <p className=" text-center font-medium">Add Product</p>
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <Input
            name="Name"
            type="text"
            placeholder="Enter product name"
            register={register}
            error={errors?.Name?.message}
          />

          <Input
            name="Category"
            type="text"
            placeholder="Enter category name"
            register={register}
            error={errors?.Category?.message}
          />

          <Input
            name="Quantity"
            type="text"
            placeholder="Enter product quantity"
            register={register}
            error={errors?.Quantity?.message}
          />

          <Input
            name="Price"
            type="number"
            placeholder="Enter product price"
            register={register}
            error={errors?.Price?.message}
          />

          <Input
            name="Desctiption"
            type="text"
            placeholder="Enter product Desctiption"
            register={register}
            error={errors?.Desctiption?.message}
          />
          <Input
            name="Image"
            type="url"
            placeholder="Enter product Image URL"
            register={register}
            error={errors?.Image?.message}
          />
          <button
            type="submit"
            className="flex items-center justify-center w-full px-8 h-[30px] max-h-[30px] mt-5 text-[14px] font-medium text-white transition-all duration-200 bg-[#4F46E5] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray"
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
              <>{edit ? "Edit Product" : "Create product"}</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

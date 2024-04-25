import React, { useEffect, useState } from "react";

import { FaPlus } from "react-icons/fa6";
import Card from "../../components/Card/Card";
import AddProduct from "../../components/Popup/AddProduct";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { CompanyListofProduct } from "../../components/GlobalApi/Index";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../Redux/slices/productlist";
import DeletePopup from "../../components/Popup/deletePopup";
import { IoMdArrowBack } from "react-icons/io";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [productPopup, setProductPopup] = useState(false);
  const [searchParams] = useSearchParams();
  const ID = searchParams.get("id");
  const [product_id, setProduct_id] = useState(null);
  const [edit, setEdit] = useState(false);

  const [deletePopup, setDeletePopup] = useState(false);
  const [company_id, setCompany_id] = useState(null)

  const { productlist } = useSelector((state) => state.productlist);

  useEffect(() => {
    const API = async () => {
      if (ID) {
        const response = await CompanyListofProduct({ company_id: ID });
        if (response.success) {
          dispatch(addProduct(response.data));
        }
      }
    };
    API();
  }, [ID]);

  return (
    <div>
      <div className=" w-full mt-4 flex items-end justify-between">

      <button
          onClick={() => {
            navigate('/')
          }}
          className=" flex items-center justify-center gap-2 cursor-pointer bg-[#4F46E5] hover:bg-[#4e46e5d0] text-white w-[100px] h-[35px] rounded-lg"
        >
           <IoMdArrowBack size={16} /> Go Back
        </button>


        <button
          onClick={() => {
            setProductPopup(true);
            setProduct_id(null);
            setEdit(false);
          }}
          className=" flex items-center justify-center gap-2 cursor-pointer bg-[#4F46E5] hover:bg-[#4e46e5d0] text-white w-[160px] h-[35px] rounded-lg"
        >
          Add Product <FaPlus size={16} />
        </button>
      </div>

      <div>
        <p className=" text-lg font-medium">Product List</p>

        <div className=" w-[100%] h-[400px] my-3 overflow-auto p-3 flex items-center flex-wrap gap-3">
          {productlist?.length === 0 ? (
            <p className=" flex items-center justify-center w-full text-[16px] font-medium">
              No Product availabe
            </p>
          ) : (
            <>
              {productlist?.map((i, index) => {
                return (
                  <Card
                    key={index}
                    title={i.name}
                    quantity={i.quantity}
                    price={i.price}
                    desc={i.description}
                    product_id={i.product_id}
                    setProductPopup={setProductPopup}
                    setEdit={setEdit}
                    setProduct_id={setProduct_id}
                    setDeletePopup={setDeletePopup}
                    company_id={i.company_id}
                    setCompany_id={setCompany_id}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>

      {productPopup && (
        <AddProduct
          close={setProductPopup}
          id={ID}
          product_id={product_id}
          edit={edit}
          datas={productlist}
        />
      )}

      {deletePopup && <DeletePopup close={setDeletePopup} id={product_id} name="product" company_id={company_id} />}
    </div>
  );
};

export default Product;

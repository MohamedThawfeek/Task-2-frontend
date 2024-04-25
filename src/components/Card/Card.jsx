import React, { useState } from "react";

//Thisr party libraries
import CurrencyFormat from "react-currency-format";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


const Card = ({ title, quantity, price, desc, setProductPopup, product_id, setEdit, image, setProduct_id, setDeletePopup, company_id, setCompany_id }) => {
  const [icons, seticons] = useState(false);
  return (
    <div
      onMouseEnter={() => seticons(true)}
      onMouseLeave={() => seticons(false)}
      style={{ boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)" }}
      className=" relative w-[250px] h-[300px] rounded-lg overflow-hidden"
    >
      <img
        src={image}
        className=" w-full h-[150px] object-fill"
        alt=""
      />

      <p className=" text-[16px] font-normal ml-2 mt-2">{title}</p>
      <p className=" text-[12px] font-extralight ml-2 mt-2">{quantity}</p>
      <p className=" ml-2 mt-2">
        <CurrencyFormat
          value={price}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₹"}
          renderText={(value) => <div>{value}</div>}
        />
      </p>

      <p className=" text-[10px] ml-2 mt-2 font-semibold">Description</p>

      <p className="text-[10px] text-ellipsis px-2 line-clamp-2">{desc}</p>

      {icons && (
       <div className=" flex items-center gap-2">
         <p onClick={() => {
          setProductPopup(true)
          setEdit(true)
          setProduct_id(product_id)
        }} className=" cursor-pointer absolute top-2 right-2 hover:bg-white text-white border-[1px] border-white rounded-full p-1 ">
          <MdEdit size={16} className="hover:text-black" />
        </p>
        <p onClick={() => {
          setCompany_id(company_id)
          setDeletePopup(true)
          setProduct_id(product_id)
        }} className=" cursor-pointer absolute top-2 right-10 hover:bg-white hover:text-red-500 text-white border-[1px] border-white rounded-full p-1 ">
          <MdDelete size={16} className="" />
        </p>
       </div>
      )}
    </div>
  );
};

export default Card;

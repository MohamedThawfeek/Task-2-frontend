import React, { useEffect, useState } from "react";

import { FaPlus } from "react-icons/fa6";
import Pagination from "react-responsive-pagination";
import ReactTooltip from "react-tooltip";
import DataTable from "react-data-table-component";
import "react-responsive-pagination/themes/classic.css";
import { LuChevronsDown } from "react-icons/lu";

import AddEmployee from "../../components/Popup/Employee";
import { CompanyListofEmployee } from "../../components/GlobalApi/Index";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../../Redux/slices/employeelist";
import DeletePopup from "../../components/Popup/deletePopup";

const Employee = () => {
  const dispatch = useDispatch();
  const [productPopup, setProductPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);
  const [searchParams] = useSearchParams();
  const ID = searchParams.get("id");
  const [employeeID, setemployeeID] = useState(null);
  const [edit, setEdit] = useState(false);

  const [deletePopup, setDeletePopup] = useState(false);
  const [company_id, setCompany_id] = useState(null)

  const { employeelist } = useSelector((state) => state.employeelist);

  useEffect(() => {
    const API = async () => {
      if (ID) {
        const response = await CompanyListofEmployee({ company_id: ID });
        if (response.success) {
          return dispatch(addEmployee(response.data));
        }
      }
    };
    API();
  }, [ID]);

  const columns = [
    {
      name: "Sl.No.",
      selector: (_, index) => index + 1,
      sortable: true,
      center: true,
      width: "150px",
    },
    {
      name: "Name",
      selector: (row) => (
        <div>
          <p
            className="text-truncate mt-1"
            data-tip={`${row?.name}`}
            data-for="test"
          >
            {row?.name}
          </p>
          <ReactTooltip id="test" effect="solid" place="bottom" />
        </div>
      ),
      sortable: true,
      center: true,
      width: "200px !important",
    },
    {
      name: "Address",
      selector: (row) => (
        <div>
          <p
            className="text-ellipsis mt-1"
            data-tip={`${row?.address}`}
            data-for="test"
          >
            {row?.address}
          </p>
          <ReactTooltip id="test" effect="solid" place="bottom" />
        </div>
      ),
      sortable: true,
      center: true,
      width: "200px !important",
    },
    {
      name: "Phone Number",
      selector: (row) => (
        <div>
          <p
            className="text-truncate mt-1"
            data-tip={`${row?.phonenumber}`}
            data-for="test"
          >
            {row?.phonenumber}
          </p>
          <ReactTooltip id="test" effect="solid" place="bottom" />
        </div>
      ),
      sortable: true,
      center: true,
      width: "200px !important",
    },
    {
      name: "Age",
      selector: (row) => (
        <div>
          <p
            className="text-truncate mt-1"
            data-tip={`${row?.age}`}
            data-for="test"
          >
            {row?.age}
          </p>
          <ReactTooltip id="test" effect="solid" place="bottom" />
        </div>
      ),
      sortable: true,
      center: true,
      width: "200px !important",
    },
    {
      name: "Gender",
      selector: (row) => row?.gender,
      sortable: true,
      center: true,
      width: "200px !important",
    },
    {
      name: "Salary",
      selector: (row) => `₹ ${row?.salary}`,
      sortable: true,
      center: true,
      width: "200px !important",
    },
    {
      name: "Role",
      selector: (row) => row?.role,
      sortable: true,
      center: true,
      width: "200px !important",
    },
    {
      name: "Edit",
      selector: (row) => (
        <div
          onClick={() => {
            setemployeeID(row.employee_id);
            setEdit(true);
            setProductPopup(true);
          }}
        >
          {console.log("rrr", row)}
          <p className=" text-blue-500">Edit</p>
        </div>
      ),
      sortable: true,
      center: true,
      width: "200px !important",
    },
    {
      name: "Delete",
      selector: (row) => (
        <div className=" cursor-pointer"
          onClick={() => {
            setemployeeID(row.employee_id);
            setDeletePopup(true);
            setCompany_id(row.company_id);
          }}
        >
          <p className=" text-red-500">Delete</p>
        </div>
      ),
      sortable: true,
      center: true,
      width: "200px !important",
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const CustomPagination = () => {
    return (
      <>
        <div className="flex justify-end mt-2 mr-3">
          <Pagination
            total={Math.ceil(employeelist.length / postPerPage)}
            current={currentPage}
            onPageChange={(page) => handlePageChange(page)}
            maxWidth={200}
          />
        </div>
      </>
    );
  };

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = employeelist?.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      <div className=" w-full mt-6 flex items-end justify-end">
        <button
          onClick={() => {
            setProductPopup(true);
            setemployeeID(null);
            setEdit(false);
          }}
          className=" flex items-center justify-center gap-2 cursor-pointer bg-[#4F46E5] hover:bg-[#4e46e5d0] text-white w-[160px] h-[35px] rounded-lg"
        >
          Add Employee <FaPlus size={16} />
        </button>
      </div>

      <div>
        <p className=" text-lg font-medium">Employee List</p>

        <div
          style={{ boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)" }}
          className=" w-[100%] py-3 my-3"
        >
          <DataTable
            pagination
            columns={columns}
            data={currentPost}
            noHeader
            subHeader
            responsive
            paginationServer
            fixedHeader
            sortIcon={<LuChevronsDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
          />
        </div>
      </div>

      {productPopup && (
        <AddEmployee
          close={setProductPopup}
          id={ID}
          employeeID={employeeID}
          edit={edit}
          datas={employeelist}
        />
      )}
      {deletePopup && <DeletePopup close={setDeletePopup} id={employeeID} name="employee" company_id={company_id} />}

    </div>
  );
};

export default Employee;

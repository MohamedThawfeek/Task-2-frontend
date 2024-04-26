import React, { useState, useEffect } from "react";
import { LuChevronsDown } from "react-icons/lu";
import Pagination from "react-responsive-pagination";
// import ReactTooltip from "react-tooltip";
import DataTable from "react-data-table-component";
import "react-responsive-pagination/themes/classic.css";
import { useNavigate } from "react-router";
import { FaPlus } from "react-icons/fa6";
import AddCompany from "../../components/Popup/AddCompany";
import Navbar from "../../components/Navbar/Navbar";
import { ListofCompany } from "../../components/GlobalApi/Index";
import { addCompany } from "../../Redux/slices/companyList";
import { useDispatch, useSelector } from "react-redux";
import DeletePopup from "../../components/Popup/deletePopup";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("Token");
  const { companylist } = useSelector((state) => state.companylist);
  const [currentPage, setCurrentPage] = useState(1);
  const [company, setCompany] = useState(false);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);

  useEffect(() => {
    const API = async () => {
      if (userToken) {
        const response = await ListofCompany(userToken);
        console.log('ss', response)
        if (response.success) {
          return dispatch(addCompany(response.data));
        }
      }
    };
    API();
  }, [userToken, dispatch]);

  const columns = [
    {
      name: "Sl.No.",
      selector: (_, index) => index + 1,
      sortable: true,
      center: true,
      width: "150px",
    },
    {
      name: "Company Name",
      selector: (row) => (
        <div>
          <p
            className="text-truncate mt-1"
            data-tip={`${row?.name}`}
            data-for="test"
          >
            {row?.name}
          </p>
          {/* <ReactTooltip id="test" effect="solid" place="bottom" /> */}
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
            className="text-truncate mt-1"
            data-tip={`${row?.address}`}
            data-for="test"
          >
            {row?.address}
          </p>
          {/* <ReactTooltip id="test" effect="solid" place="bottom" /> */}
        </div>
      ),
      sortable: true,
      center: true,
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
          {/* <ReactTooltip id="test" effect="solid" place="bottom" /> */}
        </div>
      ),
      sortable: true,
      center: true,
      width: "200px !important",
    },
    {
      name: "GST Number",
      selector: (row) => row?.gstnumber,
      sortable: true,
      center: true,
      width: "200px !important",
    },
    {
      name: "Edit",
      selector: (row) => (
        <div
          className=" cursor-pointer"
          onClick={() => {
            setCompany(true);
            setEdit(true);
            setId(`${row.company_id}`);
          }}
        >
          <p className=" text-[#4F46E5]">Edit</p>
        </div>
      ),
      sortable: true,
      center: true,
      width: "150px !important",
    },
    {
      name: "View",
      selector: (row) => (
        <div
          className=" cursor-pointer"
          onClick={() => navigate(`/companydetails?id=${row.company_id}`)}
        >
          <p className=" text-[#4F46E5]">View</p>
        </div>
      ),
      sortable: true,
      center: true,
      width: "150px !important",
    },

    {
      name: "Delete",
      selector: (row) => (
        <div
          className=" cursor-pointer"
          onClick={() => {
            setDeletePopup(true);
            setId(`${row.company_id}`);
          }}
        >
          <p className=" text-red-500">Delete</p>
        </div>
      ),
      sortable: true,
      center: true,
      width: "150px !important",
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
            total={Math.ceil(companylist.length / 3)}
            current={currentPage}
            onPageChange={(page) => handlePageChange(page)}
            maxWidth={200}
          />
        </div>
      </>
    );
  };

  const indexOfLastPost = currentPage * 3;
  const indexOfFirstPost = indexOfLastPost - 3;
  const currentPost = companylist?.slice(indexOfFirstPost, indexOfLastPost);
  return (
    <div className=" w-full h-full flex items-center justify-center flex-col my-4">
      <Navbar />

      <div className=" w-[90%] py-4">
        <div className=" w-full my-3 flex items-end justify-end">
          <button
            onClick={() => setCompany(true)}
            className=" flex items-center justify-center gap-2 cursor-pointer bg-[#4F46E5] hover:bg-[#4e46e5d0] text-white w-[160px] h-[35px] rounded-lg"
          >
            Add Company <FaPlus size={16} />
          </button>
        </div>
        <div
          style={{ boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)" }}
          className="p-2 "
        >
          <p className=" text-[16px] font-medium capitalize">List of company</p>
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
      {company && (
        <AddCompany
          close={setCompany}
          id={id}
          edit={edit}
          datas={companylist}
        />
      )}

      {deletePopup && (
        <DeletePopup close={setDeletePopup} id={id} name="company" />
      )}
    </div>
  );
};

export default Dashboard;

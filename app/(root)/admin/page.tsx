"use client";
import { Header, SiteInfo, Statistics, Locations } from "@/components/admin";
import { FileWarning, Info } from "lucide-react";
import React from "react";
import { FaSpinner } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoWarningOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const CustomIcon = (props) => {
  if (props.isLoading) return <FaSpinner />;

  switch (props.type) {
    case "info":
      return <Info />;
    case "success":
      return <IoMdCheckmarkCircleOutline color={"green"} />;
    case "error":
      return <MdErrorOutline color={"red"} />;
    case "warning":
      return <IoWarningOutline />;
    default:
      return <IoMdCheckmarkCircleOutline color={"green"} />;
  }
};
const AdminPage = () => {
  const notify = () =>
    toast("olivia.martin@email.com - monthly", {
      progressClassName: "bg-blue-500", // Customize tail color if needed
      // closeButton: false, // Removes close button for a cleaner look
      draggable: true, // Allows dragging to reorder toasts
      pauseOnHover: true, // Makes the bar stop progressing when hovering
      autoClose: 5000, // Closes toast automatically in 5 seconds
    });

  return (
    <div className="bg- [#F6F6F6] w-full h-full">
      <Header />
      <div className="px-5">
        <SiteInfo />
        <Statistics />
        <Locations />
      </div>
      <div>
        <button
          onClick={notify}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Notify!
        </button>
        <ToastContainer
          icon={CustomIcon}
          stacked
          position="bottom-right" // Or another position if you prefer
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" // Set to "dark" if preferred
        />
      </div>
    </div>
  );
};

export default AdminPage;

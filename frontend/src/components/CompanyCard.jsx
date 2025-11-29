import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axios.util";

// {
//   logo, name, rating, price, deliveryTime, features, payment;
// }

const CompanyCard = () => {
  const [isLoading, setisLoading] = useState(false);
  const handleConfirm = async (companyId) => {
    try {
      setisLoading(true);
      const { data: response } = await axiosInstance.post(
        `/orders/${"orderId"}/confirm`,
        {
          companyId,
          paymentMethod: "pay_now"
        }
      );
      console.log("Order confirmed:", response);

      if (response?.success && response.data?.authorizationUrl) {
        window.location.href = `${response.data?.authorizationUrl}`;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <div className="border p-4 rounded  shadow ">
      <div id="companyInfo" className="flex gap-2 items-start">
        <div className="company-image overflow-hidden bg-gray-500 size-12 rounded-full  mask-circle">
          <img src="/test.jpg" alt="" />
        </div>
        <div className="company-info  flex flex-col">
          <p className="text-xl font-semibold text-green-950 p-0 m-0">
            Lorem Ipsum
          </p>
          <span className="flex gap-2 text-[.8rem] text-green-900/70">
            <span>@ 5.0</span>
            <span>25 Reviews</span>
          </span>
        </div>
      </div>
      <div className="card-body mt-4 flex flex-wrap  gap-4">
        <div className="flex flex-col justify-start gap-0">
          <span className="text-[0.7rem] text-green-700 p-0">Price</span>
          <span className="text-[1.2rem] font-semibold text-green-900 p-0">
            $3,500
          </span>
        </div>
        <div className="flex flex-col justify-start gap-0">
          <span className="text-[0.7rem] text-green-700 p-0">
            Estimated delivery time
          </span>
          <span className="text-[1.2rem] font-semibold text-green-900 p-0">
            4 hours
          </span>
        </div>
        {/* <div className="flex flex-col justify-start gap-0">
          <span className="text-[0.7rem] text-green-700 p-0">Price</span>
          <span className="text-[1.2rem] font-semibold text-green-900 p-0">
            $3,500
          </span>
        </div>
        <div className="flex flex-col justify-start gap-0">
          <span className="text-[0.7rem] text-green-700 p-0">Price</span>
          <span className="text-[1.2rem] font-semibold text-green-900 p-0">
            $3,500
          </span>
        </div>
        <div className="flex flex-col justify-start gap-0">
          <span className="text-[0.7rem] text-green-700 p-0">Price</span>
          <span className="text-[1.2rem] font-semibold text-green-900 p-0">
            $3,500
          </span>
        </div> */}
      </div>
      <div className="cta  my-6">
        <button
          onClick={() => handleConfirm("")}
          disabled={isLoading}
          className={`0 hover:bg-green-500   text-white px-4 py-2 rounded shadow ${
            isLoading ? "bg-green-500" : "bg-green-700"
          } `}
        >
          {` ${isLoading ? "Processing..." : "Book Now"}`}
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;

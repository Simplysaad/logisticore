import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import splitQuery from "../utils/splitQuery";
import axiosInstance from "../utils/axios.util";

const OrderConfirm = () => {
  const [prices, setPrices] = useState([]);
  const location = useLocation();

  const { id } = splitQuery(location.search);
  useEffect(() => {
    async function fetchPrices() {
      try {
        const { data: response } = await axiosInstance.get(`/orders/${id}/`);
        if (response?.success) {
          setPrices(response.data?.prices);
          console.log(response);
        } else throw response?.message || "Could not get prices, try again";
      } catch (err) {
        console.error(err);
      }
    }
    fetchPrices();
  }, [location]);

  async function handleConfirm(companyId, orderId = id) {
    try {
      const { data: response } = await axiosInstance.post(
        `/orders/${orderId}/confirm`,
        {
          companyId,
          paymentMethod: "pay_now",
        }
      );

      console.log("response", response);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {prices?.map((company, idx) => (
            <tr key={idx}>
              <td onClick={() => handleConfirm(company._id)} className="">
                {company.name}
              </td>
              <td className="">{company.price.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderConfirm;

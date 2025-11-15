import React, { useEffect, useState } from "react";
import {
  redirect,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import splitQuery from "../utils/splitQuery";
import axiosInstance from "../utils/axios.util";
import Header from "../components/Header";
import Footer from "../components/Footer";

const OrderConfirm = () => {
  const [prices, setPrices] = useState([]);
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const { orderId } = params;
  console.log(params);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const { data: response } = await axiosInstance.get(
          `/orders/${orderId}/`
        );
        if (response?.success) {
          setPrices(response.data?.prices || []);
          console.log("Fetched prices:", response);
        } else {
          throw new Error(response?.message || "Failed to fetch prices");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPrices();
  }, [orderId]);

  const handleConfirm = async (companyId) => {
    try {
      const { data: response } = await axiosInstance.post(
        `/orders/${orderId}/confirm`,
        {
          companyId,
          paymentMethod: "pay_now",
        }
      );
      console.log("Order confirmed:", response);

      if (response?.success && response.data?.authorizationUrl) {
        window.location.href = `${response.data?.authorizationUrl}`;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="text-left py-3 px-4">Company Name</th>
              <th className="text-right py-3 px-4">Price</th>
            </tr>
          </thead>
          <tbody>
            {prices.length ? (
              prices.map(({ _id, name, price }) => (
                <tr
                  key={_id}
                  className="cursor-pointer hover:bg-green-100"
                  onClick={() => handleConfirm(_id)}
                >
                  <td className="py-3 px-4">{name}</td>
                  <td className="py-3 px-4 text-right font-semibold">
                    {price.toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={2}
                  className="text-center py-6 text-gray-500 italic"
                >
                  No pricing data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
      <Footer />
    </>
  );
};

export default OrderConfirm;

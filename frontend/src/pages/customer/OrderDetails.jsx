import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios.util";
import Layout from "./Layout";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [trackingHistory, setTrackingHistory] = useState([]);
  const [showTrackingInline, setShowTrackingInline] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: response } = await axiosInstance.get(
          `/orders/${orderId}`
        );

        console.log(response);
        if (response.success) {
          setOrder(response.data);
        } else {
          setError(response.message || "Failed to load order details");
        }
      } catch {
        setError("Error fetching order details");
      }
      setLoading(false);
    };

    fetchOrderDetails();
  }, [orderId]);

  useEffect(() => {
    if (showTrackingInline) {
      const fetchTrackingHistory = async () => {
        try {
          const { data: response } = await axiosInstance.get(
            `/orders/${orderId}/track`
          );

          console.log(response);

          if (response.success) {
            setTrackingHistory(response.data.trackingHistory || []);
          } else {
            setTrackingHistory([]);
          }
        } catch {
          setTrackingHistory([]);
        }
      };
      fetchTrackingHistory();
    }
  }, [orderId, showTrackingInline]);

  if (loading) {
    return (
      <Layout>
        <main className="container mx-auto p-4 text-green-500">
          Loading order details...
        </main>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <main className="container mx-auto p-4 text-red-600">{error}</main>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <main className="container mx-auto p-4 text-gray-600">
          No order found.
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="container mx-auto p-6">
        <h2 className="text-green-600 text-2xl font-semibold mb-4">
          Order Details (ID: {orderId})
        </h2>
        <div className="bg-white shadow rounded p-6 mb-6">
          <div className="mb-2">
            <span className="font-semibold">Distance: </span>
            {order.distance} km
          </div>
          <div className="mb-2">
            <span className="font-semibold">Weight: </span>
            {order.weight} kg
          </div>
          <div className="mb-2">
            <span className="font-semibold">Date: </span>
            {new Date(order.createdAt).toLocaleString()}
          </div>
          <div className="mb-4">
            <h3 className="text-green-500 font-semibold mb-2">
              Pricing Choice:
            </h3>
            <p>company: {order.companyId?.name}</p>
            <p>price: ${order.price?.toLocaleString()}</p>
            {/* <ul className="list-disc list-inside">
              {order.prices?.map(({ _id, name, price }) => (
                <li key={_id} className="mb-1">
                  {name}:{" "}
                  <span className="font-medium">{price.toLocaleString()}</span>
                </li>
              ))}
            </ul> */}
          </div>
          <div>
            <Link
              to={`/orders/${orderId}/track`}
              className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Track Order
            </Link>
          </div>
          <div className="mt-6">
            <button
              onClick={() => setShowTrackingInline((prev) => !prev)}
              className="text-green-500 underline hover:text-green-700 transition"
            >
              {showTrackingInline
                ? "Hide Tracking History"
                : "Show Tracking History"}
            </button>
          </div>
          {showTrackingInline && (
            <div className="mt-6">
              <h3 className="text-green-600 font-semibold mb-4">
                Tracking History
              </h3>
              {trackingHistory.length === 0 ? (
                <p className="italic text-gray-500">
                  No tracking history available.
                </p>
              ) : (
                <ol className="border-l-4 border-green-500 pl-6 space-y-4">
                  {trackingHistory.map(({ status, timestamp }, idx) => (
                    <li key={idx} className="relative">
                      <span className="absolute -left-5 top-1 bg-green-500 rounded-full w-4 h-4"></span>
                      <p className="font-medium text-green-700">{status}</p>
                      <time className="block text-sm text-gray-600">
                        {new Date(timestamp).toLocaleString()}
                      </time>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default OrderDetails;

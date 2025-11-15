import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios.util";
import Layout from "./Layout";

const OrderTracking = () => {
  const { orderId } = useParams();
  const [trackingHistory, setTrackingHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) return;
    const fetchTracking = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: response } = await axiosInstance.get(
          `/orders/${orderId}/track`
        );

        console.log(response);

        if (response.success) {
          setTrackingHistory(response.data.trackingHistory || []);
        } else {
          setError(response.message || "Failed to load tracking data");
        }
      } catch (err) {
        setError("Error fetching tracking data");
      }
      setLoading(false);
    };
    fetchTracking();
  }, [orderId]);

  return (
    <Layout>
      <main className="container mx-auto px-4 py-8 min-h-[60vh]">
        <h2 className="text-xl font-semibold mb-6 text-green-600">
          Order Tracking - ID: {orderId}
        </h2>
        {loading && (
          <p className="text-green-500">Loading tracking information...</p>
        )}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && trackingHistory.length === 0 && (
          <p className="italic text-gray-500">
            No tracking history available for this order.
          </p>
        )}
        {!loading && !error && trackingHistory.length > 0 && (
          <ol className="border-l-4 border-green-500 pl-6 space-y-6">
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
      </main>
    </Layout>
  );
};

export default OrderTracking;

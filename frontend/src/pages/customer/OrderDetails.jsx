import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios.util";
import {
  Package,
  MapPin,
  Clock,
  User,
  Truck,
  DollarSign,
  CheckCircle,
  XCircle,
  Calendar,
  FileText,
  Map,
  ChevronDown,
  ChevronUp,
  RefreshCw
} from "lucide-react";
import Layout from "./Layout";
import CompanyCard from "../../components/CompanyCard";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trackingHistory, setTrackingHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  useEffect(() => {
      fetchTrackingHistory();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: response } = await axiosInstance.get(`/orders/${orderId}`);
      if (response.success) {
        setOrder(response.data);
      } else {
        setError(response.message || "Failed to load order details");
      }
    } catch (err) {
      setError("Error fetching order details");
    } finally {
      setLoading(false);
    }
  };

  const fetchTrackingHistory = async () => {
    try {
      const { data: response } = await axiosInstance.get(
        `/orders/${orderId}/track`
      );
      if (response.success) {
        setTrackingHistory(response.data.trackingHistory || []);
      }
    } catch {
      setTrackingHistory([]);
    }
  };

  const refreshOrder = async () => {
    setRefreshing(true);
    await fetchOrderDetails();
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      delivered: "bg-green-100 text-green-800 border-green-200",
      "in transit": "bg-blue-100 text-blue-800 border-blue-200",
      "picked up": "bg-yellow-100 text-yellow-800 border-yellow-200",
      accepted: "bg-indigo-100 text-indigo-800 border-indigo-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
      default: "bg-gray-100 text-gray-800 border-gray-200"
    };
    return colors[status?.toLowerCase()] || colors.default;
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 flex items-center justify-center p-8">
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 shadow 2xl border border-white/50 text-center">
            <RefreshCw className="w-16 h-16 text-green-500 animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Loading Order Details
            </h2>
            <p className="text-gray-600">
              Please wait while we fetch your order...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !order) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 flex items-center justify-center p-8">
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 shadow border border-white/50 text-center max-w-md mx-auto">
            <XCircle className="w-20 h-20 text-red-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Order Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              {error || "No order found with this ID."}
            </p>
            <button
              onClick={refreshOrder}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-200 shadow lg hover:shadow xl flex items-center mx-auto space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 py-8">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow -xl border border-white/50 p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl shadow -lg">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Order #{orderId?.slice(-8)}
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Order placed{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={refreshOrder}
                disabled={refreshing}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-8 rounded-2xl shadow lg hover:shadow xl transition-all duration-200 flex items-center space-x-2 whitespace-nowrap disabled:opacity-50"
              >
                <RefreshCw
                  className={`max-w-5 h-5 ${refreshing ? "animate-spin" : ""}`}
                />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary Card */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow xl border border-white/50 p-8 order-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="w-7 h-7 mr-3 text-green-500" />
                Order Summary
              </h2>

              {/* Status Badge */}
              <div
                className={`inline-flex items-center px-6 py-3 rounded-2xl mb-8 font-semibold shadow lg ${getStatusColor(
                  order.status
                )} border-2`}
              >
                <div className="w-3 h-3 bg-current rounded-full mr-3"></div>
                {order.status || "Pending"}
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                    <MapPin className="w-8 h-8 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        Distance
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {order.distance} km
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl">
                    <Package className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        Weight
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {order.weight}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pricing Choice */}
                {/* {order.companyId && (
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl border-2 border-green-100">
                    <h3 className="font-bold text-lg text-green-900 mb-4 flex items-center">
                      <Truck className="w-6 h-6 mr-2 text-green-500" />
                      Selected Provider
                    </h3>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white rounded-2xl shadow sm">
                        <DollarSign className="w-6 h-6 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">Company</p>
                        <p className="font-bold text-xl">
                          {order.companyId.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Price</p>
                        <p className="text-2xl font-bold text-green-600">
                          ₦{order.price?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )} */}

                <CompanyCard company={order.companyId} booked orderPrice={order.price} />
              </div>
            </div>

            {/* Tracking Card */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow xl border border-white/50 p-8 order-2 lg:order-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Map className="w-7 h-7 mr-3 text-blue-500" />
                  Delivery Tracking
                </h2>
               
              </div>

              <div className="space-y-4">
                {/* {trackingHistory.length === 0 ? (
                    <div className="text-center py-12">
                      <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg font-medium">
                        No tracking updates yet
                      </p>
                      <p className="text-gray-400">
                        Your delivery partner will update you soon
                      </p>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-blue-600 transform -translate-x-1/2"></div>
                      {trackingHistory.map(({ status, timestamp }, idx) => (
                        <div
                          key={idx}
                          className="relative flex items-center justify-center"
                        >
                          <div
                            className={`absolute w-5 h-5 rounded-full shadow lg z-10 ${getStatusColor(
                              status
                            )} border-4 border-white flex items-center justify-center`}
                          >
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div
                            className={`bg-white p-6 rounded-2xl shadow lg w-full max-w-md mx-auto ${
                              idx % 2 === 0 ? "order-1" : "order-2"
                            }`}
                          >
                            <p
                              className={`font-bold text-lg mb-1 ${
                                getStatusColor(status).includes("green")
                                  ? "text-green-800"
                                  : getStatusColor(status).includes("red")
                                  ? "text-red-800"
                                  : "text-gray-800"
                              }`}
                            >
                              {status}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}

                      
                    </div>
                  )} */}

                { (
                  <div className="mt-6">
                    <h3 className="text-green-600 font-semibold mb-4">
                      Tracking History
                    </h3>
                    {/* {trackingHistory.length === 0 ? (
                      <p className="italic text-gray-500">
                        No tracking history available.
                      </p>
                    ) : ( */}
                      <ol className="border-l-4 border-green-500 pl-6 space-y-4">
                        {trackingHistory?.map(({ status, timestamp }, idx) => (
                          <li key={idx} className="relative">
                            <span className="absolute -left-5 top-1 bg-green-500 rounded-full w-4 h-4"></span>
                            <p className="font-medium capitalize text-green-700">
                              {status}
                            </p>
                            <time className="block text-sm text-gray-600">
                              {new Date(timestamp).toLocaleString()}
                            </time>
                          </li>
                        ))}
                      </ol>
                    {/* )} */}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sender/Receiver Info - Bottom Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow xl border border-white/50 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <User className="w-6 h-6 mr-3 text-emerald-500" />
                Sender Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {order.sender?.name}
                    </p>
                    <p className="text-gray-600">{order.sender?.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-900 font-medium">
                    {order.sender?.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow xl border border-white/50 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <User className="w-6 h-6 mr-3 text-indigo-500" />
                Receiver Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {order.receiver?.name}
                    </p>
                    <p className="text-gray-600">
                      {order.receiver?.phoneNumber}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-900 font-medium">
                    {order.receiver?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;

import React, { useState } from "react";
import axiosInstance from "../../utils/axios.util";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Mail,
  Phone,
  Package,
  Ruler,
  MessageCircle
} from "lucide-react";
import Layout from "./Layout";

const CreateOrder = () => {
  const navigate = useNavigate();
  const [orderInit, setOrderInit] = useState({
    sender: {
      name: "",
      email: "",
      phoneNumber: "",
      address: ""
    },
    receiver: {
      name: "",
      email: "",
      phoneNumber: "",
      address: ""
    },
    description: "",
    instructions: "",
    weight: "less than 5kg",
    distance: 0
  });

  const handleSenderChange = (e) => {
    const { name, value } = e.target;
    setOrderInit((prev) => ({
      ...prev,
      sender: {
        ...prev.sender,
        [name]: value
      }
    }));
  };

  const handleReceiverChange = (e) => {
    const { name, value } = e.target;
    setOrderInit((prev) => ({
      ...prev,
      receiver: {
        ...prev.receiver,
        [name]: value
      }
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderInit((prev) => ({
      ...prev,
      [name]: name === "weight" || name === "distance" ? Number(value) : value
    }));
  };

  const weightSurchargeOptions = [
    "less than 5kg",
    "5kg to 10kg",
    "10kg to 15kg",
    "15kg to 20kg",
    "above 20kg"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: response } = await axiosInstance.post("/orders/", orderInit);
    if (response?.success) {
      console.log("Order submitted:", response);
      navigate(`/orders/${response.data?._id}/confirm`);
    }
  };

  return (
    <Layout>
      <main className="flex-1 p-8 max-w-4xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Start Your Delivery
        </h2>
        <p className="text-gray-600 mb-8">
          Fill in your delivery details below and let Logisticore handle the
          rest.
        </p>

        <form
          id="orderInit"
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-8 space-y-8"
        >
          {/* Sender Details */}
          <fieldset className="border border-gray-200 rounded-lg p-6">
            <legend className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="mr-2 text-green-500" size={20} />
              Sender Details
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="senderName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <span className="flex items-center">
                    <MapPin className="mr-2 text-green-500" size={16} />
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  id="senderName"
                  name="name"
                  value={orderInit.sender.name}
                  onChange={handleSenderChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="senderEmail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <span className="flex items-center">
                    <Mail className="mr-2 text-green-500" size={16} />
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  id="senderEmail"
                  name="email"
                  value={orderInit.sender.email}
                  onChange={handleSenderChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="senderPhone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <span className="flex items-center">
                    <Phone className="mr-2 text-green-500" size={16} />
                    Phone Number
                  </span>
                </label>
                <input
                  type="tel"
                  id="senderPhone"
                  name="phoneNumber"
                  value={orderInit.sender.phoneNumber}
                  onChange={handleSenderChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="senderAddress"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <span className="flex items-center">
                    <MapPin className="mr-2 text-green-500" size={16} />
                    Address
                  </span>
                </label>
                <input
                  type="text"
                  id="senderAddress"
                  name="address"
                  value={orderInit.sender.address}
                  onChange={handleSenderChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </fieldset>

          {/* Receiver Details */}
          <fieldset className="border border-gray-200 rounded-lg p-6">
            <legend className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="mr-2 text-green-500" size={20} />
              Receiver Details
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="receiverName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <span className="flex items-center">
                    <MapPin className="mr-2 text-green-500" size={16} />
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  id="receiverName"
                  name="name"
                  value={orderInit.receiver.name}
                  onChange={handleReceiverChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="receiverEmail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <span className="flex items-center">
                    <Mail className="mr-2 text-green-500" size={16} />
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  id="receiverEmail"
                  name="email"
                  value={orderInit.receiver.email}
                  onChange={handleReceiverChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="receiverPhone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <span className="flex items-center">
                    <Phone className="mr-2 text-green-500" size={16} />
                    Phone Number
                  </span>
                </label>
                <input
                  type="tel"
                  id="receiverPhone"
                  name="phoneNumber"
                  value={orderInit.receiver.phoneNumber}
                  onChange={handleReceiverChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="receiverAddress"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <span className="flex items-center">
                    <MapPin className="mr-2 text-green-500" size={16} />
                    Address
                  </span>
                </label>
                <input
                  type="text"
                  id="receiverAddress"
                  name="address"
                  value={orderInit.receiver.address}
                  onChange={handleReceiverChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </fieldset>

          {/* Order Details */}
          <fieldset className="border border-gray-200 rounded-lg p-6">
            <legend className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Package className="mr-2 text-green-500" size={20} />
              Order Details
            </legend>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <span className="flex items-center">
                    <MessageCircle className="mr-2 text-green-500" size={16} />
                    Description
                  </span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={orderInit.description}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="instructions"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <span className="flex items-center">
                    <MessageCircle className="mr-2 text-green-500" size={16} />
                    Instructions
                  </span>
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  value={orderInit.instructions}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="weight"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <span className="flex items-center">
                      <Package className="mr-2 text-green-500" size={16} />
                      Weight Range
                    </span>
                  </label>
                  <select
                    name=""
                    id=""
                    value={orderInit.weightRange}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {weightSurchargeOptions.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {/* <input
                    type="text"
                    id="weight"
                    name="weight"
                    required
                  /> */}
                </div>
                <div>
                  <label
                    htmlFor="distance"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <span className="flex items-center">
                      <Ruler className="mr-2 text-green-500" size={16} />
                      Distance (km)
                    </span>
                  </label>
                  <input
                    type="number"
                    id="distance"
                    name="distance"
                    value={orderInit.distance}
                    min="0"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          </fieldset>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-md transition duration-200 shadow-md"
            >
              Submit Order
            </button>
          </div>
        </form>
      </main>
    </Layout>
  );
};

export default CreateOrder;

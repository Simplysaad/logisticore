import React, { useState } from "react";
import axiosInstance from "../utils/axios.util";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [orderInit, setOrderInit] = useState({
    sender: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
    },
    receiver: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
    },
    description: "",
    instructions: "",
    weight: 0,
    distance: 0,
  });

  // Generic handler for nested state updates for sender and receiver
  const handleSenderChange = (e) => {
    const { name, value } = e.target;
    setOrderInit((prev) => ({
      ...prev,
      sender: {
        ...prev.sender,
        [name]: value,
      },
    }));
  };

  const handleReceiverChange = (e) => {
    const { name, value } = e.target;
    setOrderInit((prev) => ({
      ...prev,
      receiver: {
        ...prev.receiver,
        [name]: value,
      },
    }));
  };

  // Handler for other top-level fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderInit((prev) => ({
      ...prev,
      [name]: name === "weight" || name === "distance" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: response } = await axiosInstance.post("/orders/", orderInit);
    if (response?.success) {
      console.log("Order submitted:", response);
      navigate(`/order/confirm?id=${response.data?._id}`);
    }
    return null;
  };

  return (
    <div>
      <form id="orderInit" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Sender Details</legend>
          <label htmlFor="senderName">Name:</label>
          <input
            type="text"
            id="senderName"
            name="name"
            value={orderInit.sender.name}
            onChange={handleSenderChange}
            required
          />
          <br />
          <label htmlFor="senderEmail">Email:</label>
          <input
            type="email"
            id="senderEmail"
            name="email"
            value={orderInit.sender.email}
            onChange={handleSenderChange}
            required
          />
          <br />
          <label htmlFor="senderPhone">Phone Number:</label>
          <input
            type="tel"
            id="senderPhone"
            name="phoneNumber"
            value={orderInit.sender.phoneNumber}
            onChange={handleSenderChange}
            required
          />
          <br />
          <label htmlFor="senderAddress">Address:</label>
          <input
            type="text"
            id="senderAddress"
            name="address"
            value={orderInit.sender.address}
            onChange={handleSenderChange}
            required
          />
        </fieldset>

        <fieldset>
          <legend>Receiver Details</legend>
          <label htmlFor="receiverName">Name:</label>
          <input
            type="text"
            id="receiverName"
            name="name"
            value={orderInit.receiver.name}
            onChange={handleReceiverChange}
            required
          />
          <br />
          <label htmlFor="receiverEmail">Email:</label>
          <input
            type="email"
            id="receiverEmail"
            name="email"
            value={orderInit.receiver.email}
            onChange={handleReceiverChange}
            required
          />
          <br />
          <label htmlFor="receiverPhone">Phone Number:</label>
          <input
            type="tel"
            id="receiverPhone"
            name="phoneNumber"
            value={orderInit.receiver.phoneNumber}
            onChange={handleReceiverChange}
            required
          />
          <br />
          <label htmlFor="receiverAddress">Address:</label>
          <input
            type="text"
            id="receiverAddress"
            name="address"
            value={orderInit.receiver.address}
            onChange={handleReceiverChange}
            required
          />
        </fieldset>

        <fieldset>
          <legend>Order Details</legend>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={orderInit.description}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            name="instructions"
            value={orderInit.instructions}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={orderInit.weight}
            min="0"
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="distance">Distance (km):</label>
          <input
            type="number"
            id="distance"
            name="distance"
            value={orderInit.distance}
            min="0"
            onChange={handleChange}
            required
          />
        </fieldset>

        <button type="submit">Submit Order</button>
      </form>

      <form id="orderConfirm"></form>
    </div>
  );
};

export default Home;

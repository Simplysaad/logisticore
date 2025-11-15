import React, { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";

const Home = lazy(() => import("./pages/Home"));
const ConfirmOrder = lazy(() => import("./pages/ConfirmOrder"));
const CreateOrder = lazy(() => import("./pages/CreateOrder"));
const TrackOrder = lazy(() => import("./pages/TrackOrder"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/orders/create/" element={<CreateOrder />} />
          <Route path="/orders/:orderId/" element={<OrderDetails />} />
          <Route path="/orders/:orderId/confirm" element={<ConfirmOrder />} />
          <Route path="/orders/:orderId/track" element={<TrackOrder />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

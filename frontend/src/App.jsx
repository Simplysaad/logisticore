import React, { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";
import DeliveryCompanyOnboarding from "./pages/company/RegisterCompany";

const Home = lazy(() => import("./pages/Home"));
const ConfirmOrder = lazy(() => import("./pages/customer/ConfirmOrder"));
const CreateOrder = lazy(() => import("./pages/customer/CreateOrder"));
const CreateOrder2 = lazy(() => import("./pages/customer/CreateOrder2"));
const TrackOrder = lazy(() => import("./pages/customer/TrackOrder"));
const OrderDetails = lazy(() => import("./pages/customer/OrderDetails"));
const ProviderSelectionPage = lazy(() => import("./pages/customer/SelectProvider"));
const SelectRider = lazy(() => import("./pages/customer/SelectRider"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/x" element={<SelectRider />} />
          <Route path="/orders/create/" element={<CreateOrder />} />
          {/* <Route path="/orders/new/" element={<CreateOrder />} /> */}
          <Route path="/orders/new/" element={<CreateOrder2 />} />
          <Route path="/orders/:orderId/" element={<OrderDetails />} />
          <Route path="/orders/:orderId/confirm" element={<ConfirmOrder />} />
          <Route path="/orders/:orderId/track" element={<TrackOrder />} />

          <Route
            path="/companies/register"
            element={<DeliveryCompanyOnboarding />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

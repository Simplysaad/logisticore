import React, { useState } from "react";
import {
  MapPin,
  Mail,
  DollarSign,
  Phone,
  Building,
  CreditCard,
  User,
  Package,
  Plus,
  Trash2,
  Weight
} from "lucide-react";
import axiosInstance from "../../utils/axios.util";

const DeliveryCompanyOnboarding = () => {
  const [currentWeightRange, setCurrentWeightRange] = useState({
    weightRange: "",
    extraFee: 0
  });
  const [name, setName] = useState("");
  const [contact, setContact] = useState({
    address: "",
    name: "",
    phoneNumber: ""
  });
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    accountNumber: "",
    accountName: ""
  });
  const [service, setService] = useState({
    serviceAreas: [],
    deliveryTypes: [],
    vehicleTypes: [],
    rating: 0
  });
  const [pricingRule, setPricingRule] = useState({
    base: 0,
    weightSurcharge: [{ weightRange: "less than 5kg", extraFee: 0 }],
    perKmRate: 0,
    peakHoursSurcharge: 0,
    peakHours: [0]
  });
  // const [authentication, setAuthentication] = useState({
  //   emailAddress: "",
  //   password: "",
  //   username: ""
  // });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const company = {
      name,
      service,
      bankDetails,
      pricingRule,
      authentication: {
        emailAddress:
          "saadidris23" + Math.floor(Math.random * 10) + "@gmail.com",
        password: "saad1234",
        username: "simplysaad" + Math.floor(Math.random * 10)
      },
      contact
    };
    console.log("Company data submitted:", company);

    try {
      setIsLoading(true);
      const { data: response } = await axiosInstance.post(
        "/companies/create",
        company
      );

      console.log(response);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const states = [
    "abia",
    "adamawa",
    "anambra",
    "osun",
    "Jos",
    "osun",
    "lagos",
    "abuja",
    "kogi",
    "Federal Capital Territory"
  ];

  const vehicleTypes = ["motorcycle", "bus", "aeroplane", "car"];

  const weightSurchargeOptions = [
    "less than 5kg",
    "5kg to 10kg",
    "10kg to 15kg",
    "15kg to 20kg",
    "above 20kg"
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-green-500 text-white py-6 px-8 shadow-md">
        <h1 className="text-2xl font-bold">Logisticore</h1>
        <p className="text-sm opacity-90">Deliver Smarter, Not Harder</p>
      </header>

      <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Onboard Your Delivery Company
        </h2>
        <p className="text-gray-600 mb-8">
          Fill in your company details below to get started with Logisticore.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-4 md:p-8 space-y-8"
        >
          {/* Company Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <span className="flex items-center">
                <Building className="mr-2 text-green-500" size={16} />
                Company Name
              </span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Contact Information */}
          <fieldset className="border border-gray-200 rounded-lg p-6">
            <legend className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <User className="mr-2 text-green-500" size={20} />
              Contact Information
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="contactName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <span className="flex items-center">
                    <User className="mr-2 text-green-500" size={16} />
                    Contact Name
                  </span>
                </label>
                <input
                  type="text"
                  id="contactName"
                  value={contact.name}
                  onChange={(e) =>
                    setContact((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="contactAddress"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <span className="flex items-center">
                    <MapPin className="mr-2 text-green-500" size={16} />
                    Address
                  </span>
                </label>
                <input
                  type="text"
                  id="contactAddress"
                  value={contact.address}
                  onChange={(e) =>
                    setContact((prev) => ({ ...prev, address: e.target.value }))
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="contactPhone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <span className="flex items-center">
                    <Phone className="mr-2 text-green-500" size={16} />
                    Phone Number
                  </span>
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  value={contact.phoneNumber}
                  onChange={(e) =>
                    setContact((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value
                    }))
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </fieldset>

          {/* Banking Information */}
          <fieldset className="border border-gray-200 rounded-lg p-6">
            <legend className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <CreditCard className="mr-2 text-green-500" size={20} />
              Banking Information
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="bankName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <span className="flex items-center">
                    <CreditCard className="mr-2 text-green-500" size={16} />
                    Bank Name
                  </span>
                </label>
                <input
                  type="text"
                  id="bankName"
                  value={bankDetails.bankName}
                  onChange={(e) =>
                    setBankDetails((prev) => ({
                      ...prev,
                      bankName: e.target.value
                    }))
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="accountNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <span className="flex items-center">
                    <CreditCard className="mr-2 text-green-500" size={16} />
                    Account Number
                  </span>
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  value={bankDetails.accountNumber}
                  onChange={(e) =>
                    setBankDetails((prev) => ({
                      ...prev,
                      accountNumber: e.target.value
                    }))
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="accountName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <span className="flex items-center">
                    <CreditCard className="mr-2 text-green-500" size={16} />
                    Account Name
                  </span>
                </label>
                <input
                  type="text"
                  id="accountName"
                  value={bankDetails.accountName}
                  onChange={(e) =>
                    setBankDetails((prev) => ({
                      ...prev,
                      accountName: e.target.value
                    }))
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </fieldset>

          {/* Service Details */}
          <fieldset className="border border-gray-200 rounded-lg p-6">
            <legend className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Package className="mr-2 text-green-500" size={20} />
              Service Details
            </legend>
            <div className="space-y-4">
              <div className=" my-4">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  <span className="flex items-center">
                    <MapPin className="mr-2 text-green-500" size={16} />
                    Service States
                  </span>
                </label>

                <div className="flex  flex- flex-wrap">
                  {states.map((state, key) => (
                    <div
                      key={key}
                      className=" m-2 flex  items-center 2 gap-2 capitalize"
                    >
                      <input
                        type="checkbox"
                        id={state}
                        value={state}
                        checked={service.serviceAreas.includes(state)}
                        onChange={(e) => {
                          const states = [...service.serviceAreas];
                          if (service.serviceAreas.includes(state)) {
                            // remove it
                            setService((prev) => ({
                              ...prev,
                              serviceAreas: service.serviceAreas.filter(
                                (s) => s !== e.target.value
                              )
                            }));
                          } else {
                            // include it
                            setService((prev) => ({
                              ...prev,
                              serviceAreas: [
                                ...service.serviceAreas,
                                e.target.value
                              ]
                            }));
                          }
                        }}
                      />
                      <label
                        className="text-sm font-medium text-gray-700"
                        htmlFor={state}
                      >
                        {state}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className=" my-4">
                <label className="block text-sm font-medium text-gray9700 mb-2">
                  <span className="flex items-center">
                    <Package className="mr-2 text-green-500" size={16} />
                    Vehicle Types
                  </span>
                </label>
                {/* setSelectedVehicleTypes selectedVehicleTypes*/}
                <div className="flex my-4  flex- flex-wrap">
                  {vehicleTypes.map((vehicle, key) => (
                    <div
                      key={key}
                      className=" m-2 flex  items-center 2 gap-2 capitalize"
                    >
                      <input
                        type="checkbox"
                        name="vehicle"
                        id={vehicle}
                        value={vehicle}
                        checked={service.vehicleTypes.includes(vehicle)}
                        onChange={(e) => {
                          if (service.vehicleTypes.includes(vehicle)) {
                            // remove it
                            setService((prev) => ({
                              ...prev,
                              vehicleTypes: service.vehicleTypes.filter(
                                (v) => v !== e.target.value
                              )
                            }));
                          } else {
                            // include it
                            setService((prev) => ({
                              ...prev,
                              vehicleTypes: [
                                ...service.vehicleTypes,
                                e.target.value
                              ]
                            }));
                          }
                        }}
                      />
                      <label
                        className="text-sm font-medium text-gray-700"
                        htmlFor={vehicle}
                      >
                        {vehicle}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>

          {/* Pricing Rule */}
          <fieldset className="border border-gray-200 rounded-lg p-6">
            <legend className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <DollarSign className="mr-2 text-green-500" size={20} />
              Pricing Rule
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="base"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Base Rate
                </label>
                <input
                  type="number"
                  id="base"
                  value={pricingRule.base}
                  onChange={(e) =>
                    setPricingRule((prev) => ({
                      ...prev,
                      base: e.target.value
                    }))
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="perKmRate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Per Km Rate
                </label>
                <input
                  type="number"
                  id="perKmRate"
                  value={pricingRule.perKmRate}
                  onChange={(e) =>
                    setPricingRule((prev) => ({
                      ...prev,
                      perKmRate: e.target.value
                    }))
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="">
              <div className="md:flex justify-between  items-end my-6">
                <div className="w-full md:w-[50%]  py-2">
                  <label
                    htmlFor="perKmRate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Weight Range
                  </label>
                  <select
                    name=""
                    id=""
                    value={currentWeightRange.weightRange}
                    onChange={(e) => {
                      setCurrentWeightRange((prev) => ({
                        ...prev,
                        weightRange: e.target.value
                      }));
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select an Option</option>
                    {weightSurchargeOptions.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full md:w-[40%] py-2">
                  <label
                    htmlFor="extraFee"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Extra Fee
                  </label>
                  <input
                    type="number"
                    id="extraFee"
                    value={currentWeightRange.extraFee}
                    onChange={(e) => {
                      setCurrentWeightRange((prev) => ({
                        ...prev,
                        extraFee: e.target.value * 1
                      }));
                    }}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <button
                  className="my-2 py-2 rounded border-2 hover:bg-green-500 hover:text-white text-green-500 px-2"
                  type="button"
                  onClick={() => {
                    // Check if the weight range exists,
                    //  // if true? change the extra fee only
                    //  // else? add a new surcharge

                    const currentIndex = pricingRule.weightSurcharge.findIndex(
                      (ws) => currentWeightRange.weightRange === ws.weightRange
                    );

                    if (currentIndex === -1) {
                      setPricingRule((prev) => ({
                        ...prev,
                        weightSurcharge: [
                          ...prev.weightSurcharge,
                          currentWeightRange
                        ]
                      }));
                    } else {
                      const weightSurchargeArray = pricingRule.weightSurcharge;
                      weightSurchargeArray[currentIndex] = currentWeightRange;

                      console.log(currentIndex);
                      console.log(weightSurchargeArray);

                      setPricingRule((prev) => ({
                        ...prev,
                        weightSurcharge: weightSurchargeArray
                      }));
                    }

                    setCurrentWeightRange({ weightRange: "", extraFee: 0 });
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-6 ">
                {pricingRule.weightSurcharge.map((weight, idx) => (
                  <div
                    className="flex not-md:flex-col justify-center md:justify-between md:items-center"
                    key={idx}
                  >
                    <span className="w-full px-4 py-2 text-start">
                      {weight.weightRange}
                    </span>
                    <div className="flex flex-nowrap float-end">
                      <span className="w-full px-4 py-2 text-end">
                        ${weight.extraFee}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setPricingRule((prev) => {
                            return {
                              ...prev,
                              weightSurcharge: prev.weightSurcharge.filter(
                                (p) =>
                                  p.weightRange !==
                                  prev.weightSurcharge[idx].weightRange
                              )
                            };
                          });
                        }}
                        className=" w-[7%] text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </fieldset>
          <button
            type="submit"
            disabled={isLoading}
            className={`${
              isLoading ? "bg-green-200 " : "bg-green-500"
            }  block text-white font-semibold px-8 py-2 rounded hover:bg-white hover:text-green-500 hover:`}
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default DeliveryCompanyOnboarding;

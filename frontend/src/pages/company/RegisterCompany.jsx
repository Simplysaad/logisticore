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
} from "lucide-react";

const DeliveryCompanyOnboarding = () => {
  const [company, setCompany] = useState({
    name: "",
    contact: {
      address: "",
      name: "",
      phoneNumber: "",
    },
    bank: {
      bankName: "",
      accountNumber: "",
      accountName: "",
    },
    service: {
      serviceAreas: [""],
      deliveryTypes: [""],
      vehicleTypes: [""],
      pricingRule: {
        base: 0,
        weightSurcharge: [{ maxWeight: 0, extraFee: 0 }],
        perKmRate: 0,
        peakHoursSurcharge: 0,
        peakHours: [0],
      },
    },
    authentication: {
      emailAddress: "",
      password: "",
      username: "",
    },
  });

  const handleChange = (e, section, field) => {
    const { value } = e.target;
    setCompany((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (section, field, index, value) => {
    setCompany((prev) => {
      const newArray = [...prev[section][field]];
      newArray[index] = value;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray,
        },
      };
    });
  };

  const handleAddArrayItem = (section, field) => {
    setCompany((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], ""],
      },
    }));
  };

  const handleRemoveArrayItem = (section, field, index) => {
    setCompany((prev) => {
      const newArray = prev[section][field].filter((_, i) => i !== index);
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray,
        },
      };
    });
  };

  const handlePricingRuleChange = (field, index, subField, value) => {
    setCompany((prev) => {
      const newWeightSurcharge = [...prev.service.pricingRule.weightSurcharge];
      newWeightSurcharge[index][subField] = value;
      return {
        ...prev,
        service: {
          ...prev.service,
          pricingRule: {
            ...prev.service.pricingRule,
            weightSurcharge: newWeightSurcharge,
          },
        },
      };
    });
  };

  const handleAddWeightSurcharge = () => {
    setCompany((prev) => ({
      ...prev,
      service: {
        ...prev.service,
        pricingRule: {
          ...prev.service.pricingRule,
          weightSurcharge: [
            ...prev.service.pricingRule.weightSurcharge,
            { maxWeight: 0, extraFee: 0 },
          ],
        },
      },
    }));
  };

  const handleRemoveWeightSurcharge = (index) => {
    setCompany((prev) => {
      const newWeightSurcharge =
        prev.service.pricingRule.weightSurcharge.filter((_, i) => i !== index);
      return {
        ...prev,
        service: {
          ...prev.service,
          pricingRule: {
            ...prev.service.pricingRule,
            weightSurcharge: newWeightSurcharge,
          },
        },
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Company data submitted:", company);
    // Handle form submission (e.g., API call)
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-green-500 text-white py-6 px-8 shadow-md">
        <h1 className="text-2xl font-bold">Logisticore</h1>
        <p className="text-sm opacity-90">Deliver Smarter, Not Harder</p>
      </header>

      <main className="flex-1 p-8 max-w-4xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Onboard Your Delivery Company
        </h2>
        <p className="text-gray-600 mb-8">
          Fill in your company details below to get started with Logisticore.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-8 space-y-8"
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
              value={company.name}
              onChange={(e) => handleChange(e, "name", "name")}
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
                  value={company.contact.name}
                  onChange={(e) => handleChange(e, "contact", "name")}
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
                  value={company.contact.address}
                  onChange={(e) => handleChange(e, "contact", "address")}
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
                  value={company.contact.phoneNumber}
                  onChange={(e) => handleChange(e, "contact", "phoneNumber")}
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
                  value={company.bank.bankName}
                  onChange={(e) => handleChange(e, "bank", "bankName")}
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
                  value={company.bank.accountNumber}
                  onChange={(e) => handleChange(e, "bank", "accountNumber")}
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
                  value={company.bank.accountName}
                  onChange={(e) => handleChange(e, "bank", "accountName")}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <MapPin className="mr-2 text-green-500" size={16} />
                    Service Areas
                  </span>
                </label>
                {company.service.serviceAreas.map((area, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={area}
                      onChange={(e) =>
                        handleArrayChange(
                          "service",
                          "serviceAreas",
                          index,
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveArrayItem("service", "serviceAreas", index)
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("service", "serviceAreas")}
                  className="flex items-center text-green-500 hover:text-green-700 mt-2"
                >
                  <Plus size={16} className="mr-1" /> Add Service Area
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <Package className="mr-2 text-green-500" size={16} />
                    Delivery Types
                  </span>
                </label>
                {company.service.deliveryTypes.map((type, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={type}
                      onChange={(e) =>
                        handleArrayChange(
                          "service",
                          "deliveryTypes",
                          index,
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveArrayItem("service", "deliveryTypes", index)
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("service", "deliveryTypes")}
                  className="flex items-center text-green-500 hover:text-green-700 mt-2"
                >
                  <Plus size={16} className="mr-1" /> Add Delivery Type
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <Package className="mr-2 text-green-500" size={16} />
                    Vehicle Types
                  </span>
                </label>
                {company.service.vehicleTypes.map((type, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={type}
                      onChange={(e) =>
                        handleArrayChange(
                          "service",
                          "vehicleTypes",
                          index,
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveArrayItem("service", "vehicleTypes", index)
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("service", "vehicleTypes")}
                  className="flex items-center text-green-500 hover:text-green-700 mt-2"
                >
                  <Plus size={16} className="mr-1" /> Add Vehicle Type
                </button>
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
                  value={company.service.pricingRule.base}
                  onChange={(e) =>
                    handleChange(e, "service", "pricingRule.base")
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
                  value={company.service.pricingRule.perKmRate}
                  onChange={(e) =>
                    handleChange(e, "service", "pricingRule.perKmRate")
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="peakHoursSurcharge"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Peak Hours Surcharge
                </label>
                <input
                  type="number"
                  id="peakHoursSurcharge"
                  value={company.service.pricingRule.peakHoursSurcharge}
                  onChange={(e) =>
                    handleChange(e, "service", "pricingRule.peakHoursSurcharge")
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peak Hours
                </label>
                {company.service.pricingRule.peakHours.map((hour, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="number"
                      value={hour}
                      onChange={(e) =>
                        handleArrayChange(
                          "service",
                          "pricingRule.peakHours",
                          index,
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveArrayItem(
                          "service",
                          "pricingRule.peakHours",
                          index
                        )
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </fieldset>
          <button
            type="submit"
            className="bg-green-500 block text-white font-semibold px-8 py-2 rounded hover:bg-white hover:text-green-500 hover:"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default DeliveryCompanyOnboarding;

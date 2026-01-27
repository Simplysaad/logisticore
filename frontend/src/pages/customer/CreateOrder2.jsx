import React, { useEffect, useState } from "react";
import MessageLoader from "../../components/messageLoader";
import { InputField, SelectField, TextareaField } from "../../components/Input";
import Header from "../../components/Header";

const CreateOrder2 = () => {
  const [orderData, setOrderData] = useState({
    pickupLocation: "",
    destination: "",
    phoneNumber: "",
    specialInstructions: "",
    itemCategory: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // success/error

  // Real-time validation on input change
  useEffect(() => {
    const newErrors = {};

    if (!orderData.pickupLocation.trim()) {
      newErrors.pickupLocation = "Pickup location is required";
    }
    if (!orderData.destination.trim()) {
      newErrors.destination = "Destination is required";
    }
    if (!orderData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(orderData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
    if (!orderData.itemCategory) {
      newErrors.itemCategory = "Please select an item category";
    }

    setErrors(newErrors);
  }, [orderData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!orderData.pickupLocation.trim())
      newErrors.pickupLocation = "Pickup location is required";
    if (!orderData.destination.trim())
      newErrors.destination = "Destination is required";
    if (!orderData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(orderData.phoneNumber))
      newErrors.phoneNumber = "Please enter a valid phone number";
    if (!orderData.itemCategory)
      newErrors.itemCategory = "Please select an item category";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call - replace with your actual endpoint
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ ok: true });
        }, 2000);
      });

      if (response.ok) {
        // Reset form on success
        setOrderData({
          pickupLocation: "",
          destination: "",
          phoneNumber: "",
          specialInstructions: "",
          itemCategory: ""
        });
        setErrors({});
        setSubmitStatus("success");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    orderData.pickupLocation &&
    orderData.destination &&
    orderData.phoneNumber &&
    orderData.itemCategory;

  const itemCategories = [
    "Documents",
    "Food & Groceries",
    "Electronics",
    "Clothing",
    "Pharmacy",
    "Other"
  ];
  const weightRanges = [
    "less than 5kg",
    "5kg to 10kg",
    "10kg to 15kg",
    "15kg to 20kg",
    "above 20kg"
  ];

  return (
    <>
      <Header />
      <div className="md:flex justify-center items-center min-h-screen bg-gray-50 py-8">
        <form
          onSubmit={handleSubmit}
          className="shadow-xl bg-white rounded-2xl flex-1 md:max-w-[75%] lg:max-w-[50%] lg:py-16 p-6 m-3 max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="heading mb-8 text-center md:text-left">
            <h1 className="font-bold text-3xl md:text-[1.8rem] text-gray-900 mb-3">
              Start Your Delivery
            </h1>
            <p className="font-light text-lg md:text-[.95rem] text-gray-600 max-w-md">
              Fill in your delivery details below and let Logisticore handle the
              rest.
            </p>
          </div>

          {/* Form Fields */}
          <fieldset className="space-y-6">
            <InputField
              label="Pickup Location"
              name="pickupLocation"
              value={orderData.pickupLocation}
              error={errors.pickupLocation}
              onChange={handleChange}
              placeholder="Enter your pickup address"
              required
            />

            <InputField
              label="Destination"
              name="destination"
              value={orderData.destination}
              error={errors.destination}
              onChange={handleChange}
              placeholder="Enter delivery destination"
              required
            />

            <InputField
              label="Phone Number"
              name="phoneNumber"
              value={orderData.phoneNumber}
              error={errors.phoneNumber}
              onChange={handleChange}
              placeholder="+234 123 456 7890"
              required
            />

            <SelectField
              label="Item Category"
              name="itemCategory"
              value={orderData.itemCategory}
              error={errors.itemCategory}
              onChange={handleChange}
              options={itemCategories}
              required
            />
            <SelectField
              label="Weight Range"
              name="weightRange"
              value={orderData.weightRange}
              error={errors.weightRange}
              onChange={handleChange}
              options={weightRanges}
              required
            />

            <TextareaField
              label="Special Instructions (Optional)"
              name="specialInstructions"
              value={orderData.specialInstructions}
              error={errors.specialInstructions}
              onChange={handleChange}
              placeholder="Add any special delivery notes..."
              rows={4}
            />
          </fieldset>

          {/* Submit Button */}
          <div className="cta mt-10">
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                isSubmitting || !isFormValid
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl active:scale-[0.98]"
              }`}
            >
              {isSubmitting ? (
                <>
                  <MessageLoader />
                  Processing...
                </>
              ) : (
                "Create Order"
              )}
            </button>
          </div>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl">
              Order created successfully! 🚀
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
              Failed to create order. Please try again.
            </div>
          )}
        </form>

        {/* Preview/Sidebar Section */}
        <div className="shadow-xl bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex-1 md:max-w-[75%] lg:max-w-[50%] p-8 m-3 max-w-md mx-auto flex flex-col items-center justify-center text-center">
          <div className="text-gray-700">
            <h3 className="font-bold text-xl mb-4 text-gray-900">
              Order Preview
            </h3>
            <p className="text-sm opacity-75 mb-6">
              Fill the form to see live preview of your delivery details.
            </p>
            <div className="space-y-2 text-left w-full max-w-sm">
              <div className="flex justify-between text-sm">
                <span>From:</span>
                <span className="font-medium">
                  {orderData.pickupLocation.slice(0, 30)}...
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>To:</span>
                <span className="font-medium">
                  {orderData.destination.slice(0, 30)}...
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Category:</span>
                <span className="font-medium capitalize">
                  {orderData.itemCategory || "Select"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Reusable Input Component
export default CreateOrder2;

import mongoose from "mongoose";

const riderSchema = new mongoose.Schema(
  {
    // ================ PERSONAL INFORMATION ================
    personalInfo: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      profileImage: { type: String }, // Cloudinary URL
    },

    // ================ VEHICLE INFORMATION ================
    vehicle: {
      type: { 
        type: String, 
        enum: ["bike", "car", "van", "truck"], 
        required: true 
      },
      plateNumber: { type: String, required: true, uppercase: true },
      model: String,
      color: String,
      year: Number,
    },

    // ================ LOCATION & SERVICE ================
    location: {
      currentLat: { type: Number },
      currentLng: { type: Number },
      serviceAreas: [{ type: String }], // ["Ikeja", "VI", "Lekki"]
      address: String,
    },

    // ================ VERIFICATION & DOCUMENTS ================
    verification: {
      ninNumber: { type: String, required: true, unique: true },
      driversLicense: { 
        number: String, 
        expiryDate: Date,
        imageUrl: String 
      },
      vehicleRegistration: {
        number: String,
        expiryDate: Date,
        imageUrl: String
      },
      verificationStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
      },
      verifiedAt: Date,
    },

    // ================ AVAILABILITY & STATUS ================
    availability: {
      isOnline: { type: Boolean, default: false },
      isAvailable: { type: Boolean, default: true },
      lastSeen: { type: Date, default: Date.now },
    },

    // ================ FINANCIAL INFORMATION ================
    bankDetails: {
      accountName: String,
      accountNumber: String,
      bankCode: String, // For Nigerian banks
      bankName: String,
    },

    // ================ PERFORMANCE METRICS ================
    performance: {
      totalRides: { type: Number, default: 0 },
      totalEarnings: { type: Number, default: 0 },
      averageRating: { type: Number, default: 5.0 },
      completionRate: { type: Number, default: 100 }, // %
      onTimeRate: { type: Number, default: 100 }, // %
    },

    // ================ RATINGS & REVIEWS ================
    ratings: {
      totalReviews: { type: Number, default: 0 },
      ratingsBreakdown: {
        fiveStar: { type: Number, default: 0 },
        fourStar: { type: Number, default: 0 },
        threeStar: { type: Number, default: 0 },
        twoStar: { type: Number, default: 0 },
        oneStar: { type: Number, default: 0 },
      },
      recentReviews: [
        {
          rating: Number,
          comment: String,
          customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          createdAt: { type: Date, default: Date.now },
        },
      ],
    },

    // ================ PLATFORM STATUS ================
    account: {
      isActive: { type: Boolean, default: true },
      isSuspended: { type: Boolean, default: false },
      suspensionReason: String,
      lastSuspensionDate: Date,
    },
  },
  {
    timestamps: true,
    indexes: [
      { "location.currentLat": 1, "location.currentLng": 1 }, // Geospatial search
      { "personalInfo.phoneNumber": 1 },
      { "verification.ninNumber": 1 },
      { "vehicle.plateNumber": 1 },
      { availability: 1, "location.currentLat": 1, "location.currentLng": 1 }, // Online riders first
    ],
  }
);

// Geospatial Index for location queries
riderSchema.index({ "location.currentLat": "2dsphere" });

export default mongoose.model("Rider", riderSchema);

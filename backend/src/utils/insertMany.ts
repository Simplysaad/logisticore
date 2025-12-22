import connectDB from "../config/db";
import Company from "../models/company.model";


const companies = [
  {
    name: "SwiftHaul Logistics",
    registrationNumber: "RC-456789",
    contact: {
      address: "12 Adeola Odeku Street, Victoria Island, Lagos",
      name: "Chinedu Okeke",
      website: "https://swifthaul.ng",
      phoneNumber: "+234 803 456 7890"
    },
    bankDetails: {
      bankName: "Zenith Bank",
      accountNumber: "1234567890",
      accountName: "SwiftHaul Logistics Ltd"
    },
    service: {
      serviceAreas: ["Lagos", "Ogun", "Abuja", "Rivers"],
      deliveryTypes: ["Standard", "Express", "Same-Day"],
      vehicleTypes: ["Van", "Truck", "Motorcycle"],
      logo: "https://example.com/swifthaul-logo.png",
      rating: 4.7
    },
    pricingRule: {
      base: 1500,
      weightSurcharge: [
        { weightRange: "less than 5kg", extraFee: 0 },
        { weightRange: "5kg to 10kg", extraFee: 300 },
        { weightRange: "10kg to 15kg", extraFee: 500 },
        { weightRange: "15kg to 20kg", extraFee: 700 },
        { weightRange: "above 20kg", extraFee: 1000 }
      ],
      perKmRate: 250,
      peakHoursSurcharge: 500,
      peakHours: [7, 8, 9, 17, 18, 19]
    },
    authentication: {
      emailAddress: "admin@swifthaul.ng",
      password: "$2b$12$Kix123abcHashForSwift", // Hashed in production
      username: "swifthaul_admin"
    }
  },
  {
    name: "Lagos Express Couriers",
    registrationNumber: "RC-987654",
    contact: {
      address: "45 Oba Akran Avenue, Ikeja, Lagos",
      name: "Aisha Bello",
      website: "https://lagosexpress.com",
      phoneNumber: "+234 802 123 4567"
    },
    bankDetails: {
      bankName: "GTBank",
      accountNumber: "9876543210",
      accountName: "Lagos Express Couriers"
    },
    service: {
      serviceAreas: ["Lagos Island", "Mainland", "Ikeja", "Surulere"],
      deliveryTypes: ["Economy", "Standard", "Overnight"],
      vehicleTypes: ["Motorcycle", "Car", "Van"],
      logo: "https://example.com/lagosexpress-logo.svg",
      rating: 4.2
    },
    pricingRule: {
      base: 1200,
      weightSurcharge: [
        { weightRange: "less than 5kg", extraFee: 0 },
        { weightRange: "5kg to 10kg", extraFee: 200 },
        { weightRange: "10kg to 15kg", extraFee: 400 },
        { weightRange: "15kg to 20kg", extraFee: 600 },
        { weightRange: "above 20kg", extraFee: 900 }
      ],
      perKmRate: 200,
      peakHoursSurcharge: 400,
      peakHours: [6, 7, 8, 16, 17, 18]
    },
    authentication: {
      emailAddress: "ops@lagosexpress.com",
      password: "$2b$12$LagosHash123xyz",
      username: "lagosexpress_ops"
    }
  },
  {
    name: "NigerDelta Freight",
    registrationNumber: "RC-321098",
    contact: {
      address: "78 Aba Road, Port Harcourt, Rivers State",
      name: "Emeka Nwosu",
      phoneNumber: "+234 803 987 6543"
    },
    bankDetails: {
      bankName: "Access Bank",
      accountNumber: "5678901234",
      accountName: "NigerDelta Freight Services"
    },
    service: {
      serviceAreas: ["Rivers", "Bayelsa", "Delta", "Imo"],
      deliveryTypes: ["Standard", "Express", "Bulk"],
      vehicleTypes: ["Truck", "Van", "Articulated"],
      rating: 4.5
    },
    pricingRule: {
      base: 2000,
      weightSurcharge: [
        { weightRange: "less than 5kg", extraFee: 0 },
        { weightRange: "5kg to 10kg", extraFee: 400 },
        { weightRange: "10kg to 15kg", extraFee: 700 },
        { weightRange: "15kg to 20kg", extraFee: 1000 },
        { weightRange: "above 20kg", extraFee: 1500 }
      ],
      perKmRate: 350,
      peakHoursSurcharge: 700,
      peakHours: [7, 8, 9, 10, 16, 17, 18]
    },
    authentication: {
      emailAddress: "admin@nigerdeltafreight.com",
      password: "$2b$12$DeltaFreightSecureHash",
      username: "ndfreight_admin"
    }
  },
  {
    name: "Abuja QuickDeliver",
    registrationNumber: "RC-112233",
    contact: {
      address: "Suite 201, Plot 45, Garki Area 2, Abuja",
      name: "Fatima Yusuf",
      website: "https://abujadeliver.ng",
      phoneNumber: "+234 809 876 5432"
    },
    bankDetails: {
      bankName: "First Bank",
      accountNumber: "4455667788",
      accountName: "Abuja QuickDeliver Ltd"
    },
    service: {
      serviceAreas: ["Abuja", "Nasarawa", "Niger"],
      deliveryTypes: ["Same-Day", "Express", "Standard"],
      vehicleTypes: ["Motorcycle", "Van", "SUV"],
      logo: "https://example.com/abujadeliver-logo.png",
      rating: 4.8
    },
    pricingRule: {
      base: 1800,
      weightSurcharge: [
        { weightRange: "less than 5kg", extraFee: 0 },
        { weightRange: "5kg to 10kg", extraFee: 350 },
        { weightRange: "10kg to 15kg", extraFee: 600 },
        { weightRange: "15kg to 20kg", extraFee: 850 },
        { weightRange: "above 20kg", extraFee: 1200 }
      ],
      perKmRate: 300,
      peakHoursSurcharge: 600,
      peakHours: [8, 9, 17, 18, 19, 20]
    },
    authentication: {
      emailAddress: "support@abujadeliver.ng",
      password: "$2b$12$AbujaQuickHash456",
      username: "abujaquick_support"
    }
  },
  {
    name: "Eko Moto Runners",
    registrationNumber: "RC-998877",
    contact: {
      address: "27 Idumota Market Road, Lagos Island",
      name: "Tunde Adebayo",
      phoneNumber: "+234 701 234 5678"
    },
    bankDetails: {
      bankName: "UBA",
      accountNumber: "3344556677",
      accountName: "Eko Moto Runners"
    },
    service: {
      serviceAreas: ["Lagos Island", "Ikeja", "Yaba", "Surulere"],
      deliveryTypes: ["Express", "Same-Day"],
      vehicleTypes: ["Motorcycle"],
      rating: 4.1
    },
    pricingRule: {
      base: 800,
      weightSurcharge: [
        { weightRange: "less than 5kg", extraFee: 0 },
        { weightRange: "5kg to 10kg", extraFee: 150 },
        { weightRange: "10kg to 15kg", extraFee: 250 },
        { weightRange: "15kg to 20kg", extraFee: 400 },
        { weightRange: "above 20kg", extraFee: 600 }
      ],
      perKmRate: 150,
      peakHoursSurcharge: 250,
      peakHours: [7, 8, 16, 17, 18]
    },
    authentication: {
      emailAddress: "dispatch@ekomoto.ng",
      password: "$2b$12$EkoMotoRunnerHash",
      username: "ekomoto_dispatch"
    }
  },
  {
    name: "AlKanz Logistics",
    contact: {
      address: "fajuyi hall",
      name: "abdulbaqi",
      phoneNumber: "09064082383"
    },
    bankDetails: {
      bankName: "taj bank",
      accountNumber: "0007699369",
      accountName: "Abdulbaqi Shefiu-badmos"
    },
    service: {
      serviceAreas: ["anambra", "kogi", "Jos", "Federal Capital Territory"],
      deliveryTypes: [],
      vehicleTypes: ["motorcycle", "bus", "aeroplane", "car"],
      rating: 0
    },
    pricingRule: {
      base: 500,
      weightSurcharge: [
        {
          weightRange: "less than 5kg",
          extraFee: 100
        },
        {
          weightRange: "5kg to 10kg",
          extraFee: 400
        }
      ],
      perKmRate: 0,
      peakHoursSurcharge: 0,
      peakHours: [0]
    },
    authentication: {
      emailAddress: "saadidris23@gmail.com",
      password: "saad1234",
      username: "simplysaad"
    }
  }
];

export default async function insertMany() {
  try {
    const inserted = await Company.insertMany(companies);
    console.log(inserted, "new Companies inserted");
  } catch (err) {
    console.error(err);
  }
}

// insertMany();

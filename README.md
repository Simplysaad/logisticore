
# Logisticore 🚚 - Nigeria's Smart Delivery Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen.svg)](https://mongodb.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://typescriptlang.org)

## 🚀 **Overview**

**Logisticore** is a revolutionary logistics platform connecting Nigerian customers and businesses with verified delivery companies through a seamless, transparent marketplace. Tired of unreliable deliveries, hidden fees, and poor tracking? Logisticore solves these problems with real-time price comparison, instant booking, and comprehensive tracking - all in one beautiful app.

**Built for Nigeria's booming e-commerce market** (valued at ₦3 trillion+), Logisticore leverages modern tech to deliver smarter, faster, and more reliably.

## ✨ **Key Features**

### **For Customers 🎯**
- **Real-time Price Comparison** - Compare quotes from multiple verified delivery companies
- **Instant Booking** - Book deliveries with Paystack integration (Pay Now / Cash on Delivery)
- **Live Tracking** - Real-time GPS tracking with status updates
- **Transparent Pricing** - No hidden fees, dynamic pricing based on weight/distance
- **Multiple Payment Options** - Secure payments with Nigeria's leading gateways

### **For Delivery Companies 🚚**
- **New Customer Pipeline** - Access verified orders matching your service areas
- **Automated Order Management** - Accept/reject orders via intuitive dashboard
- **Flexible Pricing Rules** - Set base rates, weight surcharges, peak hour pricing
- **Real-time Payouts** - Weekly settlements to your Nigerian bank account
- **Analytics Dashboard** - Track performance, earnings, and customer ratings

### **Platform Features ⚡**
- **Modern Glassmorphism UI** - Built with React 18, Tailwind CSS, Lucide React
- **RESTful API** - Node.js/Express backend with MongoDB
- **TypeScript** - Fully typed frontend and backend
- **Responsive Design** - Perfect on mobile, tablet, desktop
- **Real-time Updates** - WebSocket-ready architecture
- **Admin Dashboard** - Complete order and company management

## 🛠 **Tech Stack**

```
Frontend:
├── React 18
├── Tailwind CSS 3.x
├── Lucide React Icons
├── React Router 6
├── Axios
└── Vite (Build Tool)

Backend:
├── Node.js 18 + Express
├── MongoDB + Mongoose
├── TypeScript
├── Paystack Integration
├── JWT Authentication
└── Nodemon (Development)

Database:
├── MongoDB (Primary)
├── Indexes for performance
└── Schemas for Orders, Companies, Users
```

## 📱 **Screenshots**

| Delivery Selection | Order Tracking | Company Onboarding |
|--------------------|----------------|-------------------|
| ![Delivery Selection](https://via.placeholder.com/800x400/10B981/FFFFFF?text=Delivery+Selection) | ![Order Tracking](https://via.placeholder.com/800x400/1E40AF/FFFFFF?text=Order+Tracking) | ![Onboarding](https://via.placeholder.com/800x400/059669/FFFFFF?text=Company+Onboarding) |

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+
- MongoDB 6+ (or MongoDB Atlas)
- Paystack Account (Sandbox for development)

### **Installation**

```
# Clone the repository
git clone https://github.com/yourusername/logisticore.git
cd logisticore

# Frontend
cd client
npm install
npm run dev

# Backend (new terminal)
cd server
npm install
cp .env.example .env
npm run dev
```

### **Environment Variables**

**Server (.env)**
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret
PORT=5000
```

**Client (.env)**
```
VITE_API_URL=http://localhost:5000/api
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public
```

## 📂 **Project Structure**

```
logisticore/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── types/
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
└── README.md
```

## 🔄 **Core Workflows**

### **1. Customer Journey**
```
1. Create Order → 2. Compare Companies → 3. Book & Pay → 4. Track Live → 5. Delivery Complete
```

### **2. Delivery Company Journey**
```
1. Onboard → 2. Set Pricing → 3. Receive Orders → 4. Update Status → 5. Get Paid
```

## 💰 **Business Model**

- **Transaction Fees**: 5-10% commission per delivery
- **Premium Listings**: Delivery companies pay for priority placement
- **API Subscriptions**: E-commerce integration (future)
- **Value-Added Services**: Insurance, express delivery upsells

## 📊 **Market Opportunity**

```
Nigeria Logistics Market: ₦3 Trillion+ (2025)
E-commerce Growth: 25% CAGR
Last-mile Delivery: 60% of total logistics cost
Urban Population: 50%+ by 2025
```

## 🤝 **Roadmap**

### **Phase 1 (MVP) - ✅ Complete**
- [x] Customer order creation
- [x] Delivery company comparison
- [x] Paystack payment integration
- [x] Real-time order tracking
- [x] Company onboarding

### **Phase 2 (Q1 2026)**
- [ ] Driver mobile app
- [ ] Admin dashboard
- [ ] Push notifications
- [ ] Analytics & reporting

### **Phase 3 (Q2 2026)**
- [ ] E-commerce API
- [ ] Cross-border delivery
- [ ] Insurance partnerships
- [ ] AI route optimization

## 🛡️ **Security & Compliance**

- JWT Authentication
- Input validation & sanitization
- Rate limiting
- HTTPS enforced
- GDPR/Nigeria Data Protection compliant
- Secure payment handling

## 🌍 **Why Nigeria?**

1. **Massive Market**: 200M+ population, ₦3T+ logistics spend
2. **E-commerce Boom**: Jumia, Konga, Opay driving demand
3. **Urbanization**: 50%+ urban population by 2025
4. **Mobile Penetration**: 85% smartphone adoption
5. **Young Population**: Tech-savvy millennials driving change

## 📞 **Support**

- **Issues**: [Create GitHub Issue](https://github.com/yourusername/logisticore/issues)
- **Discord**: Join our developer community
- **Email**: hello@logisticore.com

## 📄 **License**

This project is [MIT](LICENSE) licensed - free for personal & commercial use.

## 🙌 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## ⭐ **Show Your Support**

Give a ⭐ if this project helped you!

---

**Built with ❤️ for Nigeria's logistics revolution**

<div align="center">
<img src="https://via.placeholder.com/800x200/059669/FFFFFF?text=Made+with+React+Node.js+MongoDB" alt="Tech Stack" />
</div>

---

*Logisticore - Delivering Nigeria's Future* 🚀
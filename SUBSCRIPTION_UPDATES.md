# ✅ Subscription Tier Updates

## 📋 New Subscription Structure

### Quarterly Subscriptions (3 months)

#### 1. Regular - $999 USD
- Exploratory access to marketplace for chosen Industry vertical
- No live auction discounts
- Access to Buyers/Sellers within 1 Industry vertical (chosen while subscribing)
- No access to Agents
- No discounts on Value Added Offerings (VAOs)
- No Auto upgrade to next version of application platform on version update
- Low priority marketplace listing (low visibility)

#### 2. Silver - $5,999 USD
- Complimentary access to all Sellers, Buyers & Agents within 2 Industry segments in marketplace
- 5% discount on Live Auction Event tickets for 2 events each
- Auto upgrade to next version of application platform on version update
- Medium priority listing amongst Sellers, Buyers and Agents (med visibility)
- 1% discount on purchase of Value-Added Offerings (VAOs)
- Dashboard Analytics view of marketplace

#### 3. Gold - $12,999 USD (Most Popular)
- Complimentary access to all Sellers, Buyers & Agents within 6 Industry segments in marketplace
- 15% discount on Live Auction Event tickets for 4 events each
- Auto upgrade to next version of application platform on version update
- High priority listing amongst Sellers, Buyers and Agents (high visibility)
- 7% discount on purchase of Value-Added Offerings (VAOs)
- 24% discount on Subscription Renewal
- High priority in Live Auction Event bookings (balcony seats)
- Dashboard Analytics view of marketplace

### Half-Yearly Subscription (6 months)

#### Regular - $2,999 USD
- Complimentary access to all Sellers, Buyers & Agents within 1 Industry segment in marketplace
- 1% discount on Live Auction Event ticket for 1 event

---

## 🔧 Technical Implementation

### Backend Configuration
- **File**: `backend/config/razorpay.config.js`
- Prices stored in **cents** (smallest currency unit):
  - Regular Quarterly: 99,900 cents = $999
  - Silver Quarterly: 599,900 cents = $5,999
  - Gold Quarterly: 1,299,900 cents = $12,999
  - Regular Half-Yearly: 299,900 cents = $2,999
- Currency: **USD**

### Frontend Display
- **File**: `frontend/src/components/registration/SubscriptionStep.jsx`
- Prices displayed in **dollars** for user-friendly display
- Tier IDs:
  - `REGULAR_QUARTERLY`
  - `SILVER_QUARTERLY`
  - `GOLD_QUARTERLY`
  - `REGULAR_HALFYEARLY`

### Payment Processing
- Backend automatically converts dollar amounts to cents for Razorpay
- Currency set to USD
- Test mode supports USD currency

---

## ✅ Changes Made

1. ✅ Updated backend subscription tier definitions
2. ✅ Updated frontend subscription selection UI
3. ✅ Updated payment step to display USD prices
4. ✅ Updated currency handling (USD instead of INR)
5. ✅ Added duration labels (Quarterly/Half-Yearly)
6. ✅ Updated feature lists to match new requirements

---

## 🧪 Testing

To test the new subscriptions:

1. Start the backend: `cd backend && node server.js`
2. Start the frontend: `cd frontend && npm run dev`
3. Go through registration flow
4. On Step 4 (Subscription), you'll see the new tiers
5. Select a tier and proceed to payment
6. Payment will process with correct USD amounts

---

## 📝 Notes

- All prices are now in USD
- Quarterly subscriptions are 3 months
- Half-yearly subscription is 6 months
- Gold tier is marked as "Most Popular"
- Backend handles currency conversion automatically


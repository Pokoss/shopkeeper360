# 🎯 Biashari Feature Access & Plan System

## Overview
The Biashari system controls feature access based on **TWO factors**:
1. **Business Category** - What type of business (retail, service, hotel, etc.)
2. **Subscription Plan** - What tier they're paying for (basic, standard, premium)

---

## 📊 Plan Comparison Table

| Feature | Basic | Standard | Premium | Category Requirement |
|---------|-------|----------|---------|---------------------|
| **Dashboard** | ✅ | ✅ | ✅ | All |
| **Receipts** | ✅ | ✅ | ✅ | All |
| **Point of Sale (POS)** | ✅ | ✅ | ✅ | Retail/Restaurant/Hotel |
| **Inventory** | ✅ | ✅ | ✅ | Retail/Restaurant/Hotel |
| **Service Panel** | ✅ | ✅ | ✅ | Service/Restaurant/Accommodation/Hotel |
| **Service Tracking** | ✅ | ✅ | ✅ | Service/Restaurant/Accommodation/Hotel |
| **Rooms & Bookings** | ✅ | ✅ | ✅ | Accommodation/Hotel |
| **Human Resource (HR)** | ❌ | ✅ | ✅ | All (if plan allows) |
| **Accounting** | ❌ | ✅ | ✅ | All (if plan allows) |
| **Online Portal** | ❌ | ❌ | ✅ | All (if plan allows) |
| **Analytics** | ❌ | ❌ | ✅ | All (if plan allows) |
| **Business Account** | ❌ | ❌ | ✅ | All (if plan allows) |

---

## 🏢 Business Category Features

### 1️⃣ **Retail Businesses**
**Categories:** `retail-store`, `supermarket`, `pharmacy`, `agricultural-equipment`

**Category Features:**
- ✅ Point of Sale (POS)
- ✅ Inventory Management

**Example:** A pharmacy on the **Basic Plan** gets:
- Dashboard
- Receipts
- POS
- Inventory

To unlock HR, Accounting → Upgrade to **Standard**
To unlock Online Portal, Analytics, Business Account → Upgrade to **Premium**

---

### 2️⃣ **Service Businesses**
**Categories:** `saloon-spa`, `professional-services`

**Category Features:**
- ✅ Service Panel
- ✅ Service Tracking

**Example:** A salon on the **Basic Plan** gets:
- Dashboard
- Receipts
- Service Panel
- Service Tracking

---

### 3️⃣ **Restaurants**
**Category:** `restaurant`

**Category Features:**
- ✅ Point of Sale (POS)
- ✅ Inventory Management
- ✅ Service Panel
- ✅ Service Tracking

**Example:** A restaurant on the **Basic Plan** gets:
- Dashboard
- Receipts
- POS
- Inventory
- Service Panel
- Service Tracking

*(Restaurants get BOTH retail AND service features)*

---

### 4️⃣ **Accommodation**
**Category:** `accommodation`

**Category Features:**
- ✅ Service Panel
- ✅ Service Tracking
- ✅ Rooms Management
- ✅ Bookings

**Example:** A guesthouse on the **Basic Plan** gets:
- Dashboard
- Receipts
- Service Panel
- Service Tracking
- Rooms
- Bookings

---

### 5️⃣ **Hotels**
**Category:** `hotel`

**Category Features:**
- ✅ Point of Sale (POS)
- ✅ Inventory Management
- ✅ Service Panel
- ✅ Service Tracking
- ✅ Rooms Management
- ✅ Bookings

**Example:** A hotel on the **Basic Plan** gets:
- Dashboard
- Receipts
- POS
- Inventory
- Service Panel
- Service Tracking
- Rooms
- Bookings

*(Hotels get ALL category features: retail + service + accommodation)*

---

## 💎 Plan Upgrade Benefits

### **Basic Plan** (Free/Entry Level)
✅ Core features (Dashboard, Receipts)
✅ Category-specific features (based on business type)
❌ No HR
❌ No Accounting
❌ No Online Portal
❌ No Analytics
❌ No Business Account Settings

**Best for:** Small businesses, startups, single-owner operations

---

### **Standard Plan** (Mid-Tier)
✅ Everything in Basic
✅ **Human Resource Management** (employee management)
✅ **Accounting** (sales reports, expenses)

**Best for:** Growing businesses with employees, need financial tracking

---

### **Premium Plan** (Full Suite)
✅ Everything in Standard
✅ **Online Portal** (online ordering, e-commerce)
✅ **Analytics** (business insights, reports)
✅ **Business Account** (advanced settings, profile management)

**Best for:** Established businesses, multiple locations, online presence

---

## 🔐 How Access Control Works

### Code Flow:
```javascript
// 1. Get business info
const categorySlug = props.company.category.slug; // e.g., "restaurant"
const plan = props.company.plan; // e.g., "basic"

// 2. Calculate accessible features
function getAccessibleFeatures(categorySlug, plan) {
  // Start with core features
  const features = ['dashboard', 'receipts'];
  
  // Add category-specific features
  if (categorySlug === 'restaurant') {
    features.push('pos', 'inventory', 'service-panel', 'service-tracking');
  }
  
  // Add plan-based features
  if (plan === 'standard') {
    features.push('hr', 'accounting');
  }
  if (plan === 'premium') {
    features.push('hr', 'accounting', 'online-portal', 'analytics', 'business-account');
  }
  
  return features;
}

// 3. Check if user can access feature
const canAccess = (feature) => accessibleFeatures.includes(feature);
```

### Sidebar Display:
```jsx
{/* Only show if user has access */}
{hasAccess('hr') && (
  <li>Human Resource</li>
)}

{/* Only show if category allows AND plan allows */}
{hasAccess('online-portal') && (
  <li>Online Portal</li>
)}
```

---

## 📝 Current Status - Your Company

**Based on debug output:**
```
Company: Lehub Hotel
Category: restaurant (ID: 5)
Plan: basic
```

**Current Access:**
- ✅ Dashboard
- ✅ Receipts
- ✅ POS (from category)
- ✅ Inventory (from category)
- ✅ Service Panel (from category)
- ✅ Service Tracking (from category)
- ❌ HR (needs Standard or Premium)
- ❌ Accounting (needs Standard or Premium)
- ❌ Online Portal (needs Premium)
- ❌ Analytics (needs Premium)
- ❌ Business Account (needs Premium)

---

## 🎯 Recommendations

### For Your Hotel:
Since your `business_category` shows `slug: 'restaurant'` but the name is "Lehub Hotel", you should:

**Option 1: Update Category to 'hotel'**
```sql
UPDATE business_category SET slug = 'hotel' WHERE id = 5;
```
Then update the company record:
```sql
UPDATE company SET category_id = [hotel_category_id] WHERE id = 1;
```

This will give you access to Rooms & Bookings features.

**Option 2: Upgrade Plan**
- **Standard Plan** → Get HR + Accounting
- **Premium Plan** → Get everything (HR, Accounting, Online Portal, Analytics, Business Account)

---

## 🚀 Testing Different Plans

To test how different plans work, update your company's plan in the database:

```sql
-- Test Basic Plan
UPDATE company SET plan = 'basic' WHERE id = 1;

-- Test Standard Plan
UPDATE company SET plan = 'standard' WHERE id = 1;

-- Test Premium Plan
UPDATE company SET plan = 'premium' WHERE id = 1;
```

Refresh the page and check which sidebar items appear!

---

## 🛠️ Customization

To modify what features are included in each plan, edit:
```javascript
// resources/js/Layouts/components/Sidebar.jsx

const planFeatures = {
  basic: [], // Add features here for basic plan
  standard: ['hr', 'accounting'], // Modify standard features
  premium: ['hr', 'accounting', 'online-portal', 'analytics', 'business-account'], // Modify premium features
};
```

---

## 📞 Support

If you need to add new features or modify access rules, update the Sidebar.jsx file and rebuild:
```bash
npm run build
```

The system will automatically hide/show features based on category + plan combination! 🎉

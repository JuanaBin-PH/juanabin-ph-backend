# JuanaBin PH - Stellar Smart Contracts

**AI-Powered Waste Management Reward System on Stellar Blockchain**

This directory contains the smart contract implementation for JuanaBin's reward system built on Stellar Testnet.

---

## 📁 Files

| File | Description |
|------|-------------|
| `deployContract.js` | Deploy JBIN token and setup issuer/distribution accounts |
| `recordWasteDisposal.js` | Record waste disposal and mint JBIN rewards |
| `redeemRewards.js` | Redeem JBIN tokens for QR codes at partner stores |
| `carbonTracking.js` | Track and record CO₂ footprint savings |
| `package.json` | Node.js dependencies |

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd contracts
npm install
```

### 2. Deploy Smart Contract

```bash
npm run deploy
```

**Output:**
```
═══════════════════════════════════════════════════
   JuanaBin PH - Stellar Smart Contract Deployment
   Network: Testnet
═══════════════════════════════════════════════════

🚀 Creating JuanaBin Stellar Accounts...
📝 Issuer Account Created:
   Public Key: GDJUANABIN...
   Secret Key: S...

📝 Distribution Account Created:
   Public Key: GDDISTRIB...
   Secret Key: S...

💰 Funding accounts with Friendbot...
   ✅ Issuer account funded
   ✅ Distribution account funded

🪙 Creating JBIN Token Asset...
   Asset Code: JBIN
   Issuer: GDJUANABIN...

🔗 Establishing Trustline...
   ✅ Trustline established

💎 Minting 10000 JBIN tokens...
   ✅ JBIN tokens minted

⚙️ Configuring Issuer Account...
   ✅ Account options set

═══════════════════════════════════════════════════
   ✅ DEPLOYMENT SUCCESSFUL!
═══════════════════════════════════════════════════
```

### 3. Record Waste Disposal

```bash
npm run record
```

### 4. View on Stellar Explorer

Visit: https://stellar.expert/explorer/testnet

---

## 💻 Usage Examples

### Record Waste Disposal Transaction

```javascript
const { recordWasteDisposal } = require('./recordWasteDisposal');

const config = {
  issuerSecretKey: 'S...YOUR_ISSUER_SECRET',
  userPublicKey: 'G...USER_PUBLIC_KEY',
  wasteData: {
    userId: 'JB-USER-001',
    binId: 'BIN-014',
    wasteType: 'clear_pet_bottle',
    quantity: 15,
    location: 'Taguig City',
    aiVerified: true
  }
};

const result = await recordWasteDisposal(config);
console.log('Points Earned:', result.pointsEarned);
console.log('CO₂ Saved:', result.co2Saved, 'kg');
```

---

## 🎁 Reward Schedule

| Waste Type | Points | CO₂ Saved | PHP Value |
|------------|--------|-----------|-----------|
| Clear PET Bottle (1 pc) | 10 | 0.04 kg | ₱1.00 |
| Colored PET Bottle (1 pc) | 7 | 0.035 kg | ₱0.70 |
| Plastic Sachet (1 pc) | 1 | 0.005 kg | ₱0.10 |
| Sachet Bundle (50 pcs) | 75 | 0.25 kg | ₱7.50 |
| Food Waste (1 kg) | 15 | 0.5 kg | ₱1.50 |
| Cardboard (1 kg) | 8 | 0.9 kg | ₱0.80 |
| Glass Bottle (1 pc) | 5 | 0.15 kg | ₱0.50 |
| Metal Can (1 pc) | 8 | 0.2 kg | ₱0.80 |

**Conversion Rate:** 10 JBIN = ₱1.00 PHP

---

## 🔒 Security

### Environment Variables

Create `.env` file:

```env
ISSUER_SECRET_KEY=S...
DISTRIBUTION_SECRET_KEY=S...
ISSUER_PUBLIC_KEY=G...
DISTRIBUTION_PUBLIC_KEY=G...
```

### Multi-Signature Setup

For production, use 2-of-3 multi-sig:

```javascript
const { setOptions } = StellarSdk.Operation;

transaction.addOperation(setOptions({
  masterWeight: 1,
  lowThreshold: 2,
  medThreshold: 2,
  highThreshold: 2,
  signer: {
    ed25519PublicKey: backupPublicKey,
    weight: 1
  }
}));
```

---

## 📊 Transaction Flow

```
User Disposes Waste
       ↓
AI Verifies Waste Type
       ↓
recordWasteDisposal()
       ↓
Calculate Points + CO₂
       ↓
Mint JBIN Tokens
       ↓
Record on Stellar
       ↓
User Receives Rewards
```

---

## 🌍 Environmental Impact

Every transaction records:
- Waste type and quantity
- CO₂ footprint saved
- User contribution to sustainability

**Demo Results (AWS Capstone 2026):**
- 50+ transactions verified
- 1,009 JBIN minted (₱100.90)
- 10.75 kg CO₂ saved
- 161 kg waste collected

---

## 🔗 Links

- **Stellar Testnet Explorer**: https://stellar.expert/explorer/testnet
- **JuanaBin Website**: https://juanabin-landing-page.vercel.app
- **GitHub**: https://github.com/JuanaBin-PH
- **Stellar SDK Docs**: https://stellar.github.io/js-stellar-sdk/

---

## 📞 Support

**Developer:** Julie Ann Soriano  
**Email:** juanabinph@gmail.com  
**Phone:** 09924505499  

**AWS Capstone 2026** | **AWS Community Builders**

---

## 📄 License

MIT License - See LICENSE file for details

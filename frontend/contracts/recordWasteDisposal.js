/**
 * JuanaBin PH - Record Waste Disposal Smart Contract
 * 
 * This script records verified waste disposal events and mints JBIN reward tokens.
 */

const StellarSdk = require('@stellar/stellar-sdk');

// Stellar Testnet Configuration
const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
const networkPassphrase = StellarSdk.Networks.TESTNET;

/**
 * Reward Schedule (Points per waste type)
 */
const REWARD_SCHEDULE = {
  clear_pet_bottle: { points: 10, co2: 0.04 },
  colored_pet_bottle: { points: 7, co2: 0.035 },
  plastic_sachet: { points: 1, co2: 0.005 },
  plastic_sachet_bundle_50: { points: 75, co2: 0.25 },
  food_waste_kg: { points: 15, co2: 0.5 },
  cardboard_kg: { points: 8, co2: 0.9 },
  glass_bottle: { points: 5, co2: 0.15 },
  metal_can: { points: 8, co2: 0.2 }
};

/**
 * Calculate Reward Points and CO2 Saved
 */
function calculateReward(wasteType, quantity) {
  const schedule = REWARD_SCHEDULE[wasteType];
  
  if (!schedule) {
    throw new Error(`Unknown waste type: ${wasteType}`);
  }
  
  const pointsEarned = schedule.points * quantity;
  const co2Saved = schedule.co2 * quantity;
  
  return {
    pointsEarned,
    co2Saved: parseFloat(co2Saved.toFixed(3)),
    phpValue: parseFloat((pointsEarned / 10).toFixed(2))
  };
}

/**
 * Record Waste Disposal Transaction
 */
async function recordWasteDisposal(config) {
  const {
    issuerSecretKey,
    userPublicKey,
    wasteData
  } = config;
  
  console.log('═══════════════════════════════════════════════════');
  console.log('   Recording Waste Disposal Transaction');
  console.log('═══════════════════════════════════════════════════\n');
  
  try {
    // Validate inputs
    if (!issuerSecretKey || !userPublicKey || !wasteData) {
      throw new Error('Missing required parameters');
    }
    
    // Load issuer account
    const issuerKeypair = StellarSdk.Keypair.fromSecret(issuerSecretKey);
    const issuerAccount = await server.loadAccount(issuerKeypair.publicKey());
    
    // Create JBIN asset
    const jbinAsset = new StellarSdk.Asset('JBIN', issuerKeypair.publicKey());
    
    // Calculate rewards
    const reward = calculateReward(wasteData.wasteType, wasteData.quantity);
    
    console.log('📊 Waste Disposal Data:');
    console.log('   User:', userPublicKey);
    console.log('   Bin ID:', wasteData.binId);
    console.log('   Waste Type:', wasteData.wasteType);
    console.log('   Quantity:', wasteData.quantity);
    console.log('   Location:', wasteData.location);
    console.log('   AI Verified:', wasteData.aiVerified ? '✅ Yes' : '❌ No');
    console.log('');
    
    console.log('🎁 Calculated Rewards:');
    console.log('   Points Earned:', reward.pointsEarned, 'pts');
    console.log('   JBIN Tokens:', reward.pointsEarned, 'JBIN');
    console.log('   PHP Value: ₱', reward.phpValue);
    console.log('   CO₂ Saved:', reward.co2Saved, 'kg');
    console.log('');
    
    // Create transaction metadata
    const metadata = {
      type: 'waste_disposal',
      userId: wasteData.userId,
      binId: wasteData.binId,
      wasteType: wasteData.wasteType,
      quantity: wasteData.quantity,
      co2Saved: reward.co2Saved,
      timestamp: new Date().toISOString()
    };
    
    // Build transaction
    console.log('🔨 Building transaction...');
    const transaction = new StellarSdk.TransactionBuilder(issuerAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: networkPassphrase
    })
      .addOperation(StellarSdk.Operation.payment({
        destination: userPublicKey,
        asset: jbinAsset,
        amount: reward.pointsEarned.toString()
      }))
      .addMemo(StellarSdk.Memo.text(JSON.stringify(metadata).substring(0, 28))) // Stellar memo max 28 bytes
      .setTimeout(180)
      .build();
    
    // Sign transaction
    transaction.sign(issuerKeypair);
    
    // Submit to network
    console.log('📤 Submitting to Stellar Testnet...');
    const result = await server.submitTransaction(transaction);
    
    console.log('');
    console.log('═══════════════════════════════════════════════════');
    console.log('   ✅ TRANSACTION SUCCESSFUL!');
    console.log('═══════════════════════════════════════════════════\n');
    
    console.log('📋 Transaction Details:');
    console.log('   Hash:', result.hash);
    console.log('   Ledger:', result.ledger);
    console.log('   JBIN Minted:', reward.pointsEarned);
    console.log('   Recipient:', userPublicKey);
    console.log('');
    
    console.log('🔗 View on Explorer:');
    console.log(`   https://stellar.expert/explorer/testnet/tx/${result.hash}`);
    console.log('');
    
    return {
      success: true,
      txHash: result.hash,
      ledger: result.ledger,
      pointsEarned: reward.pointsEarned,
      jbinMinted: reward.pointsEarned.toString(),
      phpValue: reward.phpValue,
      co2Saved: reward.co2Saved,
      metadata: metadata
    };
    
  } catch (error) {
    console.error('\n❌ Transaction failed:', error.message);
    
    if (error.response) {
      console.error('   Error Details:', error.response.data);
    }
    
    throw error;
  }
}

/**
 * Demo: Record Sample Waste Disposal
 */
async function demoWasteDisposal() {
  console.log('\n🎮 Running Demo Waste Disposal...\n');
  
  // Example configuration (replace with your actual keys)
  const config = {
    issuerSecretKey: 'S...YOUR_ISSUER_SECRET_KEY',
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
  
  console.log('⚠️  This is a demo. Please replace keys with actual values!\n');
  console.log('To run actual transaction:');
  console.log('1. Deploy contract first (node deployContract.js)');
  console.log('2. Update issuerSecretKey and userPublicKey');
  console.log('3. Run: node recordWasteDisposal.js\n');
}

// Export for use in other modules
module.exports = {
  recordWasteDisposal,
  calculateReward,
  REWARD_SCHEDULE
};

// Run demo if executed directly
if (require.main === module) {
  demoWasteDisposal()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Demo failed:', error);
      process.exit(1);
    });
}

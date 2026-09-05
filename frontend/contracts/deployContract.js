/**
 * JuanaBin PH - Stellar Smart Contract Deployment
 * 
 * This script deploys the JBIN token and sets up the reward system
 * on Stellar Testnet.
 */

const StellarSdk = require('@stellar/stellar-sdk');

// Stellar Testnet Configuration
const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
const networkPassphrase = StellarSdk.Networks.TESTNET;

/**
 * Step 1: Create Issuer and Distribution Accounts
 */
async function createAccounts() {
  console.log('🚀 Creating JuanaBin Stellar Accounts...\n');

  // Generate Issuer Account (mints JBIN tokens)
  const issuerKeypair = StellarSdk.Keypair.random();
  console.log('📝 Issuer Account Created:');
  console.log('   Public Key:', issuerKeypair.publicKey());
  console.log('   Secret Key:', issuerKeypair.secret());
  console.log('');

  // Generate Distribution Account (holds JBIN supply)
  const distributionKeypair = StellarSdk.Keypair.random();
  console.log('📝 Distribution Account Created:');
  console.log('   Public Key:', distributionKeypair.publicKey());
  console.log('   Secret Key:', distributionKeypair.secret());
  console.log('');

  // Fund accounts using Friendbot (Testnet only)
  console.log('💰 Funding accounts with Friendbot...');
  
  try {
    await fetch(`https://friendbot.stellar.org?addr=${issuerKeypair.publicKey()}`);
    console.log('   ✅ Issuer account funded');
    
    await fetch(`https://friendbot.stellar.org?addr=${distributionKeypair.publicKey()}`);
    console.log('   ✅ Distribution account funded');
    console.log('');
  } catch (error) {
    console.error('❌ Error funding accounts:', error.message);
    throw error;
  }

  return { issuerKeypair, distributionKeypair };
}

/**
 * Step 2: Create JBIN Asset
 */
function createJBINAsset(issuerPublicKey) {
  console.log('🪙 Creating JBIN Token Asset...\n');
  
  const jbinAsset = new StellarSdk.Asset('JBIN', issuerPublicKey);
  
  console.log('   Asset Code: JBIN');
  console.log('   Issuer:', issuerPublicKey);
  console.log('   Type: Custom Stellar Asset');
  console.log('');
  
  return jbinAsset;
}

/**
 * Step 3: Establish Trustline (Distribution trusts JBIN)
 */
async function establishTrustline(distributionKeypair, jbinAsset) {
  console.log('🔗 Establishing Trustline...\n');
  
  try {
    const distributionAccount = await server.loadAccount(distributionKeypair.publicKey());
    
    const transaction = new StellarSdk.TransactionBuilder(distributionAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: networkPassphrase
    })
      .addOperation(StellarSdk.Operation.changeTrust({
        asset: jbinAsset,
        limit: '1000000' // Max 1M JBIN tokens
      }))
      .setTimeout(180)
      .build();
    
    transaction.sign(distributionKeypair);
    
    const result = await server.submitTransaction(transaction);
    console.log('   ✅ Trustline established');
    console.log('   Transaction Hash:', result.hash);
    console.log('');
    
    return result;
  } catch (error) {
    console.error('❌ Error establishing trustline:', error.message);
    throw error;
  }
}

/**
 * Step 4: Mint Initial JBIN Supply
 */
async function mintInitialSupply(issuerKeypair, distributionPublicKey, jbinAsset, amount) {
  console.log(`💎 Minting ${amount} JBIN tokens...\n`);
  
  try {
    const issuerAccount = await server.loadAccount(issuerKeypair.publicKey());
    
    const transaction = new StellarSdk.TransactionBuilder(issuerAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: networkPassphrase
    })
      .addOperation(StellarSdk.Operation.payment({
        destination: distributionPublicKey,
        asset: jbinAsset,
        amount: amount.toString()
      }))
      .addMemo(StellarSdk.Memo.text('Initial JBIN supply'))
      .setTimeout(180)
      .build();
    
    transaction.sign(issuerKeypair);
    
    const result = await server.submitTransaction(transaction);
    console.log('   ✅ JBIN tokens minted');
    console.log('   Transaction Hash:', result.hash);
    console.log('   Amount:', amount, 'JBIN');
    console.log('');
    
    return result;
  } catch (error) {
    console.error('❌ Error minting tokens:', error.message);
    throw error;
  }
}

/**
 * Step 5: Set Account Options (Authorization & Flags)
 */
async function setAccountOptions(issuerKeypair) {
  console.log('⚙️ Configuring Issuer Account...\n');
  
  try {
    const issuerAccount = await server.loadAccount(issuerKeypair.publicKey());
    
    const transaction = new StellarSdk.TransactionBuilder(issuerAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: networkPassphrase
    })
      .addOperation(StellarSdk.Operation.setOptions({
        setFlags: StellarSdk.AuthRevocableFlag | StellarSdk.AuthRequiredFlag,
        homeDomain: 'juanabin.ph'
      }))
      .setTimeout(180)
      .build();
    
    transaction.sign(issuerKeypair);
    
    const result = await server.submitTransaction(transaction);
    console.log('   ✅ Account options set');
    console.log('   - Authorization Required: Enabled');
    console.log('   - Revocable Tokens: Enabled (for fraud prevention)');
    console.log('   - Home Domain: juanabin.ph');
    console.log('   Transaction Hash:', result.hash);
    console.log('');
    
    return result;
  } catch (error) {
    console.error('❌ Error setting account options:', error.message);
    throw error;
  }
}

/**
 * Main Deployment Function
 */
async function deployContract() {
  console.log('═══════════════════════════════════════════════════');
  console.log('   JuanaBin PH - Stellar Smart Contract Deployment');
  console.log('   Network: Testnet');
  console.log('═══════════════════════════════════════════════════\n');

  try {
    // Step 1: Create accounts
    const { issuerKeypair, distributionKeypair } = await createAccounts();
    
    // Step 2: Create JBIN asset
    const jbinAsset = createJBINAsset(issuerKeypair.publicKey());
    
    // Step 3: Establish trustline
    await establishTrustline(distributionKeypair, jbinAsset);
    
    // Step 4: Mint initial supply (10,000 JBIN for demo)
    await mintInitialSupply(issuerKeypair, distributionKeypair.publicKey(), jbinAsset, 10000);
    
    // Step 5: Set account options
    await setAccountOptions(issuerKeypair);
    
    // Summary
    console.log('═══════════════════════════════════════════════════');
    console.log('   ✅ DEPLOYMENT SUCCESSFUL!');
    console.log('═══════════════════════════════════════════════════\n');
    
    console.log('📋 Contract Details:');
    console.log('   Asset Code: JBIN');
    console.log('   Issuer:', issuerKeypair.publicKey());
    console.log('   Distribution:', distributionKeypair.publicKey());
    console.log('   Initial Supply: 10,000 JBIN');
    console.log('   Network: Stellar Testnet');
    console.log('');
    
    console.log('🔗 View on Stellar Explorer:');
    console.log(`   https://stellar.expert/explorer/testnet/account/${issuerKeypair.publicKey()}`);
    console.log('');
    
    console.log('⚠️  IMPORTANT: Save these keys securely!');
    console.log('   Store them in environment variables or secure key management.');
    console.log('');
    
    return {
      issuer: {
        publicKey: issuerKeypair.publicKey(),
        secretKey: issuerKeypair.secret()
      },
      distribution: {
        publicKey: distributionKeypair.publicKey(),
        secretKey: distributionKeypair.secret()
      },
      asset: {
        code: 'JBIN',
        issuer: issuerKeypair.publicKey()
      }
    };
    
  } catch (error) {
    console.error('\n❌ Deployment failed:', error.message);
    throw error;
  }
}

// Run deployment if executed directly
if (require.main === module) {
  deployContract()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { deployContract };

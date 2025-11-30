# ⛓️ Blockchain Integration Guide

The IAH Creations Platform utilizes blockchain technology to ensure code ownership, integrity, and security.

## 🏗️ Architecture

We use a hybrid approach:

1.  **Local Hashing**: SHA-256 hash generated in the browser.
2.  **On-Chain Registry**: Hashes are stored on the **Polygon (MATIC)** network for low fees and fast confirmation.

## 📜 Smart Contract

The `CodeRegistry` smart contract handles the following:

- `registerCode(string memory hash)`: Stores the code hash with the sender's address.
- `verifyOwnership(string memory hash)`: Returns the owner address of a hash.

## 🚀 Features

### 1. Anti-Theft Protection

Every time code is generated via the **Prompt-to-App** builder or a template is purchased, a unique hash is generated. This hash is immutable proof of the code's state at that time.

### 2. Ownership Verification

Users can verify they own a specific version of an application by signing a message with their crypto wallet.

### 3. Licensing

(Planned for v5.1) NFT-based licenses for templates, allowing resale and transfer of ownership.

## 🛠️ Configuration

To enable blockchain features in your local instance:

1.  Open `index.html`.
2.  Locate `BlockchainHub`.
3.  Set `enabled: true`.
4.  Configure your provider (e.g., MetaMask or a custom RPC URL).

```javascript
const BlockchainHub = {
  enabled: true,
  chain: "polygon",
  // ...
};
```

## ⚠️ Disclaimer

Blockchain transactions are irreversible. Ensure you are using the correct wallet address and network.

## **Overview**

**Limelight (LMLT)** is a revolutionary platform aimed at empowering the music industry by leveraging algorithmic artist discovery and blockchain technology. It provides tools for artists, producers, fans, and music outlets to engage, grow, and monetize their creativity while earning rewards and building communities.

### **Key Features**
1. **For Artists**:
   - **Stake-based Voting**: Earn exposure as users stake LMLT tokens directly to your music.
   - **NFT Album Distribution**: Mint unlimited NFTs for albums with revenue from sales and secondary market fees.
   - **Promotion Discounts**: Purchase promotional slots on top music outlets at discounted rates.
   - **Feature Collaboration**: Use escrow services to manage features with other artists.
   - **Beat Marketplace**: Discover and buy/lease beats securely.
   - **AI-Powered Growth Insights**: Access feedback, album inspiration, and analytics for career growth.

2. **For Producers**:
   - Showcase and monetize beats directly.
   - Collaborate with artists in a transparent, secure ecosystem.

3. **For Music Fans**:
   - Vote for favorite artists and tracks.
   - Earn rewards for engagement (voting, referrals, etc.).
   - Participate in community activities like artist growth and NFT ownership.

4. **For Music Outlets**:
   - Advertise and connect with verified artists.
   - Monetize promotional slots and collaborations.

---

## **Tokenomics**

- **Token Name**: Limelight (LMLT)
- **Network**: Ethereum (Bridged to Base, Polygon, and Arbitrum)
- **Total Supply**: 1,000,000,000 LMLT
- **Initial Price**: $0.01 / LMLT

### **Distribution**
- **Team**: 15%
- **Liquidity Pool (Base)**: 10%
- **Marketing & Partnerships**: 25%
- **Rewards**: 10%
- **Development**: 15%
- **Bonding Curve**: 25%

### **Reward Program**
1. **1000 LMLT**: Refer an artist who creates a profile and uploads one song.
2. **100 LMLT**: Share Limelight profile on social media.
3. **100 LMLT**: Vote on 10 artists.
4. **100 LMLT Weekly**: Stay active (multiplies with continued activity).

### **Joining Fee**
- **10,000 LMLT / $100**: Join the platform.
- Artists referred by existing members join for free (5 free invites per artist).

---

## **Roadmap**

### Phase 1: Platform Launch (Q1 2024)
- **Artist Profiles**: Enable artists to create profiles and upload tracks.
- **Voting System**: Allow fans to stake LMLT tokens to vote for artists.
- **Reward Mechanism**: Launch referral and activity-based rewards.
- **Basic NFT Minting**: Introduce NFT album distribution for artists.

### Phase 2: Ecosystem Expansion (Q2 2024)
- **Escrow Services**: Facilitate secure collaborations for features and beat purchases.
- **Promotions Marketplace**: Integrate with top music outlets for discounted promotional slots.
- **AI Assistant**: Deploy AI tools for artist growth insights and analytics.

### Phase 3: Multi-chain Integration (Q3 2024)
- **Blockchain Expansion**: Launch on Polygon and Arbitrum.
- **Bridge Services**: Enable seamless token bridging across Ethereum, Base, Polygon, and Arbitrum.
- **Community Voting**: Allow users to vote on the next blockchain integration.

### Phase 4: Community Growth (Q4 2024)
- **Advanced Reward Programs**: Introduce tiered rewards for loyal users.
- **Fan Clubs**: Enable fans to create and manage artist fan clubs.
- **Interactive Features**: Launch social features like artist Q&A and live events.

### Phase 5: Full Ecosystem Deployment (2025)
- **Music Outlets Dashboard**: Provide tools for outlets to manage advertisements and partnerships.
- **Global Partnerships**: Collaborate with major music labels and streaming platforms.
- **DAO Governance**: Transition to a decentralized governance model for Limelight.

---

## **Directory Structure**

```plaintext
Limelight/
│
├── public/               # Static files (images, icons, etc.)
│   ├── logo.png          # Limelight logo
│   └── avatar.png        # Default user avatar
│
├── components/           # Reusable UI components
│   ├── Navbar.tsx        # Navigation bar for the platform
│   ├── LmltCurve.tsx     # Bonding curve progress page
│   ├── ProfileAppBar.tsx # User profile app bar
│   └── WelcomeEmail.tsx  # Welcome email template
│
├── models/               # Firestore database models
│   ├── users.ts          # User model
│   ├── comments.ts       # Comment model for discussions
│   └── trades.ts         # Trade model for tracking token trades
│
├── services/             # Firebase and third-party service handlers
│   ├── firebase.ts       # Firebase configuration and service setup
│   ├── userService.ts    # User-specific services
│   ├── commentService.ts # Comment-related operations
│   └── tradeService.ts   # Bonding curve and trade data
│
├── pages/                # Main application pages
│   ├── index.tsx         # Homepage
│   ├── profile.tsx       # User profile page
│   ├── trades.tsx        # Token trade tracking
│   └── bonding.tsx       # LMLT bonding curve progress
│
├── styles/               # Global and component-specific styles
│   └── global.css        # Application-wide styles
│
├── README.md             # This file
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

---

## **Getting Started**

### Prerequisites
- **Node.js** (v16 or higher)
- **Firebase Admin SDK** (for database access)
- **Thirdweb SDK** (for blockchain operations)

### Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/limelight.git
   cd limelight
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup Firebase**:
   - Add your `firebase-adminsdk.json` file to the root directory.
   - Update the `firebase.ts` file with your project configurations.

4. **Setup Thirdweb**:
   - Create a Thirdweb client ID.
   - Update the `LmltCurve.tsx` file with the bonding curve logic.

5. **Run the application**:
   ```bash
   npm run dev
   ```

---

## **Contact**

- **Team**:
  - @bizlal
  - @ramzies
  - @adil
- **Support**:
  - Email: support@limelight.io
  - Telegram: [Limelight Telegram](https://t.me/limelight)

Feel free to contribute or suggest improvements!

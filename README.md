# Tokenized Independent Film Distribution Rights

A blockchain-based platform for verifying, managing, tracking, and monetizing distribution rights for independent films across global territories.

## Overview

This system leverages blockchain technology and tokenization to create a transparent, efficient marketplace for independent film distribution rights. Through four specialized smart contracts, the platform enables filmmakers to validate their productions, segment and sell territorial distribution rights, track revenue across multiple channels, and automatically distribute royalties to rights holders, addressing the fragmented and often opaque nature of film distribution.

## Core Components

### 1. Film Verification Contract

Validates completed independent productions:
- Film metadata registration and verification
- Copyright documentation and chain of title
- Technical specifications verification
- Festival screening and award documentation
- Director/producer authentication
- Content fingerprinting and verification
- Rating certification records
- Legal clearance documentation
- Marketing asset verification

### 2. Territory Rights Contract

Manages distribution permissions by region:
- Tokenized territorial rights creation
- Geographic distribution permissions
- Rights duration and terms management
- Distribution window definitions
- Platform-specific permissions (theatrical, streaming, VOD)
- Territory-specific rating compliance
- Language and subtitle requirements
- Marketing restrictions and requirements
- Rights transfer and resale capabilities

### 3. Revenue Tracking Contract

Monitors income from various channels:
- Ticket sales verification
- Streaming platform revenue integration
- VOD purchase tracking
- Television broadcast licensing
- Educational and institutional sales
- Merchandise and ancillary revenue
- Festival screening fees
- Advertising revenue sharing
- Multi-currency support and conversion

### 4. Royalty Distribution Contract

Allocates payments to rights holders:
- Automated payment distribution
- Smart contract-enforced revenue splits
- Investor recoupment tracking
- Minimum guarantee management
- Performance-based bonus structures
- Currency conversion and settlement
- Payment schedule management
- Tax withholding compliance
- Transparent distribution reporting

## Getting Started

### Prerequisites

- Ethereum-compatible blockchain network
- Node.js v16.0+
- Truffle Suite v5.0+
- MetaMask or similar Web3 wallet
- IPFS for decentralized storage of film metadata and promotional assets

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/film-distribution-rights.git
   cd film-distribution-rights
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Compile smart contracts:
   ```
   truffle compile
   ```

4. Deploy to your preferred network:
   ```
   truffle migrate --network [network-name]
   ```

## Usage

### For Filmmakers

1. Register and verify film production details
2. Define territorial distribution rights packages
3. Set terms and conditions for each territory
4. Create tokenized rights offerings
5. Monitor revenue across all distribution channels
6. Access transparent royalty distribution records
7. Engage directly with distributors worldwide

### For Distributors

1. Browse verified independent film catalog
2. Purchase territorial distribution rights via tokens
3. Access delivery materials and marketing assets
4. Report revenue through verified channels
5. Build distribution reputation through transparent performance
6. Discover new content based on territory-specific performance
7. Transfer or resell rights when permitted

### For Investors

1. Track film performance across territories
2. Monitor revenue collection in real-time
3. Verify royalty calculations and distributions
4. Analyze return on investment metrics
5. Access transparent recoupment status
6. Participate in secondary markets for rights tokens

### For Audiences

1. Verify film authenticity and official distribution
2. Support independent filmmakers through legitimate channels
3. Access region-appropriate versions and localizations
4. Contribute to transparent industry practices
5. Discover independent films with verified distribution

## API Reference

The system provides REST APIs for integration with existing film distribution platforms:

- `POST /api/film/verify` - Register and verify a new film
- `GET /api/film/:id` - Get film verification details
- `POST /api/territory/create` - Create territorial distribution rights
- `GET /api/territory/:filmId` - View territorial rights availability
- `POST /api/revenue/record` - Submit revenue information
- `GET /api/revenue/:filmId` - Access revenue history by film
- `POST /api/royalty/distribute` - Trigger royalty distribution
- `GET /api/royalty/:stakeholderId` - View royalty payment history

## Architecture

The system implements a hybrid architecture:
- On-chain: Rights ownership, transaction history, revenue verification, and payment distributions
- Off-chain: Film files, marketing materials, and detailed analytics (IPFS hashes stored on-chain)

Smart contracts use role-based access control to ensure only authorized entities can modify records.

## Tokenization Model

- ERC-721 tokens represent unique territorial distribution rights
- Each token contains metadata including:
    - Territory boundaries
    - Rights duration
    - Distribution channels permitted
    - Revenue share percentages
    - Minimum guarantees
    - Performance requirements
- Secondary market for rights trading with royalty provisions for original creators
- Token-gated access to distribution materials

## Security Considerations

- Multi-signature requirements for rights transfers
- Escrow mechanisms for distribution advances
- Revenue verification through multiple sources
- Regular auditing of royalty distributions
- KYC/AML compliance for significant transactions
- Dispute resolution mechanisms with timelock features

## Future Enhancements

- Integration with major streaming analytics platforms
- AI-powered revenue forecasting
- Automated translation and localization services
- NFT-based collector's editions for fans
- Cross-chain compatibility for wider market access
- Decentralized film financing mechanisms

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

# OWASP RGIPT Student Chapter Members Registration & Management System

## Overview

Welcome to the backend system for the OWASP RGIPT Student Chapter's Members Registration & Management. This solution integrates the immutability of Ethereum's blockchain with decentralized storage provided by IPFS. Moreover, the InterPlanetary Name System (IPNS) functionality with Lighthouse is employed for maintaining a consistent address for mutable data, ensuring a transparent, secure, and fail-safe management of student member data.

## Directory Structure

```markdown
.
├── config.js
├── config.json
├── output.txt
├── package.json
└── src
    ├── builds
    │   └── swagger.yaml    (Swagger API Documentation)
    ├── controllers
    │   └── contractController.js    (Handles interactions with the Ethereum blockchain)
    ├── middlewares
    │   ├── errorMiddleware.js    (Handles server errors)
    │   └── verificationMiddleware.js    (Verifies user/admin permissions)
    ├── routes
    │   └── contractRoutes.js     (Defines the API routes)
    ├── server.js    (Initiates the Express server)
    ├── smartcontract
    │   ├── builds
    │   │   └── compiledContract.json    (Compiled Ethereum contract)
    │   ├── contractInteract
    │   │   └── contractInteract.js    (Interactions with the deployed Ethereum contract)
    │   ├── contracts
    │   │   └── OwaspContract.sol    (Ethereum contract source for managing members)
    │   └── scripts
    │       └── compile.js    (Compiles the Ethereum contract)
    ├── test
    │   └── contractRoutes.test.js    (Tests for the contract routes)
    └── utils
        ├── contract.js    (Utility functions for the contract)
        ├── fileUtils.js    (File handling utilities)
        ├── ipfsUpload.js    (Handles uploads to IPFS)
        └── saveDataWithIpns.js    (Backs up data on IPFS using IPNS through Lighthouse)
```


## Getting Started

1. **Installation**:
   - Ensure Node.js is installed.
   - Navigate to the root directory and run:
        ```bash
        npm install
        ```

2. **Starting the server**:
    ```bash
    npm start
    ```

The server runs on port 3000. Access it at "http://localhost:3000".

3. **API Documentation**:
After server initialization, view the Swagger API docs at: http://localhost:3000/api-docs


## Core Features

- **Blockchain-Driven**: The use of Ethereum provides a transparent and immutable record of all student registrations, ensuring transparency and security.
- **Decentralized Backup on IPFS with IPNS**: While IPFS offers decentralized storage, IPNS adds a layer of dynamism by allowing the system to publish and resolve mutable data under the same address. In this system, Lighthouse, a gateway to IPFS, is employed to provide a secondary backup of all student data, using IPNS to maintain consistent references, adding an additional layer of redundancy and security.
- **Token-Based Authentication**: User and Admin actions are token-verified to prevent unauthorized access or modifications.


## Key Routes

- **User Data**: Register a new student member, fetch data using a Roll Number, check approval status, and delete a student's data.
- **Admin**: Add or remove an admin, and set a student's approval status.

## Tests

Tests are crucial. Run:

```shell
npm test
```


## Safety Measures

- **Configurations**: Ensure `config.json` and `wallet.json` are kept securely. Exposing these may compromise the system's integrity.
- **Middleware**: Middleware is crucial in this setup for security. Always use middleware for permissions.

## Contributions

Feedback and contributions are appreciated. Please test changes and follow best practices.

## Troubleshooting & Support

For issues, please check the API documentation. If problems continue, reach out to the maintainer or raise an issue on the repository.

## Acknowledgment

This system showcases the synergy of blockchain, decentralized storage, and IPNS, ensuring the OWASP RGIPT Student Chapter operates transparently and securely. With IPNS, mutable data storage becomes a seamless experience on decentralized platforms. We thank the Ethereum, IPFS, and IPNS communities for their contribution to open-source technologies that drive such innovations.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). All rights reserved to the OWASP RGIPT Student Chapter.


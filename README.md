 

# Crowdfunding Application

This is a Decentralised crowdfunding application that allows users to create and fund projects. It is built with Next.js,Styled Components, Solidity, Hardhat, and Ether.js, and deployed on the Polygon blockchain with the Alchemy node provider.

# Features:

-User authentication: users can connect with their Metamask Wallet 
-Project creation: users can create new projects with a title, description, and funding goals
-Campaign Types: users can between various options like Business/FInance. Educaion,Chairty/NGOs, Animal etc.
-Project browsing: users can browse existing projects and see their details, including the amount raised so far
-Project funding: users can fund a project by donation in the form of $MATIC cryptocurrency and can track the fund he/she has donated
-Project updates: project creators can update their project with progress reports

# Technologies Used:
Next.js
Styled Components
Solidity
Hardhat
Ether.js
Polygon blockchain
Alchemy node provider
Metamask Wallet 


# Installation:
To run the application locally, follow these steps:



# Run Locally

Clone the project

```bash
  git clone https://github.com/Rkvishnu/fundme.git
```

Go to the project directory

```bash
  cd fundme/fundraiser-web3
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
 
# Deployment
To deploy the application to the Polygon blockchain with Alchemy node provider, follow these steps:

-Set up an Alchemy account and get your API keys
-Set up a Hardhat network for Polygon and add your network configuration to a hardhat.config.js file, including the Alchemy node provider URL and API keys
-Deploy the contract to the Polygon network: npx hardhat run scripts/deploy.js --network polygon
-Build the application: npm run build
-Deploy the application to a hosting service of your choice, such as Vercel

# ENVIRONMENT FILE

Create a .env file in the root folder of the project  and add these information
```bash
PUBLIC_PRIVATE_KEY='your metamask account private key'
ALCHEMY_URL= "your alchemy project URL"
PUBLIC_ADDRESS='YOUR deployed public_address'

Setup an infura account:

PUBLIC_IPFS_ID='your project ipfs id'
PUBLIC_IPFS_KEY='your ipfs secret key'
```


# Contributing
If you would like to contribute to this project, please follow these steps:

-Fork the repository
-Create a new branch for your changes: git checkout -b my-feature-branch
-Make your changes and commit them: git commit -am "Add some feature"
-Push to the branch: git push origin my-feature-branch
-Create a new Pull Request


# License
This project is licensed under the MIT License - see the LICENSE file for details.

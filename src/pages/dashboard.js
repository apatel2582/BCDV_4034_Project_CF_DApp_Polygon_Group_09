import styled from "styled-components";
import Image from "next/image";
import { ethers } from "ethers";
import CampaignFactory from "../artifacts/contracts/Campaign.sol/CampaignFactory.json";
import Campaign from "../artifacts/contracts/Campaign.sol/Campaign.json"; // Import Campaign ABI
import { useEffect, useState } from "react";
import Link from "next/link";
import { PUBLIC_ADDRESS } from "../context";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PaidIcon from "@mui/icons-material/Paid";
import EventIcon from "@mui/icons-material/Event";

export default function Dashboard() {
  const [campaignsData, setCampaignsData] = useState([]);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const connectedAddress = await signer.getAddress();
      const contract = new ethers.Contract(
        PUBLIC_ADDRESS,
        CampaignFactory.abi,
        signer
      );

      const allData = [];
      let index = 0;
      let continueFetching = true;

      while (true) {
        try {
          const campaignAddress = await contract.deployedCampaigns(index);
          console.log("campaignaddress", campaignAddress);
          // Check if the campaignAddress is the zero address, indicating no more campaigns
          if (
            campaignAddress === "0x0000000000000000000000000000000000000000"
          ) {
            break; // Exit the loop if no more campaigns are found
          }
          const campaignContract = new ethers.Contract(
            campaignAddress,
            Campaign.abi,
            signer
          );
          // Accessing the public variables directly
          const title = await campaignContract.title();
          const requiredAmount = await campaignContract.requiredAmount();
          const image = await campaignContract.image();
          const owner = await campaignContract.owner();
          const story = await campaignContract.story();
          const receivedAmount = await campaignContract.receivedAmount();

          console.log("title", title);
          console.log("requiredAmount", requiredAmount);
          console.log("image", image);
          console.log("owner", owner);
          console.log("story", story);
          console.log("receivedAmount", receivedAmount);

          console.log("connectedAddress", connectedAddress);
          if (owner === connectedAddress) {
            allData.push({
              id: index,
              title: title,
              image: image,
              owner: owner,
              story: story,
              requiredAmount: ethers.utils.formatEther(requiredAmount),
              receivedAmount: ethers.utils.formatEther(receivedAmount),
              address: campaignAddress,
            });
          }

          index++;
        } catch (error) {
          console.log("Error fetching campaigns:", error);
          continueFetching = false;
          break;
        }
      }

      setCampaignsData(allData);
    };

    if (isWalletConnected) {
      fetchCampaigns();
    }
  }, [isWalletConnected]);

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      setIsWalletConnected(accounts.length > 0);
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum
        .request({ method: "eth_accounts" })
        .then(handleAccountsChanged)
        .catch((error) => {
          console.error("Error fetching accounts:", error);
        });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  return (
    <HomeWrapper>
      {isWalletConnected ? (
        <CardsWrapper>
          {campaignsData.length > 0 ? (
            campaignsData.map((e) => (
              <Card key={e.id}>
                <CardImg>
                  <Image
                    alt="crowdfunding dapp"
                    layout="fill"
                    src={`https://rose-wonderful-yak-265.mypinata.cloud/ipfs/${e.image}`}
                  />
                </CardImg>
                <Title>{e.title}</Title>
                <CardData>
                  <Text>
                    Owner
                    <AccountBoxIcon />
                  </Text>
                  <Text>
                    {e.owner.slice(0, 6)}...{e.owner.slice(39)}
                  </Text>
                </CardData>
                <CardData>
                  <Text>
                    Amount
                    <PaidIcon />
                  </Text>
                  <Text>{e.amount} Matic</Text>
                </CardData>
                <CardData>
                  <Text>
                    <EventIcon />
                  </Text>
                  <Text>{new Date(e.timeStamp * 1000).toLocaleString()}</Text>
                </CardData>
                <Link passHref href={`/${e.address}`}>
                  <Button>Go to Campaign</Button>
                </Link>
              </Card>
            ))
          ) : (
            <div>No campaigns found</div>
          )}
        </CardsWrapper>
      ) : (
        <div>Please connect your wallet to see the campaigns.</div>
      )}
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 25px;
`;
const Card = styled.div`
  width: 30%;
  margin-top: 20px;
  background-color: ${(props) => props.theme.bgDiv};

  &:hover {
    transform: translateY(-10px);
    transition: transform 0.5s;
  }

  &:not(:hover) {
    transition: transform 0.5s;
  }
`;
const CardImg = styled.div`
  position: relative;
  height: 120px;
  width: 100%;
`;
const Title = styled.h2`
  font-family: "Roboto";
  font-size: 18px;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  font-weight: normal;
`;
const CardData = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
`;
const Text = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: "Roboto";
  font-size: 18px;
  font-weight: bold;
`;
const Button = styled.button`
  padding: 8px;
  text-align: center;
  width: 100%;
  background-color: #00b712;
  background-image: linear-gradient(180deg, #00b712 0%, #5aff15 80%);
  border: none;
  cursor: pointer;
  font-family: "Roboto";
  text-transform: uppercase;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;

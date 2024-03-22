import styled from "styled-components";
import { FormState } from "../Form";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { create as IPFSHTTPClient } from "ipfs-http-client";

// const client = IPFSHTTPClient("https://ipfs.infura.io:5001/api/v0");
// const projectId = process.env.PUBLIC_IPFS_ID
// const projectSecret = process.env.PUBLIC_IPFS_KEY
const projectId = "2L5pwuAwz1P2cJYyTXAqIm1MMjD";
const projectSecret = "3e23f57d4f414ea0a95d6be9a14111e2";

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = IPFSHTTPClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const FormRightWrapper = () => {
  const Handler = useContext(FormState);

  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const uploadFiles = async (e) => {
    e.preventDefault();
    setUploadLoading(true);

    const pinataApiKey = "c11d032eae36a9d0c422";
    const pinataSecretApiKey =
      "206f5ed1f7102b5e179547e3956211f0311c9d54b39873a761dad69cfd181f47";
    const pinataApiUrl = "https://api.pinata.cloud/pinning/pinFileToIPFS";

    if (Handler.form.story !== "") {
      try {
        // Create form data
        let data = new FormData();
        data.append(
          "file",
          new Blob([Handler.form.story], { type: "text/plain" })
        );

        // Pin story to Pinata
        const storyResponse = await fetch(pinataApiUrl, {
          method: "POST",
          headers: {
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
          body: data,
        });

        const storyJson = await storyResponse.json();
        if (storyResponse.ok) {
          Handler.setStoryUrl(`${storyJson.IpfsHash}`);
        } else {
          throw new Error("Failed to upload story to Pinata");
        }
      } catch (error) {
        console.error("Error uploading story to Pinata:", error);
        toast.warn(`Error Uploading Story`);
      }
    }

    if (Handler.image !== null) {
      try {
        // Create form data
        let imageData = new FormData();
        imageData.append("file", Handler.image);

        // Pin image to Pinata
        const imageResponse = await fetch(pinataApiUrl, {
          method: "POST",
          headers: {
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
          body: imageData,
        });

        const imageJson = await imageResponse.json();
        if (imageResponse.ok) {
          Handler.setImageUrl(`${imageJson.IpfsHash}`);
        } else {
          throw new Error("Failed to upload image to Pinata");
        }
      } catch (error) {
        console.error("Error uploading image to Pinata:", error);
        toast.warn(`Error Uploading Image`);
      }
    }

    setUploadLoading(false);
    setUploaded(true);
    Handler.setUploaded(true);
    toast.success("Files Uploaded Successfully");
  };

  return (
    <FormRight>
      <FormInput>
        <FormRow>
          <RowFirstInput>
            <label>Required Amount</label>
            <Input
              onChange={Handler.FormHandler}
              value={Handler.form.requiredAmount}
              name="requiredAmount"
              type={"number"}
              placeholder="Required Amount"
            ></Input>
          </RowFirstInput>
          <RowSecondInput>
            <label>Choose Category</label>
            <Select
              onChange={Handler.FormHandler}
              value={Handler.form.category}
              name="category"
            >
              <option>SocialCauses</option>
              <option>Finance</option>
              <option>Science</option>
              <option>Environment</option>
              <option>Arts</option>
              <option>Education</option>
              <option>Health</option>
              <option>Animal</option>
            </Select>
          </RowSecondInput>
        </FormRow>
      </FormInput>
      {/* Image */}
      <FormInput>
        <label>Select Image</label>
        <Image
          alt="dapp"
          onChange={Handler.ImageHandler}
          type={"file"}
          accept="image/*"
        ></Image>
      </FormInput>
      {uploadLoading == true ? (
        <Button>
          <TailSpin color="#fff" height={20} />
        </Button>
      ) : uploaded == false ? (
        <Button onClick={uploadFiles}>Upload Files to IPFS</Button>
      ) : (
        <Button style={{ cursor: "no-drop" }}>
          Files uploaded Sucessfully
        </Button>
      )}
      <Button onClick={Handler.startCampaign}>Start Campaign</Button>
    </FormRight>
  );
};

const FormRight = styled.div`
  width: 45%;
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "poppins";
  margin-top: 10px;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Input = styled.input`
  padding: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;
`;

const RowFirstInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const RowSecondInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const Select = styled.select`
  padding: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;
`;

const Image = styled.input`
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;

  &::-webkit-file-upload-button {
    padding: 15px;
    background-color: ${(props) => props.theme.bgSubDiv};
    color: ${(props) => props.theme.color};
    outline: none;
    border: none;
    font-weight: bold;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px;
  color: white;
  background-color: #00b712;
  background-image: linear-gradient(180deg, #00b712 0%, #5aff15 80%);
  border: none;
  margin-top: 30px;
  cursor: pointer;
  font-weight: bold;
  font-size: large;
`;

export default FormRightWrapper;

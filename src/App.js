import { useState, useEffect } from "react";
import {
  Text,
  Button,
  NumberInput,
  NumberInputField,
  Input,
  Flex,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { ContentContainer } from "./components";
import abi from "./contracts/token.json";

function App() {
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [address, setAddress] = useState();
  const [contract, setContract] = useState();
  const [tokenBalance, setTokenBalance] = useState();
  const [tokenInput, setTokenInput] = useState();
  const [addressInput, setAddressInput] = useState();

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const connectWallet = () => {
    const newProvider = new ethers.providers.Web3Provider(window.ethereum);
    if (newProvider) {
      const newSigner = newProvider.getSigner();
      setProvider(newProvider);
      setSigner(newSigner);
      newSigner.getAddress().then((addr) => {
        setAddress(addr);
      });
    } else {
      console.error("Couldn't connect to wallet");
    }
  };

  useEffect(() => {
    if (provider) {
      const token = new ethers.Contract(contractAddress, abi, provider);
      setContract(token);
    }
  }, [provider]);

  useEffect(() => {
    if (contract && address) {
      contract
        .balanceOf(address)
        .then((balance) => {
          setTokenBalance(balance.toNumber());
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [contract, address]);

  const sendTokens = () => {
    if (addressInput && tokenInput && contract && signer) {
      const tokenWithSigner = contract.connect(signer);
      tokenWithSigner.transfer(addressInput, tokenInput);
    }
  };

  return (
    <ContentContainer>
      {address ? (
        <Text>User: {address}</Text>
      ) : (
        <Button onClick={connectWallet} bg="green" color="white">
          Connect Wallet
        </Button>
      )}
      {tokenBalance && <Text>User Tokens: {tokenBalance}</Text>}
      {contract && (
        <Flex direction="column">
          <Input
            mt={5}
            placeholder="address"
            onChange={(event) => setAddressInput(event.target.value)}
            value={addressInput}
          />
          <NumberInput
            placeholder="amount"
            mt={5}
            onChange={(value) => {
              setTokenInput(value);
            }}
            value={tokenInput}
            max={tokenBalance}
          >
            <NumberInputField placeholder="address" />
          </NumberInput>
          <Button mt={5} onClick={sendTokens}>
            Send
          </Button>
        </Flex>
      )}
    </ContentContainer>
  );
}

export default App;

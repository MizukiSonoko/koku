import axios from "axios";
import { Web3Service } from "./web3";
import { getDefaultProvider, Wallet, Signer, Provider, EthMessageSigner, types, utils } from "zksync"
import { ethers } from "ethers";

export async function a() {

}
export class zkSyncClient {
  private static endpoint = "https://rinkeby3-zandbox.zksync.dev/api/v1/contract";

  public static url(path: string): string {
    return zkSyncClient.endpoint + "/" + path;
  }

  public static async query(address: string, method: string, argv: object) {
    const response = await axios.put(zkSyncClient.url("query") + `?address=${address}&method=${method}`,  {
      "arguments": argv
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response;
  }

  public static async call(caller: string, address: string, method: string, argv: object) {
    const nonce = 100;
    const accountId = 144905;

    const web3 = new Web3Service();
    const web3Provider = new ethers.providers.Web3Provider(web3.web3.givenProvider);

    const transfer = {
      type: 'Transfer',
      accountId,
      from: caller,
      to: address,
      token: 0,
      tokenId: 0,
      amount: ethers.utils.parseEther("0"),
      fee: "37500000000000",
      nonce,
      validFrom: 0,
      validUntil: utils.MAX_TIMESTAMP,
    }

    // zkSync.singer signs 
    const singer = await Signer.fromETHSignature(web3Provider.getSigner())
    console.log("ethSignatureType", singer.ethSignatureType)
    const signedTransfer = await singer.signer.signSyncTransfer(transfer)

    // convert some params for signing on ethereum 
    const zkSyncProvider = await getDefaultProvider("rinkeby");
    const stringAmount = zkSyncProvider.tokenSet.formatToken(transfer.token, transfer.amount);
    const stringFee = zkSyncProvider.tokenSet.formatToken(transfer.token, transfer.fee);
    const stringToken = zkSyncProvider.tokenSet.resolveTokenSymbol(transfer.token);

    // ethSinger signs
    const ethMesssageSinger = new EthMessageSigner(web3Provider.getSigner(), {
      verificationMethod: 'ECDSA',
      isSignedMsgPrefixed: true,
    })

    console.log({
      stringAmount, // like a '0.0'
      stringToken,  // 'ETH'
      stringFee,    // like a '0.0000375'
      to: transfer.to,
      nonce: transfer.nonce,
      accountId: transfer.accountId
    })
    const ethereumSignature = await ethMesssageSinger.ethSignTransfer({
      stringAmount, // like a '0.0'
      stringToken,  // 'ETH'
      stringFee,    // like a '0.0000375'
      to: transfer.to,
      nonce: transfer.nonce,
      accountId: transfer.accountId
    })
    const transaction = {
      "tx": signedTransfer,
      ethereumSignature
    }

    console.log("transaction", transaction)
    const response = await axios.post(zkSyncClient.url("call") + `?address=${address}&method=${method}`,  
    {
      "arguments": {
        ...argv
      },
      transaction
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response;
  }

  public static async transfer(address: string) {
    console.log("address", address)
    const web3 = new Web3Service();  

    const provider = new ethers.providers.Web3Provider(web3.web3.givenProvider);
    const zkSyncProvider = await getDefaultProvider("rinkeby");
    const wallet = await Wallet.fromEthSigner(provider.getSigner(), zkSyncProvider)
    const ret = await wallet.syncTransfer({
      to: address,
      token: "ETH",
      amount: "0.1_E12",
      fee:"37500000000000",
      nonce: 100,
    })
    console.log(ret)
    return;
  }

  public static async transferNFT(adderess: string, nft: types.NFT) {
    console.log("transferNFT")
    const feeToken = "ETH";
    const web3 = new Web3Service();  
    const provider = new ethers.providers.Web3Provider(web3.web3.givenProvider);
    const zkSyncProvider = await getDefaultProvider("ropsten");
    const wallet = await Wallet.fromEthSigner(provider.getSigner(), zkSyncProvider)
    const totalFee  = await zkSyncProvider.getTransactionFee("MintNFT", wallet.address(), feeToken);

    console.log("SyncTransferNFT", nft)
    const resp = await wallet.syncTransferNFT({
        to: adderess,
        token: nft,
        feeToken: "ETH",
        fee: totalFee.totalFee,
    })
    console.log(resp);
  }

  public static async check(): Promise<types.NFT>{
    console.log("check")
    const web3 = new Web3Service();  
    const provider = new ethers.providers.Web3Provider(web3.web3.givenProvider);
    const zkSyncProvider = await getDefaultProvider("ropsten");
    const wallet = await Wallet.fromEthSigner(provider.getSigner(), zkSyncProvider)
    // Get state of account
    const state = await wallet.getAccountState();
    console.log("committed nfts", state.committed.nfts);
    console.log("verified nfts", state.verified.nfts);
    return state.committed.nfts["65540"];
  }

  public static async mintNFT() {
    console.log("make")
    const web3 = new Web3Service();  
    const provider = new ethers.providers.Web3Provider(web3.web3.givenProvider);
    const zkSyncProvider = await getDefaultProvider("ropsten");

    const wallet = await Wallet.fromEthSigner(provider.getSigner(), zkSyncProvider)
    console.log(zkSyncProvider)
    console.log(wallet)
    console.log("getAccountState", await wallet.getAccountState())
    console.log("getAccountId", await wallet.getAccountId())
    console.log("getNonce", await wallet.getNonce())
  
    if (! await wallet.isSigningKeySet()) {
      const onchainAuthTransaction = await wallet.onchainAuthSigningKey();
      // Wait till transaction is committed on ethereum.
      await onchainAuthTransaction.wait();
      const changePubkey = await wallet.setSigningKey({
          feeToken: "ETH",
          ethAuthType: "ECDSA"
      });
      // Wait till transaction is committed
      const receipt = await changePubkey.awaitReceipt();
      console.log("receipt", receipt)
    }else {
      console.log("isSigningKeySet",await wallet.isSigningKeySet())
    }
    
    console.log("getBalance",await wallet.getBalance("ETH"))
    console.log("getEthereumBalance", await wallet.getEthereumBalance("ETH"))
    const feeToken = "ETH";
    const totalFee  = await zkSyncProvider.getTransactionFee("MintNFT", wallet.address(), feeToken);
    const contentHash = "0x0101010101010101010101010101010101010101010101010101010101010101"
    const nft = await wallet.mintNFT({
        recipient: wallet.address(),
        contentHash,
        feeToken: "ETH",
        fee: totalFee.totalFee,
    })
    console.log("nft", nft)
    const receipt = await nft.awaitReceipt();
    console.log("receipt", receipt)

    // Get state of account
    const state = await wallet.getAccountState();
    console.log(state.committed.nfts);
    console.log(state.verified.nfts);
    return;
  }

}
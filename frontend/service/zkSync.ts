import axios from "axios";
import { Web3Service } from "./web3";
import { getDefaultProvider, Wallet, Signer, Provider, EthMessageSigner, types, utils } from "zksync"
import { ethers } from "ethers";

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
    const provider = new ethers.providers.Web3Provider(web3.web3.givenProvider);

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
    const singer = await Signer.fromETHSignature(provider.getSigner())
    const signedTransfer = await singer.signer.signSyncTransfer(transfer)

    // convert some params for signing on ethereum 
    const zkSyncProvider = await getDefaultProvider("rinkeby");
    const stringAmount = zkSyncProvider.tokenSet.formatToken(transfer.token, transfer.amount);
    const stringFee = zkSyncProvider.tokenSet.formatToken(transfer.token, transfer.fee);
    const stringToken = zkSyncProvider.tokenSet.resolveTokenSymbol(transfer.token);

    // ethSinger signs
    const ethSinger = new EthMessageSigner(provider.getSigner(), {
      verificationMethod: 'ECDSA',
      isSignedMsgPrefixed: false,
    })
    const ethereumSignature = await ethSinger.ethSignTransfer({
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
      amount: "0",
      fee:"37500000000000",
      nonce: 100,
    })
    console.log(ret)
    return;
  }
  /*
  tx: {
    accountId: 34315
    amount: "0"
    fee: "37500000000000"
    from: "0xDB10E4a083B87e803594c12c679422dCe5FCCCB9"
    nonce: 100
    signature: {pubKey: "c3aea0e0dd5c846554a313444a64a6c53075a8e4de9d5225805626e26d71e80e", signature: "9e90efea87735715c2100e60a6bfdbb83b1e81225f2faa8137…7b617d33b6169faf0f39bbe85103f895ebfebed3908853e00"}
    to: "0xe42f074b93b62ede40d4a2336f7ea99d98b38122"
    token: 0
    tokenId: 0
    type: "Transfer"
    validFrom: 0
    validUntil: 4294967295
  }
  */
}
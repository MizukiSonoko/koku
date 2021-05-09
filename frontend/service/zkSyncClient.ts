import axios from "axios";
import { Web3Service } from "./web3";
import zksync from "zksync"

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
    const web3 = new Web3Service();  
    const tx = {
      "type": "Transfer",
      "accountId": 1,
      "from": caller,
      "to": address,
      "token": 0,
      "amount": "0",
      "fee": "37500000000000",
      "nonce": 2,
      "signature": {
        "pubKey": "07f86efb9bf58d5ebf23042406cb43e9363879ff79223be05b7feac1dbc58c86",
        "signature": ""
      }
    }  
    const transaction = {
      "tx": tx,
      "ethereumSignature": {
        "type": "EthereumSignature",
        "signature": ""
      }
    }
    web3.sign()
    const response = await axios.post(zkSyncClient.url("call") + `?address=${address}&method=${method}`,  
    {
      "arguments": {
        argv
      },
      "transaction":transaction 
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response;
  }

}
import axios from "axios";
import { Web3Service } from "./web3";
import { getDefaultProvider, Provider, Wallet, types, utils } from "zksync"
import { ethers } from "ethers";

export class zkSyncClient {
  private static endpoint = "https://rinkeby3-zandbox.zksync.dev/api/v1/contract";
  private static feeToken = "ETH";
  private web3: Web3Service
  private provider: ethers.providers.Web3Provider
  private zkSyncProvider: Promise<Provider>

  constructor(){
    this.web3 = new Web3Service();
    this.provider = new ethers.providers.Web3Provider(this.web3.web3.givenProvider);
    this.zkSyncProvider = getDefaultProvider("ropsten");
  }

  public async transfer(address: string, amount: number) {
    console.log("transfer", address)
    const wallet = await Wallet.fromEthSigner(this.provider.getSigner(), await this.zkSyncProvider)
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

  private async getTokenFeeOfMint(wallet: Wallet): Promise<types.Fee> {
    return await (await this.zkSyncProvider).getTransactionFee("MintNFT", wallet.address(), zkSyncClient.feeToken);
  }

  private async getTokenFeeOfTransfer(from: string, to: string): Promise<ethers.BigNumber> {
    return await (await this.zkSyncProvider).getTransactionsBatchFee(
      ['Transfer', 'Transfer'], 
      [to, from],
      zkSyncClient.feeToken
    );
  }

  public async transferNFT(adderess: string, nft: types.NFT) {
    console.log("transferNFT", nft)
    const wallet = await Wallet.fromEthSigner(this.provider.getSigner(), await this.zkSyncProvider)
     const totalFee = await this.getTokenFeeOfTransfer(wallet.address(), adderess)
    const resp = await wallet.syncTransferNFT({
        to: adderess,
        token: nft,
        feeToken: zkSyncClient.feeToken,
        fee: totalFee,
        nonce: await wallet.getNonce(),
        validFrom: 0,
        validUntil: utils.MAX_TIMESTAMP,
    })
    console.log(resp);
  }

  public async check(): Promise<types.NFT[]>{
    console.log("check")
    const wallet = await Wallet.fromEthSigner(this.provider.getSigner(), await this.zkSyncProvider)
    console.log(wallet);
    console.log(await wallet.getAccountState())
    const state = await wallet.getAccountState();
    console.log("committed nfts", state.committed.nfts);
    console.log("verified nfts", state.verified.nfts);
    return Object.entries(state.verified.nfts).map(([_, nft]) => nft)
  }

  public async mintNFT() {
    console.log("mintNFT")
    const wallet = await Wallet.fromEthSigner(this.provider.getSigner(), await this.zkSyncProvider)
    console.log("getAccountState", await wallet.getAccountState())
    console.log("getAccountId", await wallet.getAccountId())
    console.log("getNonce", await wallet.getNonce()) 

    if (! await wallet.isSigningKeySet()) {
      const onchainAuthTransaction = await wallet.onchainAuthSigningKey();
      // Wait till transaction is committed on ethereum.
      await onchainAuthTransaction.wait();
      const changePubkey = await wallet.setSigningKey({
          feeToken: zkSyncClient.feeToken,
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
    const totalFee = await this.getTokenFeeOfMint(wallet)
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
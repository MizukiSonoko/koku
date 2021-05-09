import Web3 from "web3";
import accountModule, { Account } from "@/store/modules/account"

declare global {
  interface Window {
      $web3: Web3;
      ethereum: any;
  }
}

export class Web3Service { 
  web3: Web3 = new Web3();
  constructor() {
    
  }

  public init(callback: Function) {
    try {
      this.web3 = new Web3(window.$web3.currentProvider);
    } catch (e) {
      try {
        this.web3 = new Web3(Web3.givenProvider);
      } catch (e) {
        console.log("Not supported!");
        this.web3 = new Web3();
      }
    }
  }

  public connectWallet (callback: Function) {
    this.init(callback);
    if (window.ethereum) {
      window.ethereum.enable().then((accounts: string[]) => {
        this.web3.eth.getBalance(accounts[0]).then((balance: string) => {
          const data = {
            account: accounts[0],
            balance: Number(this.web3.utils.fromWei(balance))
              .toFixed(3)
              .toLocaleString()
          };
          accountModule.updateAccount(new Account(data.account, data.balance));
          callback();
        });
      });
    }
    
    this.web3.eth.getAccounts().then((accounts: string[]) => {
      if (accounts.length && accounts[0]) {
        this.web3.eth.getBalance(accounts[0]).then((balance: string) => {
          const data = {
            account: accounts[0],
            balance: Number(this.web3.utils.fromWei(balance))
              .toFixed(5)
              .toLocaleString()
          };
          accountModule.updateAccount(new Account(data.account, data.balance));
        });
      }
    });
  }

  public sign() {
    const address = accountModule.account.address
    if(address) {
      // console.log("sign", this.web3.eth.signTransaction("PPOP", address, (ret: any) => {
      //  console.log("signed ret", ret)
      //}))
    }
  }

}


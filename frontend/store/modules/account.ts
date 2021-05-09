import {
  Module,
  VuexModule,
  Action,
  Mutation,
  getModule
} from "vuex-module-decorators";
import { initialUnencryptedStorage } from "@/globals";
import store from "@/store/store";
import Web3 from "web3";

export class Account {
  address: string | null;
  balance: string | null;
  constructor(
    address: string | null,
    balance: string | null
  ) {
    this.address = address;
    this.balance = balance;
  }
}

@Module({
  name: "account",
  stateFactory: true,
  dynamic: true,
  namespaced: true,
  store,
  preserveState: Boolean(initialUnencryptedStorage.user)
})
class AccountModule extends VuexModule {
  public web3: Web3 = new Web3();
  public account: Account = new Account(null, null);

  @Mutation
  public updateWeb3(web3: Web3) {
    this.web3 = web3;
  }


  @Mutation
  public updateAccount(account: Account) {
    this.account = account;
  }

}

export default getModule(AccountModule);

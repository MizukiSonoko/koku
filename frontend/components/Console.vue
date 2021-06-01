<template>
<div>
  <div class="shadow-lg w-full items-center py-3 px-4" >
    <div class="my-4 mx-4">
      <span class="text-2xl">Attach user to contract</span>
      <div class="flex items-center">
        <label
          class="block uppercase tracking-wide text-gray-700 font-bold mb-2 mx-4"
        >
          MintNFT
        </label>
        <button @click="call" class="p-2 mx-4 mb-2 my-auto bg-gray-300 rounded">MintNFT!</button>
        <button @click="check" class="p-2 mx-4 mb-2 my-auto bg-gray-300 rounded">Check!</button>
        <button @click="transfer" class="p-2 mx-4 mb-2 my-auto bg-gray-300 rounded">transfer!</button>
        <button @click="ipfsAdd" class="p-2 mx-4 mb-2 my-auto bg-gray-300 rounded">IpfsAdd!</button>
      </div>
    </div>
    <hr/>

    <span class="text-2xl">Supporting Contracts</span>
    <ul class="list-inside bg-rose-200 px-4">
      <li>- <a href="https://rinkeby.zkscan.io/explorer/accounts/0xe53ee624a76a8eae26b2962b0756d8515c039b9e">0xe53ee624a76a8eae26b2962b0756d8515c039b9e</a></li>
    </ul>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  SetupContext
} from "@vue/composition-api";
import accountModule, { Account } from "@/store/modules/account"
import { Web3Service } from "@/service/web3"
import { zkSyncClient } from "@/service/zkSync"
import { ipfsClient } from "@/service/ipfs"

export default defineComponent({
  components: {},
  setup(_: any, ctx: SetupContext) {
    console.log(ctx)
    const web3 = new Web3Service();
    const zkClient = new zkSyncClient();
    const zkSync = new zkSyncClient();
    const state = reactive({
      nft: null as any
    });
    const makeToken = () => {
      console.log("makeToken");
      web3.sign();
      console.log(ctx.root)
      ctx.root.$modal.show("make-token-modal");
    }
    const call = () => {
      //zkSyncClient.transfer("0xe42f074b93b62ede40d4a2336f7ea99d98b38122")
      // return
      zkClient.mintNFT();
    }
    const check = async () => {
      state.nft = await zkClient.check();
      console.log(state.nft)
    }
    const transfer = async () => {
      const nft = await zkClient.check();
      console.log("NFT", nft)
      zkClient.transferNFT("0x4Ac5EC62CeA97De5cF3a58BD9EF41FfAe911363D", nft[0])
    }

    const ipfsAdd = async () => {
      const ipfs = new ipfsClient()
      ipfs.conv()
    }
    onMounted(async () => {
    });
    return {
      state,
      makeToken,
      call,
      check,
      transfer,
      ipfsAdd
    };
  }
});
</script>

<style lang="postcss" scoped>

</style>

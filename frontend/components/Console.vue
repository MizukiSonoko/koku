<template>
<div>
  <div class="shadow-lg items-center md:justify-between py-3 px-4" >
    <div class="my-4 mx-4">
        <span class="text-2xl">Make token</span>
        <ul class="list-inside bg-rose-200">
          <button @click="makeToken" class="bg-gray-300 p-2 rounded">Make</button>
        </ul>
    </div>
    <div class="my-4 mx-4">
        <span class="text-2xl">Call!</span>
        <ul class="list-inside bg-rose-200">
          <button @click="call" class="bg-gray-300 p-2 rounded">Call!</button>
        </ul>
    </div>
    <hr/>
    <span class="text-2xl">Tokens</span>
    <ul class="list-inside bg-rose-200">
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

export default defineComponent({
  components: {},
  setup(_: any, ctx: SetupContext) {
    console.log(ctx)
    const web3 = new Web3Service();
    const zkSync = new zkSyncClient();
    const state = reactive({
    });
    const makeToken = () => {
      console.log("makeToken");
      web3.sign();
      console.log(ctx.root)
      ctx.root.$modal.show("make-token-modal");
    }
    const call = () => {
      zkSyncClient.call(
        "0xDB10E4a083B87e803594c12c679422dCe5FCCCB9",
        "0xe42f074b93b62ede40d4a2336f7ea99d98b38122",
        "legislate",
        {
          "roleId": "100",
          "contractAddr": "0x0000000000000000000000000000000000097531"
        });
    }
    onMounted(async () => {
    });
    return {
      state,
      makeToken,
      call
    };
  }
});
</script>

<style lang="postcss" scoped>

</style>

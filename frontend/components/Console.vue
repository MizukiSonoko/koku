<template>
<div>
  <div class="shadow-lg w-full items-center py-3 px-4" >
    <div class="my-4 mx-4">
        <span class="text-2xl">Make token</span>
        <ul class="list-inside bg-rose-200">
          <button @click="makeToken" class="bg-gray-300 p-2 rounded">Make</button>
        </ul>
    </div>
    <div class="my-4 mx-4">
      <span class="text-2xl">Attach user to contract</span>
      <div class="flex items-center">
          <label
            class="block uppercase tracking-wide text-gray-700 font-bold mb-2 mx-4"
          >
            User Address is 
          </label>
          <input
            id="name"
            name="name"
            class="appearance-none block bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="name"
            placeholder="0x...."
          />
          <label
            class="block uppercase tracking-wide text-gray-700 font-bold mb-2 ml-6 mr-4"
          >
            Role is
          </label>
          <select
            type="text"
            class="border text-black rounded py-3 px-4 mb-3 "
            placeholder="Executor"
          >
            <option value="executor">Executor</option>
            <option value="legislator">Legislator</option>
            <option value="judgement">Judgement</option>
          </select>
          <label
            class="block uppercase tracking-wide text-gray-700 font-bold mb-2 ml-6 mr-4"
          >
            Contract is
          </label>
          <input
            id="name"
            name="name"
            class="appearance-none block bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="name"
            placeholder="0x...."
          />
        <button @click="call" class="p-2 mx-4 mb-2 my-auto bg-gray-300 rounded">Execute!</button>
      </div>
    </div>
    <hr/>
    <div class="my-4 mx-4">
      <span class="text-2xl">Prosecute</span>
      <div class="flex items-center">
          <label
            class="block uppercase tracking-wide text-sm text-gray-700 font-bold mb-2 mx-4"
          >
            Target TxAddress is 
          </label>
          <input
            id="name"
            name="name"
            class="appearance-none block bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="name"
            placeholder="0x...."
          />
          <label
            class="block uppercase tracking-wide text-sm text-gray-700 font-bold mb-2 ml-6 mr-4"
          >
            Contract Address is
          </label>
          <input
            id="name"
            name="name"
            class="appearance-none block bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="name"
            placeholder="0x...."
          />
          <label
            class="block uppercase tracking-wide text-sm text-gray-700 font-bold mb-2 ml-6 mr-4"
          >
            Underlying Rule is
          </label>
          <input
            id="name"
            name="name"
            class="appearance-none block bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="name"
            placeholder="0x...."
          />
        <button @click="call" class="p-2 mx-4 mb-2 my-auto bg-gray-300 rounded">Execute!</button>
      </div>
    </div>
    <hr/>
    <div class="my-4 mx-4">
      <span class="text-2xl">Legislate</span>
      <div class="flex items-center">
          <label
            class="block uppercase tracking-wide text-sm text-gray-700 font-bold mb-2 mx-4"
          >
            Rule ID is 
          </label>
          <input
            id="name"
            name="name"
            class="appearance-none block bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="name"
            placeholder="0x...."
          />
          <label
            class="block uppercase tracking-wide text-sm text-gray-700 font-bold mb-2 ml-6 mr-4"
          >
            Rule Contract Address is
          </label>
          <input
            id="name"
            name="name"
            class="appearance-none block bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="name"
            placeholder="0x...."
          />
        <button @click="call" class="p-2 mx-4 mb-2 my-auto bg-gray-300 rounded">Execute!</button>
      </div>
    </div>
    <hr/>

    <div class="my-4 mx-4">
      <span class="text-2xl">Judge</span>
      <div class="flex items-center">
          <label
            class="block uppercase tracking-wide text-sm text-gray-700 font-bold mb-2 mx-4"
          >
            Target TxAddress is 
          </label>
          <input
            id="name"
            name="name"
            class="appearance-none block bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="name"
            placeholder="0x...."
          />
          <label
            class="block uppercase tracking-wide text-sm text-gray-700 font-bold mb-2 ml-6 mr-4"
          >
            Contract Address is
          </label>
          <select
            type="text"
            class="border text-black rounded py-3 px-4 mb-3 "
            placeholder="approve"
          >
            <option value="approve">Approve</option>
            <option value="reject">Reject</option>
          </select>
          <button @click="call" class="p-2 mx-4 mb-2 my-auto bg-gray-300 rounded">Execute!</button>
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
      //zkSyncClient.transfer("0xe42f074b93b62ede40d4a2336f7ea99d98b38122")
      // return
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
      zkSyncClient.query("0xe42f074b93b62ede40d4a2336f7ea99d98b38122", "get_rules_by_id", {
        "id": "100"
      })
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

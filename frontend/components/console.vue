<template>
<div>
  <div class="shadow-lg items-center md:justify-between py-3 px-4" >
    <div class="my-4 mx-4">
        <span class="text-2xl">Make token</span>
        <ul class="list-inside bg-rose-200">
          <button @click="makeToken" class="bg-gray-300 p-2 rounded">Make</button>
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

export default defineComponent({
  components: {},
  setup(_: any, ctx: SetupContext) {
    console.log(ctx)
    const state = reactive({
    });
    const makeToken = () => {
      console.log("makeToken");
      ctx.root.$modal.show("team-add-confirm-modal");
    }
    onMounted(async () => {
    });
    return {
      state,
      makeToken
    };
  }
});
</script>

<style lang="postcss" scoped>

</style>

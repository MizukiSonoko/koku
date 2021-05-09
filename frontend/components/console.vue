<template>
<div>
  <div class="flex shadow-lg items-center md:justify-between py-3 px-4" >
    <div class=""></div>
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
  setup(_: any, _2: SetupContext) {
    const state = reactive({
    });
    onMounted(async () => {
    });
    return {
      state,
    };
  }
});
</script>

<style lang="postcss" scoped>

</style>

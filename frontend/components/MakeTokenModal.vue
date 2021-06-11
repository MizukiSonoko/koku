<template>
  <modal
    class="mx-auto"
    name="make-token-modal"
    :draggable="false"
    :resizable="false"
    :adaptive="true"
    :height="'auto'"
    :width="'70%'"
    @before-open="beforeOpen"
  >
    <div class="modal-header bg-input">
      <div class="text-center py-4">
        <p class="text-xl font-bold">Make new token</p>
      </div>
    </div>
    <div class="modal-body bg-input">
        <div class="text-right py-4 pb-4 pr-4">
        <button
          class="bg-secondary bg-button hover:secondary-dark text-black font-bold py-2 px-6 my-3 mx-2 shadow rounded"
          @click="back"
        >
          Cannel
        </button>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  SetupContext
} from "@vue/composition-api";

export default defineComponent({
  components: {},
  setup(_: any, ctx: SetupContext) {
    const state = reactive({
      correct: false
    });
    onMounted(() => {});
    return {
      state,
      beforeOpen: (_: any) => {
      },
      back: () => {
        ctx.root.$modal.hide("make-token-modal");
      }
    };
  }
});
</script>
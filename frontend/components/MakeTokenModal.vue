<template>
  <modal
    class="mx-auto"
    name="result-modal"
    :draggable="false"
    :resizable="false"
    :adaptive="true"
    :height="'auto'"
    :width="'95%'"
    @before-open="beforeOpen"
  >
    <div class="modal-header bg-input">
      <div class="text-center py-4 text-white">
        <p class="text-2xl font-bold">OK</p>
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
      }
    };
  }
});
</script>
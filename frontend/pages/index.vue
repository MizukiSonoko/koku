<template>
<div>
  <div class="flex shadow-lg items-center md:justify-between py-3 px-4" >
    <img class="h-12" src="/img/logo.png" />
    <div v-if="state.isLogged">
      Address: <b>{{ state.account.address.substring(0, 8) }}</b>
    </div>
    <div v-else>
      <button class="bg-gray-200 rounded p-3" @click="login">LOGIN</button>
    </div>
  </div>
  <div class="container">
    <div>
      <img class="top" src="/img/logo.png" />
      <Console div v-if="state.isLogged" />
      <div v-else>
        <button class="bg-gray-200 rounded p-3" @click="login">LOGIN</button>
        <p>KOKU is the sandbox of distributed authority on Blockchain<br/>(Executor, Legislator, and Judgement)</p>
      </div>
    </div>
  </div>
  <MakeTokenModal />
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
import Console from "@/components/Console.vue"
import MakeTokenModal from "@/components/MakeTokenModal.vue"

export default defineComponent({
  components: {
    Console,
    MakeTokenModal
  },
  setup(_: any, _2: SetupContext) {
    const web3Service = new Web3Service();
    const state = reactive({
      account: new Account(null, null),
      isLogged: false,
    });
    onMounted(async () => {
      web3Service.init(() => {
        state.account = accountModule.account;
        state.isLogged = true;
      });
    });
    const login = () => {
      web3Service.connectWallet(() => {
        state.account = accountModule.account;
        state.isLogged = true;
      });
    }
    return {
      state,
      login
    };
  }
});
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.top { 
  margin: auto;
  width: 300px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

<template>
  <center>
    <div id="q-app" style="min-height: 100vh" class="q-ma-lg">
      <div class="q-pa-md">
        <div class="q-gutter-y-md column" style="max-width: 300px">
          <br />
          <div class="text-h4">FIND PASSWORD</div>
          <br />
          <div class="text-h7">가입하신 이메일 주소를 입력해주세요.</div>
          <div class="text-h7">이메일로 비밀번호 설정 이메일이 발송됩니다.</div>
          <br />
          <q-input filled v-model="email" color="black" label="Email"></q-input>
          <q-btn
            unelevated
            icon="mail"
            color="black"
            @click="sendMail()"
            label="Send Mail"
          ></q-btn>
          <q-btn flat outline style="color: primary" to="/signup"
            >뒤로가기</q-btn
          >
        </div>
      </div>
    </div>
  </center>
</template>

<script>
import { defineComponent, ref } from "vue";
import { auth } from "src/boot/firebase";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "findPwd",

  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const $route = useRoute();

    let email = ref("");

    let sendMail = () => {
      auth
        .sendPasswordResetEmail(email.value)
        .then(() => {
          console.log("success", email.value);
          $q.notify({
            position: "center",
            message: email.value + " 주소로 메일이 발송되었습니다.",
            color: "grey",
          });
          $router.push({ path: "/" });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
          $q.notify({
            position: "center",
            message: errorMessage,
            color: "red",
          });
        });
    };

    return {
      email,
      sendMail,
    };
  },
});
</script>

<style lang="scss">
.q-app {
  display: flex;
  width: 70%;
  justify-content: center;
  align-items: center;
}
</style>

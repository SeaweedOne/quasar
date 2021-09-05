<template>
  <center>
    <div class="img">
      <div id="q-app" style="min-height: 100vh" class="q-ma-lg">
        <div class="q-pa-md">
          <div class="q-gutter-y-md column" style="max-width: 300px">
            <br />
            <br />
            <center><div class="text-h4">LOGIN</div></center>
            <br />
            <q-input
              filled
              v-model="email"
              color="black"
              label="Email"
            ></q-input>
            <q-input
              v-model="password"
              color="black"
              label="password"
              filled
              :type="isPwd ? 'password' : 'text'"
              hint=""
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                ></q-icon>
              </template>
            </q-input>
            <q-btn
              unelevated
              color="black"
              @click="login()"
              label="LOGIN"
            ></q-btn>
            <q-btn flat outline style="color: primary" to="/signup"
              >회원가입</q-btn
            >
            <q-btn flat to="/findPwd">비밀번호 찾기</q-btn>
            <!-- <router-link to="/signup"> 회원가입 </router-link> -->
          </div>
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
import { useStore } from "vuex";

export default defineComponent({
  name: "login",

  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const $route = useRoute();
    const store = useStore();

    let email = ref("");
    let password = ref("");
    let isPwd = ref("true");
    // let login = () => {
    //   auth
    //     .setPersistence(auth.Auth.Persistence.NONE)
    //     .then(() => {
    //       var provider = new auth.signInWithEmailAndPassword();
    //       return auth().signInWithRedirect(provider);
    //     })
    //     .catch((error) => {
    //       // Handle Errors here.
    //       var errorCode = error.code;
    //       var errorMessage = error.message;
    //     });
    // };
    let login = () => {
      auth
        .signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log("success", user.email);
          store.commit("setFireUser", userCredential.user);

          $q.notify({
            position: "center",
            message: "login success",
            color: "grey",
          });
          $router.push({ path: "/main" });
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
      password,
      isPwd,
      login,
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
.img {
  border: 0;
  padding: 0;
  background-image: url("../css/aa.jpg");
  min-height: 500;
  background-position: center;
  background-size: cover;
}
</style>

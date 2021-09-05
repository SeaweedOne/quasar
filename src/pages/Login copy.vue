<template>
  <center>
    <div id="q-app" class="full-height full-width flex flex-center text-center">
      <!-- <q-img
        src="../css/aa.jpg"
        v-bind:class="{
          sketch_desktop: $q.platform.is.desktop,
        }"
      > -->

      <div class="q-gutter-y-md column" style="max-width: 300px">
        <div class="text-h4">LOGIN</div>
        <br />
        <q-input filled v-model="email" label="Email"></q-input>
        <q-input
          v-model="password"
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
          color="primary"
          @click="login()"
          label="LOGIN"
        ></q-btn>
        <q-btn flat outline style="color: primary" to="/signup">회원가입</q-btn>
        <q-btn flat to="/findPwd">비밀번호 찾기</q-btn>
        <!-- <router-link to="/signup"> 회원가입 </router-link> -->
      </div>

      <!-- </q-img> -->
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

    let login = () => {
      auth
        .setPersistence(auth.Auth.Persistence.LOCAL)
        .then(() => {
          var provider = auth.signInWithEmailAndPassword(
            email.value,
            password.value
          );

          return firebase.auth().signInWithRedirect(provider);
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    };

    // let login = () => {
    //   auth.setPersistence(auth.Persistence.SESSION);
    //   auth
    //     .signInWithEmailAndPassword(email.value, password.value)

    //     .then((userCredential) => {
    //       // Signed in
    //       var user = userCredential.user;
    //       console.log("success", user.email);
    //       store.commit("setFireUser", userCredential.user);

    //       $q.notify({
    //         position: "center",
    //         message: "login success",
    //         color: "grey",
    //       });
    //       $router.push({ path: "/main" });
    //     })
    //     .catch((error) => {
    //       var errorCode = error.code;
    //       var errorMessage = error.message;
    //       console.log(errorMessage);
    //       $q.notify({
    //         position: "center",
    //         message: errorMessage,
    //         color: "red",
    //       });
    //     });
    // };
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
  background: url(../css/aa.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  display: flex;
  width: 70%;
  justify-content: center;
  // max-width: 250px
  align-items: center;
}
</style>

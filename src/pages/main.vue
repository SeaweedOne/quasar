<template>
  <center>
    <div id="main" style="min-height: 1000vh" class="q-ma-lg">
      <q-card flat bordered class="my-card bg-grey-1" style="min-height: 50vh">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div v-if="isUserAuth" class="q-ma-lg">
                <div class="text-h5">HELLO!</div>
                <br />
                <br />
                반가워요 {{ userName }}님!
                <br />
                {{ getFireUser.email }}
                <br />
                <br />
                <q-btn
                  flat
                  color="primary"
                  label="LOGOUT"
                  @click="signOutAction"
                  to="/"
                ></q-btn>
                <br />
                <q-btn
                  flat
                  color="primary"
                  label="Account Information"
                  to="/myInfo"
                ></q-btn>
                <br />
                <q-btn
                  flat
                  color="primary"
                  label="Delete Account"
                  @click="deleteUsr"
                ></q-btn>
              </div>
              <div v-if="!isUserAuth" class="q-ma-lg">
                <br />
                <div class="text-h5">로그인이 필요합니다!</div>
                <br />
                <br />
                <q-btn unelevated color="primary" label="LOGIN" to="/"></q-btn>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </center>
</template>

<script>
import { defineComponent, ref } from "vue";
import { auth } from "src/boot/firebase";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "PageIndex",
  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const $route = useRoute();
    const currentUser = auth.currentUser;

    var userName = ref("");

    let deleteUsr = () => {
      currentUser
        .delete()
        .then(() => {
          $q.notify({
            position: "center",
            message: "회원 탈퇴가 완료되었습니다.",
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

    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        userName.value = user.displayName;
        // var uid = user.uid;
      } else {
      }
    });

    return {
      text: ref("Field content"),
      dense: ref(false),
      userName,
      deleteUsr,
    };
  },

  computed: {
    ...mapGetters(["getFireUser", "isUserAuth"]),
  },

  methods: {
    ...mapActions(["signOutAction", "authAction"]),
  },
});
</script>

<style lang="scss">
.main {
  // display: flex;
  width: 50%;
  justify-content: center;
  // max-width: 250px
  align-items: center;
}
</style>

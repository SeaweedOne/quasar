<template>
  <center>
    <div id="main" style="min-height: 1000vh" class="q-ma-lg">
      <q-card flat bordered class="my-card bg-grey-1">
        <q-card-section>
          <div class="col">
            <div v-if="isUserAuth" class="q-ma-lg">
              <div class="text-h5">ACCOUNT INFORMATION</div>
              <div class="text-h6">{{ userName }}님의 계정정보</div>
              <br />
              <br />
              <div class="text-h6">Name</div>
              <q-field color="black" outlined :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    <center>{{ userName }}</center>
                  </div>
                </template>
              </q-field>
              <br />
              <div class="text-h6">ID</div>
              <q-field color="black" outlined :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    <center>{{ userId }}</center>
                  </div>
                </template>
              </q-field>
              <br />
              <div class="text-h6">EmailVerified</div>
              <q-field color="black" outlined :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    <center>{{ emailVerified }}</center>
                  </div>
                </template>
              </q-field>
              <br />
              <br />
              <q-separator></q-separator>
              <br />
              <q-btn
                flat
                icon="home"
                color="black"
                label="home"
                to="/main"
              ></q-btn>
              <br />
              <q-btn
                flat
                icon="logout"
                color="black"
                label="LOGOUT"
                @click="signOutAction"
                to="/"
              ></q-btn>
              <br />
              <!-- <q-btn
                flat
                icon="person"
                color="primary"
                label="Update Password"
                to="/updatePwd"
              ></q-btn>
               <br />
              <q-btn
                flat
                icon="delete"
                color="primary"
                label="Delete Account"
                @click="deleteUsr"
              ></q-btn> -->
            </div>
            <div v-if="!isUserAuth" class="q-ma-lg">
              <br />
              <q-icon
                name="warning"
                class="text-red"
                style="font-size: 4rem"
              ></q-icon>
              <br />
              <br />
              <div class="text-h5">로그인이 필요합니다!</div>
              <br />
              <br />
              <q-btn unelevated color="black" label="LOGIN" to="/"></q-btn>
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

    var userName = ref();
    var userId = ref();

    var emailVerified = ref("False");

    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        userName.value = user.displayName;
        userId.value = user.email;
        emailVerified.value = user.emailVerified;
      } else {
      }
    });

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

    return {
      text: ref("Field content"),
      dense: ref(false),

      userId,
      userName,
      emailVerified,
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
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
}
</style>

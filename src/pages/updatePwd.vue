<template>
  <center>
    <div id="main" style="min-height: 1000vh" class="q-ma-lg">
      <q-card flat bordered class="my-card bg-grey-1" style="min-height: 50vh">
        <q-card-section>
          <div class="col">
            <div v-if="currentUsr" class="q-ma-lg">
              <div class="text-h5">Update Your Password</div>
              <div class="text-h6">{{ userName }}님</div>
              <br />
              <br />
              <div class="text-h6">ID</div>
              아이디는 변경이 불가능합니다.
              <br />
              <q-field outlined :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    <center>{{ userId }}</center>
                  </div>
                </template>
              </q-field>
              <br />
              <div class="text-h6">Password</div>
              <br />
              <q-input
                v-model="password1"
                label="비밀번호 (6자 이상)"
                filled
                :type="isPwd1 ? 'password' : 'text'"
                hint=""
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd1 ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd1 = !isPwd1"
                  ></q-icon>
                </template>
              </q-input>

              <q-input
                v-model="password2"
                filled
                label="비밀번호 확인"
                :type="isPwd2 ? 'password' : 'text'"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd2 ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd2 = !isPwd2"
                  ></q-icon>
                </template>
              </q-input>
              <br />
              <br />
              <q-separator></q-separator>
              <br />
              <q-btn
                flat
                icon="home"
                color="primary"
                label="home"
                to="/main"
              ></q-btn>
              <br />
              <q-btn
                flat
                icon="person"
                color="primary"
                @click="checkInfo()"
                label="Update"
              ></q-btn>
              <br />
              <q-btn
                flat
                icon="delete"
                color="primary"
                label="Delete Account"
                @click="deleteUsr"
              ></q-btn>
            </div>
            <div v-if="!currentUsr" class="q-ma-lg">
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
              <q-btn unelevated color="primary" label="LOGIN" to="/"></q-btn>
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
    const currentUsr = auth.currentUser;
    console.log("asdf" + currentUsr.email);
    let userName = ref("");
    let userId = ref("");
    var password1 = ref();
    var password2 = ref();
    var isPwd1 = ref("true");
    var isPwd2 = ref("true");

    let checkInfo = () => {
      if (!password1.value | !password2.value) {
        $q.notify({
          position: "center",
          message: "비밀번호와 비밀번호 재확인 모두 입력해주세요.",
          color: "red",
        });
      } else if (password1.value != password2.value) {
        $q.notify({
          position: "center",
          message: "비밀번호가 일치하지 않습니다.",
          color: "red",
        });
      } else if (password1.value.length < 6) {
        $q.notify({
          position: "center",
          message: "비밀번호는 6자리 이상 입력해주세요.",
          color: "red",
        });
      } else {
        updatePwd();
      }
    };

    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        userName.value = user.displayName;
        userId.value = user.email;
      } else {
      }
    });
    let updatePwd = (currentUsr) => {
      currentUsr
        .updatePassword(password1.value)
        .then(() => {
          $q.notify({
            position: "center",
            message: "비밀번호가 변경되었습니다. 다시 로그인 해주세요.",
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

    let deleteUsr = () => {
      currentUsr
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

      currentUsr,
      userName,
      userId,
      password1,
      password2,
      isPwd1,
      isPwd2,
      checkInfo,
      updatePwd,
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

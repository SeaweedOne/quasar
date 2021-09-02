<template>
  <center>
    <div id="main" style="min-height: 1000vh" class="q-ma-lg">
      <q-card flat bordered class="my-card bg-grey-1" style="min-height: 50vh">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div v-if="isUserAuth" class="q-ma-lg">
                <div class="text-h5">Update Your Password</div>
                <br />
                <br />
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
                  label="Update"
                  @click="updatePwd()"
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

    var userName = currentUser.displayName;
    var userId = currentUser.email;
    var password1 = ref();
    var password2 = ref();
    var isPwd1 = ref("true");
    var isPwd2 = ref("true");
    let updatePwd = () => {
      currentUser
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
      currentUser,
      userName,
      userId,
      password1,
      password2,
      isPwd1,
      isPwd2,
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

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
              <div class="text-h6">ID</div>
              <q-field color="black" outlined :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    <center>{{ userId }}</center>
                  </div>
                </template>
              </q-field>
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
              <div class="text-h6">Phone Number</div>
              <q-input
                filled
                color="black"
                v-model="phone"
                label="전화번호"
                mask="###-####-####"
                fill-mask
              ></q-input>
              <div class="text-h6">Birthday</div>
              <br />
              <q-input
                v-model="date"
                color="black"
                filled
                type="date"
              ></q-input>
              <br />
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
                icon="colorize"
                color="black"
                label="Update"
                @click="updateInformation"
              ></q-btn>
              <br />
              <q-btn
                flat
                icon="person"
                color="black"
                label="Account Information"
                to="/myInfo"
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
import { auth, db } from "src/boot/firebase";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "PageIndex",
  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const $route = useRoute();

    // const currentUser = auth.currentUser;
    // console.log("asdf" + currentUser);
    let docId = ref("");
    let date = ref("");
    let phone = ref("");

    var userName = ref();
    var userId = ref();
    var phoneNum = ref();
    var bDay = ref();

    var emailVerified = ref("False");

    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        userName.value = user.displayName;
        userId.value = user.email;
      } else {
      }
    });
    console.log("userId" + userId.value);

    let updateInformation = () => {
      db.collection("users")
        .where("id", "==", userId.value)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            docId.value = doc.id;
            console.log("docid" + docId.value);

            db.collection("users")
              .doc(docId.value)
              .set({
                id: userId.value,
                name: userName.value,
                phoneNumber: phone.value,
                birthday: date.value,
              })
              .then(() => {
                console.log("Document successfully written!");
                $q.notify({
                  position: "center",
                  message: "회원정보 변경이 완료되었습니다.",
                  color: "grey",
                });
                $router.push({ path: "/myInfo" });
              })
              .catch((error) => {
                console.error("Error writing document: ", error);
              });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
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
      userId,
      userName,
      phone,
      date,
      updateInformation,
      deleteUsr,
    };
  },

  methods: {
    confirm() {
      const user = auth.currentUser;
      console.log("current user>>>", user);
      //  if(user.providerData[0].providerId == "password"){}
      this.$q
        .dialog({
          title: "확인",
          message: "비번 입력",
          prompt: {
            model: "",
            type: "password",
          },
          cancel: true,
          persistent: true,
        })
        .onOk((data) => {
          var credentials = g_auth.EmailAuthProvider.credential(
            user.email,
            data
          );
          user.reauthenticateWithCredential(credentials).then(() => {
            console.log("reauth ok");
            user.displayName = userName.value;
            // users collenction -> delete info
          });
        });
    },
  },

  // mounted() {
  //   // this.authAction();
  //   // if (this.getFireUser != null) {

  // },

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

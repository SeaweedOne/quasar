<template>
  <center>
    <div id="main" style="min-height: 1000vh" class="q-ma-lg" align="center">
      <q-card flat bordered class="my-card bg-grey-1">
        <q-card-section>
          <div class="col">
            <div v-if="isUserAuth" class="q-ma-lg">
              <div class="text-h5">ACCOUNT INFORMATION</div>
              <div class="text-h6">{{ name }}님의 계정정보</div>
              <br />
              <br />
              <div class="text-h6">Name</div>
              <q-field color="black" outlined :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    <center>{{ name }}</center>
                  </div>
                </template>
              </q-field>
              <br />
              <div class="text-h6">ID</div>
              <q-field color="black" outlined :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    <center>{{ email }}</center>
                  </div>
                </template>
              </q-field>
              <br />
              <div class="text-h6">Phone Number</div>
              <q-field color="black" outlined :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    <center>{{ phoneNum }}</center>
                  </div>
                </template>
              </q-field>
              <br />
              <div class="text-h6">Brithday</div>
              <q-field color="black" outlined :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    <center>{{ bDay }}</center>
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
              <div class="text-h6">creationTime</div>
              <q-field color="black" outlined :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    <center>{{ creationTime }}</center>
                  </div>
                </template>
              </q-field>
              <br />
              <div class="text-h6">lastSignInTime</div>
              <q-field color="black" outlined :dense="dense">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    <center>{{ lastSignInTime }}</center>
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
                icon="colorize"
                color="black"
                label="Update Information"
                to="/updateInfo"
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
              <q-btn
                flat
                icon="delete"
                color="primary"
                label="Delete Account"
                @click="confirm"
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
import { auth, g_auth, db } from "src/boot/firebase";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      name: "",
      email: "",
      creationTime: "",
      lastSignInTime: "",
       phoneNum = "",
   bDay = "",
   emailVerified = "",
   text: ref("Field content"),
      dense: ref(false),
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user>>>", user);
        this.email = user.email;
        this.creationTime = user.metadata.creationTime;
        this.lastSignInTime = user.metadata.lastSignInTime;
        this.name = user.displayName;
        this.emailVerified = user.emailVerified
      } else {
        console.log("user sined out");
      }
    });
  },
  methods: {
    deleteUserInfo(users) {
      return new Promise(function (resolve, reject) {
        db.collection("users")
          .where("id", "==", users.email)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
               this.phoneNum = doc.data().phoneNumber;
          this.bDay = doc.data().birthday;
              db.collection("users")
                .doc(doc.id)
                .delete()
                .then(() => {
                  console.log("doc deleted");
                  resolve("success");
                })
                .catch((err) => {
                  console.log("delete error ", err);
                  reject(err);
                });
            });
          });
      });
    },
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
            // users collenction -> delete info
            this.deleteUserInfo(user)
              .then((res) => {
                console.log(res);
                user.delete().then(() => {
                  console.log("firebase auth acccount deleted");
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        });
    },
  },
    computed: {
    ...mapGetters(["getFireUser", "isUserAuth"]),
  },
  methods: {
    ...mapActions(["signOutAction", "authAction"]),
  },

};
</script>
<style></style>

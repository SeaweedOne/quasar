<template>
  <center>
    <div id="q-app2" style="min-height: 200vh" class="q-ma-lg">
      <q-card flat bordered class="my-card bg-grey-1">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h5">SIGNUP</div>
              <br />
              <div class="text-h6">Email</div>
              <br />
              <q-input
                filled
                v-model="email"
                color="black"
                label="이메일"
              ></q-input>
              <br />
              <div class="text-h6">Password</div>
              <br />
              <q-input
                v-model="password1"
                color="black"
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
                color="black"
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
              <div class="text-h6">Name</div>
              <br />
              <q-input
                filled
                color="black"
                v-model="name"
                label="이름"
              ></q-input>
              <br />
              <div class="text-h6">Phone Number</div>
              <br />
              <q-input
                filled
                color="black"
                v-model="phone"
                label="전화번호"
                mask="###-####-####"
                fill-mask
              ></q-input>
              <div class="text-h6">Date Of Birth</div>
              <br />
              <q-input
                v-model="date"
                color="black"
                filled
                type="date"
              ></q-input>
              <br />
            </div>
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn flat to="policies">회원약관보기</q-btn>
          <br />
        </q-card-actions>
        <q-separator></q-separator>
        <q-card-section>
          <q-btn flat class="text-h6" @click="checkInfromation()"
            ><b>회원가입</b></q-btn
          >
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
import { useStore } from "vuex";
import { db } from "src/boot/firebase";

export default defineComponent({
  name: "PageIndex",

  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const $route = useRoute();
    const store = useStore();

    let email = ref("");
    let password1 = ref("");
    let password2 = ref("");
    let isPwd1 = ref("true");
    let isPwd2 = ref("true");
    let name = ref("");
    let date = ref("");
    let phone = ref("");

    // 가입정보 확인
    // 공백이 있으면 if문(if문 안에서 공백 위치 찾아 변수에 공백 항목 담아주고 마지막에 변수값으로 알림 띄우기)
    //없으면 else
    // 가입 성공 시 자동 로그인 후 메인페이지로 이동
    let checkInfromation = () => {
      if (
        !email.value |
        !password1.value |
        !password2.value |
        !name.value |
        !date.value |
        !phone.value
      ) {
        let textVal = ref("");
        if (!email.value) {
          textVal = ref("이메일");
        } else if (!password1.value | !password2.value) {
          textVal = ref("비밀번호");
        } else if (!name.value | !date.value | !phone.value) {
          textVal = ref("사용자정보");
        }
        $q.notify({
          position: "center",
          message: textVal.value + "에 공백이 존재합니다.",
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
        join();
      }
    };

    let login = () => {
      auth
        .signInWithEmailAndPassword(email.value, password1.value)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log("success", user.email);
          store.commit("setFireUser", userCredential.user);
          $q.notify({
            position: "center",
            message:
              "회원가입이 완료되어었습니다.  " + name.value + "님! 환영합니다.",
            color: "grey",
          });
          $router.push({ path: "/main" });
          // ...
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
    let join = () => {
      console.log("called " + email.value);
      auth
        .createUserWithEmailAndPassword(email.value, password1.value)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log(user);
          user.updateProfile({
            displayName: name.value,
            phoneNumber: phone.value,
            birthday: date.value,
          });

          db.collection("users")
            .add({
              id: email.value,
              name: name.value,
              birthday: date.value,
              phoneNumber: phone.value,
            })
            .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
              this.$q.notify({
                position: center,
                message: "Register Success",
                color: "grey",
              });
            })

            .catch((error) => {
              console.error("Error adding document: ", error);
              this.$q.notify({
                message: error,
                color: "red",
              });
            });

          // $q.notify({
          //   position: "top",
          //   message: "회원가입이 완료되었습니다.",
          //   color: "grey",
          // });
          login();
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          $q.notify({
            position: "center",
            message: errorMessage,
            color: "red",
          });
          console.log(errorMessage);
        });
    };

    return {
      email,
      password1,
      isPwd1,
      password2,
      isPwd2,
      name,
      date,
      phone,
      checkInfromation,
      join,
    };
  },
});
</script>

<style lang="scss">
.q-app2 {
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <center>
    <div id="main" style="min-height: 1000vh" class="q-ma-lg">
      <q-card flat bordered class="my-card bg-grey-1" style="min-height: 150vh">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <center><div class="text-h5">HELLO!</div></center>
              <q-field standout :dense="dense" disable readonly>
                <template v-slot:control>
                  <div class="self-center full-width no-outline">
                    {{ uid }}
                  </div>
                </template>
              </q-field>
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

export default defineComponent({
  name: "PageIndex",
  setup() {
    let uid = ref("");
    let userState = () => {
      auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
    };

    return {
      text: ref("Field content"),
      dense: ref(false),
      uid,
    };
  },
});
</script>

<style lang="scss">
.main {
  display: flex;
  width: 50%;
  justify-content: center;
  // max-width: 250px
  align-items: center;
}
</style>

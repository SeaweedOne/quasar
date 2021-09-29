<template>
  <section v-if="external">
    <q-item clickable tag="a" target="_blank" :href="link">
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>
          {{ caption }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </section>
  <section v-else>
    <!-- <q-item clickable tag="a" target="_blank" :href="link"> -->
    <router-link :to="link" style="text-decoration: none; color: inherit">
      <q-item>
        <q-item-section v-if="icon" avatar>
          <q-icon :name="icon" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ title }}</q-item-label>
          <q-item-label caption>
            {{ caption }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </router-link>
    <!-- </q-item> -->
  </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
    external: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

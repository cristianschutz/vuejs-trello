<template>
  <header class="header">
    <button
      class="btn"
      v-on:click="
        create_frame({
          title: 'Novo Frame',
          order: items.length ? items[0].order - 1 : 0,
        })
      "
    >
      Adicionar Frame
    </button>

    <img src="../assets/logo.png" alt />

    <Menu />
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Menu from "./Menu";

export default {
  name: "Header",
  methods: {
    ...mapActions(["create_frame"]),
  },
  computed: {
    ...mapGetters({ items: "framesByOrder" }),
  },
  components: { Menu },
};
</script>

<style scoped lang="scss">
.header {
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);

  &:after {
    content: "by cristian schutz";
    font-size: 10px;
    line-height: 1;
    color: #fff;
    margin-bottom: -10px;
  }

  img {
    align-self: center;
    height: 80%;
    opacity: 0.7;
  }

  .btn {
    position: absolute;
    left: 15px;
    top: 6px;
  }
}
</style>

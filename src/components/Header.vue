<template>
  <header class="header">
    <button
      class="btn"
      v-on:click="create_frame({ title: 'Novo Frame', order: -999 })"
    >
      Adicionar Frame
    </button>

    <img src="../assets/logo.png" alt />

    <Menu />
  </header>
</template>

<script>
import Menu from "./Menu";
import { mapActions } from "vuex";

export default {
  name: "Header",
  methods: {
    ...mapActions(["create_frame"]),
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

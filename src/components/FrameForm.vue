<template>
  <form
    v-on:submit.prevent="
      create_todo({
        frame_id: frame,
        title: todoTitle,
        description: todoDescription,
        order,
      });
      todoTitle = '';
      todoDescription = '';
    "
  >
    <div class="frame-form">
      <input v-model="todoTitle" placeholder="Adicione um titulo a tarefa" />
      <textarea
        v-model="todoDescription"
        placeholder="Adicione uma descrição"
      ></textarea>
      <button class="btn">Adicionar</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FrameForm",
  data: function() {
    return {
      todoTitle: "",
      todoDescription: "",
    };
  },
  props: {
    frame: String,
    order: Number,
  },
  methods: {
    ...mapActions(["create_todo"]),
  },
};
</script>

<style lang="scss">
.frame-form {
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 8px;
  padding: 5px;
  width: 100%;
  position: relative;

  input,
  textarea {
    background: none;
    font-size: 14px;
    border: 0;
    font-weight: 400;
    height: auto;
    width: 100%;
    outline: none;
    resize: none;
    padding: 6px 2px;
  }

  input {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  }

  textarea {
    margin-bottom: 15px;
  }
}
</style>

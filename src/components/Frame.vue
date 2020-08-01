<template>
  <article class="frame">
    <header>
      <input
        type="text"
        v-model="heading"
        v-on:change="update_frame({ id: content.id, heading })"
        placeholder="Adicione um título ao frame"
      />
      <button
        v-on:click.prevent="delete_frame({ id: content.id, title: heading })"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fal"
          data-icon="times"
          role="img"
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
            class
          />
        </svg>
      </button>
    </header>

    <ul>
      <li
        v-for="item in items"
        v-bind:ref="item.id"
        v-bind:key="item.id"
        draggable
        v-on:dragstart="onDrag({ $event, item, elementType: 'LI' })"
        v-on:drop="rewriteOnDrop({ $event, item })"
        v-on:dragover.prevent
        v-on:dragenter="onDragEnter({ $event, direction: 'y' })"
        v-on:dragleave="onDragLeave({ $event })"
        v-on:dragend="onDragEnd"
      >
        <FrameItem v-bind:item="item" />
      </li>
    </ul>
    <FrameForm v-bind:frame="content.id" v-bind:order="items.length + 999" />
  </article>
</template>

<script>
import { mapActions } from "vuex";
import draganddrop from "../mixins/draganddrop";
import FrameItem from "./FrameItem";
import FrameForm from "./FrameForm";

export default {
  name: "Frame",
  props: {
    content: Object,
  },
  data: function() {
    return {
      heading: this.content.title,
      items: [],
      moveToNext: false,
      dragItem: "",
    };
  },
  components: {
    FrameItem,
    FrameForm,
  },
  created: function() {
    this.items = this.content.todos?.sort((a, b) => a.order - b.order);
  },
  mixins: [draganddrop],
  methods: {
    ...mapActions([
      "delete_frame",
      "update_frame",
      "update_todo",
      "update_todos",
      "create_todo",
      "delete_todo",
    ]),
    rewriteOnDrop({ $event, item }) {
      let todos = this.onDrop({ $event, item });
      this.update_todos(todos);
      this.items = todos;
    },
  },
};
</script>

<style scoped lang="scss">
.frame {
  background-color: #ebecf0;
  display: flex;
  border-radius: 5px;
  padding: 10px;
  width: 272px;
  position: relative;
  flex-direction: column;
  margin: 0;

  header {
    margin: 0 0 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    input {
      border: 0;
      background: none;
      padding: 0;
      width: 100%;
      font-weight: 600;
      margin: 0;
      padding: 10px 0;
      font-size: 13px;
      outline: none;
      transition: all 0.3s ease-in-out;
      border-bottom: 1px solid transparent;

      &:focus {
        border-bottom-color: rgba(0, 0, 0, 0.5);
      }
    }

    button {
      background: none;
      font-size: 16px;
      font-weight: 700;
      border: 0;
      padding: 10px;
      outline: none;
      align-items: center;
      justify-content: center;
      display: flex;
      transition: all 0.3s ease-in-out;
      opacity: 0;
      margin-right: -5px;

      svg {
        width: 10px;
      }
    }
  }

  ul {
    padding: 0;
    list-style: none;
    margin: 0;
  }

  form {
    padding-top: 30px;
    display: block;

    .frame-item input {
      padding-left: 0;
      padding-right: 0;
    }

    .btn {
      margin-top: 15px;
    }
  }

  &:hover {
    header button {
      opacity: 1;
    }
  }
}
.dragging > .frame {
  pointer-events: none;
}

// on drag
.drag.orver-left > .frame,
.drag.orver-right > .frame,
.drag {
  margin: 0;
  display: none;

  & > .frame {
    display: none;
    margin: 0;

    &:after,
    &:before {
      display: none;
    }
  }
}
</style>

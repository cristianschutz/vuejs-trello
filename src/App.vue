<template>
  <div id="app" v-bind:style="style">
    <Header />
    <main class="board">
      <div
        v-for="frame in items"
        :key="frame.id"
        :ref="frame.id"
        draggable
        v-on:dragstart="onDrag({ $event, item: frame, elementType: 'DIV' })"
        v-on:drop="dragItem && update_frames(onDrop({ $event, item: frame }))"
        v-on:dragover.prevent
        v-on:dragenter="onDragEnter({ $event, direction: 'x' })"
        v-on:dragleave="onDragLeave({ $event })"
        v-on:dragend="onDragEnd"
        class="board-column"
      >
        <Frame :content="frame" />
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Header from "./components/Header";
import Frame from "./components/Frame";
import draganddrop from "./mixins/draganddrop";

export default {
  name: "App",
  components: {
    Header,
    Frame,
  },
  data: function() {
    return {
      moveToNext: false,
      dragItem: "",
    };
  },
  created: function() {
    this.read_frame();
  },
  mixins: [draganddrop],
  methods: {
    ...mapActions(["read_frame", "update_frames"]),
  },
  computed: {
    ...mapGetters({ items: "framesByOrder" }),
    ...mapState(["style"]),
  },
};
</script>

<style src="./assets/colors.scss" lang="scss"></style>
<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  color: #172b4d;
}

* {
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

button {
  cursor: pointer;
  background: none;
}

.board {
  display: flex;
  align-items: flex-start;
  padding: 15px;
  width: 100%;
  height: calc(100vh - 40px);
  overflow: scroll;
}

.board-column {
  margin-right: 15px;
  display: flex;
  align-items: flex-start;
  margin-top: 0;

  &.drag {
    display: none;
  }

  &.over-prev,
  &.over-next {
    &:after,
    &:before {
      background: rgba(0, 0, 0, 0.2);
      content: "";
      border-radius: 4px;
      display: block;
      height: 400px;
      text-align: center;
      width: 272px;
      margin: 0 15px;
    }
  }
  &.over-prev {
    &:before {
      margin-left: 0;
    }
    &:after {
      display: none;
    }
  }

  &.over-next {
    &:before {
      display: none;
    }
    &:after {
      margin-right: 0;
    }
  }
}

.btn {
  box-shadow: none;
  border: none;
  color: #fff;
  font-size: 14px;
  padding: 5px 20px;
  border-radius: 4px;
  outline: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
}
</style>

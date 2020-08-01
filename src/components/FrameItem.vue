<template>
  <div class="frame-item">
    <button
      class="frame-item--check"
      v-on:click="
        update_todo({ id: item.id, open: !item.open });
        item.open = !item.open;
      "
    >
      <svg
        v-if="item.open"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 448 512"
      >
        <path
          fill="currentColor"
          d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"
        />
      </svg>
      <svg
        v-else
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path
          fill="currentColor"
          d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v352z"
          class
        />
      </svg>
    </button>

    <button class="frame-item--delete">
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fal"
        data-icon="times"
        role="img"
        viewBox="0 0 320 512"
        v-on:click="delete_todo({ id: item.id, title: item.title })"
      >
        <path
          fill="currentColor"
          d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
          class
        />
      </svg>
    </button>

    <input
      v-bind:value="item.title"
      v-on:change="
        update_todo({
          id: item.id,
          title: $event.target.value,
        });
        item.title = $event.target.value;
      "
    />
    <textarea
      v-text="item.description"
      v-on:change="
        update_todo({
          id: item.id,
          title: item.title,
          description: $event.target.value,
        })
      "
    ></textarea>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FrameItem",
  props: {
    item: Object,
  },
  methods: {
    ...mapActions(["delete_todo", "update_todo"]),
  },
};
</script>

<style lang="scss">
.frame-item {
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
  }

  input {
    padding: 6px 20px 6px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    margin-bottom: 5px;
  }

  &--check {
    border: 0;
    padding: 0;
    transition: all 0.3s ease-in-out;
    top: 13px;
    outline: none;
    position: absolute;

    svg {
      width: 12px;
    }
  }

  &--delete {
    border: 0;
    opacity: 0;
    outline: none;
    padding: 0;
    position: absolute;
    right: 10px;
    top: 13px;
    transition: all 0.3s ease-in-out;

    svg {
      width: 9px;
    }
  }
}

li:hover .frame-item--delete {
  opacity: 1;
}

.dragging {
  .frame-item {
    pointer-events: none;
  }
}

.drag {
  display: none;
  margin: 0;
}

.over-next,
.over-prev {
  margin: 0;
  padding: 8px 0;

  &:after,
  &:before {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    content: "";
    display: block;
    height: 65px;
    width: 100%;
  }
}

.over-prev {
  &:after {
    display: none;
  }
}

.over-next {
  &:before {
    display: none;
  }
}

.over-next {
  &:before {
    display: none;
  }
  &:after {
    display: block;
  }
}
</style>

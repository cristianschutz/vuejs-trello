<template>
  <header class="menu" v-bind:class="{ active: open }">
    <button class="menu-btn-open" v-on:click="open = !open">
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="cog"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"
        />
      </svg>
    </button>
    <h6>Cores</h6>
    <ul>
      <li
        v-for="item in styles"
        v-bind:key="item.background"
        v-bind:class="{ active: style['--bg'] == item['--bg'] }"
      >
        <button
          v-on:click.prevent="update_style(item)"
          v-bind:style="{ background: item['--bg'] }"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            v-on:click="item.active = !item.active"
          >
            <path
              fill="currentColor"
              d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z"
              class
            />
          </svg>
        </button>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Menu",
  data: function() {
    return {
      open: false,
    };
  },
  methods: {
    ...mapActions(["update_style", "filter_todos"]),
  },
  computed: {
    ...mapState(["style", "styles"]),
  },
};
</script>

<style scoped lang="scss">
.menu {
  background-color: #ebecf0;
  height: 100vh;
  position: fixed;
  right: -300px;
  top: 0;
  transition: right 0.3s ease-in-out;
  width: 300px;
  z-index: 9;
  border-radius: 3px 0 0 3px;
  padding: 15px;

  .menu-btn-open {
    outline: none;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    border-radius: 2px;
    border: 0;
    justify-content: center;
    height: 30px;
    left: -35px;
    position: absolute;
    top: 4px;
    width: 30px;

    svg {
      width: 18px;
      color: #fff;
      transition: all 0.3s ease-in-out 0.5s;
    }
  }

  h6 {
    color: #333;
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 20px;
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;

    li {
      align-items: center;
      display: flex;
      justify-content: center;
      margin-bottom: 15px;
      width: 33.33%;

      button {
        border-radius: 10px;
        display: block;
        font-size: 0;
        height: 40px;
        width: 70px;
        position: relative;
        border: 0;
        outline: none;
        background-color: var(--bg);

        svg {
          pointer-events: none;
          color: #fff;
          left: 50%;
          margin: -9px;
          opacity: 0;
          position: absolute;
          top: 50%;
          width: 20px;
        }
      }

      &.active {
        button {
          svg {
            opacity: 1;
          }
        }
      }
    }
  }

  &.active {
    right: 0;
    .menu-btn-open {
      svg {
        transform: rotate(-90deg);
      }
    }
  }
}
</style>

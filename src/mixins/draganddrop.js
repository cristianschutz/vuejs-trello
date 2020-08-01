export default {
  methods: {
    onDrag({ $event, item, elementType }) {
      if ($event.target.nodeName === elementType) {
        this.dragItem = item;
      } else {
        return;
      }

      Object.values(this.$refs).map((item) =>
        item[0]?.classList.add("dragging")
      );

      requestAnimationFrame(function() {
        $event.target?.classList.add("drag");
      });
    },
    onDragEnter({ $event, direction }) {
      if (!this.dragItem) {
        return;
      }

      let offset =
        direction == "x"
          ? $event.toElement.offsetWidth / 2
          : $event.toElement.offsetHeight / 2;
      direction = direction == "x" ? $event.offsetX : $event.offsetY;

      // define if prepend or append item by position
      if ($event.offsetX < offset) {
        $event.target?.classList.add("over-prev");
        this.moveToNext = false;
      } else {
        $event.target?.classList.add("over-next");
        this.moveToNext = true;
      }
    },
    onDragEnd() {
      Object.values(this.$refs).map((item) => {
        item[0]?.classList.remove("dragging");
        item[0]?.classList.remove("drag");
      });
      this.dragItem = "";
    },
    onDragLeave({ $event }) {
      $event.target?.classList.remove("over-prev");
      $event.target?.classList.remove("over-next");
    },
    onDrop({ $event, item }) {
      // only same item dragged can drop in element
      if (this.dragItem == item) {
        return;
      }

      $event.target?.classList.remove("over-prev");
      $event.target?.classList.remove("over-next");
      Object.values(this.$refs).map((item) =>
        item[0]?.classList.remove("drag")
      );

      // 1 - it's order by droped item
      let itemsAux = this.items.map((obj) => {
        if (obj.id === this.dragItem.id) {
          obj.order = this.moveToNext ? item.order + 0.1 : item.order - 0.1;
        }
        return obj;
      });

      // 2 - it's order by order key
      itemsAux = itemsAux.sort((a, b) => {
        return a.order - b.order;
      });

      // 3 - it's save order from 0 to up
      let i = 0;
      itemsAux = itemsAux.map((obj) => {
        obj.order = i;
        i++;
        return obj;
      });

      // update state
      return itemsAux;
    },
  },
};

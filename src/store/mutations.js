export default {
  CREATE_FRAME(state, obj) {
    state.frames.push(obj);
  },
  READ_FRAME(state, obj) {
    state.frames = obj;
  },
  UPDATE_FRAME(state, obj) {
    let { id, title, order } = obj;
    state.frames = state.frames.map((item) => {
      if (item.id == id) {
        item.title = title;
        item.order = order || item.order;
      }
      return item;
    });
  },
  DELETE_FRAME(state, obj) {
    let { id } = obj;
    state.frames = state.frames.filter((item) => item.id != id);
  },
  CREATE_TODO(state, obj) {
    let frames = state.frames;
    let index = frames.findIndex((item) => item.id === obj.frame_id);
    frames[index].todos.push(obj);
    state.frames = frames;
  },
  UPDATE_TODO() {},
  DELETE_TODO(state, obj) {
    let { id } = obj;
    state.frames.map((item) => {
      // find index of todo which i want delete
      let indexTodo = item.todos.findIndex((subitem) => subitem.id == id);
      //if index was found
      if (indexTodo >= 0) {
        // find index of frame which i want delete a todo
        let indexFrame = state.frames.findIndex((frame) => frame.id == item.id);
        // delete a todo from correct frame by index's
        state.frames[indexFrame].todos.splice(indexTodo, 1);
      }
    });
  },
  UPDATE_STYLE(state, obj) {
    state.style = obj;
  },
};

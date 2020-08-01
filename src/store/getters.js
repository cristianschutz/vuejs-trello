export default {
  framesByOrder: (state) => {
    let frames = state.frames.sort((a, b) => a.order - b.order);
    frames.map((item) => item.todos.sort((a, b) => a.order - b.order));
    return frames;
  },
};

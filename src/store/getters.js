export default {
  framesByOrder: (state) => {
    return state.frames.sort((a, b) => a.order - b.order);
  },
};

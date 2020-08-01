import api from "../services/api";
import Toast from "../components/Toast";

export default {
  create_frame({ commit }, { title, order }) {
    api
      .post("/frame", {
        title,
        order,
      })
      .then((response) => {
        if (!response.data.return_code) {
          Toast.error("Erro ao salvar frame, tente novamente mais tarde!");
        } else {
          let obj = response.data.data;
          obj.todos = [];
          commit("CREATE_FRAME", obj);
          Toast.success("Novo frame criado!");
        }
      });
  },
  read_frame({ commit }) {
    api.get("/frames").then((response) => {
      commit("READ_FRAME", response.data.data);
    });
  },
  update_frame({ commit }, { id, heading, order }) {
    api
      .put("/frame", {
        id,
        title: heading,
        order,
      })
      .then((response) => {
        if (!response.data.return_code) {
          Toast.error("Erro ao atualizar tarefa, tente novamente mais tarde!");
        } else {
          commit("UPDATE_FRAME", { id, title: heading });
        }
      });
  },
  update_frames({ commit }, frames) {
    let errors = false;
    frames.map((item) => {
      let { id, title, order } = item;
      api
        .put("/frame", {
          id,
          title,
          order,
        })
        .then((response) => {
          if (!response.data.return_code) {
            if (!errors) {
              Toast.error(
                "Erro ao reordenar frames, tente novamente mais tarde!"
              );
              errors = true;
            }
          } else {
            commit("UPDATE_FRAME", { id, title, order });
          }
        });
    });
  },
  delete_frame({ commit }, { id, title }) {
    api.delete("/frame/" + id).then((response) => {
      if (!response.data.return_code) {
        Toast.error("Erro ao deletar frame, tente novamente mais tarde!");
      } else {
        commit("DELETE_FRAME", { id });
        Toast.success(`Frame ${title} deletado!`);
      }
    });
    commit("DELETE_FRAME", { id });
  },
  create_todo({ commit }, { frame_id, title, description, order }) {
    api
      .post("/todo", {
        title,
        description,
        frame_id,
        open: false,
        order,
      })
      .then((response) => {
        if (!response.data.return_code) {
          Toast.error("Erro ao adicionar tarefa, tente novamente mais tarde!");
        } else {
          commit("CREATE_TODO", response.data.data);
          Toast.success(`Tarefa ${response.data.data.title} adicionada!`);
        }
      });
  },
  update_todos({ commit }, todos) {
    let errors = false;
    todos &&
      todos.map((item) => {
        let { id, title, description, open, order } = item;
        api
          .put("/todo", {
            id,
            title,
            description,
            open,
            order,
          })
          .then((response) => {
            if (!response.data.return_code) {
              if (!errors) {
                Toast.error(
                  `Erro ao atualizar tarefa ${item.title}, tente novamente mais tarde!`
                );
                errors = true;
              }
            } else {
              commit("UPDATE_TODO", response.data.data);
            }
          });
      });
  },
  update_todo({ commit }, { id, title, description, open, order }) {
    api
      .put("/todo", {
        id,
        title,
        description,
        open,
        order,
      })
      .then((response) => {
        if (!response.data.return_code) {
          Toast.error("Erro ao atualizar tarefa, tente novamente mais tarde!");
        } else {
          commit("UPDATE_TODO", response.data.data);
          Toast.success(`Tarefa ${title ? title : ""} atualizada!`);
        }
      });
  },
  delete_todo({ commit }, { id, title }) {
    api.delete("/todo/" + id).then((response) => {
      if (!response.data.return_code) {
        Toast.error(
          `Erro ao deletar a tarefa ${title}, tente novamente mais tarde!`
        );
      } else {
        commit("DELETE_TODO", { id });
        Toast.success(`Tarefa ${title} deletada!`);
      }
    });
  },
  update_style({ commit }, obj) {
    localStorage.setItem("style", JSON.stringify(obj));
    commit("UPDATE_STYLE", obj);
  },
};

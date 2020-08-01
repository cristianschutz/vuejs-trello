import axios from "axios";

const api = axios.create({
  baseURL: `http://api.todo.ootz.com.br`,
  headers: {
    apikey: "6E04FF7E9765DB030C505BBD9D90E36B41F60CF47E0790B07EBD64B46FE4F3C5",
  },
});

export default api;

import axios from "axios";

export const getCharsByPageNumber = (pageNumber) => {
  return axios
    .get("https://rickandmortyapi.com/api/character?page=" + pageNumber);
};

export const sendPost = function(title, body, userId) {
  return axios
    .post("https://jsonplaceholder.typicode.com/posts", {
      title: title,
      body: body,
      userId: userId,
    });
};

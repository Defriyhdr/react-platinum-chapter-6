import axios from "axios";

export async function reqMenu(param) {
  const response = await axios.get(
    `https://api.mudoapi.tech/menus?name=&type=&perPage=10&page=${param}`
  );
  return response;
}

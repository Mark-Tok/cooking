import axios from "axios";

export async function request(url, method = "GET", data = null) {
  const token = window.localStorage.getItem("token");
  try {
    const headers = {
      ["Access-Control-Allow-Origin"]: "*",
    };
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios({
      method,
      url,
      data,
    });
    if (response.status !== 200) {
      throw new Error(response.response.data.error);
    }
    return response;
  } catch (e) {
   return e;
  }
}

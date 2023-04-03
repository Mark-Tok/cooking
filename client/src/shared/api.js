import axios from "axios";

export async function request(url, data = null, method = "GET") {
  const token = window.localStorage.getItem("token");
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios({
      method,
      url,
      data,
    });
    // if (response.status !== 200) {
    //   throw new Error(response?.response?.data);
    // }
    return response;
  } catch (e) {
    return e;
  }
}

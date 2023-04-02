import axios from "axios";
import { setDataError } from "model";
import { useDispatch } from "react-redux";

export async function request(url, data = null, method = "GET") {
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
    // if (response.status !== 200) {
    //   throw new Error(response?.response?.data);
    // }
    return response;
  } catch (e) {
    return e;
  }
}

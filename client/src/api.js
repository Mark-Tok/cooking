import axios from "axios";

export async function request(url, method = "GET", data = null) {
  try {
    const headers = {
      ["Access-Control-Allow-Origin"]: "*",
    };
    let body;

    const { data: dataResponse } = await axios({
      method,
      url,
      data,
    });;``

    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    return await response.json();
  } catch (e) {
    console.warn(e);
  }
}

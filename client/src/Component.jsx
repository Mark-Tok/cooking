import { useEffect } from "react";
import { request } from "./shared/api";

function Component() {
//   const getLolka = async () => {
//     const {token} = await request("http://localhost:5000/auth", "post", {
//       userName: "Vasya",
//       password: "123456",
//     });
//     window.localStorage.setItem("token", JSON.stringify(token));
//   };

//   useEffect(() => {
//     getLolka();
//   }, []);

  return (
    <div className="Component">
      {/* <button onClick={getLolka}>gettoken</button> */}
    </div>
  );
}

export default Component;

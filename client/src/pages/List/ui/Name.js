import { Link } from "react-router-dom";

export const Name = ({ name, image, id }) => {
  return (
    <Link to={`/list/${id}`}>
      <div>
        <div
          style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "10px" }}
        >
          {name}
        </div>
        <img alt="pic" style={{ width: "50%" }} src={image} />
      </div>
    </Link>
  );
};

import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import { updateRecipeLiked } from "model";
import { useDispatch } from "react-redux";
export const Likes = ({ value, id, recipeId, user }) => {
  const dispatch = useDispatch();
  const userId = Number(user?.id);
  const userIdLiked = !!id.length
    ? id.find((item) => Number(item) === userId)
    : null;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!!userIdLiked ? (
        <HeartTwoTone
          onClick={() => {
            dispatch(
              updateRecipeLiked({
                userId,
                recipeId,
                status: "dislike",
              })
            );
          }}
          style={{ fontSize: "30px" }}
          twoToneColor={["#ff3e3e", "#c80000"]}
        />
      ) : (
        <HeartOutlined
          style={{ fontSize: "30px" }}
          onClick={() => {
            dispatch(
              updateRecipeLiked({
                userId,
                recipeId,
                status: "like",
              })
            );
          }}
        />
      )}
      <div
        style={{
          margin: "0 5px",
          color: !!userIdLiked ? "#c80000" : "black",
        }}
      >
        {value}
      </div>
    </div>
  );
};

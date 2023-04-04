import { Button, Col, List, Row, Spin, Typography } from "antd";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetcRecipe,
  removeRecipe,
  selectLoadingRecipe,
  selectRecipe,
  selectUserInfo,
  selectRecipes,
} from "model";
import { Likes, Level } from "pages/List/ui";

export const Recipe = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const user = useSelector(selectUserInfo);
  const loading = useSelector(selectLoadingRecipe);
  const recipe = useSelector(selectRecipe);
  const recipes = useSelector(selectRecipes);
  let { id } = useParams();
  const metaInfo = !!recipes
    ? recipes.find((item) => String(item.id) === String(id))
    : null;
  useEffect(() => {
    dispatch(fetcRecipe({ id }));
  }, [dispatch]);

  useEffect(() => {
    return () => dispatch(removeRecipe());
  }, []);

  const onEditRecipe = () => {
    navigation(`/edit/${recipe?.id}`, { id: recipe?.id });
  };
  return (
    <Spin spinning={loading}>
      {!!metaInfo && !!recipe && (
        <div
          style={{
            backgroundColor: "white",
            padding: "10px 50px",
            borderRadius: "10px",
          }}
        >
          <div style={{ textAlign: "right", marginTop: "10px" }}>
            {String(user?.id) === String(recipe?.createdUserId) && (
              <Button onClick={() => onEditRecipe()} type={"primary"}>
                Редактировать{" "}
              </Button>
            )}
          </div>

          <Typography.Title>{recipe?.name}</Typography.Title>
          <Row gutter={16}>
            <Col span={12}>
              <img alt="pic" style={{ maxWidth: "100%" }} src={recipe?.image} />
              <Row>
                <Col
                  style={{
                    marginTop: "10px",
                  }}
                  span={12}
                >
                  <Likes
                    value={metaInfo.likes}
                    id={metaInfo.userIdLiked}
                    recipeId={recipe.id}
                    user={user}
                  />
                </Col>
                <Col
                  style={{
                    fontWeight: "bold",
                    marginTop: "10px",
                  }}
                  span={12}
                >
                  <div>Сложность:</div>
                  <Level value={metaInfo.level} />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              {" "}
              <List
                size="small"
                header={<Typography.Title>Ингридиенты:</Typography.Title>}
                bordered
                dataSource={recipe?.composition}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text mark></Typography.Text> {item}
                  </List.Item>
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Typography.Title style={{ textAlign: "left" }}>
                Описание
              </Typography.Title>
            </Col>
            <Col style={{ textAlign: "left" }} span={24}>
              <Typography.Text style={{ fontSize: "20px" }}>
                {recipe.description}
              </Typography.Text>
            </Col>
            {recipe.steps.map((item, index) => (
              <Col span={24}>
                <Typography.Title>Шаг {index + 1}</Typography.Title>
                <Typography.Paragraph style={{ fontSize: "20px" }}>
                  {item.value}
                </Typography.Paragraph>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Spin>
  );
};

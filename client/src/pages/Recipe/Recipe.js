import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetcRecipe,
  selectLoadingRecipe,
  selectRecipe,
  selectUserInfo,
  selectRecipes,
  removeRecipe
} from "model";
import { Col, Row, List, Typography } from "antd";
import { Likes, Level } from "pages/List/ui";
export const Recipe = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const loading = useSelector(selectLoadingRecipe);
  const recipe = useSelector(selectRecipe);
  const recipes = useSelector(selectRecipes);
  //   const [metaInfo, setMetaInfo] = useState(null);
  let { id } = useParams();
  const metaInfo = !!recipes
    ? recipes.find((item) => item.id === Number(id))
    : null;
  //   console.log(metaInfo, 'metaInfo')
  useEffect(() => {
    dispatch(fetcRecipe(id));
  }, [dispatch]);

  useEffect(() => {
    return () => dispatch(removeRecipe())
  }, [])

  return (
    <Spin spinning={loading}>
      {!!recipe && !!metaInfo && (
        <div
          style={{
            backgroundColor: "white",
            padding: "10px 50px",
            borderRadius: "10px",
          }}
        >
          <Typography.Title>{recipe?.name}</Typography.Title>
          <Row>
            <Col span={12}>
              <img style={{ maxWidth: "100%" }} src={recipe?.image} />
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
            {Object.keys(recipe.steps).map((_, index) => (
              <Col span={24}>
                <Typography.Title>Шаг {index + 1}</Typography.Title>
                <Typography.Paragraph style={{ fontSize: "20px" }}>
                  {recipe.steps[`step${index + 1}`]}
                </Typography.Paragraph>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Spin>
  );
};

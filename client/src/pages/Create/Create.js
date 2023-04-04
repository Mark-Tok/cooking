import React, { useEffect, useState } from "react";
import { Button, message, Steps, theme, Modal, Spin } from "antd";
import { UploadImage, TextInfo, Recipe } from "./stepsCreater";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  selectBase,
  selectComposition,
  selectNameRecipe,
  selectDescriptionRecipe,
  selectSteps,
  selectUserInfo,
  selectUploadImage,
  fetchPostRecipe,
  selectStatusPostRecipe,
  resetState,
  selectLoadingRecipe,
  fetcRecipe,
  fetchPutRecipe,
  selectId,
} from "model";
import { useParams } from "react-router-dom";

const steps = [
  {
    title: "Загрузка изображения",
    content: <UploadImage />,
  },
  {
    title: "Детальная информация",
    content: <TextInfo />,
  },
  {
    title: "Этапы готовки",
    content: <Recipe />,
  },
];

const configName = {
  title: "Добавьте название рецепта",
};
const configDesc = {
  title: "Добавьте описание",
};
const configBase = {
  title: "Добавьте хотя бы один базовый ингридиент",
};
const configComposition = {
  title: "Добавьте хотя бы один ингридиент в рецептт",
};

export const Create = ({ mode }) => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const base = useSelector(selectBase);
  const composition = useSelector(selectComposition);
  const name = useSelector(selectNameRecipe);
  const description = useSelector(selectDescriptionRecipe);
  const recipe = useSelector(selectSteps);
  const user = useSelector(selectUserInfo);
  const image = useSelector(selectUploadImage);
  const loading = useSelector(selectStatusPostRecipe);
  const loadingEdit = useSelector(selectLoadingRecipe);
  const idRecipe = useSelector(selectId);
  const [modal, contextHolder] = Modal.useModal();

  const next = () => {
    const hasName = !!name;
    const hasValueFirst = !!base.length;
    const hasValueFirstComposition = !!composition.length;
    const hasValueDescription = !!description;
    if (current === 1) {
      if (!hasName) {
        modal.confirm(configName);
        return;
      }
      if (!hasValueDescription) {
        modal.confirm(configDesc);
        return;
      }
      if (!hasValueFirst) {
        modal.confirm(configBase);
        return;
      }
      if (!hasValueFirstComposition) {
        modal.confirm(configComposition);
        return;
      }
    }
    setCurrent(current + 1);
  };

  const preperData = () => {
    const data = {};
    data.id = mode === "edit" ? idRecipe : uuidv4();
    data.image = image;
    data.createdUserId = Number(user?.id);
    data.name = name;
    data.description = description;
    data.likes = 0;
    data.composition = composition
      .filter((item) => !!item.value)
      .map((item) => item.value);
    data.compositionBase = base
      .filter((item) => !!item.value)
      .map((item) => item.value);
    data.level = "hard";
    data.steps = recipe.filter((item) => !!item.value);

    data.userIdLiked = [];
    if (mode !== "edit") {
      dispatch(fetchPostRecipe(data));
    } else {
      dispatch(fetchPutRecipe(data));
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle = {
    textAlign: "center",
    color: token.colorTextTertiary,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  useEffect(() => {
    return () => dispatch(resetState());
  }, []);

  useEffect(() => {
    if (!!id) {
      dispatch(fetcRecipe({ id, mode: "edit" }));
    }
  }, [id]);

  return (
    <Spin spinning={!!loading || !!loadingEdit}>
      <div style={{ paddingBottom: "20px" }}>
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Назад
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Дальше
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={preperData}>
              {mode === "edit" ? "Имзменить рецепт" : "Создать рецепт"}
            </Button>
          )}
        </div>
        {contextHolder}
      </div>
    </Spin>
  );
};

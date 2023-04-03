import React, { useEffect, useState } from "react";
import { Button, message, Steps, theme, Modal } from "antd";
import { UploadImage, TextInfo } from "./stepsCreater";
import { useSelector } from "react-redux";
import {
  selectBase,
  selectComposition,
  selectNameRecipe,
  selectDescriptionRecipe,
} from "model";

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
    content: "Last-content",
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

export const Create = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const base = useSelector(selectBase);
  const composition = useSelector(selectComposition);
  const name = useSelector(selectNameRecipe);
  const description = useSelector(selectDescriptionRecipe);
  const [modal, contextHolder] = Modal.useModal();

  const next = () => {
    console.log(current, "current");
    const hasName = !!name;
    const hasValueFirst = !!base.filter((item) => item.id === 1)[0].value;
    const hasValueFirstComposition = !!composition.filter(
      (item) => item.id === 1
    )[0].value;
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

  return (
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
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Создать рецепт
          </Button>
        )}
      </div>
      {contextHolder}
    </div>
  );
};

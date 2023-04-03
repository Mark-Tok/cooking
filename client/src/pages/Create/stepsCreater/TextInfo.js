import { useState, useCallback } from "react";
import styled from "styled-components";
import { Input, Typography, Button, Row, Col, Modal } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  selectBase,
  selectComposition,
  createComposition,
  createBase,
  createName,
  createDescription,
  selectNameRecipe,
  selectDescriptionRecipe,
} from "model";
const { TextArea } = Input;

const Name = styled(Input)`
  .ant-input-wrapper {
    .ant-typography {
    }
    span {
      padding: 0;
      display: block;
    }
    .ant-input {
      margin-bottom: 20px;
    }
  }
`;

const Title = styled(Typography.Title)`
  text-align: center;
`;

const configMin = {
  title: "Добавьте хоть что то",
  content: <> Обязателен хотя бы один ингридиент блюда</>,
};
const configMax = {
  title: "Слишком много",
  content: <> Добавьте недостающее в колонку рецепты</>,
};

export const TextInfo = () => {
  const dispatch = useDispatch();
  const base = useSelector(selectBase);
  const composition = useSelector(selectComposition);
  const name = useSelector(selectNameRecipe);
  const description = useSelector(selectDescriptionRecipe);
  const [modal, contextHolder] = Modal.useModal();

  //Основа
  const removeItem = (idItem, src) => {
    const filtred =
      src === "base"
        ? base.filter(({ id }) => id !== idItem)
        : composition.filter(({ id }) => id !== idItem);
    console.log(filtred, "filtred");
    if (filtred.length === 0) {
      modal.confirm(configMin);
    } else if (src === "base") {
      dispatch(createBase([...filtred]));
    } else {
      dispatch(createComposition([...filtred]));
    }
  };

  const adddItem = (src) => {
    if (src === "base") {
      if (base.length === 5) {
        modal.confirm(configMax);
        return;
      }
      dispatch(createBase([...base, { value: "", id: uuidv4() }]));
    } else {
      dispatch(
        createComposition([...composition, { value: "", id: uuidv4() }])
      );
    }
  };

  const setValueBase = (idItem, value) => {
    const newValuesInputs = base.map((item) => {
      if (item.id === idItem) {
        return { id: idItem, value };
      }
      return item;
    });
    dispatch(createBase(newValuesInputs));
  };

  const setValueComposition = (idItem, value) => {
    const newValuesInputs = composition.map((item) => {
      if (item.id === idItem) {
        return { id: idItem, value };
      }
      return item;
    });
    dispatch(createComposition(newValuesInputs));
  };

  const onCreateName = (value) => {
    const data = value.trim();
    dispatch(createName(data));
  };

  const onCreateDescription = (value) => {
    const data = value.trim();
    dispatch(createDescription(data));
  };

  return (
    <div>
      <Name
        value={name}
        onChange={(e) => onCreateName(e.target.value)}
        size="large"
        addonBefore={<Title>Название</Title>}
      />
      <Title style={{ textAlign: "left" }}>Описание</Title>
      <TextArea
        value={description}
        onChange={(e) => onCreateDescription(e.target.value)}
        style={{ height: "200px" }}
      />
      <Row gutter={24}>
        <Col span={12}>
          <Title style={{ textAlign: "left" }}>Базовые ингридиенты</Title>
          {base.map(({ id, value }, index) => (
            <Row gutter={16}>
              <Col span={20}>
                <Input
                  onChange={(e) => setValueBase(id, e.target.value)}
                  value={value}
                  style={{ marginBottom: "10px" }}
                  size="large"
                  placeholder="Базовый ингридиент"
                />
              </Col>
              <Col span={40}>
                <Button
                  shape="circle"
                  onClick={() => removeItem(id, "base")}
                  type="primary"
                  icon={<MinusOutlined />}
                />
              </Col>
            </Row>
          ))}
          <Button
            style={{ marginTop: "20px" }}
            onClick={() => adddItem("base")}
            type="primary"
            icon={
              <>
                <PlusOutlined />
              </>
            }
          >
            Добавить
          </Button>
        </Col>
        <Col span={12}>
          <Title style={{ textAlign: "left" }}>Рецепт</Title>
          {composition.map(({ id, value }) => (
            <Row gutter={16}>
              <Col span={20}>
                <Input
                  value={value}
                  onChange={(e) => setValueComposition(id, e.target.value)}
                  style={{ marginBottom: "10px" }}
                  size="large"
                  placeholder="Ингридиент"
                />
              </Col>
              <Col span={40}>
                <Button
                  shape="circle"
                  onClick={() => removeItem(id, "composition")}
                  type="primary"
                  icon={<MinusOutlined />}
                />
              </Col>
            </Row>
          ))}
          <Button
            style={{ marginTop: "20px" }}
            onClick={adddItem}
            type="primary"
            icon={
              <>
                <PlusOutlined />
              </>
            }
          >
            Добавить
          </Button>
        </Col>
      </Row>
      {contextHolder}
    </div>
  );
};

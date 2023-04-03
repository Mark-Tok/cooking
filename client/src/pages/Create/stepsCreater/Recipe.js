import { Typography, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { selectSteps, createSteps } from "model";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

export const Recipe = () => {
  const steps = useSelector(selectSteps);
  const dispatch = useDispatch();
  const onAddStep = () => {
    dispatch(createSteps([...steps, { value: "", id: uuidv4() }]));
  };

  const onSetStep = (id, value) => {
    const newValuesStep = steps.map((item) => {
      if (item.id === id) {
        return { id, value };
      }
      return item;
    });
    dispatch(createSteps(newValuesStep));
  };
  console.log(steps, "steps");
  return (
    <div>
      {steps.map(({ value, id }, index) => {
        return (
          <div>
            <Typography.Title>Шаг {index + 1}</Typography.Title>
            <TextArea
              onChange={(e) => onSetStep(id, e.target.value)}
              value={value}
            />
          </div>
        );
      })}
      <Button
        style={{ marginTop: "20px" }}
        onClick={onAddStep}
        type="primary"
        icon={
          <>
            <PlusOutlined />
          </>
        }
      >
        Добавить
      </Button>
    </div>
  );
};

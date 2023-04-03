import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchListRecipes,
  selectLoadingRecipes,
  selectRecipes,
  selectToken,
  selectUserInfo,
  sortedCompositions,
  putQuery,
} from "model";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Button } from "antd";
import { debounce } from "lodash";
import "./index.css";
import { Likes, Level, Name, CompositionBase } from "./ui";

export const List = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUserInfo);
  const navigation = useNavigate();
  useEffect(() => {
    dispatch(fetchListRecipes());
  }, [token]);
  const recipes = useSelector(selectRecipes);
  const loading = useSelector(selectLoadingRecipes);
  const isLoading = loading === "loading";
  const columns = [
    {
      title: <div style={{ fontSize: "20px" }}>Блюдо</div>,
      dataIndex: "name",
      key: "name",
      render: (name, { image, id }) => (
        <Name name={name} image={image} id={id} />
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
      responsive: ["md", "sm", "xs"],
      width: "40%",
    },
    {
      title: (
        <div style={{ fontSize: "20px", textAlign: "center" }}>Сложность</div>
      ),
      dataIndex: "level",
      key: "level",
      responsive: ["md", "sm", "xs"],
      render: (data) => <Level value={data} />,
    },
    {
      title: (
        <div style={{ fontSize: "20px", textAlign: "center" }}>
          Основные ингридиенты
        </div>
      ),
      dataIndex: "compositionBase",
      key: "compositionBase",
      render: (data) => <CompositionBase data={data} />,
      sorter: () => {},
      responsive: ["md", "sm", "xs"],
      width: "25%",
    },
  ];

  const authColumn = useMemo(() => {
    return !!token
      ? [
          ...columns,
          {
            title: (
              <div style={{ fontSize: "20px", textAlign: "center" }}>Лайки</div>
            ),
            dataIndex: "likes",
            key: "likes",
            render: (value, { userIdLiked, id }) =>
              user?.id ? (
                <Likes
                  value={value}
                  recipeId={id}
                  id={userIdLiked}
                  user={user}
                  list
                />
              ) : null,
            responsive: ["md", "sm", "xs"],
          },
        ]
      : [];
  }, [token, user]);

  const onChange = (pagination, filters, sorter) => {
    if (sorter.field === "compositionBase") {
      let sorted;
      if (sorter.order === "ascend") {
        sorted = recipes.map((i) => {
          const data = [...i.compositionBase];
          return {
            ...i,
            compositionBase: data.sort(),
          };
        });
      }
      if (sorter.order === "descend") {
        sorted = recipes.map((i) => {
          const data = [...i.compositionBase];
          return {
            ...i,
            compositionBase: data.reverse(),
          };
        });
      }
      if (!sorted) {
        dispatch(sortedCompositions(null));
        dispatch(fetchListRecipes());
      }
      dispatch(sortedCompositions(sorted));
    }
  };

  const onChangeSearch = debounce((e) => {
    const value = e.target.value;
    console.log(!!value, "!!value");
    if (!!value) {
      dispatch(putQuery(value));
      dispatch(fetchListRecipes(value));
    } else {
      dispatch(putQuery());
      dispatch(fetchListRecipes());
    }
  }, 400);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {!!user?.id && <Button onClick={() => navigation('/create')} type="primary">Создать рецепт</Button>}

      <div style={{ margin: "20px 0px", width: "100%" }}>
        <Input
          prefix={<SearchOutlined twoToneColor={"#b6b3b3"} />}
          placeholder="Поиск по блюдам или основным ингридиентам"
          size="large"
          style={{ width: "100%" }}
          onChange={onChangeSearch}
        />
      </div>

      <Table
        showHeader={!!recipes?.length ? true : false}
        onChange={onChange}
        loading={isLoading}
        size="large"
        columns={!!authColumn?.length ? authColumn : columns}
        dataSource={recipes}
      />
    </div>
  );
};

import { useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchListRecipes,
  selectLoadingRecipes,
  selectRecipes,
  selectToken,
  selectUserInfo,
  updateRecipeLiked,
  sortedCompositions,
  putQuery,
} from "model";
import { HeartOutlined, HeartTwoTone, SearchOutlined } from "@ant-design/icons";
import { Table, Input } from "antd";
import { debounce } from "lodash";
import "./index.css";

export const List = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUserInfo);
  useEffect(() => {
    dispatch(fetchListRecipes());
  }, [token]);
  const recipes = useSelector(selectRecipes);
  const loading = useSelector(selectLoadingRecipes);
  const isLoading = loading === "loading";

  const Name = ({ name, image }) => {
    return (
      <div>
        <div
          style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "10px" }}
        >
          {name}
        </div>
        <img style={{ width: "50%" }} src={image} />
      </div>
    );
  };

  const CompositionBase = ({ data }) => {
    return (
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <ul class="compositionBase">
          {data.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  const Likes = useMemo(() => {
    return ({ value, id, recipeId }) => {
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
  }, [user]);

  const level = {
    hard: "Крутой повар",
    medium: "Средняя",
    easy: "Просто",
  };

  const Level = ({ value }) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {level[value]}
      </div>
    );
  };

  const columns = [
    {
      title: <div style={{ fontSize: "20px" }}>Блюдо</div>,
      dataIndex: "name",
      key: "name",
      render: (name, { image }) => <Name name={name} image={image} />,
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
                <Likes value={value} recipeId={id} id={userIdLiked} />
              ) : null,
            responsive: ["md", "sm", "xs"],
          },
        ]
      : [];
  }, [token]);

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
  }, 100);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: "20px", width: "100%" }}>
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

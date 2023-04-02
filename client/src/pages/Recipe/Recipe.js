import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetcRecipe, selectLoadingRecipe } from "model";

export const Recipe = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoadingRecipe);
  let { id } = useParams();
  useEffect(() => {
    dispatch(fetcRecipe(id));
  }, [dispatch]);

  return <Spin spinning={loading}>{id}</Spin>;
};

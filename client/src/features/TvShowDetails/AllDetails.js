import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

import BasicInfo from "./BasicInfo";
import ShowImages from "./ShowImages";
import Recommended from "./Recommended";
import ActorDetails from "./ActorDetails";
import {
  showDetailsTvShow,
  showActorsTvShow,
  showImagesTvShow,
  showRecommendedTvShow,
} from "../../slices/showDetailsSlice";

import { clearElements } from "../../constants/actionTypes";

export const selectPosterPath = (state) =>
  state?.details?.details?.details?.poster_path;

export default function AllDetails() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const poster_path = useSelector(selectPosterPath);
  const myStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
    zIndex: -1,
    color: "white",
  };

  useEffect(() => {
    dispatch(showDetailsTvShow(id));
    dispatch(showActorsTvShow(id));
    dispatch(showImagesTvShow(id));
    dispatch(showRecommendedTvShow(id));
    dispatch(clearElements());
  }, []);

  return (
    <div style={myStyle}>
      <BasicInfo />
      <ActorDetails />
      <ShowImages />
      <Recommended />
    </div>
  );
}

import React from "react";
import { useSelector } from "react-redux";

import MiniCard from "./MiniCard";
import "../../features/features.css";

const selectResultsIds = (state) =>
  state?.details?.recommended?.results?.map((result) => result.id);
export default function Recommended() {
  const resultsIds = useSelector(selectResultsIds);
  return (
    <>
      <div className="actors-text">
        <h2>RECOMMENDED TV SHOWS</h2>
      </div>
      <div className="recommended-list">
        {resultsIds?.map((resId) => (
          <MiniCard key={resId} id={resId} />
        ))}
      </div>
    </>
  );
}

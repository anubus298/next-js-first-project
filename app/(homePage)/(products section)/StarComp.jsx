"use client";
import { Rating } from "react-simple-star-rating";
function StarComp({ count, size, readonly }) {
  return (
    <Rating
      className=""
      initialValue={count}
      allowFraction={true}
      size={size}
      readonly={readonly}
    />
  );
}

export default StarComp;

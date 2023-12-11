"use client";

import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Rate } from "antd";
import { Suspense, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../(lib)/context-provider";
import Fallback_comments_card from "./fallback_comments_card";
function Comments_card({ review }) {
  const dateOfComment = new Date(review.created);
  const [comment, setcomment] = useState(review.comment.slice(0, 350));
  const [domLoaded, setdomLoaded] = useState(false);
  const { isValid, setisValid } = useContext(AuthContext);

  const [likesNum, setlikesNum] = useState(review.numberOflikes);
  const [isLong, setisLong] = useState(false);
  const [isUserLiked, setisUserLiked] = useState(review.isLiked);
  const prettyDate = dateOfComment.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    hour12: false,
    day: "numeric",
  });
  async function handleLike() {
    if (isUserLiked) {
      setlikesNum(likesNum - 1);
    } else {
      setlikesNum(likesNum + 1);
    }
    setisUserLiked(!isUserLiked);
    try {
      const record = await fetch("/api/other/comments/updateLikes", {
        method: "PATCH",
        body: JSON.stringify({
          id: review.id,
          isUserLiked: isUserLiked,
        }),
      });
      const res = await record.json();
      if (res.status == 200) {
      }
    } catch (error) {}
  }
  useEffect(() => {
    if (isLong) {
      setcomment(review.comment);
    } else {
      setcomment(review.comment.slice(0, 350));
    }
  }, [isLong]);
  useEffect(() => {
    setdomLoaded(true);
  }, []);
  return domLoaded ? (
    <Suspense fallback={<Fallback_comments_card />}>
      <div className="flex w-full p-2 py-6 bg-white shadow-sm md:p-4 rounded-xl">
        <div className="flex flex-col w-full h-full gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar
                size={"small"}
                style={{
                  backgroundColor: review.expand.user.expand.information.color,
                }}
              >
                <p className="font-semibold ">
                  {review.expand.user.username[0].toUpperCase()}
                </p>
              </Avatar>
              <p className="font-medium md:text-base">
                {review.expand?.user?.username?.split("_").join(" ")}
              </p>
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              <p className="text-xs text-gray-400 md:text-sm">{prettyDate}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-center md:text-sm">
                  {review.rating}
                </p>
                <Rate
                  className={
                    (review.rating < 2.5 ? "text-red-600" : "") + " text-xs"
                  }
                  defaultValue={review.rating}
                  allowHalf
                  disabled
                />
              </div>
            </div>
          </div>

          <p className="text-xs leading-5 md:text-sm">
            {comment}
            {review.comment.length > 350 && (
              <span
                className="text-gray-400 cursor-pointer"
                onClick={() => setisLong(!isLong)}
              >
                {isLong ? "show less" : "...view more"}
              </span>
            )}
          </p>
          <div className="flex justify-end w-full gap-4">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faThumbsUp}
                onClick={async () => {
                  if (isValid) {
                    await handleLike();
                  }
                }}
                className={
                  isValid
                    ? (isUserLiked ? "text-secondaryGreen " : "text-main") +
                      " cursor-pointer"
                    : ""
                }
              />
              <p>{likesNum}</p>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  ) : (
    <Fallback_comments_card />
  );
}

export default Comments_card;

"use client";
import { Button, Empty, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useContext, useEffect, useState } from "react";
import Comments_card from "./Comments_card";
import { ratingSchema, ReviewZod } from "../../../(lib)/Zod/schema";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";
import { AuthContext } from "../../../(lib)/context-provider";

function ReviewsSection({ reviews, name, id, type }) {
  const pb = new PocketBase(process.env.pocketBaseUrl);
  const { color, setcolor } = useContext(AuthContext);

  useEffect(() => {
    pb.authStore.loadFromCookie(getCookie("pb_auth"));
    function getCookie(name) {
      let matches = document.cookie.match(
        new RegExp(
          "(?:^|; )" +
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
            "=([^;]*)"
        )
      );
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }
  }, []);
  const router = useRouter();
  const [currentRatingToSend, setcurrentRatingToSend] = useState(0);
  const [textToSend, settextToSend] = useState("");
  async function createReview() {
    try {
      ReviewZod.parse(textToSend);
      ratingSchema.parse(currentRatingToSend);
      let dataToSend = {
        comment: textToSend,
        rating: currentRatingToSend,
      };
      dataToSend[type] = id;
      const res = await fetch("/api/other/comments/createReview", {
        method: "POST",
        body: JSON.stringify(dataToSend),
      });
      const data = await res.json();
      settextToSend("");
      setcurrentRatingToSend(0);
      if (data.status == 200) {
        return true;
      } else {
        router.refresh();
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  return (
    <div className="flex flex-col w-full p-5 bg-secondarySecondarylight ">
      <div className="flex flex-col items-center w-full gap-1 py-4 md:gap-4 md:flex-row ">
        <div className="flex flex-col w-full gap-2 md:w-9/12 md:gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-semibold">Reviews</p>
              <p className="text-gray-600">
                {reviews.length} Reviews for {name}
              </p>
            </div>
            {reviews.length != 0 && <Button className="">Sort By</Button>}
          </div>
          <div className="flex flex-col w-full md:gap-4 gap-2 md:h-[500px] overflow-y-scroll">
            {reviews?.map((review, index) => {
              return <Comments_card key={index * 45} review={review} />;
            })}
            {reviews.length == 0 && (
              <div className="flex items-center justify-center w-full h-full">
                <Empty
                  description={
                    <p className="text-lg font-semibold ">No comments yet</p>
                  }
                />
              </div>
            )}
          </div>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await createReview();
          }}
          className="flex flex-col items-start self-stretch justify-start w-full max-h-full md:pt-10 md:w-3/12"
        >
          <TextArea
            rows={5}
            maxLength={950}
            showCount
            autoCorrect="off"
            autoComplete="off"
            onChange={(e) => settextToSend(e.target.value)}
            auto
            disabled={!pb.authStore.isValid}
          />
          <div className="flex items-center justify-between w-full px-2 pt-6 pb-2 bg-white">
            <div className="">
              <p>Rating:</p>
              <Rate
                defaultValue={currentRatingToSend}
                onChange={(value) => setcurrentRatingToSend(value)}
                allowHalf
                tooltips={["terrible", "bad", "normal", "good", "excellent"]}
                disabled={!pb.authStore.isValid}
              />
            </div>
            <button
              style={{ backgroundColor: color }}
              disabled={!pb.authStore.isValid}
              className={"px-3 py-1 text-white rounded-lg " + (!pb.authStore.isValid && "bg-gray-400")}
              type="submit"
            >
              Add
            </button>
          </div>
          {pb.authStore.isValid ? (
            <p className="w-full my-2 text-sm font-semibold text-center md:text-start md:w-auto">
              Add a comment !
            </p>
          ) : (
            <p className="w-full my-2 text-sm font-semibold text-center md:text-start md:w-auto">
              Login to add a Comment
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ReviewsSection;

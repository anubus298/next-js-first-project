/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";

import PocketBase from "pocketbase";
export const alt = "safoMart";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }) {
  const pb = new PocketBase(process.env.pocketBaseUrl);
  const id = params.roseg[1];
  const type =
    "Pro" +
    params.roseg[0][0].toUpperCase() +
    params.roseg[0].slice(1, params.roseg[0].length);
  const res = await pb.collection(type).getOne(id, {
    fields: "name,imgs,id,collectionName",
    cache: "force-cache",
  });
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={`${process.env.pocketBaseUrl}api/files/${res.collectionId}/${res.id}/${res.imgs[0]}`}
          height={500}
          width={500}
          alt={res.name}
        />
        <p>{res.name} is On Stocks !</p>
      </div>
    ),
    {
      ...size,
    }
  );
}

"use client";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Skeleton } from "antd";
export default function ImgSection({ imgs, id, cId }) {
  const [index, setIndex] = useState(0);
  const [wdthclient, setWdthclient] = useState(500);
  useEffect(() => {
    document.documentElement.clientWidth < 500
      ? setWdthclient(document.documentElement.clientWidth - 10)
      : setWdthclient(500);
  }, []);
  return (
    <div className="md:w-1/2 flex flex-col-reverse md:flex-row justify-start gap-5 items-center">
      <div
        className={
          "md:w-[80px] md:h-[500px] gap-[1px] sm:gap-2 w-full flex overflow-x-auto md:overflow-x-hidden md:items-center md:py-5 md:overflow-y-auto flex-row md:flex-col"
        }
      >
        {imgs.map((img, j) => {
          return (
            <div
              key={id + j}
              className="bg-white p-1 overflow-hidden  w-[50px] h-[50px] flex justify-center items-center cursor-pointer outline-none sm:hover:outline-black hover:outline-1 "
              onClick={() => setIndex(j)}
            >
              <Suspense fallback={<Skeleton.Image />}>
                <Image
                  src={`http://127.0.0.1:8090/api/files/${cId}/${id}/${imgs[j]}`}
                  alt=""
                  height={50}
                  width={50}
                />
              </Suspense>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-2 rounded-lg flex overflow-hidden justify-center items-center h-[500px] md:w-[500px] w-11/12 ">
        <TransformWrapper>
          <TransformComponent>
            <div className="h-[500px] flex items-center  ">
              <Image
                className="w-auto"
                src={`http://127.0.0.1:8090/api/files/${cId}/${id}/${imgs[index]}?thumb=0x500`}
                height={500}
                width={500}
                sizes={"(max-width: 768px) 90vw ,(max-width: 1024px) 60vw,40vw"}
                alt=""
              />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
}

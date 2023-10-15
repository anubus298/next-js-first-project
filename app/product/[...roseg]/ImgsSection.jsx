"use client";
import Image from "next/image";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
export default function ImgSection({ imgs, id, cId }) {
  const [index, setIndex] = useState(0);
  const [wdthclient, setWdthclient] = useState(500);
  useEffect(() => {
    document.documentElement.clientWidth < 500
      ? setWdthclient(document.documentElement.clientWidth - 10)
      : setWdthclient(500);
  }, []);
  let prev = 0;
  function handleClicking(prev, j) {
    setIndex(j);
  }
  return (
    <div className="md:w-1/2 flex flex-col-reverse md:flex-row justify-start gap-5 items-center">
      <div
        className={
          "md:w-[80px] md:h-[500px] gap-4 w-[350px] flex overflow-x-auto md:overflow-x-hidden md:items-center md:py-5 overflow-y-auto flex-row md:flex-col"
        }
      >
        {imgs.map((img, j) => {
          return (
            <div
              key={id + j}
              className="bg-white p-1  w-[50px] h-[50px] flex justify-center items-center cursor-pointer outline-none hover:outline-black hover:outline-1 "
              onClick={() => setIndex(j)}
            >
              <Image
                src={`http://127.0.0.1:8090/api/files/${cId}/${id}/${imgs[j]}`}
                alt=""
                height={50}
                width={50}
                className=""
              />
            </div>
          );
        })}
      </div>
      <div className="bg-white p-2 rounded-lg flex overflow-hidden justify-center items-center h-[500px] md:w-[500px] relative">
        <FontAwesomeIcon
          height={16}
          width={16}
          className="absolute top-2  right-2   text-black z-50"
          icon={faUpRightAndDownLeftFromCenter}
        />
        <TransformWrapper>
          <TransformComponent>
            <div className="h-[500px] flex items-center  ">
              <Image
                src={`http://127.0.0.1:8090/api/files/${cId}/${id}/${imgs[index]}?thumb=0x500`}
                height={500}
                width={500}
                alt=""
                set
              />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
}

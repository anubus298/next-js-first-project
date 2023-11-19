"use client";

import { Card, Skeleton } from "antd";

function Fallback_card() {
  return (
    <Card
      bordered={true}
      className="w-44 md:w-56 h-72 py-2 md:py-4 "
      cover={
        <div className="flex items-center justify-center">
          <Skeleton.Image />
        </div>
      }
    >
      <Skeleton>
        <p>Lorem ipsum</p>
      </Skeleton>
    </Card>
  );
}

export default Fallback_card;

"use client";
import { DownOutlined } from "@ant-design/icons";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, message, Space } from "antd";
import { useState } from "react";

function FilterPallete() {
  const [PriceStatus, setPriceStatus] = useState("Price");
  const [RatingStatus, setRatingStatus] = useState("Rating");
  const itemsForPrice = [
      {
        label: "Ascendant",
        key: "1",
        onClick: () => setPriceStatus("Price : Ascendant"),
        icon: <FontAwesomeIcon icon={faArrowUp} />,
      },
      {
        label: "Descendant",
        onClick: () => setPriceStatus("Price : Descendant"),
        key: "2",
        icon: <FontAwesomeIcon icon={faArrowDown} />,
      },
    ],
    itemsForRating = [
      {
        label: "Ascendant",
        key: "1",
        onClick: () => setRatingStatus("Rating : Ascendant"),
        icon: <FontAwesomeIcon icon={faArrowUp} />,
      },
      {
        label: "Descendant",
        onClick: () => setRatingStatus("Rating : Descendant"),
        key: "2",
        icon: <FontAwesomeIcon icon={faArrowDown} />,
      },
    ];
  const MenuPriceProps = {
      itemsForPrice,
      selectable: true,
    },
    MenuRatingProps = {
      itemsForRating,
      selectable: true,
    };
  return (
    <div>
    <Space wrap={true}>
      <Dropdown menu={MenuPriceProps}>
        <Button>
          <Space>
            hello
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Space>
    </div>
  );
}
export default FilterPallete;

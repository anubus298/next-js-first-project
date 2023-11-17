"use client";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import {
  faArrowDownWideShort,
  faArrowUpWideShort,
  faFilter,
  faFilterCircleDollar,
  faStar,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function DropdownByPrice({
  brandList,
  FilterParams,
  setFilterParams,
  Reference,
  setIsLoading,
  setarrangment,
}) {
  function SetFilter(key, value) {
    let newState = {
      Price: "default",
      Rating: "default",
      Brand: FilterParams.Brand,
      reset: false,
    };
    newState[key] = value;
    setFilterParams(newState);
  }
  function SetBrandFilter(brandName) {
    let statics = { ...FilterParams };
    setIsLoading(true);
    setarrangment(Reference);
    statics["Brand"] = brandName;
    setFilterParams(statics);
  }
  let iconDes = (
      <FontAwesomeIcon className="text-gray-600" icon={faArrowDownWideShort} />
    ),
    iconAsc = (
      <FontAwesomeIcon className="text-gray-600" icon={faArrowUpWideShort} />
    );

  const menuPriceItems = [
    {
      label: "By Price",
      key: "1",
      icon: (
        <FontAwesomeIcon
          className="text-gray-600"
          icon={faFilterCircleDollar}
        />
      ),
      children: [
        {
          key: "1-1",
          label: "Ascending",
          icon: iconAsc,
          onClick: () => SetFilter("Price", "Asc"),
        },
        {
          key: "1-2",
          label: "Descending",
          icon: iconDes,
          onClick: () => SetFilter("Price", "Desc"),
        },
      ],
    },
    {
      label: "by Rating",
      key: "2",
      icon: <FontAwesomeIcon className="text-gray-600" icon={faStar} />,
      children: [
        {
          key: "2-1",
          label: "Ascending",
          icon: iconAsc,
          onClick: () => SetFilter("Rating", "Asc"),
        },
        {
          key: "2-2",
          label: "Descending",
          onClick: () => SetFilter("Rating", "Desc"),
          icon: iconDes,
        },
      ],
    },
    {
      label: "by Brand",
      key: "3",
      icon: <FontAwesomeIcon className="text-gray-600" icon={faStar} />,
      children: brandList.map((item, index) => {
        return {
          key: `3-${index + 1}`,
          label: item[0].toUpperCase() + item.slice(1, item.length),
          onClick: () => SetBrandFilter(item),
        };
      }),
    },
  ];
  return (
    <div className="flex items-center gap-x-2">
      <Dropdown
        className=""
        menu={{
          items: menuPriceItems,
          selectable: true,
        }}
      >
        <Button className="flex items-center justify-between gap-x-2 ">
          <div className="flex items-center gap-x-3">
            <FontAwesomeIcon className="text-gray-600" icon={faFilter} />
            <p>Filters</p>
          </div>
          <DownOutlined />
        </Button>
      </Dropdown>
      {Object.values(FilterParams).filter((a) => {
        return a == "default";
      }).length != 3 && (
        <Button
          type="text"
          className=""
          icon={<FontAwesomeIcon icon={faXmark} />}
          onClick={() => {
            setFilterParams({
              Price: "default",
              Rating: "default",
              Brand: "default",
              reset: true,
            });
          }}
        >
          clear filters
        </Button>
      )}
      {Object.keys(FilterParams).map((item, i) => {
        if (FilterParams[item] != "default" && item !== "reset") {
          return (
            <div
              key={i + "pdg8dh"}
              className="flex items-center space-x-1 bg-secondary rounded-lg text-white p-1 text-xs"
            >
              {item === "Brand" ? (
                <p>
                  {FilterParams[item][0].toUpperCase() +
                    FilterParams[item].slice(1, FilterParams[item].length)}
                </p>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={
                      FilterParams[item] == "Asc"
                        ? faArrowUpWideShort
                        : faArrowDownWideShort
                    }
                  />
                  <p>{item.toLowerCase()}</p>
                </>
              )}
            </div>
          );
        }
      })}
    </div>
  );
}

export default DropdownByPrice;

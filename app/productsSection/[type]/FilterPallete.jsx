"use client";
import { Space } from "antd";
import DropdownByPrice from "./(dropdowns)/DropdownByPrice";
function FilterPallete({
  brandList,
  FilterParams,
  setFilterParams,
  Reference,
  setarrangment,
  setIsLoading,
}) {
  return (
    <Space wrap={true}>
      <DropdownByPrice
        setIsLoading={setIsLoading}
        Reference={Reference}
        setarrangment={setarrangment}
        FilterParams={FilterParams}
        setFilterParams={setFilterParams}
        brandList={brandList}
      />
    </Space>
  );
}
export default FilterPallete;

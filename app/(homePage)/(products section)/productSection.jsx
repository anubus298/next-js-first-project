import PocketBase from "pocketbase";
import shuffle from "../../functions/shuffle";
import SubProductSection from "./subProductSection";
async function ProductSection({
  type,
  count,
  showHeader,
  CurrentPageProductId,
  cache,
}) {
  const pb = new PocketBase(process.env.pocketBaseUrl);
  async function getPro(type, count) {
    let cacheOption;
    cache ? (cacheOption = "force-cache") : (cacheOption = "no-store");
    const ProType = "Pro" + type[0].toUpperCase() + type.slice(1, type.length);
    let data = await pb.collection(ProType).getList(1, count, {
      expand: "brand",
      sort: "-sale",
      cache: cacheOption,
    });
    data["items"] = shuffle(data["items"]);
    if (CurrentPageProductId) {
      data["items"] = data["items"].filter((item) => {
        return item.id != CurrentPageProductId;
      });
    }
    return data;
  }
  let data = await getPro(type, count);
  return <SubProductSection type={type} data={data} showHeader={showHeader} />;
}

export default ProductSection;

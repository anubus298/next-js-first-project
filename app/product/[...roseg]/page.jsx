import BackComp from "../back";
import DescripSection from "./DescripSection";
import SuggestedSection from "./SuggestedSection";
import ImgSection from "./ImgsSection";
async function Page({ params }) {
  async function getDescription() {
    const res = await fetch(
      `http://127.0.0.1:8090/api/collections/Pro${
        params.roseg[0][0].toUpperCase() +
        params.roseg[0].slice(1, params.roseg[0].length)
      }/records/${params.roseg[1]}`
    );
    let content = await res.json();
    return content;
  }
  let data = await getDescription();
  const regex = /(Pro)(\S)/;
  const type = data.collectionName.replace(regex, (str, p1, p2) => {
    return p2.toLowerCase();
  });
  return (
    <>
      <BackComp />
      <div className="bg-secondarySecondarylight  w-full gap-y-5 flex p-5 md:flex-row flex-col">
        <ImgSection imgs={data.imgs} id={data.id} cId={data.collectionId} />
        <DescripSection {...data} />
      </div>
      <SuggestedSection CurrentPageProductId={data.id} type={type} />
    </>
  );
}

export default Page;

import BackComp from "../back";
import DescripSection from "./DescripSection";
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
  return (
    <>
      <BackComp />
      <div className="bg-secondarySecondarylight  w-full gap-y-5 flex p-5 md:flex-row flex-col">
        <ImgSection imgs={data.imgs} id={data.id} cId={data.collectionId} />
        <DescripSection {...data} />
      </div>
    </>
  );
}

export default Page;

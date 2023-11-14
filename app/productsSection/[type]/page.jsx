import PocketBase from "pocketbase";
import SidePallete from "./SidePallete";
import MainPallete from "./MainPallete";
async function Page({ params }) {
  async function getAllItems() {
    const pb = new PocketBase("http://127.0.0.1:8090");
    const type = "Pro" + params.type;
    let res = pb.collection(type).getFullList({ sort: "@random" ,expand: "brand"});
    return res;
  }
  let data = await getAllItems();
  return (
    <div className="w-full min-h-[600px] md:min-h-screen flex flex-col md:flex-row  md:gap-x-6">
      <div className="w-full md:w-1/5 md:min-h-[screen] ">
        <SidePallete count={data.length} type={params.type} />
      </div>
      <div className="w-full md:w-4/5 min-h[500px] md:min-h-screen">
        <MainPallete data={data} typeForHref={params.type.toLowerCase() }/>
      </div>
    </div>
  );
}

export default Page;

import Center_homePageSubClient from "./center_homePage-sub-client";

 async function getIphone15() {
  const ps = await fetch(
    "http://127.0.0.1:8090/api/collections/frontProducts/records?page=1&perPage=15&skipTotal=1&sort=-created",
    {
      cache: "no-store",
    }
  );
  const res = await ps.json();

  let data = {};
  res["items"].forEach((item) => {
    if (!data[item.type]) {
      data[item.type] = [];
    }
    data[item.type].push(item);
  });
  await console.log(data);
  return data;
}

 function Center_homePage() {
  return (
    <div className="bg-black py-16 w-full select-none">
      <Center_homePageSubClient/>
       
    </div>
  );
}

export default Center_homePage;

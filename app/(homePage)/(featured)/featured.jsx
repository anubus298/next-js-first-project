import Header_swiper from "./header_swiper";


async function getFrontProducts() {
  const ps = await fetch('http://127.0.0.1:8090/api/collections/frontProducts/records?page=1&perPage=15&skipTotal=1&sort=-created',{
    cache : "no-store"
  })
  const res = await ps.json();

  let data = {};
  res['items'].forEach((item) => {
    if (!data[item.type]) {
      data[item.type] = [];
    }
    data[item.type].push(item);
  });
  await console.log(data)
  return data;
}

async function Featured() {
  let data = await getFrontProducts();
  return (
    <>
    <div className="border-t-main  border-t-2  w-full flex justify-center text-center bg-main font-extrabold p-2">
        <p className="text-secondary">Featured</p>
      </div>
    <div
      className={
        `w-full py-8 bg-secondarySecondarylight  gap-y-3 gap-x-8 sm:gap-x-16 flex justify-center flex-wrap u  items-center ` 
        
      }
    >
      
      {Object.keys(data).map((key) => {
        return <Header_swiper products={data[key]} type={key} key={data[key]['collectionId']} />;
      })}
    </div>
   
    </>
  );
}

export default Featured;

export default async function addToCart(collectionName, id) {
  const reg = /(Pro)(\w*)/;
  const collectionNameRe = collectionName.replace(reg, (str, p1, p2) => {
    return p1.toLowerCase() + "duct_" + p2.toLowerCase() + "+";
  });
  let requestBody = {};
  requestBody[collectionNameRe] = id;
  const res = await fetch("http://localhost:3000/api/products/UpdateCart", {
    cache: "no-cache",
    method: "PATCH",
    "Content-Type": "application/json",
    body: JSON.stringify(requestBody),
  });
  return res;
}

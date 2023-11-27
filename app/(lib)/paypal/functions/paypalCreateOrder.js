export default async function paypalCreateOrder(
  productProcessingIds,
  setisError
) {
  try {
    let response = await fetch("/api/paypal/createorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ProcessingIds: productProcessingIds,
      }),
    });
    let data = await response.json();
    return data;
  } catch (err) {
    setisError(true);
    return err;
  }
}

export default async function paypalCreateOrder(orderID, setisError) {
  try {
    let response = await fetch(
      "http://localhost:8000/api/paypal/captureorder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: orderID,
        }),
      }
    );
    let data = await response.json();
    return data;
  } catch (err) {
    setisError(true);
    return null;
  }
}

export default async function paypalCreateOrder(setisError) {
  try {
    let response = await fetch("http://localhost:8000/api/paypal/createorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_price: 5,
      }),
    });
    let data = await response.json();
    return data;
  } catch (err) {
    setisError(true);
    return err;
  }
}

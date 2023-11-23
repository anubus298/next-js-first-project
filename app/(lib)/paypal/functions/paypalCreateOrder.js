export default async function paypalCreateOrder() {
  try {
    let response = await fetch("/api/paypal/createorder", {
      method: "POST",
      body: {
        order_price: amountRef.current.value,
      },
    });
    return new Response("ok", { status: 200 });
  } catch (err) {
    // Your custom code to show an error like showing a toast:
    return err;
    // toast.error('Some Error Occured')
  }
}

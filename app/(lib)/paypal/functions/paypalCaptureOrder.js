async function paypalCreateOrder(orderID) {
  try {
    let response = await fetch("/api/paypal/captureorder", {
      method: "POST",
      body: {
        orderID: orderID,
      },
      orderID,
    });
    if (response.data.success) {
    }
  } catch (err) {
    // Order is not successful
    // Your custom code
    // Like showing an error toast
    // toast.error('Some Error Occured')
  }
}

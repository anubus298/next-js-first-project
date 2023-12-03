import PocketBase from "pocketbase";
import { type NextRequest } from "next/server";
export async function PATCH(request: NextRequest) {
  try {
    const pb = new PocketBase(process.env.pocketBaseUrl);
    const body = await request.json();
    const token = request.cookies.get("pb_auth");
    pb.authStore.loadFromCookie(token.value);
    try {
      pb.authStore.isValid && (await pb.collection("users").authRefresh());
    } catch (_) {
      pb.authStore.clear();
      return new Response("user not logged!", { status: 401 });
    }
    // id serialized ****-****-
    let regex = /(.{4})/g;
    let formattedCode = body.id.replace(regex, "$1-");
    formattedCode = formattedCode.replace(/-$/, "");
    // end of id serialized ****-****-
    const orderDateRes = await await pb.collection("Commands").getOne(body.id, {
      fields: "created",
    });

    try {
      const data = {
        status: "Cancelled",
        Returned: true,
        reason: body.reason,
      };
      const record = await pb.collection("Commands").update(body.id, data);
      //create cancelling record notification :
      const dateformat = new Date(orderDateRes.created);

      const formatted = dateformat.toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });
      const dataForNotification = {
        user: pb.authStore.model.id,
        message: `Subject: Order Cancellation

        Dear ${pb.authStore.model.username},
        
        We regret to inform you that your order (#${formattedCode}) placed on ${formatted} has been canceled. We understand that circumstances may have led to this decision, and we're here to assist you with any concerns.
        
        CANCELED ORDER DETAILS:
        - Order ID: #${formattedCode}
        - Order Date: ${formatted}
        - Cancellation Reason: ${body.reason}
        
        If you have any questions or need further assistance, please do not hesitate to contact our customer support.
        
        Thank you for choosing SafoMart.
        
        Best regards,
        SafoMart`,
        readStatus: false,
      };

      const recordNotification = await pb
        .collection("Notfications")
        .create(dataForNotification);
      return new Response("Cancelled successfully", { status: 200 });
    } catch (error) {
      return new Response(error);
    }
  } catch (errora) {
    return new Response(errora);
  }
}

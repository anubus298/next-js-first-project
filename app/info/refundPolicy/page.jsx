import Link from "next/link";
export const metadata = {
  title : "Refund Policies"
}
function Page() {
  return (
    <div className="flex flex-col w-full md:min-h-[400px] px-2 pt-14 md:pt-0 md:px-16">
      <h1 className="mb-4 text-4xl font-extrabold text-secondary">
        Refund Policy
      </h1>

      <p>
        Thank you for choosing SafoMart. We strive to provide you with the best
        shopping experience, and your satisfaction is important to us. This
        Refund Policy outlines the terms and conditions under which refunds are
        provided for purchases made on our website.
      </p>

      <h2 className="my-2 text-xl font-semibold text-secondary">
        1. Eligibility for Refund
      </h2>

      <p>We offer refunds for the following situations:</p>
      <ul>
        <li>Defective or damaged products upon receipt</li>
        <li>Incorrect items shipped</li>
        <li>Unsatisfactory product quality</li>
      </ul>

      <h2 className="my-2 text-xl font-semibold text-secondary">
        2. How to Request a Refund
      </h2>

      <p>To request a refund, please follow these steps:</p>
      <ol>
        <li>
          Contact our customer support team at{" "}
          <span className="text-secondary">refund@safoMart.com</span>
        </li>
        <li>Provide your order number and details of the issue</li>
        <li>Wait for instructions on returning the item (if applicable)</li>
      </ol>

      <h2 className="my-2 text-xl font-semibold text-secondary">
        3. Refund Processing
      </h2>

      <p>
        Once your return is received and inspected, we will send you an email to
        notify you that we have received your returned item. We will also notify
        you of the approval or rejection of your refund.
      </p>

      <h2 className="my-2 text-xl font-semibold text-secondary">
        4. Refund Timeframe
      </h2>

      <p>
        Refunds will be processed within 21 days of receiving the returned
        item. The refund will be issued to the original payment method used for
        the purchase.
      </p>

      <h2 className="my-2 text-xl font-semibold text-secondary">
        5. Contact Us
      </h2>

      <p>
        If you have any questions or concerns about our refund policy, please{" "}
        <span>
          <Link className="font-semibold text-secondary" href={"/info/contact"}>
            contact us
          </Link>
        </span>
        .
      </p>

      <p className="mt-6">Thank you for choosing SafoMart.</p>
    </div>
  );
}

export default Page;

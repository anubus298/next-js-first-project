export const metadata = {
  title : "Feedbacks"
}
function Page() {
  return (
    <div className="flex flex-col w-full md:min-h-[400px] px-2 pt-14 md:pt-0 md:px-16">
      <h1 className="mb-4 text-4xl font-extrabold text-secondary">
        Contact Us
      </h1>

      <p>
        We welcome your inquiries and feedback. Feel free to reach out to us
        using the contact information provided below.
      </p>

      <h2 className="my-2 text-xl font-semibold text-secondary">
        1. Customer Support
      </h2>

      <p>
        For assistance with orders, products, or general inquiries, please
        contact our customer support team:
      </p>
      <ul>
        <li>
          Email: <span className="text-secondary">support@safoMart.com</span>
        </li>
        <li>Phone: +212766113470</li>
      </ul>

      <h2 className="my-2 text-xl font-semibold text-secondary">
        2. Business Inquiries
      </h2>

      <p>
        For business-related inquiries, partnerships, or collaborations, please
        contact our business development team:
      </p>
      <ul>
        <li>
          Email: <span className="text-secondary">business@safoMart.com</span>
        </li>
      </ul>

      <h2 className="my-2 text-xl font-semibold text-secondary">
        3. Feedback and Suggestions
      </h2>

      <p>
        We value your feedback! If you have suggestions, comments, or feedback,
        please reach out to us:
      </p>
      <ul>
        <li>
          Email: <span className="text-secondary">feedback@safoMart.com</span>
        </li>
      </ul>

      <h2 className="my-2 text-xl font-semibold text-secondary">
        4. Social Media
      </h2>

      <p>
        Connect with us on social media to stay updated and send us direct
        messages:
      </p>
      <ul>
        <li>
          Facebook:{" "}
          <span className="text-secondary">facebook.com/safoMart</span>
        </li>
        <li>
          Twitter: <span className="text-secondary">@safoMart</span>
        </li>
        <li>
          Instagram: <span className="text-secondary">@safoMart</span>
        </li>
      </ul>

      <p className="mt-6">We look forward to hearing from you!</p>
    </div>
  );
}

export default Page;

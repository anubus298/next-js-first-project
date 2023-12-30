import Link from "next/link";

export const metadata = {
  title: "Feedbacks",
};
function Feedback() {
  return (
    <div className="flex flex-col w-full md:min-h-[400px] px-2 pt-14 md:pt-0 md:px-16">
      <h1 className="mb-4 text-4xl font-extrabold text-secondary">Feedback</h1>

      <p>
        We value your feedback at SafoMart and appreciate the time you take to
        share your thoughts with us. Your insights help us improve our services
        and enhance your overall experience.
      </p>

      <h2 className="my-2 text-xl font-semibold text-secondary">
        1. How to Provide Feedback
      </h2>

      <p>There are several ways you can share your feedback with us:</p>
      <ul>
        <li>
          Send an email to{" "}
          <span className="text-secondary">feedback@safoMart.com</span>
        </li>
        <li>Complete our online feedback form on our website</li>
        <li>Connect with us on social media and leave your comments</li>
      </ul>

      <h2 className="my-2 text-xl font-semibold text-secondary">
        2. What We Want to Hear
      </h2>

      <p>
        Your feedback can cover various aspects, including but not limited to:
      </p>
      <ul>
        <li>Your overall satisfaction with our products and services</li>
        <li>Specific details about your positive experiences</li>
        <li>Areas where we can improve and any challenges you faced</li>
        <li>Suggestions for new products or features</li>
      </ul>

      <h2 className="my-2 text-xl font-semibold text-secondary">
        3. Our Commitment
      </h2>

      <p>
        We are committed to carefully reviewing and considering each piece of
        feedback we receive. Your input helps us make informed decisions to
        enhance your SafoMart experience.
      </p>

      <h2 className="my-2 text-xl font-semibold text-secondary">
        4. Privacy and Anonymity
      </h2>

      <p>
        Your feedback is important to us, and we respect your privacy. If you
        wish to provide anonymous feedback, please specify in your message.
      </p>

      <h2 className="my-2 text-xl font-semibold text-secondary">
        5. Contact Us
      </h2>

      <p>
        If you have any questions or concerns regarding providing feedback,
        please{" "}
        <span>
          <Link className="font-semibold text-secondary" href={"/info/contact"}>
            contact us
          </Link>
        </span>
        .
      </p>

      <p className="mt-6">
        Thank you for being a valued member of the SafoMart community.
      </p>
    </div>
  );
}

export default Feedback;

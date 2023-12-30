import Link from "next/link";
export const metadata = {
  title : "Privacy Policies"
}

function Page() {
  return (
    <div className="flex flex-col w-full md:min-h-[400px] px-2 pt-14 md:pt-0 md:px-16">
      <h1 className="mb-4 text-4xl font-extrabold text-secondary">Privacy Policy</h1>

      <p>
        Thank you for visiting SafoMart. We respect your privacy, and we want
        you to feel comfortable using our services. This Privacy Policy is
        designed to help you understand how we collect, use, and safeguard your
        personal information.
      </p>

      <h2 className="my-2 text-xl font-semibold text-secondary">1. Information Collection</h2>

      <p>
        We want to be transparent about the fact that SafoMart <span className="text-secondaryGreen">does not</span> collect
        any personal information about you. We do not gather, store, or process
        data that can identify you personally.
      </p>

      <h2 className="my-2 text-xl font-semibold text-secondary">2. Types of Information</h2>

      <p>
        We do not collect any of the following types of personal information:
      </p>
      <ul>
        <li>Names</li>
        <li>Addresses</li>
        <li>Phone Numbers</li>
        <li>Email Addresses</li>
        <li>Payment Information</li>
      </ul>

      <h2 className="my-2 text-xl font-semibold text-secondary">3. Cookies and Tracking Technologies</h2>

      <p>
        SafoMart does not use cookies or any tracking technologies to collect
        information about your online activities.
      </p>

      <h2 className="my-2 text-xl font-semibold text-secondary">4. Third-Party Links</h2>

      <p>
        Our website may contain links to third-party websites. Please note that
        we are not responsible for the privacy practices or content of those
        sites. We recommend reviewing the privacy policies of any third-party
        websites you visit.
      </p>

      <h2 className="my-2 text-xl font-semibold text-secondary">5. Children&apos;s Privacy</h2>

      <p>
        SafoMart is not directed at children under the age of 13, and we do not
        knowingly collect personal information from individuals in this age
        group.
      </p>

      <h2 className="my-2 text-xl font-semibold text-secondary">6. Changes to this Privacy Policy</h2>

      <p>
        We may update this Privacy Policy from time to time. Any changes will be
        reflected with a revised effective date, and we encourage you to review
        this policy periodically.
      </p>

      <p>
        If you have any questions or concerns about our privacy practices,
        please{" "}
        <span>
          <Link className="font-semibold text-secondary" href={"/info/contact"}>contact us</Link>
        </span>{" "}
        .
      </p>

      <p className="mt-6">Thank you for choosing SafoMart.</p>
    </div>
  );
}

export default Page;

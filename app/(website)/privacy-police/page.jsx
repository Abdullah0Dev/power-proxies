import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-teal-500 py-12 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white shadow-xl rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200 p-6">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                1. Information on the Collection of Personal Data and Contact
                Details of the Controller
              </h2>
              <p>
                1.1 We are pleased that you are visiting our website and thank
                you for your interest. On the following pages, we inform you
                about the handling of your personal data when using our website.
                Personal data is all data with which you can be personally
                identified.
              </p>
              <p>
                1.2 The controller in charge of data processing on this website,
                within the meaning of the General Data Protection Regulation
                (GDPR), is PowerProxy, [Company Address], email:
                support@powerproxy.com. The controller in charge of the
                processing of personal data is the natural or legal person who
                alone or jointly with others determines the purposes and means
                of the processing of personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                2. Data Collection When You Visit Our Website
              </h2>
              <p>
                When using our website for information only, we only collect
                data that your browser transmits to our server (server log
                files). This includes:
              </p>
              <ul className="list-disc pl-6">
                <li>Our visited website</li>
                <li>Date and time at the moment of access</li>
                <li>Amount of data sent in bytes</li>
                <li>Source/reference from which you came to the page</li>
                <li>Browser used</li>
                <li>Operating system used</li>
                <li>IP address used (if applicable: in anonymized form)</li>
              </ul>
              <p>
                Data processing is carried out in accordance with Art. 6 (1)
                point f GDPR on the basis of our legitimate interest in
                improving the stability and functionality of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Cookies</h2>
              <p>
                We use cookies to make your visit to our website more attractive
                and to enable the use of certain functions. Cookies are small
                text files that are stored on your end device. You can set your
                browser in such a way that you are informed about the setting of
                cookies and you can decide individually about their acceptance
                or exclude the acceptance of cookies for certain cases or in
                general.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Contacting Us</h2>
              <p>
                When you contact us (e.g. via contact form or e-mail), personal
                data is collected. This data is stored and used exclusively for
                the purpose of responding to your request or for establishing
                contact and for the associated technical administration. The
                legal basis for processing data is our legitimate interest in
                responding to your request in accordance with Art. 6 (1) point f
                GDPR.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                5. Data Processing When Opening a Customer Account and for
                Contract Processing
              </h2>
              <p>
                Personal data will be collected and processed if you provide us
                with this data when opening a customer account. The data
                required for opening an account can be found in the input mask
                of the corresponding form on our website. Deletion of your
                customer account is possible at any time and can be done by
                sending a message to the above address of the person
                responsible.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                6. Use of Client Data for Direct Advertising
              </h2>
              <p>
                If you have provided us with your e-mail address when purchasing
                products, we reserve the right to regularly send you offers for
                products similar to those already purchased by e-mail. You are
                entitled to object to this use of your e-mail address at any
                time by notifying the controller named at the beginning of this
                document.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                7. Processing of Data for the Purpose of Order Handling
              </h2>
              <p>
                The personal data collected by us will be passed on to the
                commissioned transport company and the commissioned credit
                institution in the context of contract processing, insofar as
                this is necessary for the delivery of the goods. Your payment
                data will be passed on to the commissioned credit institution,
                insofar as this is necessary for payment processing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                8. Rights of the Data Subject
              </h2>
              <p>
                You have the following rights with respect to the personal data
                concerning you:
              </p>
              <ul className="list-disc pl-6">
                <li>Right to information</li>
                <li>Right to rectification or deletion</li>
                <li>Right to restriction of processing</li>
                <li>Right to object to processing</li>
                <li>Right to data portability</li>
              </ul>
              <p>
                You also have the right to complain to a data protection
                supervisory authority about our processing of your personal
                data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                9. Duration of Storage of Personal Data
              </h2>
              <p>
                The duration of the storage of personal data is based on the
                respective legal basis, the purpose of processing and – if
                relevant – on the respective legal retention period (e.g.
                commercial and tax retention periods).
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
      <footer className="mt-8 text-center text-white">
        <p>
          &copy; {new Date().getFullYear()} PowerProxy. All rights reserved.
        </p>
        <Link
          href="/"
          className="text-teal-300 hover:text-teal-100 transition-colors"
        >
          Back to Home
        </Link>
      </footer>
    </div>
  );
}

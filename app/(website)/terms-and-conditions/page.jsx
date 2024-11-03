import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-teal-500 py-12 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white shadow-xl rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200 p-6">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Terms & Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                1. Scope of Application
              </h2>
              <p>
                1.1. These General Terms and Conditions (hereinafter referred to
                as "GTC") govern the contractual relationship between
                PowerProxy, [Company Address in Europe] (hereinafter referred to
                as "PowerProxy") and its contractual partners in the form of end
                customers (hereinafter referred to as "users").
              </p>
              <p>
                1.2. PowerProxy reserves the right to change these GTC, even for
                ongoing contractual relationships, if this becomes necessary due
                to changes in the legal situation, supreme court rulings or
                market conditions. Users will be informed about planned changes
                by e-mail.
              </p>
              <p>
                1.3. Deviating GTC of the User shall not apply to the concluded
                contracts, even if PowerProxy has not expressly objected to
                them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                2. Subject of the Contract
              </h2>
              <p>
                2.1. PowerProxy is a provider of mobile data switching services
                in the form of proxy services against payment. After conclusion
                of the contract and payment of a usage fee, the user shall be
                granted access to the proxy service of PowerProxy (hereinafter
                referred to as "service").
              </p>
              <p>
                2.2. The functional scope of the service results from the
                respective current service description, available on our
                website.
              </p>
              <p>
                2.3. The concrete scope of services (speed of data transmission,
                transmission standard, data volume, IP rotation and number of
                permitted users) depends on the product selected by the user and
                results from the information on the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                3. Conclusion of Contract
              </h2>
              <p>3.1. The contract is concluded via the website.</p>
              <p>
                3.2. The presentation of PowerProxy's services on the website
                merely constitutes a non-binding invitation to visitors to
                submit an offer to conclude a contract.
              </p>
              <p>
                3.3. PowerProxy confirms the receipt of the order immediately by
                an automatically generated e-mail ("confirmation of receipt").
                This message does not yet constitute an acceptance of the offer
                to conclude a contract. An effective contract shall only be
                concluded upon receipt of another e-mail ("Order Confirmation").
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                4. Service Level, Maintenance
              </h2>
              <p>
                4.1. PowerProxy endeavors to provide its users with a service
                that is as uninterrupted as possible. PowerProxy guarantees the
                user an average availability of the service of 95% on a monthly
                average.
              </p>
              <p>
                4.2. When calculating the actual availabilities, downtimes that
                cannot be attributed to PowerProxy are considered available
                times. These include unforeseen necessary maintenance work,
                downtime due to malware or hacker attacks, and downtimes caused
                by third parties.
              </p>
              <p>
                4.3. Scheduled maintenance work that results in an interruption
                of service will usually be performed by PowerProxy on Sundays.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                5. User Obligations and Rights
              </h2>
              <p>
                5.1. The user undertakes not to misuse the service. He
                undertakes to refrain from activities in connection with the use
                of the service that violate applicable law, infringe the rights
                of third parties or violate the principles of the protection of
                minors.
              </p>
              <p>
                5.2. The user must keep his access data, including the password,
                secret and ensure that they are not accessible to unauthorized
                third parties.
              </p>
              <p>
                5.3. The User is strictly prohibited from using programs,
                algorithms or other software in connection with the use of the
                Service that may interfere with the functioning of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                6. Usage Fee, Activation, Renewal
              </h2>
              <p>
                6.1. A usage fee is charged for the use of the service, the
                amount of which depends on the selected usage period. The usage
                fee is to be paid by the user in advance.
              </p>
              <p>
                6.2. The service shall be activated for the user only after
                PowerProxy has received or credited the usage fee for the
                selected usage period.
              </p>
              <p>
                6.3. At the end of the selected usage period, the user's usage
                option is automatically withdrawn again. However, the user has
                the option to extend the usage period at any time by placing a
                new order via the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                7. Prices, Payment
              </h2>
              <p>
                7.1. The prices stated on the website are in euros and include
                the applicable Value Added Tax (VAT).
              </p>
              <p>
                7.2. The User can choose between the following payment methods:
                Cryptocurrencies (i.e. BTC), Credit cards (VISA, Mastercard).
              </p>
              <p>
                7.3. PowerProxy shall automatically arrange for any repayments
                to be made to the means of payment used by the User for payment
                or to the associated bank account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                8. Contract Period, Terminations
              </h2>
              <p>
                8.1. The contract period is determined after the period of use
                selected by the user on the website.
              </p>
              <p>
                8.2. Ordinary termination during the term of the contract is
                excluded.
              </p>
              <p>
                8.3. This shall not affect the right to extraordinary
                termination for good cause.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                9. Disclaimer / Limitation of Liability
              </h2>
              <p>
                9.1. PowerProxy shall be liable without limitation for intent
                and gross negligence. For simple negligence PowerProxy shall
                only be liable for damages arising from injury to life, body and
                health, the breach of an essential contractual obligation, the
                violation of provisions of the General Data Protection
                Regulation (GDPR) as well as the violation of provisions of the
                Product Liability Act.
              </p>
              <p>
                9.2. In the event of a simple negligent breach of essential
                contractual obligations, the liability of PowerProxy is limited
                to the amount of the foreseeable, typically occurring damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Data Privacy</h2>
              <p>
                10.1. PowerProxy will process the User's personal data in
                accordance with the statutory provisions on data protection – in
                particular the General Data Protection Regulation (GDPR).
              </p>
              <p>
                10.2. Detailed information on data processing can be found in
                our separate Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                11. Final Provisions
              </h2>
              <p>
                11.1. The contractual relationship shall be governed exclusively
                by the laws of the European Union and the country where
                PowerProxy is established, to the exclusion of the UN Convention
                on Contracts for the International Sale of Goods.
              </p>
              <p>
                11.2. Should individual provisions of these GTC including this
                provision be or become invalid in whole or in part, the validity
                of the remaining provisions shall remain unaffected.
              </p>
              <p>
                11.3. If the user is a merchant, a legal entity under public law
                or a special fund under public law, the place of jurisdiction
                for all disputes arising from and in connection with contracts
                concluded under these GTC shall be the registered office of
                PowerProxy.
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

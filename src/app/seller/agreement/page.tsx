"use client";

import Link from "next/link";
import { File02, Calendar, Download01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

const tableOfContents = [
  { id: "definitions", title: "1. Definitions" },
  { id: "eligibility", title: "2. Eligibility Requirements" },
  { id: "account", title: "3. Seller Account" },
  { id: "listings", title: "4. Product Listings" },
  { id: "transactions", title: "5. Transactions & Payments" },
  { id: "fees", title: "6. Fees & Commissions" },
  { id: "shipping", title: "7. Shipping & Fulfillment" },
  { id: "returns", title: "8. Returns & Refunds" },
  { id: "conduct", title: "9. Seller Conduct" },
  { id: "prohibited", title: "10. Prohibited Items" },
  { id: "intellectual", title: "11. Intellectual Property" },
  { id: "termination", title: "12. Termination" },
  { id: "liability", title: "13. Limitation of Liability" },
  { id: "disputes", title: "14. Dispute Resolution" },
  { id: "modifications", title: "15. Modifications to Agreement" },
];

export default function SellerAgreementPage() {
  return (
    <div className="space-y-8 p-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Seller Agreement</h1>
          <div className="mt-2 flex items-center gap-4 text-sm text-tertiary">
            <span className="flex items-center gap-1">
              <Calendar className="size-4" />
              Last updated: December 1, 2024
            </span>
            <span className="flex items-center gap-1">
              <File02 className="size-4" />
              Version 2.1
            </span>
          </div>
        </div>
        <Button color="secondary" size="sm" iconLeading={Download01}>
          Download PDF
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Table of Contents - Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-secondary bg-primary p-4">
            <h3 className="font-semibold text-primary mb-4">Table of Contents</h3>
            <nav className="space-y-1">
              {tableOfContents.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block rounded-lg px-3 py-2 text-sm text-secondary hover:bg-secondary hover:text-primary transition-colors"
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-secondary bg-primary p-6 sm:p-8">
            <div className="prose prose-sm max-w-none">
              {/* Introduction */}
              <p className="text-tertiary leading-relaxed">
                This Seller Agreement ("Agreement") is a legal contract between you ("Seller," "you," or "your") and Auctanium Inc. ("Auctanium," "we," "us," or "our") governing your use of the Auctanium marketplace platform to sell products. By registering as a seller, you agree to be bound by this Agreement.
              </p>

              {/* Section 1 */}
              <section id="definitions" className="mt-8">
                <h2 className="text-lg font-semibold text-primary">1. Definitions</h2>
                <ul className="mt-4 space-y-3 text-tertiary">
                  <li><strong className="text-primary">"Platform"</strong> refers to the Auctanium website, mobile applications, and related services.</li>
                  <li><strong className="text-primary">"Buyer"</strong> refers to any user who purchases products through the Platform.</li>
                  <li><strong className="text-primary">"Listing"</strong> refers to a product or service offered for sale on the Platform.</li>
                  <li><strong className="text-primary">"Transaction"</strong> refers to a completed sale between a Seller and Buyer.</li>
                  <li><strong className="text-primary">"Commission"</strong> refers to the percentage fee charged by Auctanium on each Transaction.</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section id="eligibility" className="mt-8">
                <h2 className="text-lg font-semibold text-primary">2. Eligibility Requirements</h2>
                <p className="mt-4 text-tertiary">To become a Seller on Auctanium, you must:</p>
                <ul className="mt-4 space-y-2 text-tertiary list-disc list-inside">
                  <li>Be at least 18 years of age or the age of majority in your jurisdiction</li>
                  <li>Provide accurate and complete registration information</li>
                  <li>Have a valid bank account or payment method for receiving payouts</li>
                  <li>Comply with all applicable laws and regulations in your jurisdiction</li>
                  <li>Not have been previously suspended or removed from the Platform</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section id="account" className="mt-8">
                <h2 className="text-lg font-semibold text-primary">3. Seller Account</h2>
                <p className="mt-4 text-tertiary">
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate this Agreement.
                </p>
              </section>

              {/* Section 4 */}
              <section id="listings" className="mt-8">
                <h2 className="text-lg font-semibold text-primary">4. Product Listings</h2>
                <p className="mt-4 text-tertiary">When creating Listings, you agree to:</p>
                <ul className="mt-4 space-y-2 text-tertiary list-disc list-inside">
                  <li>Provide accurate, complete, and truthful information about your products</li>
                  <li>Use clear, high-quality images that accurately represent the product</li>
                  <li>Set fair and reasonable prices</li>
                  <li>Maintain accurate inventory levels</li>
                  <li>Comply with all Platform listing policies and guidelines</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section id="transactions" className="mt-8">
                <h2 className="text-lg font-semibold text-primary">5. Transactions & Payments</h2>
                <p className="mt-4 text-tertiary">
                  When a Buyer completes a purchase, you are obligated to fulfill the order as described in your Listing. Payments are processed through our secure payment system and held until order confirmation. Payouts are processed within 3-5 business days after order delivery is confirmed.
                </p>
              </section>

              {/* Section 6 */}
              <section id="fees" className="mt-8">
                <h2 className="text-lg font-semibold text-primary">6. Fees & Commissions</h2>
                <p className="mt-4 text-tertiary">
                  Auctanium charges a commission on each successful Transaction. Current fee rates are detailed in our{" "}
                  <Link href="/seller/fees" className="text-brand-600 hover:underline">Fee Schedule</Link>.
                  We reserve the right to modify fees with 30 days' notice to Sellers.
                </p>
              </section>

              {/* Section 7 */}
              <section id="shipping" className="mt-8">
                <h2 className="text-lg font-semibold text-primary">7. Shipping & Fulfillment</h2>
                <p className="mt-4 text-tertiary">You are responsible for:</p>
                <ul className="mt-4 space-y-2 text-tertiary list-disc list-inside">
                  <li>Shipping products within the stated handling time</li>
                  <li>Using appropriate packaging to prevent damage</li>
                  <li>Providing valid tracking information</li>
                  <li>Delivering products as described in the Listing</li>
                </ul>
              </section>

              {/* Section 8 */}
              <section id="returns" className="mt-8">
                <h2 className="text-lg font-semibold text-primary">8. Returns & Refunds</h2>
                <p className="mt-4 text-tertiary">
                  Sellers must honor returns for items that are damaged, defective, or not as described. You may set additional return policies, but they must comply with Platform minimum requirements. Refunds must be processed within 5 business days of receiving a returned item.
                </p>
              </section>

              {/* Section 9 */}
              <section id="conduct" className="mt-8">
                <h2 className="text-lg font-semibold text-primary">9. Seller Conduct</h2>
                <p className="mt-4 text-tertiary">Sellers must:</p>
                <ul className="mt-4 space-y-2 text-tertiary list-disc list-inside">
                  <li>Communicate professionally with Buyers</li>
                  <li>Respond to inquiries within 24 hours</li>
                  <li>Not engage in fraudulent or deceptive practices</li>
                  <li>Not manipulate reviews or ratings</li>
                  <li>Comply with all Platform policies</li>
                </ul>
              </section>

              {/* Section 10 */}
              <section id="prohibited" className="mt-8">
                <h2 className="text-lg font-semibold text-primary">10. Prohibited Items</h2>
                <p className="mt-4 text-tertiary">
                  The following items are prohibited from sale on the Platform: illegal items, counterfeit goods, weapons, hazardous materials, adult content, stolen property, and items that infringe intellectual property rights. Violations may result in immediate account termination.
                </p>
              </section>

              {/* Section 11 */}
              <section id="intellectual" className="mt-8">
                <h2 className="text-lg font-semibold text-primary">11. Intellectual Property</h2>
                <p className="mt-4 text-tertiary">
                  You represent that you have the right to sell all items listed and that your Listings do not infringe any third-party intellectual property rights. You grant Auctanium a license to use your Listing content for Platform operations and marketing purposes.
                </p>
              </section>

              {/* Section 12 */}
              <section id="termination" className="mt-8">
                <h2 className="text-lg font-semibold text-primary">12. Termination</h2>
                <p className="mt-4 text-tertiary">
                  Either party may terminate this Agreement at any time. Upon termination, you must fulfill all pending orders. Auctanium may immediately suspend or terminate accounts for serious violations of this Agreement.
                </p>
              </section>

              {/* Section 13 */}
              <section id="liability" className="mt-8">
                <h2 className="text-lg font-semibold text-primary">13. Limitation of Liability</h2>
                <p className="mt-4 text-tertiary">
                  Auctanium provides the Platform "as is" and makes no warranties regarding uninterrupted service. Our liability is limited to the fees paid by you in the 12 months preceding any claim. We are not liable for indirect, incidental, or consequential damages.
                </p>
              </section>

              {/* Section 14 */}
              <section id="disputes" className="mt-8">
                <h2 className="text-lg font-semibold text-primary">14. Dispute Resolution</h2>
                <p className="mt-4 text-tertiary">
                  Any disputes arising from this Agreement shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. You waive any right to participate in class action lawsuits.
                </p>
              </section>

              {/* Section 15 */}
              <section id="modifications" className="mt-8">
                <h2 className="text-lg font-semibold text-primary">15. Modifications to Agreement</h2>
                <p className="mt-4 text-tertiary">
                  Auctanium reserves the right to modify this Agreement at any time. We will notify Sellers of material changes at least 30 days in advance. Continued use of the Platform after changes take effect constitutes acceptance of the modified Agreement.
                </p>
              </section>

              {/* Contact */}
              <section className="mt-12 rounded-lg bg-secondary/50 p-6">
                <h3 className="font-semibold text-primary">Questions about this Agreement?</h3>
                <p className="mt-2 text-sm text-tertiary">
                  Contact our Seller Support team at{" "}
                  <a href="mailto:seller-legal@auctanium.com" className="text-brand-600 hover:underline">
                    seller-legal@auctanium.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

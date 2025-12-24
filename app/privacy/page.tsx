import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Privacy Policy | Co-Splay",
  description: "Co-Splay Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="py-24 px-4">
      <div className="max-w-[800px] mx-auto prose prose-lg text-white">
        <h1 className="text-4xl font-bold mb-8 text-white">PRIVACY POLICY</h1>
        <p className="text-gray-300 mb-8">Co-Splay Last updated: November 24th, 2025.</p>

        <p className="mb-8 text-gray-200">
          We take your privacy seriously. This Privacy Policy explains how Veil Co-Splay LLC ("we," "us," "our," or "Co-Splay"), a Nevada corporation, collects, uses, shares, and protects your personal information when you use Co-Splay (the "Platform"), our website at https://www.Co-Splay.com, and our mobile apps.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">1. Who is responsible for your data?</h2>
          <p className="text-gray-200">
            Co-Splay [Registered address] Email: privacy@[yourdomain].com
          </p>
          <p className="mt-4 text-gray-200">
            For users in the European Union / UK, we are the data controller.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">2. What information do we collect?</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">A. Information you give us directly</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-200">
            <li>Account information (username, email, password, date of birth)</li>
            <li>Profile information (display name, bio, links, profile picture, cosplay aliases)</li>
            <li>Payment and payout information (PayPal email, bank details, tax ID/SSN when you earn $600+ per year in the U.S.)</li>
            <li>Content you upload (photos, videos, posts, messages)</li>
            <li>Direct messages and comments</li>
            <li>Support requests</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">B. Information collected automatically</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-200">
            <li>IP address, device type, browser, operating system</li>
            <li>Analytics data (pages visited, time spent, clicks) via Google Analytics, Mixpanel, or similar</li>
            <li>Cookies and similar tracking technologies (see Section 9)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">C. Payment processor data</h3>
          <p className="text-gray-200">We use third party payment processors. We never see or store your full credit card number.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">3. How do we use your information?</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-200">
            <li>To provide and improve the Platform (hosting content, delivering subscriptions, paying creators)</li>
            <li>To process payments and payouts</li>
            <li>To communicate with you (transactional emails, support, announcements)</li>
            <li>To prevent fraud, spam, and abuse</li>
            <li>To promote the Platform (e.g., featuring popular creators on the homepage or in marketing – always SFW)</li>
            <li>To comply with legal obligations (tax reporting, law enforcement requests)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">4. Do we share your information?</h2>
          <p className="mb-4 text-gray-200">We share personal data only in these limited cases:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-200">
            <li>With payment processors</li>
            <li>With cloud hosting and analytics providers (AWS, Google Cloud, etc.) under strict contracts</li>
            <li>With contracted moderators or customer support tools</li>
            <li>If you are a creator earning $600+ in the U.S., we are required to share tax information with the IRS</li>
            <li>In the event of a merger, acquisition, or sale of assets</li>
            <li>When required by law or to protect our legal rights</li>
          </ul>
          <p className="mt-4 font-semibold text-white">We do NOT sell your personal data to third parties for marketing purposes.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">5. Promotional use of creator content & likeness</h2>
          <p className="text-gray-200">
            When you upload content, you separately grant us a license (see Creator Agreement and any Sponsored Creator Release) to feature your public posts and profile in marketing. We will never use private/DM content for promotion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">6. International data transfers</h2>
          <p className="text-gray-200">
            Your data may be transferred to and stored in the United States. We use EU Standard Contractual Clauses and UK International Data Transfer Agreement where required.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">7. How long do we keep your data?</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-200">
            <li>Account data: as long as your account is active</li>
            <li>Content: until you delete it or your account is closed</li>
            <li>After account deletion: we permanently delete or anonymize your content and personal data within 30 days (except tax/payout records we are legally required to keep for 7 years)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">8. Your rights & choices</h2>
          <p className="mb-4 text-gray-200">Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-200">
            <li>Access, correct, or delete your personal data</li>
            <li>Object to or restrict certain processing</li>
            <li>Data portability</li>
            <li>Withdraw consent (where we rely on it)</li>
            <li>Opt out of marketing communications</li>
            <li>California residents: opt out of "sale" or "sharing" (we do not sell or share for cross-contextual advertising as defined under CCPA/CPRA)</li>
          </ul>
          <p className="mt-4 text-gray-200">
            To exercise these rights, email privacy@[yourdomain].com or use the "Delete My Account" feature in settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">9. Cookies & tracking</h2>
          <p className="text-gray-200">
            We use essential cookies (login, security) and optional analytics/marketing cookies. You can manage preferences via the cookie banner or your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">10. Security</h2>
          <p className="text-gray-200">
            We use industry-standard encryption (TLS), regular security audits, and access controls. However, no system is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">11. Children</h2>
          <p className="text-gray-200">
            The Platform is strictly 18+. We do not knowingly collect data from anyone under 18.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">12. Changes to this policy</h2>
          <p className="text-gray-200">
            We will notify you by email or in-app notice of material changes. Continued use after the changes take effect means you accept the new policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">13. Contact us</h2>
          <p className="text-gray-200">
            Email: privacy@[yourdomain].com Legal postal address: [Your Company Legal Name], [Address]
          </p>
          <p className="mt-4 text-gray-200">
            For EU/UK data protection complaints, you may also contact your local supervisory authority.
          </p>
        </section>
      </div>
      </div>
    </main>
  );
}


import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Terms of Service | Co-Splay",
  description: "Co-Splay Terms of Service",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="py-24 px-4">
      <div className="max-w-[800px] mx-auto prose prose-lg text-white">
        <h1 className="text-4xl font-bold mb-4 text-white">TERMS OF SERVICE</h1>
        <p className="text-2xl font-semibold mb-2 text-white">Co-Splay</p>
        <p className="text-gray-300 mb-8">Last Updated: December 2025</p>

        <p className="mb-8 text-gray-200">
          These Terms of Service ("Terms") are a legally binding agreement between <strong>Veil CoSplay LLC</strong>, a Nevada limited liability company ("Co-Splay," "we," "us," or "our"), and you ("you" or "User"), whether you are a visitor, registered user, subscriber, creator, or agency.
        </p>

        <p className="mb-8 text-gray-200">
          By accessing or using <a href="https://www.co-splay.com" className="text-[#9653ED] hover:underline">www.co-splay.com</a>, our mobile apps, or any related services (collectively the "Platform"), you agree to be bound by these Terms, our Privacy Policy, Creator Agreement (if you are a creator), and DMCA Policy (all incorporated by reference). If you do not agree, do not use the Platform.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">1. Eligibility & Age Requirement</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-200">
            <li>You must be at least 18 years old to use the Platform.</li>
            <li>The Platform is strictly for adults. We do not knowingly collect data from anyone under 18, and any such content or account will be immediately deleted.</li>
            <li>The Platform is intended for users in the United States and select international markets. Access is prohibited in jurisdictions where local laws restrict or prohibit such content or where age verification requirements differ from those described herein.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">2. Safe-For-Work (SFW) Policy</h2>
          <p className="mb-4 text-gray-200">
            The Platform is 100% safe-for-work. Content or behavior that would be inappropriate at a family-friendly convention is strictly prohibited. This includes, but is not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-200">
            <li>Nudity or exposure of genitals, buttocks, or female nipples/areola</li>
            <li>Sheer or see-through clothing revealing the above</li>
            <li>Lingerie, underwear, or swimwear modeled in a sexually suggestive manner</li>
            <li>Sexual poses, simulated sex acts, or fetish content</li>
            <li>Adult toys or sexually explicit props</li>
            <li>Excessive gore, violence, or illegal activity</li>
          </ul>
          <p className="mt-4 text-gray-200">
            Content depicting copyrighted characters or trademarks must comply with fair use principles and may not mislead users into believing it is officially licensed or endorsed.
          </p>
          <p className="mt-4 text-gray-200">
            We use AI moderation, content hashing, and manual review to enforce this policy. Violations will result in immediate content removal and possible permanent account termination.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">3. User Accounts & Registration</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-200">
            <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
            <li>You must provide accurate information during registration failure to do so may result in the loss of your account and any purchased content.</li>
            <li>You may not impersonate any person or entity.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">4. Age Verification for Paid Access</h2>
          <p className="mb-4 text-gray-200">
            To subscribe, purchase content, or access any paid features, you must verify your age. We use commercially reasonable methods, including your credit card authorization (which serve to prove your identity and that your age is 18+). We may also use third-party verification services.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-200">
            <li>We do not store full credit card information beyond what is necessary for processing.</li>
            <li>Age verification data is logged and retained as required by law.</li>
            <li>We may require additional or alternative verification methods in certain jurisdictions or for high-risk transactions.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">5. Subscriptions, Payments, & Purchases</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-200">
            <li>Subscriptions auto-renew monthly until cancelled.</li>
            <li>All fees are non-refundable except where required by law.</li>
            <li>We use third-party payment processors and banking-as-a-service providers to process payments and as such your information will be shared with them.</li>
            <li>Cancellation is available in your account settings.</li>
            <li>We reserve the right to suspend or terminate access for non-payment, policy violations, or suspected fraud.</li>
            <li>You may not use the Platform to engage in fraud, money laundering, or illegal activity.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">6. User-Generated Content & Licenses</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-200">
            <li>You retain ownership of content you post.</li>
            <li>By posting, you grant Veil Co-Splay LLC a worldwide, non-exclusive, royalty-free, perpetual, transferable, sublicensable license to host, display, reproduce, distribute, and promote your content (including your username, profile, and likeness) on the Platform and in marketing materials.</li>
            <li>To the maximum extent permitted by law, you irrevocably waive any moral rights, droit moral, or rights of publicity claims in connection with our use of your content as permitted herein.</li>
            <li>You represent that you own or have all necessary rights to your content and that it does not infringe third-party intellectual property.</li>
            <li>We may remove or disable access to content that violates these Terms or our policies.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">7. Prohibited Conduct</h2>
          <p className="mb-4 text-gray-200">You may not:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-200">
            <li>Harass, threaten, dox, or impersonate others</li>
            <li>Post hate speech, discrimination, restricted or illegal content</li>
            <li>Spam, use bots, or scrape the Platform</li>
            <li>Attempt to reverse-engineer or interfere with the Platform</li>
            <li>Share or redistribute creator content outside the Platform without permission</li>
            <li>Circumvent age verification, payments, or technical restrictions</li>
            <li>Use the Platform for commercial purposes unrelated to its intended use, including but not limited to advertising, soliciting, or promoting other services or products</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">8. Creator & Agency Specifics</h2>
          <p className="mb-4 text-gray-200">
            Creators and agencies are subject to the separate <strong>Creator Agreement</strong> (available at co-splay.com/creator-agreement). This includes but is not limited to terms regarding:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-200">
            <li>Identity and age verification requirements</li>
            <li>Information regarding payouts</li>
            <li>Licensing terms</li>
            <li>Tax reporting</li>
          </ul>
          <p className="mt-4 text-gray-200">
            Any disputes between creators/agencies and users are solely between those parties; we are not responsible for such disputes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">9. Intellectual Property & DMCA</h2>
          <p className="mb-4 text-gray-200">
            We respect copyright and trademark rights. See our <strong>DMCA Policy</strong> at co-splay.com/dmca.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-200">
            <li>You may not post content you do not own.</li>
            <li>You may not post content containing images or media that represent copyrighted brands.</li>
            <li>Repeated copyright infringement will result in account termination.</li>
            <li>You may not use our trademarks without permission.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">10. Limitation of Liability</h2>
          <p className="mb-4 font-semibold text-white">TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-200">
            <li>WE PROVIDE THE PLATFORM "AS IS" WITHOUT WARRANTIES OF ANY KIND.</li>
            <li>WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING ANY LOSS OF DATA, PROFITS, BUSINESS OPPORTUNITIES, OR OTHER INTANGIBLE LOSSES ARISING FROM YOUR USE OF THE PLATFORM.</li>
            <li>OUR TOTAL LIABILITY TO YOU SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE PRIOR 12 MONTHS (OR $100, WHICHEVER IS GREATER).</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">11. Indemnification</h2>
          <p className="text-gray-200">
            You agree to defend, indemnify, and hold harmless Veil CoSplay LLC, its officers, directors, employees, and agents from any claims, damages, or expenses (including attorneys' fees) arising from your use of the Platform, your content, or your violation of these Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">12. Dispute Resolution & Arbitration</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-200">
            <li>These Terms are governed by the laws of the State of Nevada, without regard to conflict of laws principles.</li>
            <li>Any dispute arising from these Terms or your use of the Platform will be resolved by binding arbitration in Windermere, Florida (or another mutually agreed location), under the rules of the American Arbitration Association.</li>
            <li>Arbitration proceedings may be conducted via video conference or telephone if in-person attendance is impractical or prohibited.</li>
            <li>You waive any right to participate in a class action or representative proceeding.</li>
            <li>You may opt out of arbitration within 30 days of first use by sending written notice to: Veil CoSplay LLC, 9100 Conroy Windermere Road, Suite 200 - PMB 0589, Windermere, FL 34786.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">13. Changes to These Terms</h2>
          <p className="text-gray-200">
            We may modify these Terms at any time. We will notify you of material changes via email or in-app notice. Continued use of the Platform after such notice constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">14. Termination</h2>
          <p className="text-gray-200">
            We may suspend or terminate your account at any time, with or without notice, for any violation of these Terms or if we believe it is necessary to protect the Platform or other users.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">15. Miscellaneous</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-200">
            <li>These Terms, together with the Privacy Policy, Creator Agreement, and DMCA Policy, constitute the entire agreement.</li>
            <li>If any provision is invalid, the remainder remains in effect.</li>
            <li>Our failure to enforce any right does not waive that right.</li>
            <li>For questions, contact <a href="mailto:support@co-splay.com" className="text-[#9653ED] hover:underline">support@co-splay.com</a>.</li>
          </ul>
        </section>

        <p className="mt-8 mb-8 text-gray-200">
          By using Co-Splay, you acknowledge that you have read, understood, and agree to these Terms.
        </p>

        <div className="mt-8 pt-8 border-t border-gray-600">
          <p className="font-semibold text-white">Veil CoSplay LLC</p>
          <p className="text-gray-200">9100 Conroy Windermere Road Suite 200 - PMB 0589</p>
          <p className="text-gray-200">Windermere, FL 34786</p>
        </div>
      </div>
      </div>
    </main>
  );
}


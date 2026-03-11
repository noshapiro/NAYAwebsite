"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0e0e0e]">
      <Navbar />
      <main className="flex-1 px-6 py-10 md:py-12">
        <div className="container max-w-[720px] mx-auto">
          {/* Header */}
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: "var(--accent)" }}
          >
            Legal
          </div>
          <h1 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] text-white">
            Privacy Policy
          </h1>
          <p className="mt-3 text-[1.05rem] leading-[1.7] text-[var(--text-2)]">
            How Nearu collects, processes, and protects your data — and the data of those who interact with our technology.
          </p>
          <p className="mt-4 mb-7 text-[0.8rem] text-[var(--text-3)]">
            Last updated: March 11, 2026 · Effective date: March 11, 2026
          </p>

          <div className="space-y-6 text-[0.95rem] leading-[1.75] text-[var(--text-2)]">
            {/* 1. Introduction */}
            <section>
              <h2 className="text-[1.15rem] font-bold text-white mb-2 pb-2">1. Introduction</h2>
              <p>
                Nearu, Inc. (&quot;Nearu&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the emotional intelligence infrastructure layer for AI agents and robotics, including the Soul Engine™ and NearuVibe™ platforms. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you use our APIs, developer tools, website at nnearu.com, and any related services (collectively, the &quot;Services&quot;).
              </p>
              <p className="mt-2.5">
                By accessing or using the Services, you acknowledge that you have read and understood this Policy. If you do not agree with its terms, please discontinue use of the Services.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section>
              <h2 className="text-[1.15rem] font-bold text-white mb-2 pb-2">2. Information We Collect</h2>
              <p>
                We collect information in three ways: data you provide to us directly, data generated automatically through your use of the Services, and data processed transiently on your behalf as part of the emotion analysis pipeline.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-[0.85rem]">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 pr-4 font-semibold text-white">Category</th>
                      <th className="text-left py-3 pr-4 font-semibold text-white">Examples</th>
                      <th className="text-left py-3 font-semibold text-white">Retention</th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--text-2)]">
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Account data</td>
                      <td className="py-3 pr-4">Name, email address, company name, billing details</td>
                      <td className="py-3">Duration of account + 90 days</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">API usage data</td>
                      <td className="py-3 pr-4">Request timestamps, endpoint called, response latency, token counts</td>
                      <td className="py-3">90 days (aggregated indefinitely)</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Audio input</td>
                      <td className="py-3 pr-4">Voice clips submitted for acoustic and semantic emotion analysis</td>
                      <td className="py-3">Transient only — never stored</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Camera frames</td>
                      <td className="py-3 pr-4">JPEG image frames submitted for facial emotion analysis (VER)</td>
                      <td className="py-3">Transient only — discarded immediately after processing</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Session / episodic data</td>
                      <td className="py-3 pr-4">Transcripts and emotion summaries when session mode is enabled via session_id</td>
                      <td className="py-3">Until deleted via API or account closure</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Technical data</td>
                      <td className="py-3 pr-4">IP address, browser type, device identifiers, cookies</td>
                      <td className="py-3">90 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className="mt-4 rounded-lg border px-4 py-3"
                style={{
                  background: "rgba(45, 156, 219, 0.1)",
                  borderColor: "rgba(45, 156, 219, 0.25)",
                }}
              >
                <p className="text-[0.9rem] font-semibold text-[#2D9CDB] mb-1">Important</p>
                <p className="text-[0.88rem] text-[var(--text-2)]">
                  Raw biometric data — face images and voice recordings — exists only in memory during processing and is never persisted to disk or used for training. Nearu processes these signals to return emotion labels and immediately discards the source material.
                </p>
              </div>
            </section>

            {/* 3. How We Use Your Information */}
            <section>
              <h2 className="text-[1.15rem] font-bold text-white mb-2 pb-2">3. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-white">Provide the Services</strong> — process API requests, return emotion analysis results, maintain session memory where opted in.</li>
                <li><strong className="text-white">Improve reliability</strong> — monitor latency, error rates, and system health using anonymised usage metrics.</li>
                <li><strong className="text-white">Billing and account management</strong> — process payments, issue invoices, manage API keys.</li>
                <li><strong className="text-white">Security</strong> — detect, investigate, and prevent fraudulent or abusive activity.</li>
                <li><strong className="text-white">Communications</strong> — send transactional emails (API key issuance, billing alerts) and, with consent, product updates.</li>
                <li><strong className="text-white">Legal compliance</strong> — respond to lawful requests from authorities and meet regulatory obligations.</li>
              </ul>
              <p className="mt-2.5">
                We do not use biometric data (voice recordings, facial images) to train machine learning models. We do not sell personal data. We do not use personal data for advertising.
              </p>
            </section>

            {/* 4. Biometric Data */}
            <section>
              <h2 className="text-[1.15rem] font-bold text-white mb-2 pb-2">4. Biometric Data — Special Protections</h2>
              <p>
                Nearu&apos;s emotion analysis pipeline processes biometric identifiers as defined under applicable laws, including the Illinois Biometric Information Privacy Act (BIPA), the EU General Data Protection Regulation (GDPR), and the California Consumer Privacy Act (CCPA).
              </p>
              <p className="mt-2.5">Our architecture is designed to minimise biometric exposure:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Camera frames are processed for facial expression extraction and <strong className="text-white">immediately discarded</strong> — they are never stored on disk, never transmitted beyond the processing server, and never retained.</li>
                <li>Audio is forwarded to our speech pipeline for analysis and discarded. We do not store audio on our servers.</li>
                <li>The system returns only structured labels and confidence scores — not biometric templates or raw signals.</li>
              </ul>
              <p className="mt-2.5">
                For regulated industries, we offer an <strong className="text-white">on-premises VER option</strong> where the facial emotion model runs inside the customer&apos;s own infrastructure. Only emotion labels (not raw frames) cross the network boundary.
              </p>
            </section>

            {/* 5. Session Memory */}
            <section>
              <h2 className="text-[1.15rem] font-bold text-white mb-2 pb-2">5. Session Memory and Episodic Data</h2>
              <p>
                Session mode is <strong className="text-white">opt-in</strong>. When a developer passes a <code className="text-[0.85em] bg-white/10 px-1 rounded">session_id</code> parameter, Nearu stores episodic memory — including transcript excerpts and emotion summaries — to enable trend detection and personalisation across interactions.
              </p>
              <p className="mt-2.5 font-semibold text-white">Session data is:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Stored in an isolated per-device database partition, keyed by <code className="text-[0.85em] bg-white/10 px-1 rounded">device_id</code>.</li>
                <li>Never shared across customers or used to train shared models.</li>
                <li>Deletable at any time via the DELETE <code className="text-[0.85em] bg-white/10 px-1 rounded">/api/v1/session/&#123;session_id&#125;</code> endpoint or the full DELETE <code className="text-[0.85em] bg-white/10 px-1 rounded">/api/v1/device/&#123;device_id&#125;/memory</code> endpoint.</li>
              </ul>
              <p className="mt-2.5">
                End users interacting with a product built on Nearu should consult the privacy policy of that product&apos;s operator for further detail on how session data is used in their context.
              </p>
            </section>

            {/* 6. Data Sharing */}
            <section>
              <h2 className="text-[1.15rem] font-bold text-white mb-2 pb-2">6. Data Sharing and Disclosure</h2>
              <p>
                We do not sell, rent, or trade personal data. We share information only in the following limited circumstances:
              </p>
              <ul className="list-disc pl-5 mt-2.5 space-y-2">
                <li><strong className="text-white">Sub-processors</strong> — third-party infrastructure providers (cloud hosting, transcription via OpenAI Whisper) under data processing agreements that impose equivalent protections.</li>
                <li><strong className="text-white">Legal requirements</strong> — when required by law, regulation, or valid legal process.</li>
                <li><strong className="text-white">Business transfers</strong> — in connection with a merger, acquisition, or sale of assets, with advance notice provided.</li>
                <li><strong className="text-white">With your consent</strong> — for any purpose you explicitly authorise.</li>
              </ul>
            </section>

            {/* 7. Data Residency */}
            <section>
              <h2 className="text-[1.15rem] font-bold text-white mb-2 pb-2">7. Data Residency and International Transfers</h2>
              <p>
                Nearu&apos;s backend can be deployed in specific cloud regions — US, EU, and Asia — to meet data residency requirements. By default, data is processed in the region closest to the API caller.
              </p>
              <p className="mt-2.5">
                Where personal data is transferred from the European Economic Area (EEA) to a third country, we rely on the European Commission&apos;s Standard Contractual Clauses (SCCs) or equivalent safeguards. Contact us to request a Data Processing Agreement (DPA).
              </p>
            </section>

            {/* 8. Your Rights */}
            <section>
              <h2 className="text-[1.15rem] font-bold text-white mb-2 pb-2">8. Your Rights</h2>
              <p>
                Depending on your jurisdiction, you may have the following rights regarding your personal data:
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-[0.85rem]">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 pr-4 font-semibold text-white">Right</th>
                      <th className="text-left py-3 font-semibold text-white">How to exercise</th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--text-2)]">
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Access — obtain a copy of your data</td>
                      <td className="py-3">Email <a href="mailto:privacy@nnearu.com" className="text-[var(--accent)] hover:underline">privacy@nnearu.com</a></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Rectification — correct inaccurate data</td>
                      <td className="py-3">Update via dashboard or email us</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Erasure — delete your account and data</td>
                      <td className="py-3">Dashboard → Account → Delete, or email us</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Session / episodic memory deletion</td>
                      <td className="py-3">DELETE API endpoints (see §5)</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Portability — receive data in machine-readable format</td>
                      <td className="py-3">Email <a href="mailto:privacy@nnearu.com" className="text-[var(--accent)] hover:underline">privacy@nnearu.com</a></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Object / restrict processing</td>
                      <td className="py-3">Email <a href="mailto:privacy@nnearu.com" className="text-[var(--accent)] hover:underline">privacy@nnearu.com</a></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Opt out of marketing</td>
                      <td className="py-3">Unsubscribe link in any marketing email</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2.5">
                We will respond to verified requests within 30 days. We may need to verify your identity before processing a request.
              </p>
            </section>

            {/* 9. Security */}
            <section>
              <h2 className="text-[1.15rem] font-bold text-white mb-2 pb-2">9. Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect personal data, including:
              </p>
              <ul className="list-disc pl-5 mt-2.5 space-y-1">
                <li>TLS 1.2+ encryption for all data in transit.</li>
                <li>Encryption at rest for stored data.</li>
                <li>API key authentication with rate limiting and anomaly detection.</li>
                <li>Strict access controls — production data is accessible to authorised engineers only.</li>
                <li>Regular security reviews and penetration testing.</li>
              </ul>
              <p className="mt-2.5">
                No method of transmission or storage is 100% secure. In the event of a breach that is likely to result in risk to your rights and freedoms, we will notify you and relevant supervisory authorities as required by applicable law.
              </p>
            </section>

            {/* 10. Cookies */}
            <section>
              <h2 className="text-[1.15rem] font-bold text-white mb-2 pb-2">10. Cookies and Tracking</h2>
              <p>
                Our website (nnearu.com) uses cookies for authentication, session management, and anonymised analytics. We do not use cross-site tracking or advertising cookies. You can control cookies through your browser settings. Disabling cookies may affect certain features of the website.
              </p>
            </section>

            {/* 11. Children */}
            <section>
              <h2 className="text-[1.15rem] font-bold text-white mb-2 pb-2">11. Children</h2>
              <p>
                The Services are not directed at children under 16. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us and we will delete it promptly.
              </p>
            </section>

            {/* 12. Changes */}
            <section>
              <h2 className="text-[1.15rem] font-bold text-white mb-2 pb-2">12. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Material changes will be communicated by email (to registered developers) or by prominent notice on nnearu.com at least 14 days before taking effect. The &quot;Last updated&quot; date at the top of this page reflects the most recent revision.
              </p>
              <p className="mt-2.5">
                Continued use of the Services after a change takes effect constitutes acceptance of the revised Policy.
              </p>
            </section>

            {/* 13. Contact */}
            <section>
              <h2 className="text-[1.15rem] font-bold text-white mb-2 pb-2">13. Contact Us</h2>
              <p>
                For privacy-related questions, data requests, or to obtain a Data Processing Agreement:
              </p>
              <div
                className="mt-3 rounded-lg border border-white/10 bg-white/[0.03] px-6 py-5 space-y-1 text-[0.9rem]"
              >
                <p className="font-semibold text-white">Nearu, Inc.</p>
                <p>169 Madison Ave STE 78337</p>
                <p>New York, NY</p>
                <p>
                  Email: <a href="mailto:privacy@nnearu.com" className="text-[var(--accent)] hover:underline">privacy@nnearu.com</a>
                </p>
                <p>
                  General: <a href="mailto:noa@nnearu.com" className="text-[var(--accent)] hover:underline">noa@nnearu.com</a>
                </p>
                <p>
                  Phone: <a href="tel:+972545884883" className="text-[var(--accent)] hover:underline">+972-54-5884883</a>
                </p>
              </div>
              <p className="mt-2.5 text-[0.85rem] text-[var(--text-3)]">
                For GDPR-specific inquiries, please mark your subject line with &quot;GDPR Request&quot;.
              </p>
            </section>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10">
            <Link
              href="/"
              className="text-[var(--accent)] text-[0.9rem] font-medium hover:underline"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

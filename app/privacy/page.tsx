'use client';

import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';

export default function PrivacyPolicyPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <Container className="relative py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" size="lg" className="mb-6 bg-white/20 text-white border-0">
              Legal
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Privacy Policy
            </h1>

            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect,
              use, and protect your personal information.
            </p>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 sm:h-24">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <Container size="md">
          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-slate-500 mb-8">
              <strong>Last Updated:</strong> January 8, 2026
            </p>

            <div className="space-y-12">
              {/* Introduction */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
                <p className="text-slate-600 mb-4">
                  The Ketamine Association (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting the privacy
                  of our users, members, and visitors. This Privacy Policy describes how we collect, use, disclose,
                  and safeguard your information when you visit our website, use our services, or interact with us
                  in any way.
                </p>
                <p className="text-slate-600">
                  By accessing or using our website and services, you agree to this Privacy Policy. If you do not
                  agree with the terms of this Privacy Policy, please do not access the site or use our services.
                </p>
              </div>

              {/* Information We Collect */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">2.1 Personal Information</h3>
                <p className="text-slate-600 mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
                  <li>Register for an account or membership</li>
                  <li>Request information about ketamine therapy providers</li>
                  <li>Enroll in educational courses or certification programs</li>
                  <li>Subscribe to our newsletter or communications</li>
                  <li>Submit a contact form or request support</li>
                  <li>Apply for practitioner verification</li>
                  <li>Participate in surveys or research studies</li>
                </ul>
                <p className="text-slate-600 mb-6">
                  This information may include your name, email address, phone number, mailing address,
                  professional credentials, medical license information, payment information, and any other
                  information you choose to provide.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">2.2 Health-Related Information</h3>
                <p className="text-slate-600 mb-6">
                  As a healthcare education platform, we may collect certain health-related information when you
                  seek provider referrals or educational resources. This may include general information about
                  conditions you are seeking treatment for. We treat this information with the highest level of
                  confidentiality in accordance with applicable healthcare privacy laws.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">2.3 Automatically Collected Information</h3>
                <p className="text-slate-600 mb-4">
                  When you visit our website, we automatically collect certain information, including:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li>Device information (browser type, operating system, device identifiers)</li>
                  <li>IP address and geographic location</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Referring website addresses</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>

              {/* How We Use Your Information */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
                <p className="text-slate-600 mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li>Providing, maintaining, and improving our services</li>
                  <li>Processing membership applications and verifying practitioner credentials</li>
                  <li>Connecting patients with verified ketamine therapy providers</li>
                  <li>Delivering educational content and certification programs</li>
                  <li>Sending administrative information, updates, and marketing communications</li>
                  <li>Responding to your comments, questions, and requests</li>
                  <li>Analyzing usage trends and improving user experience</li>
                  <li>Protecting against fraudulent, unauthorized, or illegal activity</li>
                  <li>Complying with legal obligations and enforcing our terms</li>
                </ul>
              </div>

              {/* Information Sharing */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-slate-600 mb-4">
                  We may share your information in the following circumstances:
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">4.1 With Your Consent</h3>
                <p className="text-slate-600 mb-4">
                  We may share your information when you have given us explicit consent to do so.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">4.2 Service Providers</h3>
                <p className="text-slate-600 mb-4">
                  We may share information with third-party service providers who perform services on our behalf,
                  such as payment processing, email delivery, hosting, and analytics. These providers are contractually
                  obligated to protect your information.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">4.3 Provider Directory</h3>
                <p className="text-slate-600 mb-4">
                  If you are a verified practitioner member, certain professional information (name, practice name,
                  location, specialties) may be displayed in our public provider directory to help patients find care.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">4.4 Legal Requirements</h3>
                <p className="text-slate-600">
                  We may disclose your information if required to do so by law or in response to valid requests by
                  public authorities (e.g., court orders, subpoenas, or government agencies).
                </p>
              </div>

              {/* Data Security */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Security</h2>
                <p className="text-slate-600 mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal
                  information, including:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Secure server infrastructure with regular security audits</li>
                  <li>Access controls and authentication requirements</li>
                  <li>Regular security training for staff</li>
                  <li>Incident response procedures</li>
                </ul>
                <p className="text-slate-600 mt-4">
                  However, no method of transmission over the Internet or electronic storage is 100% secure.
                  While we strive to use commercially acceptable means to protect your information, we cannot
                  guarantee its absolute security.
                </p>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Cookies and Tracking Technologies</h2>
                <p className="text-slate-600 mb-4">
                  We use cookies and similar tracking technologies to collect and track information about your
                  browsing activities. You can instruct your browser to refuse all cookies or to indicate when
                  a cookie is being sent. However, if you do not accept cookies, you may not be able to use
                  some portions of our service.
                </p>
                <p className="text-slate-600">
                  Types of cookies we use include:
                </p>
                <ul className="list-disc pl-6 text-slate-600 mt-4 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with consent)</li>
                </ul>
              </div>

              {/* Your Rights */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Your Rights and Choices</h2>
                <p className="text-slate-600 mb-4">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information, subject to certain exceptions</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
                  <li><strong>Data Portability:</strong> Request a copy of your data in a structured, machine-readable format</li>
                  <li><strong>Restrict Processing:</strong> Request that we limit how we use your information</li>
                </ul>
                <p className="text-slate-600 mt-4">
                  To exercise any of these rights, please contact us at privacy@ketamineassociation.org.
                </p>
              </div>

              {/* Data Retention */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Data Retention</h2>
                <p className="text-slate-600">
                  We retain your personal information for as long as necessary to fulfill the purposes for which
                  it was collected, including to satisfy legal, accounting, or reporting requirements. The retention
                  period may vary depending on the context of the processing and our legal obligations. When we no
                  longer need your information, we will securely delete or anonymize it.
                </p>
              </div>

              {/* Children's Privacy */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Children&apos;s Privacy</h2>
                <p className="text-slate-600">
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect
                  personal information from children. If you are a parent or guardian and believe your child has
                  provided us with personal information, please contact us immediately, and we will take steps to
                  delete such information.
                </p>
              </div>

              {/* International Transfers */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. International Data Transfers</h2>
                <p className="text-slate-600">
                  Your information may be transferred to and processed in countries other than your country of
                  residence. These countries may have data protection laws that are different from your country.
                  We take appropriate safeguards to ensure that your personal information remains protected in
                  accordance with this Privacy Policy.
                </p>
              </div>

              {/* Third-Party Links */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Third-Party Links</h2>
                <p className="text-slate-600">
                  Our website may contain links to third-party websites, services, or applications that are not
                  operated by us. This Privacy Policy does not apply to third-party services, and we are not
                  responsible for their privacy practices. We encourage you to review the privacy policies of
                  any third-party services you access.
                </p>
              </div>

              {/* Changes to Privacy Policy */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Changes to This Privacy Policy</h2>
                <p className="text-slate-600">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                  the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. We encourage you to
                  review this Privacy Policy periodically for any changes. Your continued use of our services after
                  any modifications indicates your acceptance of the updated Privacy Policy.
                </p>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Contact Us</h2>
                <p className="text-slate-600 mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <p className="text-slate-700 mb-2">
                    <strong>The Ketamine Association</strong>
                  </p>
                  <p className="text-slate-600 mb-1">Privacy Officer</p>
                  <p className="text-slate-600 mb-1">123 Medical Center Drive, Suite 400</p>
                  <p className="text-slate-600 mb-1">Austin, TX 78701</p>
                  <p className="text-slate-600 mb-1">
                    Email: <a href="mailto:privacy@ketamineassociation.org" className="text-teal-600 hover:text-teal-700">privacy@ketamineassociation.org</a>
                  </p>
                  <p className="text-slate-600">
                    Phone: <a href="tel:+18005553582" className="text-teal-600 hover:text-teal-700">(800) 555-KETA</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

'use client';

import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';

export default function TermsOfServicePage() {
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
              Terms of Service
            </h1>

            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Please read these terms carefully before using our website and services.
              By using our platform, you agree to be bound by these terms.
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
              {/* Agreement to Terms */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Agreement to Terms</h2>
                <p className="text-slate-600 mb-4">
                  These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you and
                  The Ketamine Association (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) governing your access to and
                  use of our website at ketamineassociation.org and all associated services, features, content,
                  and applications (collectively, the &quot;Services&quot;).
                </p>
                <p className="text-slate-600 mb-4">
                  By accessing or using our Services, you acknowledge that you have read, understood, and agree
                  to be bound by these Terms. If you do not agree to these Terms, you must not access or use
                  our Services.
                </p>
                <p className="text-slate-600">
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately
                  upon posting to our website. Your continued use of the Services after any such changes
                  constitutes your acceptance of the new Terms.
                </p>
              </div>

              {/* Eligibility */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Eligibility</h2>
                <p className="text-slate-600 mb-4">
                  To use our Services, you must:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li>Be at least 18 years of age</li>
                  <li>Have the legal capacity to enter into a binding agreement</li>
                  <li>Not be prohibited from using the Services under applicable law</li>
                  <li>Provide accurate and complete registration information</li>
                </ul>
                <p className="text-slate-600 mt-4">
                  For practitioner membership, you must additionally hold valid and current professional licenses
                  and credentials as required by your jurisdiction and specialty.
                </p>
              </div>

              {/* Account Registration */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Account Registration and Security</h2>
                <p className="text-slate-600 mb-4">
                  To access certain features of our Services, you may be required to create an account. When
                  creating an account, you agree to:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security and confidentiality of your login credentials</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
                <p className="text-slate-600 mt-4">
                  We reserve the right to suspend or terminate accounts that violate these Terms or for any other
                  reason at our sole discretion.
                </p>
              </div>

              {/* Services Description */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Description of Services</h2>
                <p className="text-slate-600 mb-4">
                  The Ketamine Association provides the following Services:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li><strong>Provider Directory:</strong> A searchable database of verified ketamine therapy providers</li>
                  <li><strong>Educational Resources:</strong> Courses, certifications, and continuing education for healthcare professionals</li>
                  <li><strong>Patient Education:</strong> Information and resources about ketamine therapy</li>
                  <li><strong>Membership Services:</strong> Professional membership benefits for practitioners</li>
                  <li><strong>Events and Networking:</strong> Conferences, webinars, and community forums</li>
                  <li><strong>Provider Verification:</strong> Credentialing and verification services</li>
                </ul>
              </div>

              {/* Membership Terms */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Membership Terms</h2>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">5.1 Membership Tiers</h3>
                <p className="text-slate-600 mb-4">
                  We offer various membership tiers with different benefits and pricing. Current membership
                  options and pricing are available on our website. We reserve the right to modify membership
                  offerings and pricing at any time.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">5.2 Billing and Payment</h3>
                <p className="text-slate-600 mb-4">
                  Membership fees are billed in advance on an annual or monthly basis depending on your selected
                  plan. By providing payment information, you authorize us to charge the applicable fees to your
                  designated payment method.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">5.3 Automatic Renewal</h3>
                <p className="text-slate-600 mb-4">
                  Memberships automatically renew at the end of each billing period unless you cancel before the
                  renewal date. You may cancel your membership at any time through your account settings or by
                  contacting us.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">5.4 Refund Policy</h3>
                <p className="text-slate-600">
                  Membership fees are generally non-refundable. However, we may provide refunds or credits at our
                  sole discretion. Course and certification fees may have separate refund policies as specified
                  at the time of purchase.
                </p>
              </div>

              {/* Provider Verification */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Provider Verification and Directory</h2>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">6.1 Verification Process</h3>
                <p className="text-slate-600 mb-4">
                  Practitioners seeking to be listed in our Provider Directory must complete our verification
                  process, which includes verification of professional licenses, credentials, malpractice
                  insurance, and adherence to our standards of care.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">6.2 Ongoing Compliance</h3>
                <p className="text-slate-600 mb-4">
                  Verified providers must maintain their credentials in good standing and promptly notify us of
                  any changes to their licensure status, disciplinary actions, or other material changes that
                  may affect their listing.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">6.3 Directory Listing Disclaimer</h3>
                <p className="text-slate-600">
                  Listing in our Provider Directory does not constitute an endorsement, recommendation, or
                  guarantee of any provider&apos;s services. Patients are responsible for conducting their own
                  due diligence when selecting a healthcare provider.
                </p>
              </div>

              {/* Intellectual Property */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Intellectual Property</h2>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">7.1 Our Content</h3>
                <p className="text-slate-600 mb-4">
                  All content on our website, including but not limited to text, graphics, logos, images, videos,
                  course materials, and software, is the property of The Ketamine Association or our licensors
                  and is protected by copyright, trademark, and other intellectual property laws.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">7.2 Limited License</h3>
                <p className="text-slate-600 mb-4">
                  We grant you a limited, non-exclusive, non-transferable, revocable license to access and use
                  our Services for personal, non-commercial purposes in accordance with these Terms.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">7.3 Restrictions</h3>
                <p className="text-slate-600">
                  You may not reproduce, distribute, modify, create derivative works of, publicly display,
                  publicly perform, republish, download, store, or transmit any content from our Services
                  without our prior written consent, except as permitted by law.
                </p>
              </div>

              {/* User Conduct */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. User Conduct</h2>
                <p className="text-slate-600 mb-4">
                  When using our Services, you agree not to:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li>Violate any applicable laws, regulations, or third-party rights</li>
                  <li>Provide false, misleading, or inaccurate information</li>
                  <li>Impersonate any person or entity or misrepresent your affiliation</li>
                  <li>Interfere with or disrupt the Services or servers</li>
                  <li>Attempt to gain unauthorized access to any part of the Services</li>
                  <li>Use the Services for any fraudulent or harmful purpose</li>
                  <li>Harvest or collect user information without consent</li>
                  <li>Post or transmit any malicious code, viruses, or harmful content</li>
                  <li>Engage in any activity that could damage or impair the Services</li>
                  <li>Use automated means to access the Services without our permission</li>
                </ul>
              </div>

              {/* User Content */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. User Content</h2>
                <p className="text-slate-600 mb-4">
                  You may have opportunities to submit content through our Services, including reviews, comments,
                  forum posts, and profile information (&quot;User Content&quot;). By submitting User Content, you:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li>Represent that you own or have the right to submit the content</li>
                  <li>Grant us a non-exclusive, royalty-free, worldwide license to use, reproduce, modify, and
                      display your User Content in connection with our Services</li>
                  <li>Agree that your User Content does not violate any third-party rights</li>
                  <li>Acknowledge that we may remove any User Content at our discretion</li>
                </ul>
              </div>

              {/* Disclaimers */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Disclaimers</h2>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">Important Medical Disclaimer</h3>
                  <p className="text-amber-700">
                    THE INFORMATION PROVIDED THROUGH OUR SERVICES IS FOR EDUCATIONAL AND INFORMATIONAL PURPOSES
                    ONLY AND IS NOT INTENDED AS MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT. ALWAYS SEEK THE ADVICE
                    OF A QUALIFIED HEALTHCARE PROVIDER WITH ANY QUESTIONS YOU MAY HAVE REGARDING A MEDICAL
                    CONDITION.
                  </p>
                </div>
                <p className="text-slate-600 mb-4">
                  THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER
                  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY,
                  FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p className="text-slate-600">
                  We do not warrant that the Services will be uninterrupted, error-free, secure, or free of
                  viruses or other harmful components. We do not guarantee any specific results from the use
                  of our Services.
                </p>
              </div>

              {/* Limitation of Liability */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Limitation of Liability</h2>
                <p className="text-slate-600 mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE KETAMINE ASSOCIATION AND ITS OFFICERS, DIRECTORS,
                  EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                  CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li>Loss of profits, data, use, or goodwill</li>
                  <li>Personal injury or property damage</li>
                  <li>Any conduct or content of third parties</li>
                  <li>Any unauthorized access to or use of our servers or your personal information</li>
                </ul>
                <p className="text-slate-600 mt-4">
                  Our total liability for any claims arising out of or relating to these Terms or your use of
                  the Services shall not exceed the amount you paid to us in the twelve (12) months preceding
                  the claim, or one hundred dollars ($100), whichever is greater.
                </p>
              </div>

              {/* Indemnification */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Indemnification</h2>
                <p className="text-slate-600">
                  You agree to defend, indemnify, and hold harmless The Ketamine Association and its officers,
                  directors, employees, agents, and affiliates from and against any claims, liabilities, damages,
                  losses, and expenses, including reasonable attorneys&apos; fees, arising out of or in any way
                  connected with your access to or use of the Services, your violation of these Terms, or your
                  violation of any third-party rights.
                </p>
              </div>

              {/* Third-Party Services */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Third-Party Services and Links</h2>
                <p className="text-slate-600">
                  Our Services may contain links to third-party websites, services, or applications. We do not
                  control and are not responsible for the content, privacy policies, or practices of any
                  third-party services. Your use of such third-party services is at your own risk and subject
                  to their respective terms and conditions.
                </p>
              </div>

              {/* Dispute Resolution */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Dispute Resolution</h2>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">14.1 Informal Resolution</h3>
                <p className="text-slate-600 mb-4">
                  Before initiating any formal dispute resolution proceeding, you agree to first contact us
                  to attempt to resolve any dispute informally. We will attempt to resolve the dispute by
                  contacting you via email.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">14.2 Arbitration Agreement</h3>
                <p className="text-slate-600 mb-4">
                  If we cannot resolve a dispute informally, any dispute arising out of or relating to these
                  Terms or the Services shall be resolved by binding arbitration in accordance with the rules
                  of the American Arbitration Association. The arbitration shall take place in Austin, Texas,
                  and the arbitrator&apos;s decision shall be final and binding.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">14.3 Class Action Waiver</h3>
                <p className="text-slate-600">
                  You agree that any arbitration or proceeding shall be limited to the dispute between you and
                  us individually. You waive any right to participate in a class action lawsuit or class-wide
                  arbitration.
                </p>
              </div>

              {/* Governing Law */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">15. Governing Law</h2>
                <p className="text-slate-600">
                  These Terms and your use of the Services shall be governed by and construed in accordance with
                  the laws of the State of Texas, without regard to its conflict of law provisions. Any legal
                  action or proceeding not subject to arbitration shall be brought exclusively in the state or
                  federal courts located in Travis County, Texas.
                </p>
              </div>

              {/* Termination */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">16. Termination</h2>
                <p className="text-slate-600 mb-4">
                  We may terminate or suspend your access to the Services immediately, without prior notice or
                  liability, for any reason, including if you breach these Terms. Upon termination, your right
                  to use the Services will cease immediately.
                </p>
                <p className="text-slate-600">
                  You may terminate your account at any time by contacting us or using the account settings.
                  Termination does not relieve you of any obligations incurred prior to termination, including
                  payment obligations.
                </p>
              </div>

              {/* Severability */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">17. Severability</h2>
                <p className="text-slate-600">
                  If any provision of these Terms is held to be invalid, illegal, or unenforceable, the remaining
                  provisions shall continue in full force and effect. The invalid provision shall be modified to
                  the minimum extent necessary to make it valid and enforceable while preserving its original
                  intent.
                </p>
              </div>

              {/* Entire Agreement */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">18. Entire Agreement</h2>
                <p className="text-slate-600">
                  These Terms, together with our Privacy Policy, Medical Disclaimer, and any other legal notices
                  published on our website, constitute the entire agreement between you and The Ketamine
                  Association regarding your use of the Services and supersede all prior agreements and
                  understandings.
                </p>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">19. Contact Us</h2>
                <p className="text-slate-600 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <p className="text-slate-700 mb-2">
                    <strong>The Ketamine Association</strong>
                  </p>
                  <p className="text-slate-600 mb-1">Legal Department</p>
                  <p className="text-slate-600 mb-1">123 Medical Center Drive, Suite 400</p>
                  <p className="text-slate-600 mb-1">Austin, TX 78701</p>
                  <p className="text-slate-600 mb-1">
                    Email: <a href="mailto:legal@ketamineassociation.org" className="text-teal-600 hover:text-teal-700">legal@ketamineassociation.org</a>
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

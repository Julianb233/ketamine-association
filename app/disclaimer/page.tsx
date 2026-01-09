'use client';

import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, Info, Shield, Heart } from 'lucide-react';

export default function MedicalDisclaimerPage() {
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
              Medical Disclaimer
            </h1>

            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Important information about the educational nature of our content
              and the limitations of information provided on this website.
            </p>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 sm:h-24">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Critical Disclaimer Banner */}
      <section className="py-8 bg-amber-50 border-b border-amber-200">
        <Container>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-900 mb-2">Important Notice</h2>
              <p className="text-amber-800">
                The information provided on this website is for educational and informational purposes only and
                should not be considered medical advice. Always consult with a qualified healthcare professional
                before making any decisions about your health or treatment options.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <Container size="md">
          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-slate-500 mb-8">
              <strong>Last Updated:</strong> January 8, 2026
            </p>

            <div className="space-y-12">
              {/* General Medical Disclaimer */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. General Medical Disclaimer</h2>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                  <p className="text-red-800 font-medium">
                    THE INFORMATION PROVIDED BY THE KETAMINE ASSOCIATION THROUGH THIS WEBSITE, INCLUDING BUT NOT
                    LIMITED TO TEXT, GRAPHICS, IMAGES, EDUCATIONAL MATERIALS, AND OTHER CONTENT, IS FOR GENERAL
                    INFORMATIONAL AND EDUCATIONAL PURPOSES ONLY. IT IS NOT INTENDED TO BE A SUBSTITUTE FOR
                    PROFESSIONAL MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT.
                  </p>
                </div>
                <p className="text-slate-600 mb-4">
                  Always seek the advice of your physician or other qualified healthcare provider with any
                  questions you may have regarding a medical condition, mental health condition, or treatment
                  options. Never disregard professional medical advice or delay in seeking it because of
                  something you have read on this website.
                </p>
                <p className="text-slate-600">
                  If you think you may have a medical emergency, call your doctor, go to the emergency department,
                  or call 911 immediately. The Ketamine Association does not recommend or endorse any specific
                  tests, physicians, products, procedures, opinions, or other information that may be mentioned
                  on this website.
                </p>
              </div>

              {/* No Doctor-Patient Relationship */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-teal-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">2. No Doctor-Patient Relationship</h2>
                </div>
                <p className="text-slate-600 mb-4">
                  Use of this website does not create a doctor-patient, therapist-patient, or other healthcare
                  provider-patient relationship between you and The Ketamine Association, its staff, or any
                  practitioners listed in our directory.
                </p>
                <p className="text-slate-600 mb-4">
                  The information provided through our website, educational materials, courses, and other
                  resources is not personalized medical advice and should not be relied upon as such. Your
                  individual health needs and circumstances require evaluation by a qualified healthcare
                  professional who can conduct a proper examination and review your complete medical history.
                </p>
                <p className="text-slate-600">
                  Any communication between you and The Ketamine Association, whether through our website,
                  email, phone, or other means, does not constitute a professional healthcare relationship.
                </p>
              </div>

              {/* Ketamine Therapy Information */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Info className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">3. About Ketamine Therapy Information</h2>
                </div>
                <p className="text-slate-600 mb-4">
                  Information about ketamine therapy provided on this website is intended for educational
                  purposes only. Ketamine is a controlled substance with specific regulatory requirements
                  that vary by jurisdiction.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">3.1 Regulatory Status</h3>
                <p className="text-slate-600 mb-4">
                  While ketamine is FDA-approved as an anesthetic, its use for treating depression, anxiety,
                  PTSD, chronic pain, and other conditions is considered &quot;off-label.&quot; Esketamine (Spravato)
                  is FDA-approved specifically for treatment-resistant depression. The regulatory landscape
                  for ketamine therapy continues to evolve.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">3.2 Risks and Side Effects</h3>
                <p className="text-slate-600 mb-4">
                  Ketamine therapy, like all medical treatments, carries potential risks and side effects.
                  These may include but are not limited to:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                  <li>Dissociative effects and altered perception</li>
                  <li>Elevated blood pressure and heart rate</li>
                  <li>Nausea and vomiting</li>
                  <li>Dizziness and drowsiness</li>
                  <li>Bladder and urinary tract issues with prolonged use</li>
                  <li>Potential for psychological dependence</li>
                  <li>Allergic reactions</li>
                  <li>Interactions with other medications</li>
                </ul>
                <p className="text-slate-600">
                  This is not a complete list of potential risks and side effects. A qualified healthcare
                  provider can provide comprehensive information about the risks and benefits specific to
                  your situation.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">3.3 Not Suitable for Everyone</h3>
                <p className="text-slate-600">
                  Ketamine therapy is not appropriate for all individuals or conditions. Certain medical
                  conditions, medications, and personal circumstances may contraindicate ketamine treatment.
                  Only a qualified healthcare provider can determine whether ketamine therapy is appropriate
                  for you after conducting a thorough evaluation.
                </p>
              </div>

              {/* Provider Directory Disclaimer */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Provider Directory Disclaimer</h2>
                <p className="text-slate-600 mb-4">
                  The Ketamine Association maintains a directory of healthcare providers who offer ketamine
                  therapy services. It is important to understand the following:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                  <li>
                    <strong>No Endorsement:</strong> Inclusion in our directory does not constitute an
                    endorsement, recommendation, or guarantee of any provider&apos;s qualifications, competence,
                    or quality of care.
                  </li>
                  <li>
                    <strong>Verification Limitations:</strong> While we verify certain credentials and
                    information provided by practitioners, we cannot guarantee the accuracy or completeness
                    of all information, and credentials may change after verification.
                  </li>
                  <li>
                    <strong>Your Responsibility:</strong> Patients are responsible for conducting their own
                    due diligence when selecting a healthcare provider, including verifying credentials,
                    reading reviews, and consulting with the provider directly.
                  </li>
                  <li>
                    <strong>No Liability:</strong> The Ketamine Association is not responsible for the
                    actions, omissions, or quality of care provided by any practitioners listed in our
                    directory.
                  </li>
                </ul>
              </div>

              {/* Educational Content Disclaimer */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Educational Content Disclaimer</h2>
                <p className="text-slate-600 mb-4">
                  Our educational materials, courses, certifications, and training programs are designed to
                  provide general information and professional development for healthcare providers. This
                  educational content:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                  <li>Is intended for licensed healthcare professionals as continuing education</li>
                  <li>Does not replace formal medical education, residency training, or clinical supervision</li>
                  <li>May not reflect the most current research or guidelines</li>
                  <li>Should be applied in clinical practice only with appropriate professional judgment</li>
                  <li>May not be applicable to all patient populations or clinical situations</li>
                </ul>
                <p className="text-slate-600">
                  Healthcare providers are responsible for using their professional judgment and staying
                  current with evolving standards of care in their specific practice area and jurisdiction.
                </p>
              </div>

              {/* Research and Clinical Trials */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Research and Clinical Information</h2>
                <p className="text-slate-600 mb-4">
                  Any research studies, clinical data, or scientific information referenced on our website
                  is provided for informational purposes only. Please note:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li>Research findings may not be generalizable to all populations</li>
                  <li>Study results may be preliminary or not yet replicated</li>
                  <li>Clinical outcomes can vary significantly between individuals</li>
                  <li>Published research may become outdated as new studies emerge</li>
                  <li>Some treatments discussed may still be experimental or under investigation</li>
                </ul>
              </div>

              {/* Mental Health Crisis */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">7. Mental Health Crisis Resources</h2>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
                  <p className="text-slate-700 font-medium mb-4">
                    If you or someone you know is experiencing a mental health crisis, please reach out for
                    immediate help:
                  </p>
                  <ul className="space-y-3 text-slate-600">
                    <li>
                      <strong>988 Suicide and Crisis Lifeline:</strong> Call or text{' '}
                      <a href="tel:988" className="text-teal-600 hover:text-teal-700 font-semibold">988</a>{' '}
                      (available 24/7)
                    </li>
                    <li>
                      <strong>Crisis Text Line:</strong> Text{' '}
                      <span className="font-semibold">HOME</span> to{' '}
                      <span className="font-semibold">741741</span>
                    </li>
                    <li>
                      <strong>Emergency Services:</strong> Call{' '}
                      <a href="tel:911" className="text-teal-600 hover:text-teal-700 font-semibold">911</a>{' '}
                      or go to your nearest emergency room
                    </li>
                    <li>
                      <strong>Veterans Crisis Line:</strong> Call{' '}
                      <a href="tel:988" className="text-teal-600 hover:text-teal-700 font-semibold">988</a>,
                      then press 1
                    </li>
                    <li>
                      <strong>SAMHSA National Helpline:</strong>{' '}
                      <a href="tel:1-800-662-4357" className="text-teal-600 hover:text-teal-700 font-semibold">
                        1-800-662-4357
                      </a>{' '}
                      (24/7, free, confidential)
                    </li>
                  </ul>
                </div>
                <p className="text-slate-600">
                  This website is not designed to provide crisis intervention services. If you are in crisis,
                  please contact one of the resources above or seek immediate professional help.
                </p>
              </div>

              {/* Testimonials and Success Stories */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Testimonials and Success Stories</h2>
                <p className="text-slate-600 mb-4">
                  Any testimonials, success stories, case studies, or patient experiences shared on our
                  website or in our materials represent individual results and experiences. These accounts:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li>Do not guarantee similar results for other individuals</li>
                  <li>May not be representative of all patient experiences</li>
                  <li>Should not be relied upon when making treatment decisions</li>
                  <li>May have been edited for clarity or brevity</li>
                  <li>May be compensated or incentivized in some cases</li>
                </ul>
              </div>

              {/* Third-Party Content */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Third-Party Content and Links</h2>
                <p className="text-slate-600 mb-4">
                  Our website may contain links to third-party websites, resources, or content. The Ketamine
                  Association does not:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li>Control or endorse the content of third-party websites</li>
                  <li>Guarantee the accuracy or completeness of third-party information</li>
                  <li>Accept responsibility for any products, services, or treatments offered by third parties</li>
                  <li>Assume liability for any damages arising from use of third-party resources</li>
                </ul>
              </div>

              {/* Limitation of Liability */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Limitation of Liability</h2>
                <p className="text-slate-600 mb-4">
                  TO THE FULLEST EXTENT PERMITTED BY LAW, THE KETAMINE ASSOCIATION, ITS OFFICERS, DIRECTORS,
                  EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY DAMAGES ARISING FROM:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                  <li>Reliance on any information provided on this website</li>
                  <li>Any errors, omissions, or inaccuracies in our content</li>
                  <li>Any treatment decisions made based on information from this website</li>
                  <li>Any healthcare services provided by practitioners listed in our directory</li>
                  <li>Any adverse outcomes from ketamine therapy or other treatments</li>
                </ul>
                <p className="text-slate-600">
                  This limitation applies regardless of the legal theory under which such damages are claimed,
                  including but not limited to negligence, strict liability, or any other legal theory.
                </p>
              </div>

              {/* Changes to Disclaimer */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Changes to This Disclaimer</h2>
                <p className="text-slate-600">
                  We reserve the right to modify this Medical Disclaimer at any time. Changes will be effective
                  immediately upon posting to our website. We encourage you to review this disclaimer
                  periodically. Your continued use of our website after any changes constitutes your acceptance
                  of the updated disclaimer.
                </p>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Contact Us</h2>
                <p className="text-slate-600 mb-4">
                  If you have any questions about this Medical Disclaimer, please contact us:
                </p>
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <p className="text-slate-700 mb-2">
                    <strong>The Ketamine Association</strong>
                  </p>
                  <p className="text-slate-600 mb-1">Medical Affairs Department</p>
                  <p className="text-slate-600 mb-1">123 Medical Center Drive, Suite 400</p>
                  <p className="text-slate-600 mb-1">Austin, TX 78701</p>
                  <p className="text-slate-600 mb-1">
                    Email: <a href="mailto:medical@ketamineassociation.org" className="text-teal-600 hover:text-teal-700">medical@ketamineassociation.org</a>
                  </p>
                  <p className="text-slate-600">
                    Phone: <a href="tel:+18005553582" className="text-teal-600 hover:text-teal-700">(800) 555-KETA</a>
                  </p>
                </div>
              </div>

              {/* Final Notice */}
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-teal-900 mb-3">Final Notice</h3>
                <p className="text-teal-800">
                  By using this website, you acknowledge that you have read and understood this Medical
                  Disclaimer. You agree that The Ketamine Association is not responsible for any actions
                  you take or decisions you make based on the information provided on this website.
                  Your health decisions should always be made in consultation with qualified healthcare
                  professionals who can evaluate your individual circumstances.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

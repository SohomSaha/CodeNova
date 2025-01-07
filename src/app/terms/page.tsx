import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-[#0a0a0f]/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Terms and Conditions</h1>
      <p className="mb-6 text-lg text-gray-300">
        Welcome to CodeNova. By accessing or using our website, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Acceptance of Terms</h2>
      <p className="text-gray-300 mb-4">
        By using our website, you agree to be bound by these terms. If you do not agree, you must not access or use the website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Use of the Website</h2>
      <p className="text-gray-300 mb-4">
        You may use our website only for lawful purposes and in accordance with these terms. You agree not to use the website:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300">
        <li>In any way that violates any applicable law or regulation</li>
        <li>To engage in any fraudulent or harmful activity</li>
        <li>To infringe upon the intellectual property rights of others</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Account Registration</h2>
      <p className="text-gray-300 mb-4">
        In order to use certain features of the website, you may be required to register an account. You agree to provide accurate and complete information during the registration process and to update your information as necessary.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Intellectual Property</h2>
      <p className="text-gray-300 mb-4">
        All content on the website, including text, graphics, logos, and software, is the property of CodeNova and is protected by intellectual property laws. You may not use any content without express permission.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
      <p className="text-gray-300 mb-4">
        CodeNova will not be liable for any damages arising from your use of the website, including indirect, incidental, or consequential damages.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Governing Law</h2>
      <p className="text-gray-300 mb-4">
        These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction in which CodeNova is based.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to These Terms</h2>
      <p className="text-gray-300 mb-4">
        We may update these Terms and Conditions at any time. Any changes will be posted on this page with an updated revision date.
      </p>

      <div className="mt-12 text-center">
        <Link href="/">
          <span className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-all">
            Back to Home
          </span>
        </Link>
      </div>
    </div>
  );
}

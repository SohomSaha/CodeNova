import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-[#0a0a0f]/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="mb-6 text-lg text-gray-300">
        At CodeNova, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
      <p className="text-gray-300 mb-4">
        We may collect personal information that you provide directly to us, such as when you create an account, fill out a form, or contact us. This information may include your name, email address, and any other details you submit.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
      <p className="text-gray-300 mb-4">
        We use the information we collect in the following ways:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300">
        <li>To provide, operate, and maintain our website</li>
        <li>To improve and personalize your experience</li>
        <li>To communicate with you, including sending updates and promotional materials</li>
        <li>To respond to inquiries and offer customer support</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Sharing Your Information</h2>
      <p className="text-gray-300 mb-4">
        We do not sell or rent your personal information to third parties. However, we may share information with service providers who perform services on our behalf, in compliance with applicable laws.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Security of Your Information</h2>
      <p className="text-gray-300 mb-4">
        We use administrative, technical, and physical security measures to protect your personal information. Despite our efforts, no security measures are completely impenetrable.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
      <p className="text-gray-300 mb-4">
        Depending on your location, you may have the right to access, correct, or delete your personal information. Please contact us if you wish to exercise these rights.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
      <p className="text-gray-300 mb-4">
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
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

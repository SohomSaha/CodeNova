"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useRouter } from 'next/navigation';
import { Mail, User, MessageSquare } from 'lucide-react';

interface FormData {
  from_name: string;
  to_name: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    from_name: '',
    to_name: '',
    message: '',
  });

  const [status, setStatus] = useState<string>('');
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Ensuring that we are on the client-side before using the router
    setIsMounted(true);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    const templateParams: Record<string, unknown> = {
      from_name: formData.from_name,
      to_name: formData.to_name,
      message: formData.message,
    };

    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        setStatus('Message sent successfully!');
        setFormData({ from_name: '', to_name: '', message: '' });

        // Redirect to home after a short delay
        setTimeout(() => {
          router.push('/');
        }, 2000);  // 2-second delay before redirect
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        setStatus('Failed to send message. Please try again.');
      });
  };
  if (!isMounted) return null;
  return (
    <div className="max-w-2xl mx-auto p-8 bg-[#0a0a0f]/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-800">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Get in Touch
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <label className="block text-sm font-medium text-blue-400">
            Your Name
          </label>
          <div className="flex items-center bg-gray-900/60 p-3 rounded-lg border border-gray-700 focus-within:border-blue-500 transition-all">
            <User className="w-5 h-5 text-blue-400 mr-3" />
            <input
              type="text"
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
              required
              className="w-full bg-transparent focus:outline-none text-white"
            />
          </div>
        </div>

        <div className="relative group">
          <label className="block text-sm font-medium text-blue-400">
            Recipient
          </label>
          <div className="flex items-center bg-gray-900/60 p-3 rounded-lg border border-gray-700 focus-within:border-blue-500 transition-all">
            <Mail className="w-5 h-5 text-blue-400 mr-3" />
            <input
              type="text"
              name="to_name"
              value={formData.to_name}
              onChange={handleChange}
              required
              className="w-full bg-transparent focus:outline-none text-white"
            />
          </div>
        </div>

        <div className="relative group">
          <label className="block text-sm font-medium text-blue-400">
            Your Message
          </label>
          <div className="flex items-start bg-gray-900/60 p-3 rounded-lg border border-gray-700 focus-within:border-blue-500 transition-all">
            <MessageSquare className="w-5 h-5 text-blue-400 mt-1 mr-3" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full bg-transparent focus:outline-none text-white resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium text-lg shadow-lg transform hover:scale-[1.03] transition-all duration-300"
        >
          Send Message
        </button>

        {status && (
          <p
            className={`text-center mt-4 ${
              status.includes('successfully')
                ? 'text-green-400'
                : 'text-red-400'
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
}

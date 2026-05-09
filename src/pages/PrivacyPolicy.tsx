import React from 'react';
import { motion } from 'framer-motion';

export const PrivacyPolicy: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16"
    >
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-8">Privacy Policy</h1>
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          When you make a purchase, we collect your email address to deliver the product. Payment information is processed securely by Gumroad and is not stored on our servers.
        </p>

        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          We use your email address to send you product updates, receipts, and occasional promotional emails if you opt-in. You can unsubscribe at any time.
        </p>

        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">3. Third-Party Services</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          We use Gumroad for payment processing and product delivery. Please refer to Gumroad's privacy policy for details on how they handle your data.
        </p>

        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">4. Cookies</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          We may use cookies to improve your browsing experience and analyze site traffic. You can disable cookies in your browser settings.
        </p>

        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">5. Contact Us</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          If you have any questions about this Privacy Policy, please contact us through our Contact page.
        </p>
      </div>
    </motion.div>
  );
};

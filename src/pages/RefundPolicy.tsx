import React from 'react';
import { motion } from 'framer-motion';

export const RefundPolicy: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16"
    >
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-8">Refund Policy</h1>
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">1. Digital Products</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Due to the nature of digital products, all sales are generally final. Once a product is downloaded, it cannot be returned.
        </p>

        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">2. Exceptions</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          We may offer refunds on a case-by-case basis if:
        </p>
        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 mb-6 space-y-2">
          <li>The product is defective or not as described.</li>
          <li>You accidentally purchased the same product twice.</li>
          <li>You have not downloaded the product yet.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">3. Requesting a Refund</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          To request a refund, please contact us within 14 days of your purchase. Include your order number and the reason for your request.
        </p>

        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">4. Processing Time</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          If your refund is approved, it will be processed through Gumroad. Please allow 5-10 business days for the funds to appear in your account.
        </p>

        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">5. Contact Us</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          If you have any questions about our Refund Policy, please contact us through our Contact page.
        </p>
      </div>
    </motion.div>
  );
};

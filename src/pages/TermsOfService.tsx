import React from 'react';
import { motion } from 'framer-motion';

export const TermsOfService: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16"
    >
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-8">Terms of Service</h1>
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">2. Digital Products</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          All products are digital downloads. No physical products will be shipped. Upon purchase, you will receive access to download the files.
        </p>

        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">3. License and Usage</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Unless otherwise stated, all products are for personal and commercial use in your own projects. You may not resell, redistribute, or share the source files.
        </p>

        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">4. Payment Processing</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Payments are securely processed through Gumroad. We do not store your credit card information on our servers.
        </p>

        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">5. Modifications</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          We reserve the right to modify these terms at any time. Your continued use of the site constitutes your acceptance of any changes.
        </p>
      </div>
    </motion.div>
  );
};

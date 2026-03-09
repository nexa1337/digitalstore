import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingCart, CheckCircle, Shield, ChevronRight, Star, Download, FileType, HardDrive, FileText, ExternalLink, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useProducts } from '../hooks/useProducts';
import { useCurrency } from '../context/CurrencyContext';
import { slugify } from '../utils/slugify';

const getDirectCheckoutLink = (url: string) => {
  if (!url) return '#';
  try {
    const parsedUrl = new URL(url);
    parsedUrl.searchParams.set('wanted', 'true');
    return parsedUrl.toString();
  } catch (e) {
    return url.includes('?') ? `${url}&wanted=true` : `${url}?wanted=true`;
  }
};

const formatMarkdown = (text: string | undefined) => {
  if (!text) return '';
  
  let formatted = text;
  
  // 1. Replace literal \n with actual newlines
  formatted = formatted.replace(/\\n/g, '\n');
  
  // 2. Fix headers: ensure they start on a new line and have a space after the hashes
  formatted = formatted.replace(/(^|\s)(#{1,6})\s*(?=[a-zA-Z0-9])/g, '\n\n$2 ');
  
  // 3. Fix list items: Match a dash or asterisk followed by optional spaces and a Capital letter or Number
  formatted = formatted.replace(/(^|\s)[-*]\s*([A-Z0-9])/g, '\n- $2');
  
  // 4. Fix numbered lists: Match a number and period followed by optional spaces and a Capital letter
  formatted = formatted.replace(/(^|\s)(\d+\.)\s*([A-Z0-9])/g, '\n$2 $3');
  
  // 5. Clean up any excessive newlines
  formatted = formatted.replace(/\n{3,}/g, '\n\n');
  
  return formatted.trim();
};

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { formatPrice } = useCurrency();
  const { products, loading } = useProducts();
  const [activeImage, setActiveImage] = useState(0);
  
  const product = products.find(p => p.id === id || slugify(p.title) === id);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Product not found</h2>
        <Link to="/shop" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 md:pt-28 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-8">
          <Link to="/shop" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-zinc-900 dark:text-white font-medium">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
          {/* Product Images Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            {/* Main Image */}
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={product.images[activeImage]}
                  alt={`${product.title} - Image ${activeImage + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-video rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImage === idx 
                      ? 'border-indigo-600 dark:border-indigo-400 opacity-100' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full">
                  {product.category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full">
                  <FileType className="w-4 h-4" />
                  {product.type}
                </span>
                <div className="flex items-center gap-1.5 px-3 py-1 text-sm font-medium bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-full">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  {product.rating} ({product.reviews})
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 text-sm font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full">
                  <Download className="w-4 h-4" />
                  {product.downloads.toLocaleString()}
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
                {product.title}
              </h1>
              
              <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                {product.shortDescription}
              </p>
              
              <div className="flex items-center gap-6 text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-6">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  <span>{product.size}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>{product.pages} Pages</span>
                </div>
              </div>
            </div>

            <div className="text-5xl font-bold text-zinc-900 dark:text-white mb-8">
              {formatPrice(product.priceUSD)}
            </div>

            <div className="space-y-4 mb-10 bg-zinc-50 dark:bg-[#18181b] p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800/80">
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                    <CheckCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 mb-10 bg-zinc-50 dark:bg-[#18181b] p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800/80">
              <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span><strong className="text-zinc-900 dark:text-white">Digital Download</strong> - Not a physical product</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span><strong className="text-zinc-900 dark:text-white">Instant delivery</strong> to your email and Gumroad Library</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Lifetime free updates</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <Shield className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Secure payment via Gumroad</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={getDirectCheckoutLink(product.gumroadLink)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-semibold text-lg transition-all flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.5)] hover:-translate-y-1"
              >
                <ShoppingCart className="w-6 h-6" />
                Buy Now on Gumroad
              </a>
              
              {product.livePreviewUrl && (
                <a
                  href={product.livePreviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-2xl font-semibold text-lg transition-all flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1"
                >
                  <ExternalLink className="w-6 h-6" />
                  Live Preview
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Full Description Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-16">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">Product Overview</h2>
            <div className="prose prose-lg prose-indigo dark:prose-invert max-w-none prose-img:rounded-2xl prose-img:shadow-md mb-12">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeRaw]}
              >
                {formatMarkdown(product.fullDescription)}
              </ReactMarkdown>
            </div>
            
            {/* Show remaining images in description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {product.images.slice(1).map((img, idx) => (
                  <div key={idx} className="rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm aspect-video relative">
                    <img
                      src={img}
                      alt={`${product.title} detail ${idx + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

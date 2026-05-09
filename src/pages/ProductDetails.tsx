import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingCart, CheckCircle, Shield, ChevronRight, Star, Download, FileType, HardDrive, FileText, ExternalLink, Loader2, Copy, Check, X, Mail, MessageCircle, Instagram } from 'lucide-react';
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
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isCihModalOpen, setIsCihModalOpen] = useState(false);
  
  const product = products.find(p => p.id === id || slugify(p.title) === id);

  const displayImages = product ? (product.images?.length ? product.images : [product.coverImage]) : [];

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

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
                  src={displayImages[activeImage]}
                  alt={`${product.title} - Main Image`}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>
            
            {/* Thumbnails */}
            {displayImages.length > 1 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
                {displayImages.map((img, idx) => (
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
                      src={img as string}
                      alt={`Thumbnail ${idx + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
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

            <div className="flex flex-col gap-4">
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
              
              {product.cihBankPaymentEnabled && (
                <button
                  onClick={() => setIsCihModalOpen(true)}
                  className="w-full py-5 bg-[#FF5100] hover:bg-[#E64900] text-white rounded-2xl font-semibold text-lg transition-all flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(255,81,0,0.3)] hover:shadow-[0_8px_30px_rgba(255,81,0,0.5)] hover:-translate-y-1"
                >
                  <img src="https://avantagescartescih.ma/wp-content/uploads/2025/01/logo.png.webp" alt="CIH Bank" className="w-6 h-6 object-contain bg-white rounded-sm p-0.5" />
                  Pay via CIH Bank
                </button>
              )}

              {/* Extra Services Notice */}
              <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 text-center leading-relaxed">
                  if need extra services like website installation or add content or anything can visite <a href="https://nexa1337.com" target="_blank" rel="noopener noreferrer" className="font-bold text-zinc-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition mx-1">N E X A 1337</a> or contact Support
                  <br />
                  <span className="inline-block mt-2 font-medium text-[11px] sm:text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">note : extra services not free paid. thanks you.</span>
                </p>
              </div>
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
            <div className="prose prose-lg prose-indigo dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-3xl prose-img:shadow-xl prose-img:border prose-img:border-zinc-200 dark:prose-img:border-zinc-800 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-blockquote:border-l-indigo-500 prose-blockquote:bg-indigo-50 dark:prose-blockquote:bg-indigo-500/10 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-li:marker:text-indigo-500 pb-12">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeRaw]}
              >
                {formatMarkdown(product.fullDescription)}
              </ReactMarkdown>
            </div>
            </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isCihModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-5 sm:p-6 md:p-8 max-w-lg w-full shadow-2xl relative border border-zinc-200 dark:border-zinc-800 my-auto max-h-[90vh] overflow-y-auto flex flex-col"
            >
              <button
                onClick={() => setIsCihModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="font-bold text-2xl text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                <img src="https://avantagescartescih.ma/wp-content/uploads/2025/01/logo.png.webp" alt="CIH Bank" className="w-8 h-8 object-contain rounded bg-white p-1" />
                Pay via CIH Bank
              </h3>
              
              <div className="space-y-3 mb-6">
                {[
                  { label: 'Titulaire', value: 'ANOUAR MAROUAN' },
                  { label: 'RIB', value: '230 815 2414040211007400 17' },
                  { label: 'IBAN', value: 'MA64 2308 1524 1404 0211 0074 0017' },
                  { label: 'Code SWIFT', value: 'CIHMMAMC' }
                ].map((item) => (
                  <div key={item.label} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-xl gap-1 sm:gap-2 w-full">
                    <span className="text-xs sm:text-sm text-zinc-500 font-medium">{item.label}</span>
                    <div className="flex items-center justify-between gap-3 w-full sm:w-auto">
                      <span className="text-zinc-900 dark:text-white font-mono break-all sm:break-normal font-semibold text-[13px] sm:text-sm md:text-base text-left sm:text-right">{item.value}</span>
                      <button
                        onClick={() => handleCopy(item.value, item.label)}
                        className="shrink-0 flex items-center justify-center p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                        title="Copy to clipboard"
                      >
                        {copiedField === item.label ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-xl p-4 mb-6 relative">
                <p className="text-xs sm:text-sm text-indigo-800 dark:text-indigo-300 font-medium text-center">
                  After completing the transfer, please send the receipt and your Product ID to confirm your order.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <span className="text-[10px] sm:text-xs text-indigo-600/70 dark:text-indigo-400/70 font-bold uppercase tracking-wider">Product ID:</span>
                  <div className="flex items-center gap-1.5">
                    <code className="px-2 py-1 bg-white dark:bg-black/20 rounded-md text-xs sm:text-sm font-mono text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 break-all text-center">
                      {product.id}
                    </code>
                    <button
                      onClick={() => handleCopy(product.id, 'ProductID')}
                      className="p-1.5 rounded hover:bg-white dark:hover:bg-black/20 text-indigo-600 dark:text-indigo-400 transition shrink-0"
                      title="Copy Product ID"
                    >
                      {copiedField === 'ProductID' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">Send receipt via</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a href={`https://wa.me/212723242286?text=${encodeURIComponent(`Hello, I would like to confirm my order for "${product.title}".\n\nMy Product ID is: ${product.id}\n\nHere is my receipt:`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition group border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-zinc-500 font-medium">WhatsApp</p>
                      <p className="text-sm text-zinc-900 dark:text-white font-semibold truncate">+212 723 242 286</p>
                    </div>
                  </a>
                  
                  <a href={`mailto:support@nexa1337.com?subject=${encodeURIComponent(`Order Confirmation - Product ID: ${product.id}`)}&body=${encodeURIComponent(`Hello,\n\nI would like to confirm my order for the product "${product.title}".\n\nProduct ID: ${product.id}\n\nPlease find my CIH transfer receipt attached.\n\nThank you.`)}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition group border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-zinc-500 font-medium">Email</p>
                      <p className="text-sm text-zinc-900 dark:text-white font-semibold truncate">Support</p>
                    </div>
                  </a>

                  <a href={`mailto:nexa1337agency@gmail.com?subject=${encodeURIComponent(`Order Confirmation - Product ID: ${product.id}`)}&body=${encodeURIComponent(`Hello,\n\nI would like to confirm my order for the product "${product.title}".\n\nProduct ID: ${product.id}\n\nPlease find my CIH transfer receipt attached.\n\nThank you.`)}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition group border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-zinc-500 font-medium">Gmail</p>
                      <p className="text-sm text-zinc-900 dark:text-white font-semibold truncate">Agency</p>
                    </div>
                  </a>
                  
                  <a href="https://www.instagram.com/nexa1337" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition group border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-[#E1306C]/10 flex items-center justify-center text-[#E1306C] group-hover:scale-110 transition">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-zinc-500 font-medium">Instagram</p>
                      <p className="text-sm text-zinc-900 dark:text-white font-semibold truncate">@nexa1337</p>
                    </div>
                  </a>
                </div>

                {/* Extra Services Notice */}
                <div className="mt-6 pt-5 border-t border-zinc-200 dark:border-zinc-800">
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 text-center leading-relaxed">
                    if need extra services like website installation or add content or anything can visite <a href="https://nexa1337.com" target="_blank" rel="noopener noreferrer" className="font-bold text-zinc-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition mx-1">N E X A 1337</a> or contact Support
                    <br />
                    <span className="inline-block mt-2 font-medium text-[11px] sm:text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">note : extra services not free paid. thanks you.</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

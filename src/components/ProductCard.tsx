import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Star, Download, FileText, HardDrive, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useCurrency } from '../context/CurrencyContext';
import { slugify } from '../utils/slugify';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { formatPrice } = useCurrency();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group flex flex-col bg-white dark:bg-[#18181b] rounded-3xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.2)] border border-zinc-100 dark:border-zinc-800/80 transition-all duration-500"
    >
      {/* Main Image Container */}
      <Link to={`/product/${slugify(product.title)}`} className="relative w-full aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-zinc-100 dark:bg-zinc-800 block">
        <img
          src={product.coverImage || product.images[0]}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {/* Overlay gradient for better text readability if needed, or just modern aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="px-3 py-1.5 text-xs font-semibold bg-white/95 dark:bg-[#18181b]/95 backdrop-blur-md text-zinc-900 dark:text-white rounded-full shadow-sm w-fit">
            {product.category}
          </span>
          <span className="px-3 py-1 text-[10px] font-medium bg-indigo-600/90 backdrop-blur-md text-white rounded-full shadow-sm w-fit uppercase tracking-wider">
            {product.type}
          </span>
          <span className="px-3 py-1 text-[10px] font-medium bg-emerald-500/90 backdrop-blur-md text-white rounded-full shadow-sm w-fit uppercase tracking-wider mt-1">
            Digital Download
          </span>
        </div>
        
        <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="w-10 h-10 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-lg">
            <ArrowUpRight className="w-5 h-5 text-zinc-900 dark:text-white" />
          </div>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-3 mb-3">
          <Link to={`/product/${slugify(product.title)}`} className="flex-grow min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {product.title}
            </h3>
          </Link>
          <span className="text-lg font-bold text-zinc-900 dark:text-white shrink-0 mt-0.5">
            {formatPrice(product.priceUSD)}
          </span>
        </div>
        
        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 flex-grow mb-4">
          {product.shortDescription}
        </p>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5 shrink-0">
            <HardDrive className="w-3.5 h-3.5" />
            <span>{product.size}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <FileText className="w-3.5 h-3.5" />
            <span>{product.pages} Pages</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">
            <Zap className="w-3.5 h-3.5 fill-emerald-600 dark:fill-emerald-400" />
            <span>Instant</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800/80 mt-auto">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {product.rating} <span className="text-zinc-400 dark:text-zinc-500 font-normal">({product.reviews})</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">{product.downloads.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

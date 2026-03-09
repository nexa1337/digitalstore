import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { ChevronLeft, ChevronRight, Search, Filter, X, Loader2 } from 'lucide-react';

export const Shop: React.FC = () => {
  const { products, loading } = useProducts();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const maxPrice = useMemo(() => {
    if (products.length === 0) return 100;
    return Math.max(100, Math.ceil(Math.max(...products.map(p => p.priceUSD))));
  }, [products]);

  const [priceRange, setPriceRange] = useState<number>(100);
  
  // Update price range when products load
  React.useEffect(() => {
    setPriceRange(maxPrice);
  }, [maxPrice]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const productsPerPage = 6;

  const categories = ['All', 'Free', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      let matchesCategory = false;
      if (activeCategory === 'All') {
        matchesCategory = true;
      } else if (activeCategory === 'Free') {
        matchesCategory = p.priceUSD === 0;
      } else {
        matchesCategory = p.category === activeCategory;
      }
      
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.fullDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = p.priceUSD <= priceRange;
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [products, activeCategory, searchQuery, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-24 pb-12 md:pt-28 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 lg:mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Shop Digital Assets</h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Browse our complete collection of premium templates, UI kits, and digital tools.
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <span className="text-zinc-600 dark:text-zinc-400 text-sm font-medium">
            {filteredProducts.length} products
          </span>
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium text-zinc-900 dark:text-white shadow-sm"
          >
            <Filter className="w-4 h-4" />
            {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Sidebar - Smart Filters */}
          <div className={`w-full lg:w-80 shrink-0 ${isFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white dark:bg-[#18181b] p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 sticky top-24 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-zinc-900 dark:text-white" />
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Smart Filters</h2>
                </div>
                {isFiltersOpen && (
                  <button onClick={() => setIsFiltersOpen(false)} className="lg:hidden p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-zinc-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Categories</label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        activeCategory === category 
                          ? 'bg-indigo-600 border-indigo-600' 
                          : 'border-zinc-300 dark:border-zinc-600 group-hover:border-indigo-500'
                      }`}>
                        {activeCategory === category && <div className="w-2 h-2 bg-white rounded-sm" />}
                      </div>
                      <span className={`text-sm transition-colors ${
                        activeCategory === category 
                          ? 'text-zinc-900 dark:text-white font-medium' 
                          : 'text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200'
                      }`}>
                        {category}
                      </span>
                      <input 
                        type="radio" 
                        name="category" 
                        className="hidden"
                        checked={activeCategory === category}
                        onChange={() => { setActiveCategory(category); setCurrentPage(1); }}
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Max Price</label>
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">${priceRange}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  step="5"
                  value={priceRange}
                  onChange={(e) => { setPriceRange(Number(e.target.value)); setCurrentPage(1); }}
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                  <span>$0</span>
                  <span>${maxPrice}+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-32 bg-white dark:bg-[#18181b] rounded-3xl border border-zinc-200 dark:border-zinc-800">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-[#18181b] rounded-3xl border border-zinc-200 dark:border-zinc-800">
                <p className="text-zinc-500 dark:text-zinc-400 text-lg">No products found matching your criteria.</p>
                <button 
                  onClick={() => { setActiveCategory('All'); setSearchQuery(''); setPriceRange(100); }}
                  className="mt-4 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                  {currentProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-600 dark:text-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    
                    <div className="hidden sm:flex items-center gap-2">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handlePageChange(i + 1)}
                          className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
                            currentPage === i + 1
                              ? 'bg-indigo-600 text-white'
                              : 'bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-600 dark:text-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                      Next Page
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

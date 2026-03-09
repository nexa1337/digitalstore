import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, CreditCard, Sparkles, Star, RefreshCw, CheckCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
  const { products, loading } = useProducts();
  const displayProducts = products.slice(0, 6);

  return (
    <div className="flex flex-col w-full">
      {/* Modern Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-20 overflow-hidden bg-white dark:bg-[#09090b]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.15),transparent_50%)] -z-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="flex flex-col items-start text-left pt-10 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-sm font-medium text-indigo-600 dark:text-indigo-400 shadow-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Empowering Digital Growth for Modern Brands</span>
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-6 leading-[1.1]"
              >
                Smart Digital <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 animate-gradient">
                  Solutions
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-xl mb-8 leading-relaxed"
              >
                We help brands grow online through data-driven marketing, custom web development, and smart AI automation tools tailored to your business.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              >
                <Link
                  to="/shop"
                  className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20"
                >
                  Explore Services
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="https://nexa1337.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-[#18181b] text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-full font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex items-center justify-center"
                >
                  Visit Main Website
                </a>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-10 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#09090b] bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p>Trusted by <span className="font-semibold text-zinc-900 dark:text-white">500+</span> modern brands</p>
              </motion.div>
            </div>

            {/* Right Content - Animated Floating Elements */}
            <div className="relative h-[500px] lg:h-[600px] hidden md:block">
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 w-[300px] bg-white dark:bg-[#18181b] p-6 rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 z-20"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white">AI Automation</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Workflow & Chatbots</p>
                  </div>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 mb-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-indigo-500 h-2 rounded-full" 
                  />
                </div>
                <p className="text-xs text-right text-zinc-500 font-medium">85% Efficiency Boost</p>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 left-0 w-[320px] bg-white dark:bg-[#18181b] p-6 rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 z-30"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-2xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white">Web Development</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Custom Sites & E-Commerce</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md text-xs font-medium text-zinc-600 dark:text-zinc-300">React</span>
                  <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md text-xs font-medium text-zinc-600 dark:text-zinc-300">Tailwind</span>
                  <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md text-xs font-medium text-zinc-600 dark:text-zinc-300">Next.js</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/10 dark:to-purple-500/10 rounded-full blur-3xl -z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Important Section (Value Proposition) */}
      <section className="py-24 bg-zinc-900 dark:bg-[#09090b] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose N E X A 1337</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              We provide the highest quality digital assets with a focus on developer experience and design excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Star, title: "Premium Quality", desc: "Every product is meticulously crafted to meet the highest industry standards." },
              { icon: Zap, title: "Instant Access", desc: "Download your files immediately after purchase. No waiting required." },
              { icon: Shield, title: "Secure Payments", desc: "100% secure checkout powered by Gumroad's robust infrastructure." },
              { icon: RefreshCw, title: "Lifetime Updates", desc: "Pay once and get free updates for the lifetime of the product." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section with Show More */}
      <section className="py-24 bg-zinc-50 dark:bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">Trending Products</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Discover our most popular digital assets, loved by thousands of creators worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              </div>
            ) : (
              displayProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            )}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center"
          >
            <Link
              to="/shop"
              className="px-8 py-4 bg-white dark:bg-[#18181b] text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-full font-semibold hover:shadow-lg hover:border-indigo-500/30 transition-all flex items-center gap-3 group"
            >
              Show More Products 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-24 bg-white dark:bg-[#18181b] border-t border-zinc-100 dark:border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Getting your hands on our premium digital products is simple, fast, and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-3xl flex items-center justify-center mb-6 rotate-3 hover:rotate-6 transition-transform">
                <CheckCircle className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">1. Browse & Select</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Find the perfect template, UI kit, or asset for your next project from our curated collection.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-3xl flex items-center justify-center mb-6 -rotate-3 hover:-rotate-6 transition-transform">
                <CreditCard className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">2. Secure Checkout</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Pay securely via Gumroad using PayPal, Credit Card, or Apple/Google Pay.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-3xl flex items-center justify-center mb-6 rotate-3 hover:rotate-6 transition-transform">
                <Zap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">3. Instant Access</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Download your files immediately after purchase. Get lifetime updates for free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-24 bg-zinc-50 dark:bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Our Location</h2>
            <p className="text-zinc-600 dark:text-zinc-400">Come visit our studio in Morocco.</p>
          </div>
          <div className="w-full h-[400px] rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm relative group">
            <div className="absolute inset-0 bg-zinc-900/5 group-hover:bg-transparent transition-colors pointer-events-none z-10" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.484313352593!2d-6.832365123974353!3d34.03144567316487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76b146a4caac9%3A0xdc0f711f384b0c52!2sN%20E%20X%20A%201337%20-%20Digital%20Agency!5e0!3m2!1sen!2sma!4v1772884373785!5m2!1sen!2sma"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
              className="relative z-0"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

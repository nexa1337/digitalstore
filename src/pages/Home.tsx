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
      {/* Modern Interactive Hero Section */}
      <section className="relative min-h-[95vh] flex items-center pt-24 pb-20 overflow-hidden bg-white dark:bg-[#050505]">
        {/* Interactive Gradient Background */}
        <div className="absolute inset-0 pointer-events-none w-full h-full">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 dark:bg-indigo-600/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/20 dark:bg-purple-600/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-10 mt-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Content */}
            <div className="flex-1 flex flex-col items-start text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-8 relative group cursor-pointer"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500" />
                <div className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-medium shadow-sm">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping bg-indigo-400 absolute inline-flex h-full w-full rounded-full opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                  </span>
                  <span className="text-zinc-700 dark:text-zinc-300">Empowering Digital Growth</span>
                  <motion.div 
                    animate={{ x: [0, 5, 0] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <ArrowRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                  </motion.div>
                </div>
              </motion.div>

              <div className="overflow-hidden mb-6">
                <motion.h1
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-6xl md:text-7xl lg:text-[5rem] font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.05]"
                >
                  Create Your <br />
                  <span className="relative inline-block mt-2">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] animate-gradient">
                      Digital Legacy
                    </span>
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
                      className="absolute -bottom-2 left-0 w-full h-[6px] bg-indigo-500/30 rounded-full origin-left"
                    />
                  </span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-xl mb-10 leading-relaxed font-light"
              >
                We help modern brands scale through high-performance web development, 
                data-driven design, and highly interactive user experiences.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
              >
                <Link
                  to="/shop"
                  className="group relative w-full sm:w-auto overflow-hidden rounded-full p-[1px] shadow-2xl transition hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-80 group-hover:opacity-100 group-hover:bg-[length:200%_auto] animate-gradient transition duration-500" />
                  <div className="relative flex items-center justify-center gap-2 rounded-full bg-white dark:bg-zinc-950 px-8 py-4 transition duration-300 group-hover:bg-opacity-0 text-indigo-600 dark:text-white group-hover:text-white text-base font-semibold">
                    Explore Services
                    <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                  </div>
                </Link>
                <a
                  href="https://nexa1337.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-transparent px-8 py-4 text-base font-semibold text-zinc-900 dark:text-white transition duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700"
                >
                  Visit Main Website
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="mt-14 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-sm text-zinc-500 dark:text-zinc-400"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -5, scale: 1.1, zIndex: 10 }}
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-[#050505] bg-zinc-200 dark:bg-zinc-800 overflow-hidden relative shadow-sm transition-colors cursor-pointer"
                    >
                      <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="User" className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p>Trusted by <span className="font-bold text-zinc-900 dark:text-white">500+</span> companies</p>
                </div>
              </motion.div>
            </div>

            {/* Right Content - Modern Interactive Graphic */}
            <div className="flex-1 relative w-full h-[500px] lg:h-[650px] hidden md:flex items-center justify-center perspective-[2000px]">
              {/* Center Glowing Sphere */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 90, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-64 h-64 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-3xl opacity-40 mix-blend-screen"
              />

              {/* Floating Dashboard Card */}
              <motion.div
                animate={{ y: [-15, 15, -15], rotateY: [-5, 5, -5], rotateX: [5, -5, 5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-20 w-[90%] max-w-[420px] rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 p-6 backdrop-blur-2xl shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
                
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Performance</p>
                      <p className="font-bold text-zinc-900 dark:text-white">99.9% Optimal</p>
                    </div>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="h-8 px-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center text-xs font-bold ring-1 ring-inset ring-green-500/20"
                  >
                    +24.5%
                  </motion.div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Frontend Render", value: "0.2s", progress: 95 },
                    { label: "API Response", value: "45ms", progress: 88 },
                    { label: "Interactivity", value: "100%", progress: 100 }
                  ].map((stat, i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-zinc-600 dark:text-zinc-300 font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{stat.label}</span>
                        <span className="font-mono text-zinc-900 dark:text-white font-semibold">{stat.value}</span>
                      </div>
                      <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.progress}%` }}
                          transition={{ duration: 1.5, delay: 0.5 + (i * 0.2), ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 relative"
                        >
                          <div className="absolute inset-0 bg-white/20 w-full h-full -skew-x-12 transform translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Smaller Floating Element 1 */}
              <motion.div
                animate={{ y: [10, -20, 10], x: [10, -10, 10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-10 right-4 z-30 p-4 rounded-2xl bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl border border-white/30 dark:border-zinc-700 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="pr-2">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Security</p>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">Enterprise Grade</p>
                  </div>
                </div>
              </motion.div>

              {/* Smaller Floating Element 2 */}
              <motion.div
                animate={{ y: [-15, 10, -15], rotate: [-5, 5, -5] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-12 left-4 z-30 flex items-center gap-3 p-3 rounded-2xl bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl border border-white/30 dark:border-zinc-700 shadow-xl"
              >
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center ring-2 ring-white dark:ring-zinc-900 z-20">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center ring-2 ring-white dark:ring-zinc-900 z-10">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="pr-2">
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">Award Winning</p>
                  <p className="text-[10px] text-zinc-500">Design Agency</p>
                </div>
              </motion.div>
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

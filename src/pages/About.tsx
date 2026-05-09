import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CreditCard, Zap, BarChart3, Globe, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const growthData = [
  { month: 'Jan', clients: 10, revenue: 15000 },
  { month: 'Feb', clients: 15, revenue: 22000 },
  { month: 'Mar', clients: 25, revenue: 35000 },
  { month: 'Apr', clients: 40, revenue: 55000 },
  { month: 'May', clients: 65, revenue: 85000 },
  { month: 'Jun', clients: 100, revenue: 140000 },
  { month: 'Jul', clients: 150, revenue: 210000 },
];

export const About: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-white dark:bg-[#09090b]">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.15),transparent_50%)] -z-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-6">
              About N E X A 1337
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-6">
              Empowering Digital Growth <br className="hidden md:block" />
              for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Modern Brands</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-10">
              We are a digital agency specializing in AI, websites, marketing, and automation. From Morocco to the world, we drive digital growth and help businesses scale efficiently.
            </p>
            <a
              href="https://nexa1337.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-zinc-900/20 dark:shadow-white/10"
            >
              Visit Our Main Agency Site
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Smart Digital Solutions */}
      <section className="py-20 bg-zinc-50 dark:bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">Smart Digital Solutions</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              We provide comprehensive services to transform your ideas into digital impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#18181b] p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
            >
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Digital Marketing</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">We help brands grow online through data-driven marketing, audience targeting, and creative campaigns that convert.</p>
              <ul className="space-y-3">
                {['SEO Optimization', 'Social Media Strategy', 'Content Campaigns', 'Paid Ads (Google & Meta)'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-[#18181b] p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
            >
              <div className="w-14 h-14 bg-purple-50 dark:bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Web Development</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">We build fast, modern, and responsive websites that turn visitors into customers and strengthen your digital identity.</p>
              <ul className="space-y-3">
                {['Business Websites', 'E-Commerce Platforms', 'Landing Pages', 'UX / UI Design'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-[#18181b] p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
            >
              <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Cpu className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Automation & AI</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">Automate your workflow, save time, and improve efficiency with smart AI tools tailored to your business.</p>
              <ul className="space-y-3">
                {['Process Automation', 'Chatbots & Support', 'Data Analytics', 'AI Integrations'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Growth Chart Section */}
      <section className="py-20 bg-white dark:bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6">Data-Driven Growth</h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                At N E X A 1337, we don't just build websites; we build growth engines. Our strategies are backed by data, ensuring that every campaign, automation, and design decision directly contributes to your bottom line.
              </p>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                The chart illustrates the typical growth trajectory of our clients after implementing our full-stack digital solutions, combining SEO, AI automation, and optimized web presence.
              </p>
              
              <div className="flex gap-8">
                <div>
                  <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">500+</div>
                  <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">85%</div>
                  <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Efficiency Boost</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-50 dark:bg-[#18181b] p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">Client Revenue Growth (Avg)</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.2} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}k`} dx={-10} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
                      itemStyle={{ color: '#818cf8' }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 bg-zinc-50 dark:bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">Our Process Roadmap</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              How we take your brand from concept to digital dominance.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2" />

            {[
              { phase: "Phase 1", title: "Discovery & Strategy", desc: "We analyze your business, target audience, and competitors to craft a data-driven digital strategy." },
              { phase: "Phase 2", title: "Design & Development", desc: "Our team builds your custom website, landing pages, and brand identity with a focus on UX/UI." },
              { phase: "Phase 3", title: "Automation & AI Setup", desc: "We integrate smart chatbots, workflow automations, and AI agents to streamline your operations." },
              { phase: "Phase 4", title: "Launch & Growth", desc: "We deploy digital marketing campaigns, manage social media, and optimize for continuous growth." }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex items-center justify-between md:justify-normal gap-8 mb-12 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[28px] md:left-1/2 w-10 h-10 bg-white dark:bg-[#18181b] border-4 border-indigo-500 rounded-full -translate-x-1/2 flex items-center justify-center z-10 shadow-lg">
                  <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full" />
                </div>

                {/* Content */}
                <div className={`w-full ml-16 md:ml-0 md:w-[calc(50%-3rem)] ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className="bg-white dark:bg-[#18181b] p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2 block">{step.phase}</span>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">{step.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packs */}
      <section className="py-20 bg-white dark:bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">NEXA1337 Packs</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Smart Pricing for Smart Businesses. Choose the pack that fits your growth stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Pack */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-50 dark:bg-[#121214] p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex flex-col"
            >
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Starter Pack</h3>
              <p className="text-zinc-500 dark:text-zinc-400 mb-6">Perfect for new businesses establishing their online presence.</p>
              <ul className="space-y-4 mb-8 flex-grow">
                {['Business website (1–3 pages)', 'Custom logo & brand kit', 'WhatsApp chatbot setup', 'Social media setup (3 platforms)', 'Basic SEO optimization', '12-month hosting & domain'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="https://nexa1337.com" target="_blank" rel="noopener noreferrer" className="w-full py-3 px-4 bg-white dark:bg-[#18181b] text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl font-semibold text-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                Get Started
              </a>
            </motion.div>

            {/* Professional Pack */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-indigo-600 p-8 rounded-3xl border border-indigo-500 shadow-xl shadow-indigo-500/20 flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Most Popular</div>
              <h3 className="text-2xl font-bold text-white mb-2">Professional Pack</h3>
              <p className="text-indigo-200 mb-6">For growing brands ready to automate and scale.</p>
              <ul className="space-y-4 mb-8 flex-grow">
                {['Full website (5–8 pages + blog)', 'AI chatbot + automation system', 'Social media management (4 platforms)', 'Digital marketing campaigns', 'Monthly analytics report', 'Premium WooCommerce store', 'SEO + ads optimization'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-white">
                    <CheckCircle2 className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="https://nexa1337.com" target="_blank" rel="noopener noreferrer" className="w-full py-3 px-4 bg-white text-indigo-600 rounded-xl font-bold text-center hover:bg-indigo-50 transition-colors">
                Get Started
              </a>
            </motion.div>

            {/* Enterprise Pack */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-50 dark:bg-[#121214] p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex flex-col"
            >
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Enterprise Pack</h3>
              <p className="text-zinc-500 dark:text-zinc-400 mb-6">Comprehensive digital ecosystem for established companies.</p>
              <ul className="space-y-4 mb-8 flex-grow">
                {['Custom website or app (React, etc.)', 'AI chatbot with database integration', 'Advanced media buying & ads', 'Full digital ecosystem setup', '12-month ad management', 'Workflow optimization system', 'Dedicated NEXA team manager'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="https://nexa1337.com" target="_blank" rel="noopener noreferrer" className="w-full py-3 px-4 bg-white dark:bg-[#18181b] text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl font-semibold text-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                Get Started
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

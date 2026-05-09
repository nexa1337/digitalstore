import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, TrendingUp, TrendingDown, AlertCircle, Info, PieChart, Target } from 'lucide-react';

export const ProfitCalculator: React.FC = () => {
  const [sellingPrice, setSellingPrice] = useState<string | number>('50');
  const [costToProduce, setCostToProduce] = useState<string | number>('0');
  const [adSpendPerSale, setAdSpendPerSale] = useState<string | number>('10');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  
  // Calculated values
  const [gumroadFee, setGumroadFee] = useState<number>(0);
  const [paymentProcessingFee, setPaymentProcessingFee] = useState<number>(0);
  const [totalFees, setTotalFees] = useState<number>(0);
  const [netProfit, setNetProfit] = useState<number>(0);
  const [profitMargin, setProfitMargin] = useState<number>(0);
  const [breakEvenCpa, setBreakEvenCpa] = useState<number>(0);
  const [breakEvenRoas, setBreakEvenRoas] = useState<number>(0);

  useEffect(() => {
    const sp = Number(sellingPrice) || 0;
    const cp = Number(costToProduce) || 0;
    const ad = Number(adSpendPerSale) || 0;

    // Gumroad takes a flat 10% fee
    const gumroad = sp * 0.10;
    
    // Payment processing fees (approximate standard rates)
    // Card (Stripe/Gumroad default): ~2.9% + $0.30
    // PayPal: ~3.49% + $0.49
    let processing = 0;
    if (paymentMethod === 'card') {
      processing = (sp * 0.029) + 0.30;
    } else {
      processing = (sp * 0.0349) + 0.49;
    }

    const totalPlatformFees = gumroad + processing;
    const totalCosts = totalPlatformFees + cp + ad;
    const profit = sp - totalCosts;
    const margin = sp > 0 ? (profit / sp) * 100 : 0;

    // Advanced Metrics
    const maxCpa = sp - totalPlatformFees - cp;
    const minRoas = maxCpa > 0 ? sp / maxCpa : 0;

    setGumroadFee(gumroad);
    setPaymentProcessingFee(processing);
    setTotalFees(totalPlatformFees);
    setNetProfit(profit);
    setProfitMargin(margin);
    setBreakEvenCpa(Math.max(0, maxCpa));
    setBreakEvenRoas(minRoas);
  }, [sellingPrice, costToProduce, adSpendPerSale, paymentMethod]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  // Calculate percentages for the stacked bar chart
  const sp = Number(sellingPrice) || 0;
  const cp = Number(costToProduce) || 0;
  const ad = Number(adSpendPerSale) || 0;

  const safePrice = sp > 0 ? sp : 1;
  const gumroadPct = (gumroadFee / safePrice) * 100;
  const processingPct = (paymentProcessingFee / safePrice) * 100;
  const adSpendPct = (ad / safePrice) * 100;
  const costPct = (cp / safePrice) * 100;
  const profitPct = Math.max(0, (netProfit / safePrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16"
    >
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center justify-center gap-3">
          <Calculator className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600 dark:text-indigo-400" />
          Smart Profit Calculator
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto px-4">
          Understand exactly where your money goes. We calculate Gumroad's 10% fee, payment processing costs, and your ad spend to reveal your true profit margin.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Input Section */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#1a1a1c] rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-indigo-500" />
              Revenue & Costs
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Selling Price (USD)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-zinc-400 font-medium">$</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    className="block w-full pl-8 pr-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-[#121214] text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Cost to Produce (Per Unit)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-zinc-400 font-medium">$</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={costToProduce}
                    onChange={(e) => setCostToProduce(e.target.value)}
                    className="block w-full pl-8 pr-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-[#121214] text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <p className="text-xs text-zinc-500 mt-1.5">For digital products, this is usually $0.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Ad Spend Per Sale (CPA)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-zinc-400 font-medium">$</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={adSpendPerSale}
                    onChange={(e) => setAdSpendPerSale(e.target.value)}
                    className="block w-full pl-8 pr-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-[#121214] text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <p className="text-xs text-zinc-500 mt-1.5">Average cost to acquire one customer via ads.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Customer Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`py-3 px-4 rounded-xl border text-sm font-medium transition-colors ${
                      paymentMethod === 'card'
                        ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-600 dark:border-indigo-500 text-indigo-700 dark:text-indigo-400'
                        : 'bg-zinc-50 dark:bg-[#121214] border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    Credit Card
                  </button>
                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className={`py-3 px-4 rounded-xl border text-sm font-medium transition-colors ${
                      paymentMethod === 'paypal'
                        ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-600 dark:border-indigo-500 text-indigo-700 dark:text-indigo-400'
                        : 'bg-zinc-50 dark:bg-[#121214] border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    PayPal
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Ad Metrics */}
          <div className="bg-indigo-50 dark:bg-indigo-500/5 rounded-2xl p-5 sm:p-6 border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
            <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-300 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Ad Targets (Break-even)
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="group relative flex items-center gap-1.5">
                  <span className="text-sm font-medium text-indigo-800 dark:text-indigo-400">Max CPA</span>
                  <Info className="w-3.5 h-3.5 text-indigo-400 cursor-help" />
                  <div className="absolute bottom-full left-0 mb-2 w-64 p-2 bg-zinc-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    The maximum amount you can spend on ads to acquire one customer without losing money.
                  </div>
                </div>
                <span className="font-bold text-indigo-900 dark:text-indigo-300">{formatCurrency(breakEvenCpa)}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="group relative flex items-center gap-1.5">
                  <span className="text-sm font-medium text-indigo-800 dark:text-indigo-400">Min ROAS</span>
                  <Info className="w-3.5 h-3.5 text-indigo-400 cursor-help" />
                  <div className="absolute bottom-full left-0 mb-2 w-64 p-2 bg-zinc-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    Return on Ad Spend. You need at least this ROAS to break even. E.g., {breakEvenRoas.toFixed(2)}x means you need ${(breakEvenRoas * 1).toFixed(2)} in sales for every $1 spent on ads.
                  </div>
                </div>
                <span className="font-bold text-indigo-900 dark:text-indigo-300">{breakEvenRoas.toFixed(2)}x</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-[#1a1a1c] rounded-2xl p-5 sm:p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm h-full flex flex-col">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-indigo-500" />
              Profit Breakdown
            </h2>

            {/* Visual Bar Chart */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Where your money goes</span>
                <span className="text-zinc-500">{formatCurrency(sp)} Total</span>
              </div>
              <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                {gumroadPct > 0 && <div style={{ width: `${gumroadPct}%` }} className="bg-blue-500" title="Gumroad Fee" />}
                {processingPct > 0 && <div style={{ width: `${processingPct}%` }} className="bg-purple-500" title="Processing Fee" />}
                {adSpendPct > 0 && <div style={{ width: `${adSpendPct}%` }} className="bg-amber-500" title="Ad Spend" />}
                {costPct > 0 && <div style={{ width: `${costPct}%` }} className="bg-orange-500" title="Production Cost" />}
                {profitPct > 0 && <div style={{ width: `${profitPct}%` }} className="bg-emerald-500" title="Net Profit" />}
              </div>
              <div className="flex flex-wrap gap-3 mt-3 text-xs text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Gumroad</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Processing</div>
                {adSpendPct > 0 && <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Ads</div>}
                {costPct > 0 && <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Cost</div>}
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Profit</div>
              </div>
            </div>
            
            <div className="space-y-3 flex-grow">
              <div className="flex justify-between items-center py-2.5 border-b border-zinc-100 dark:border-zinc-800/50">
                <span className="text-zinc-600 dark:text-zinc-400">Selling Price</span>
                <span className="font-medium text-zinc-900 dark:text-white">{formatCurrency(sp)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2.5 border-b border-zinc-100 dark:border-zinc-800/50 text-zinc-700 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Gumroad Fee (10%)</span>
                </div>
                <span className="text-red-500 dark:text-red-400">-{formatCurrency(gumroadFee)}</span>
              </div>

              <div className="flex justify-between items-center py-2.5 border-b border-zinc-100 dark:border-zinc-800/50 text-zinc-700 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>Processing ({paymentMethod === 'card' ? '2.9% + 30¢' : '3.49% + 49¢'})</span>
                </div>
                <span className="text-red-500 dark:text-red-400">-{formatCurrency(paymentProcessingFee)}</span>
              </div>

              <div className="flex justify-between items-center py-2.5 border-b border-zinc-100 dark:border-zinc-800/50 text-zinc-700 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span>Ad Spend (CPA)</span>
                </div>
                <span className="text-red-500 dark:text-red-400">-{formatCurrency(ad)}</span>
              </div>

              {cp > 0 && (
                <div className="flex justify-between items-center py-2.5 border-b border-zinc-100 dark:border-zinc-800/50 text-zinc-700 dark:text-zinc-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span>Cost to Produce</span>
                  </div>
                  <span className="text-red-500 dark:text-red-400">-{formatCurrency(cp)}</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-5 border-t-2 border-zinc-200 dark:border-zinc-700">
              <div className="flex justify-between items-end mb-2">
                <span className="text-lg font-semibold text-zinc-900 dark:text-white">Net Profit</span>
                <span className={`text-3xl sm:text-4xl font-bold ${netProfit > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                  {formatCurrency(netProfit)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 dark:text-zinc-400">Profit Margin</span>
                <div className={`flex items-center gap-1 font-medium text-lg ${
                  profitMargin >= 50 ? 'text-emerald-600 dark:text-emerald-400' : 
                  profitMargin >= 20 ? 'text-amber-500 dark:text-amber-400' : 
                  'text-red-600 dark:text-red-400'
                }`}>
                  {profitMargin > 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  {profitMargin.toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Profit Analysis Alert */}
            <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 ${
              profitMargin >= 50 ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/30' : 
              profitMargin >= 20 ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/30' : 
              'bg-red-50 dark:bg-red-500/10 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800/30'
            }`}>
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">
                  {profitMargin >= 50 ? 'Excellent Profit Margin!' : 
                   profitMargin >= 20 ? 'Healthy Profit Margin' : 
                   profitMargin > 0 ? 'Low Profit Margin' : 
                   'You are losing money!'}
                </h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  {profitMargin >= 50 ? 'Your pricing strategy is solid. You have plenty of room to scale your ads and grow your business.' : 
                   profitMargin >= 20 ? 'You are making a good profit, but keep a close eye on your ad spend (CPA) to ensure it doesn\'t eat into your margins.' : 
                   profitMargin > 0 ? 'Your margins are tight. Consider raising your price, adding an upsell, or optimizing your ad campaigns to lower CPA.' : 
                   'Your costs exceed your revenue. You need to raise your price, lower your ad spend, or reduce production costs immediately.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Resources */}
      <div className="mt-12 bg-white dark:bg-[#1a1a1c] rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-6">Understanding The Fees</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <a href="https://gumroad.com/pricing" target="_blank" rel="noopener noreferrer" className="block p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all hover:shadow-md group bg-zinc-50/50 dark:bg-zinc-800/20">
            <h4 className="font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center justify-between">
              Gumroad's 10% Fee
              <span className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Gumroad charges a flat 10% fee on all sales. This does not include credit card processing fees.</p>
          </a>
          <a href="https://stripe.com/pricing" target="_blank" rel="noopener noreferrer" className="block p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all hover:shadow-md group bg-zinc-50/50 dark:bg-zinc-800/20">
            <h4 className="font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center justify-between">
              Card Processing
              <span className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Standard credit card processing (via Stripe) is typically 2.9% + 30¢ per successful transaction.</p>
          </a>
          <a href="https://www.paypal.com/us/digital-wallet/paypal-consumer-fees" target="_blank" rel="noopener noreferrer" className="block p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all hover:shadow-md group bg-zinc-50/50 dark:bg-zinc-800/20">
            <h4 className="font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center justify-between">
              PayPal Fees
              <span className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">PayPal's commercial transaction rates are generally 3.49% + 49¢ for domestic US sales.</p>
          </a>
        </div>
      </div>
    </motion.div>
  );
};;;

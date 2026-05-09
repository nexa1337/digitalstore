import React, { createContext, useContext, useState } from 'react';

export type Currency = 'USD' | 'EUR' | 'MAD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInUSD: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const exchangeRates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  MAD: 10.15,
};

const currencySymbols: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  MAD: 'MAD ',
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  const formatPrice = (priceInUSD: number) => {
    const converted = priceInUSD * exchangeRates[currency];
    return `${currencySymbols[currency]}${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

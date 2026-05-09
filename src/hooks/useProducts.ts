import { useState, useEffect } from 'react';
import { Product } from '../data/products';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Deterministic random based on a string
const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllProducts = async () => {
    setLoading(true);
    let firebaseProducts: Product[] = [];

    // 1. Fetch Firebase products
    try {
      const pSnap = await getDocs(collection(db, 'products'));
      firebaseProducts = pSnap.docs.map(doc => {
        const data = doc.data();
        const hash = hashString(doc.id);
        const fakeRating = 4.5 + (hash % 6) / 10;
        const fakeReviews = 50 + (hash % 450);
        const fakeDownloads = 500 + (hash % 4500);

        return {
          id: doc.id,
          title: data.title || '',
          priceUSD: parseFloat(data.priceUSD) || 0,
          shortDescription: data.shortDescription || '',
          fullDescription: data.fullDescription || '',
          category: data.category || 'Other',
          type: data.type || 'Digital',
          coverImage: data.coverImage || '',
          images: data.images || [],
          features: data.features || [],
          gumroadLink: data.gumroadLink || '#',
          size: data.size || 'N/A',
          pages: data.pages || 0,
          livePreviewUrl: data.livePreviewUrl,
          cihBankPaymentEnabled: !!data.cihBankPaymentEnabled,
          rating: Number(fakeRating.toFixed(1)),
          reviews: fakeReviews,
          downloads: fakeDownloads,
        };
      });
      setProducts(firebaseProducts);
    } catch (e) {
      console.error("Error fetching Firebase products:", e);
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return { products, loading, error, refetch: fetchAllProducts };
};


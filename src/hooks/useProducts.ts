import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Product, products as fallbackProducts } from '../data/products';
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
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllProducts = async () => {
    setLoading(true);
    let csvProducts: Product[] = [];
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
    } catch (e) {
      console.error("Error fetching Firebase products:", e);
    }

    // 2. Fetch CSV products
    const sheetUrl = import.meta.env.VITE_GOOGLE_SHEET_CSV_URL;
    if (!sheetUrl) {
      setProducts([...firebaseProducts, ...fallbackProducts]);
      setLoading(false);
      return;
    }

    const fetchUrl = `${sheetUrl}${sheetUrl.includes('?') ? '&' : '?'}t=${Date.now()}`;
    Papa.parse(fetchUrl, {
      download: true,
      header: true,
      complete: (results) => {
        try {
          csvProducts = results.data
            .filter((row: any) => row.id && row.title)
            .map((row: any): Product => {
              const hash = hashString(row.id);
              const fakeRating = 4.5 + (hash % 6) / 10;
              const fakeReviews = 50 + (hash % 450);
              const fakeDownloads = 500 + (hash % 4500);

              return {
                id: row.id,
                title: row.title,
                priceUSD: parseFloat(row.priceUSD) || 0,
                shortDescription: row.shortDescription || '',
                fullDescription: row.fullDescription || '',
                category: row.category || 'Other',
                type: row.type || 'File',
                coverImage: row.coverImage || (row.images ? row.images.split(',')[0].trim() : ''),
                images: row.images ? row.images.split(',').map((s: string) => s.trim()) : [],
                features: row.features ? row.features.split(',').map((s: string) => s.trim()) : [],
                gumroadLink: row.gumroadLink || '#',
                size: row.size || 'N/A',
                pages: parseInt(row.pages) || 0,
                livePreviewUrl: row.livePreviewUrl || undefined,
                cihBankPaymentEnabled: row.cihBankPaymentEnabled === 'true' || row.cihBankPaymentEnabled === 'TRUE',
                rating: Number(fakeRating.toFixed(1)),
                reviews: fakeReviews,
                downloads: fakeDownloads,
              };
            });
            
          const combined = [...firebaseProducts, ...csvProducts];
          setProducts(combined.length > 0 ? combined : fallbackProducts);
          setLoading(false);
        } catch (err) {
          console.error("Error parsing products:", err);
          setError("Failed to parse products from sheet.");
          const combined = [...firebaseProducts, ...fallbackProducts];
          setProducts(combined.length > 0 ? combined : fallbackProducts);
          setLoading(false);
        }
      },
      error: (error) => {
        console.error("Error fetching sheet:", error);
        setError(error.message);
        const combined = [...firebaseProducts, ...fallbackProducts];
        setProducts(combined.length > 0 ? combined : fallbackProducts);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return { products, loading, error, refetch: fetchAllProducts };
};

import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Product, products as fallbackProducts } from '../data/products';

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

  useEffect(() => {
    const sheetUrl = import.meta.env.VITE_GOOGLE_SHEET_CSV_URL;
    
    if (!sheetUrl) {
      // If no URL is provided, fallback to the static data
      setProducts(fallbackProducts);
      setLoading(false);
      return;
    }

    // Append timestamp to prevent browser caching of the CSV
    const fetchUrl = `${sheetUrl}${sheetUrl.includes('?') ? '&' : '?'}t=${Date.now()}`;

    Papa.parse(fetchUrl, {
      download: true,
      header: true,
      complete: (results) => {
        try {
          const parsedProducts = results.data
            .filter((row: any) => row.id && row.title) // Basic validation
            .map((row: any): Product => {
              const hash = hashString(row.id);
              // Deterministic fake data
              const fakeRating = 4.5 + (hash % 6) / 10; // 4.5 to 5.0
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
                rating: Number(fakeRating.toFixed(1)),
                reviews: fakeReviews,
                downloads: fakeDownloads,
              };
            });
            
          if (parsedProducts.length > 0) {
            setProducts(parsedProducts);
          } else {
            setProducts(fallbackProducts);
          }
          setLoading(false);
        } catch (err) {
          console.error("Error parsing products:", err);
          setError("Failed to parse products from sheet.");
          setProducts(fallbackProducts);
          setLoading(false);
        }
      },
      error: (error) => {
        console.error("Error fetching sheet:", error);
        setError(error.message);
        setProducts(fallbackProducts);
        setLoading(false);
      }
    });
  }, []);

  return { products, loading, error };
};

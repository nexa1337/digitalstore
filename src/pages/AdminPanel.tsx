import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, getDocs, deleteDoc, doc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { LogIn, Plus, Trash2, LayoutDashboard, Settings, Edit, Image as ImageIcon, FileText, Tag, Link as LinkIcon, Box, Layers, PlayCircle, Loader2, Save, X, Bold, Italic, List, Code, Link2, CornerDownLeft, Search } from 'lucide-react';
import { Product } from '../data/products';
import { useProducts } from '../hooks/useProducts';

export const AdminPanel: React.FC = () => {
  const { user, isAdmin, signInWithGoogle, signOut } = useAuth();
  const { products: allProducts, loading: loadingProducts, refetch: refetchProducts } = useProducts();
  const [firebaseProducts, setFirebaseProducts] = useState<any[]>([]);
  const [visits, setVisits] = useState(0);
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  const itemsPerPageUsers = 5;
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  // New product form
  const initialProductState = {
    title: '', priceUSD: 0, shortDescription: '', fullDescription: '',
    category: 'Templates', type: 'Digital', images: [], coverImage: '',
    features: [], gumroadLink: '', size: '1MB', pages: 1, livePreviewUrl: '',
    cihBankPaymentEnabled: false
  };

  const [newProduct, setNewProduct] = useState<Partial<Product>>(initialProductState);
  const [imagesInput, setImagesInput] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');
  const [productSearchQuery, setProductSearchQuery] = useState('');

  const filteredProducts = allProducts.filter(p => 
    p.id.toLowerCase().includes(productSearchQuery.toLowerCase()) || 
    p.title.toLowerCase().includes(productSearchQuery.toLowerCase())
  );

  const fetchAdminData = async () => {
    if (!isAdmin) return;
    try {
      const pSnap = await getDocs(collection(db, 'products'));
      setFirebaseProducts(pSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      
      const vSnap = await getDocs(collection(db, 'visits'));
      setVisits(vSnap.size);

      const uSnap = await getDocs(collection(db, 'users'));
      setRegisteredUsers(uSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isAdmin) fetchAdminData();
  }, [isAdmin]);

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    if (!descriptionRef.current) return;
    const start = descriptionRef.current.selectionStart;
    const end = descriptionRef.current.selectionEnd;
    const currentText = newProduct.fullDescription || '';
    const selectedText = currentText.substring(start, end);
    const textToInsert = selectedText ? `${prefix}${selectedText}${suffix}` : `${prefix}text${suffix}`;
    
    const newText = currentText.substring(0, start) + textToInsert + currentText.substring(end);
    setNewProduct({ ...newProduct, fullDescription: newText });
    
    setTimeout(() => {
      if (descriptionRef.current) {
        descriptionRef.current.focus();
        descriptionRef.current.setSelectionRange(start + prefix.length, end > start ? end + prefix.length : start + prefix.length + 4);
      }
    }, 0);
  };

  const handlePostProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isAdmin) return;
    setLoading(true);
    try {
      // Ensure the cover image is not duplicated in the `images` array
      const productImages = (newProduct.images || []).filter(img => img !== newProduct.coverImage);
      const dataToSave = {
        ...newProduct,
        images: productImages
      };

      if (editingId) {
        // Update
        const docRef = doc(db, 'products', editingId);
        await updateDoc(docRef, {
          ...dataToSave,
          updatedAt: serverTimestamp()
        });
      } else {
        // Create
        const docRef = doc(collection(db, 'products'));
        await setDoc(docRef, {
          ...dataToSave,
          ownerId: user.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      
      await fetchAdminData();
      await refetchProducts();
      setNewProduct(initialProductState);
      setImagesInput('');
      setFeaturesInput('');
      setEditingId(null);
    } catch (err) {
      handleFirestoreError(err, editingId ? OperationType.UPDATE : OperationType.CREATE, 'products');
    }
    setLoading(false);
  };

  const handleEdit = (product: any) => {
    const filteredImages = (product.images || []).filter((img: string) => img !== product.coverImage);
    setEditingId(product.id);
    setNewProduct({
      title: product.title,
      priceUSD: product.priceUSD,
      shortDescription: product.shortDescription,
      fullDescription: product.fullDescription,
      category: product.category,
      type: product.type,
      images: filteredImages,
      coverImage: product.coverImage || '',
      features: product.features || [],
      gumroadLink: product.gumroadLink || '',
      size: product.size || '',
      pages: product.pages || 0,
      livePreviewUrl: product.livePreviewUrl || '',
      cihBankPaymentEnabled: !!product.cihBankPaymentEnabled
    });
    setImagesInput(filteredImages.join(', '));
    setFeaturesInput(product.features ? product.features.join(', ') : '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewProduct(initialProductState);
    setImagesInput('');
    setFeaturesInput('');
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      await fetchAdminData();
      await refetchProducts();
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `products/${id}`);
    }
  };

  // Convert comma-separated string to array for images/features
  const handleStringToArray = (field: 'images' | 'features', value: string) => {
    if (field === 'images') setImagesInput(value);
    if (field === 'features') setFeaturesInput(value);
    const array = value.split(',').map(item => item.trim()).filter(item => item !== '');
    setNewProduct(prev => ({ ...prev, [field]: array }));
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-10 max-w-md w-full text-center shadow-xl shadow-zinc-200/20 dark:shadow-black/40">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600 dark:text-indigo-400">
            <LayoutDashboard className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Admin Portal</h1>
          <p className="text-zinc-500 mb-8">Sign in to manage your store, products, and analytics.</p>
          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
          >
            <LogIn className="w-5 h-5" />
            Continue with Google
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-900/50 rounded-3xl p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600 dark:text-red-400">
            <X className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-red-900 dark:text-red-400">Access Denied</h1>
          <p className="text-red-700/80 dark:text-red-400/80 mb-8">You don't have administrative privileges for this panel.</p>
          <button onClick={signOut} className="px-6 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-700 transition font-medium">
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-28 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="hidden sm:block">
            <img src={user.photoURL || ''} alt="" className="w-14 h-14 rounded-full border-2 border-indigo-500 p-0.5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
              Welcome, {user.displayName}
            </h1>
            <p className="text-zinc-500 text-sm mt-1">Manage your digital empire.</p>
          </div>
        </div>
        <div className="mt-6 md:mt-0">
          <button onClick={signOut} className="px-5 py-2.5 text-sm font-medium border border-zinc-200 dark:border-zinc-700 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-20"><Box className="w-24 h-24" /></div>
          <h3 className="font-medium text-indigo-100 uppercase tracking-wider text-sm mb-2">Total Products</h3>
          <p className="text-5xl font-bold">{allProducts.length}</p>
        </div>
        <div className="bg-zinc-900 dark:bg-zinc-800 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 p-6 opacity-10"><LayoutDashboard className="w-24 h-24" /></div>
          <h3 className="font-medium text-zinc-400 uppercase tracking-wider text-sm mb-2">Total Users</h3>
          <p className="text-5xl font-bold">{registeredUsers.length}</p>
        </div>
      </div>

      <div className="mb-12 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Settings className="w-6 h-6 text-indigo-500" /> Registered Users
        </h2>
        <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
          <table className="w-full text-left min-w-[500px]">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="pb-3 px-2 sm:px-0 text-sm font-semibold text-zinc-500">User</th>
                <th className="pb-3 px-2 sm:px-0 text-sm font-semibold text-zinc-500">Email</th>
                <th className="pb-3 px-2 sm:px-0 text-sm font-semibold text-zinc-500">Last Login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {registeredUsers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-zinc-500">No users found.</td>
                </tr>
              ) : (
                <>
                  {registeredUsers.slice((currentPageUsers - 1) * itemsPerPageUsers, currentPageUsers * itemsPerPageUsers).map(u => (
                    <tr key={u.id}>
                      <td className="py-4 px-2 sm:px-0">
                        <div className="flex items-center gap-3">
                          {u.photoURL ? (
                            <img src={u.photoURL} alt={u.displayName} className="w-8 h-8 rounded-full" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-500">
                              {u.displayName?.charAt(0) || 'U'}
                            </div>
                          )}
                          <span className="font-medium text-zinc-900 dark:text-zinc-100">{u.displayName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2 sm:px-0 text-zinc-600 dark:text-zinc-400">{u.email}</td>
                      <td className="py-4 px-2 sm:px-0 text-sm text-zinc-500">
                        {u.lastLoginAt ? new Date(u.lastLoginAt?.toDate ? u.lastLoginAt.toDate() : u.lastLoginAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                  {registeredUsers.length > itemsPerPageUsers && (
                    <tr>
                      <td colSpan={3} className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center justify-between">
                          <button 
                            onClick={() => setCurrentPageUsers(prev => Math.max(prev - 1, 1))} 
                            disabled={currentPageUsers === 1}
                            className="px-4 py-2 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-50 transition"
                          >
                            Previous
                          </button>
                          <span className="text-sm text-zinc-500">
                            Page {currentPageUsers} of {Math.ceil(registeredUsers.length / itemsPerPageUsers)}
                          </span>
                          <button 
                            onClick={() => setCurrentPageUsers(prev => Math.min(prev + 1, Math.ceil(registeredUsers.length / itemsPerPageUsers)))} 
                            disabled={currentPageUsers === Math.ceil(registeredUsers.length / itemsPerPageUsers)}
                            className="px-4 py-2 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-50 transition"
                          >
                            Next
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Form */}
        <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm order-2 lg:order-1 h-fit sticky top-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {editingId ? <Edit className="w-6 h-6 text-indigo-500" /> : <Plus className="w-6 h-6 text-indigo-500" />} 
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>
            {editingId && (
              <button type="button" onClick={cancelEdit} className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition">Cancel</button>
            )}
          </div>

          <form onSubmit={handlePostProduct} className="space-y-5">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5 flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300"><FileText className="w-4 h-4"/> Product Title</label>
                <input required type="text" placeholder="e.g. Ultimate UI Kit" className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition" value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5 flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300"><Tag className="w-4 h-4"/> Price (USD)</label>
                  <input required type="number" min="0" step="0.01" className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition" value={newProduct.priceUSD} onChange={e => setNewProduct({...newProduct, priceUSD: parseFloat(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5 flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300"><Layers className="w-4 h-4"/> Category</label>
                  <input required type="text" placeholder="e.g. Design, Code, Audio" className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5 text-zinc-700 dark:text-zinc-300">Short Description</label>
                <textarea required rows={2} placeholder="Brief summary of what this is..." className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition resize-none" value={newProduct.shortDescription} onChange={e => setNewProduct({...newProduct, shortDescription: e.target.value})} />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">Full Description (Markdown)</label>
                  <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1 gap-1">
                    <button type="button" onClick={() => insertMarkdown('**', '**')} className="p-1.5 text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 rounded hover:bg-white dark:hover:bg-zinc-700 transition" title="Bold"><Bold className="w-4 h-4"/></button>
                    <button type="button" onClick={() => insertMarkdown('*', '*')} className="p-1.5 text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 rounded hover:bg-white dark:hover:bg-zinc-700 transition" title="Italic"><Italic className="w-4 h-4"/></button>
                    <button type="button" onClick={() => insertMarkdown('- ')} className="p-1.5 text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 rounded hover:bg-white dark:hover:bg-zinc-700 transition" title="Bullet List"><List className="w-4 h-4"/></button>
                    <button type="button" onClick={() => insertMarkdown('```\n', '\n```')} className="p-1.5 text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 rounded hover:bg-white dark:hover:bg-zinc-700 transition" title="Code Block"><Code className="w-4 h-4"/></button>
                    <button type="button" onClick={() => insertMarkdown('[', '](url)')} className="p-1.5 text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 rounded hover:bg-white dark:hover:bg-zinc-700 transition" title="Link"><Link2 className="w-4 h-4"/></button>
                    <button type="button" onClick={() => insertMarkdown('![alt text](', ')')} className="p-1.5 text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 rounded hover:bg-white dark:hover:bg-zinc-700 transition" title="Image/GIF"><ImageIcon className="w-4 h-4"/></button>
                    <button type="button" onClick={() => insertMarkdown('<br/>\n')} className="p-1.5 text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 rounded hover:bg-white dark:hover:bg-zinc-700 transition" title="New Line/Break"><CornerDownLeft className="w-4 h-4"/></button>
                  </div>
                </div>
                <textarea ref={descriptionRef} required rows={5} placeholder="Use Markdown here to describe your product boldly! Supports images ![img](url) and GIFs too." className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition font-mono text-sm resize-y" value={newProduct.fullDescription} onChange={e => setNewProduct({...newProduct, fullDescription: e.target.value})} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5 flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300"><LinkIcon className="w-4 h-4"/> Gumroad URL</label>
                  <input required type="url" placeholder="https://gum.co/..." className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition" value={newProduct.gumroadLink} onChange={e => setNewProduct({...newProduct, gumroadLink: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5 flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300"><PlayCircle className="w-4 h-4"/> Live Preview URL</label>
                  <input type="url" placeholder="Optional" className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition" value={newProduct.livePreviewUrl || ''} onChange={e => setNewProduct({...newProduct, livePreviewUrl: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5 flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300"><ImageIcon className="w-4 h-4"/> Cover Image URL</label>
                <input required type="url" placeholder="Main thumbnail URL" className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition" value={newProduct.coverImage} onChange={e => setNewProduct({...newProduct, coverImage: e.target.value})} />
                <p className="text-xs text-zinc-500 mt-2">Note: For best results, use images with a 16:9 or 4:3 aspect ratio (e.g. 1200x675px or 800x600px). They will be automatically resized and cropped to fit the design.</p>
              </div>

              <div>
                 <label className="block text-sm font-semibold mb-1.5 text-zinc-700 dark:text-zinc-300">Additional Images (comma-separated URLs)</label>
                 <input type="text" placeholder="url1.jpg, url2.png, url3.gif" className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition text-sm" value={imagesInput} onChange={e => handleStringToArray('images', e.target.value)} />
              </div>
              
              <div>
                 <label className="block text-sm font-semibold mb-1.5 text-zinc-700 dark:text-zinc-300">Features (comma-separated)</label>
                 <input type="text" placeholder="Dark mode, Responsive, Figma" className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition text-sm" value={featuresInput} onChange={e => handleStringToArray('features', e.target.value)} />
              </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block text-sm font-semibold mb-1.5 text-zinc-700 dark:text-zinc-300">File Type & Size</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input type="text" placeholder="Type (Zip)" className="w-full sm:w-1/2 px-3 py-2 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-sm" value={newProduct.type} onChange={e => setNewProduct({...newProduct, type: e.target.value})} />
                    <input type="text" placeholder="Size (5MB)" className="w-full sm:w-1/2 px-3 py-2 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-sm" value={newProduct.size} onChange={e => setNewProduct({...newProduct, size: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5 text-zinc-700 dark:text-zinc-300">Pages/Items</label>
                  <input type="number" min="0" placeholder="Count" className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-sm" value={newProduct.pages} onChange={e => setNewProduct({...newProduct, pages: parseInt(e.target.value) || 0})} />
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                <input 
                  type="checkbox" 
                  id="cihPayment" 
                  className="w-5 h-5 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500" 
                  checked={!!newProduct.cihBankPaymentEnabled} 
                  onChange={e => setNewProduct({...newProduct, cihBankPaymentEnabled: e.target.checked})} 
                />
                <label htmlFor="cihPayment" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer">
                  Activate CIH Bank Payment for this product
                </label>
              </div>
            </div>

            <button disabled={loading} type="submit" className="w-full mt-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/25 font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-lg">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingId ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />)}
              {editingId ? 'Save Changes' : 'Publish Product'}
            </button>
          </form>
        </div>

        {/* Product List */}
        <div className="order-1 lg:order-2">
          <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 m-0">
                <Settings className="w-6 h-6 text-indigo-500" /> Manage Products
              </h2>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-zinc-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by ID or Title..."
                  value={productSearchQuery}
                  onChange={(e) => {
                    setProductSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                  className="block w-full sm:max-w-xs pl-10 pr-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-xl leading-5 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              {loadingProducts ? (
                <div className="text-center py-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
              ) : allProducts.length === 0 ? (
                <div className="text-center py-12 px-4 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
                  <Box className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
                  <p className="text-zinc-500 font-medium">No products available.</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                 <div className="text-center py-12 px-4 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
                  <Search className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
                  <p className="text-zinc-500 font-medium">No products found matching "{productSearchQuery}"</p>
                </div>
              ) : (
                <>
                  {filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(p => {
                    const isFirebaseProduct = firebaseProducts.some(fp => fp.id === p.id);
                    return (
                      <div key={p.id} className={`group relative flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/30 hover:bg-white dark:hover:bg-zinc-800 border ${isFirebaseProduct ? 'border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/30' : 'border-dashed border-zinc-300 dark:border-zinc-700'} rounded-2xl transition-all shadow-sm`}>
                        {p.coverImage && (
                          <div className="w-full sm:w-24 h-32 sm:h-20 shrink-0 rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                            <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-grow min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h4 className="font-bold text-lg truncate text-zinc-900 dark:text-white flex items-center gap-2">
                                {p.title}
                                {!isFirebaseProduct && <span className="text-[10px] bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 px-1.5 py-0.5 rounded ml-1 uppercase shrink-0">CSV</span>}
                              </h4>
                              <div className="flex items-center gap-1.5 mt-1">
                                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider shrink-0">ID:</span>
                                <code className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px] font-mono text-zinc-500 dark:text-zinc-400 truncate select-all">{p.id}</code>
                              </div>
                            </div>
                            <span className="shrink-0 inline-block px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 font-bold rounded-lg text-sm">
                              ${p.priceUSD}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-500 truncate mb-2">{p.category} &bull; {p.shortDescription}</p>
                          
                          <div className="flex items-center gap-2">
                            {isFirebaseProduct ? (
                              <>
                                <button onClick={() => handleEdit(p)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm hover:border-indigo-500 hover:text-indigo-500 transition">
                                  <Edit className="w-3.5 h-3.5" /> Edit
                                </button>
                                <button onClick={() => handleDelete(p.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg text-sm hover:bg-red-100 dark:hover:bg-red-500/20 transition">
                                  <Trash2 className="w-3.5 h-3.5" /> Delete
                                </button>
                              </>
                            ) : (
                              <p className="text-xs text-zinc-400 italic">Edit this product in your Google Sheet.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {filteredProducts.length > itemsPerPage && (
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800">
                      <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-50 transition"
                      >
                        Previous
                      </button>
                      <span className="text-sm text-zinc-500">
                        Page {currentPage} of {Math.ceil(filteredProducts.length / itemsPerPage)}
                      </span>
                      <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredProducts.length / itemsPerPage)))} 
                        disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
                        className="px-4 py-2 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-50 transition"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

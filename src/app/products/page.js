// 'use client';

// import { useState, useEffect } from 'react';
// import { fetchProducts } from '../service/productService'; // Adjust the path as needed
// import { fetchCards } from '../service/contactService'; // Reuse from contact service
// import { XMarkIcon, EyeIcon, CogIcon, CodeBracketIcon, ShieldCheckIcon, SparklesIcon, BoltIcon, ScaleIcon, StarIcon } from '@heroicons/react/24/outline';
// // Add the missing import for CheckCircleIcon at the top
// import { CheckCircleIcon } from '@heroicons/react/24/outline';
// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [cards, setCards] = useState([]);

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const [productsRes, cardsRes] = await Promise.all([fetchProducts(currentPage), fetchCards()]);
//         if (productsRes.success) {
//           setProducts(productsRes.data || []);
//           setTotalPages(productsRes.totalPages || Math.ceil(productsRes.count / 10));
//         } else {
//           setError('Failed to fetch products');
//         }
//         setCards(cardsRes || []);
//       } catch (error) {
//         setError('Failed to connect to the server. Please try again later.');
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadData();
//   }, [currentPage]);

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const openModal = (product) => {
//     setSelectedProduct(product);
//   };

//   const closeModal = () => {
//     setSelectedProduct(null);
//   };

//   // Fallback image
//   const getProductImage = (product) => {
//     return (
//       product.images?.[0] ||
//       product.logo ||
//       'https://via.placeholder.com/400x300?text=No+Image'
//     );
//   };

//   const productCard = cards.find(card => card.type === 'product' && card.isActive);

//   if (loading) {
//     return (
//       <section className="w-full flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23]">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700"></div>
//       </section>
//     );
//   }

//   return (
//     <section className="w-full flex flex-col items-center px-6 pt-20 pb-28 min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23] overflow-hidden">
//       {/* Hero Section - Enhanced with gradient text and animations */}
//       <div className="max-w-5xl text-center mb-20 animate-fade-in-up">
//         <h1 className="text-5xl sm:text-7xl font-extrabold mb-8 leading-tight tracking-tight text-neutral-900 dark:text-white drop-shadow-xl bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
//           Products & Accelerators
//         </h1>
//         <p className="text-xl sm:text-2xl text-neutral-700 dark:text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
//           Discover solutions crafted to empower your business with clarity, control, and unstoppable momentum.
//         </p>
//       </div>

//       {error && (
//         <div className="max-w-3xl w-full mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-center animate-fade-in-up animation-delay-200">
//           <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
//         </div>
//       )}

//       {/* Products Grid - Enhanced cards with glows, scales, and icons */}
//       <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-24 animate-fade-in-up animation-delay-200">
//         {products.map((product, idx) => (
//           <div
//             key={product._id}
//             className="group relative bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-white/20 hover:border-blue-400/70 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-700 cursor-pointer overflow-hidden"
//             style={{ animationDelay: `${idx * 150}ms` }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
//             <img
//               src={getProductImage(product)}
//               alt={product.name}
//               className="w-full h-60 object-cover rounded-2xl mb-6 group-hover:scale-105 transition-transform duration-700"
//             />
//             <div className="relative z-10 flex flex-col items-center text-center">
//               <div className="w-12 h-12 mb-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                 <SparklesIcon className="w-6 h-6 text-blue-700 dark:text-blue-400" />
//               </div>
//               <h3 className="font-bold text-xl mb-4 text-blue-700 dark:text-blue-400 group-hover:underline underline-offset-4">
//                 {product.name}
//               </h3>
//               <p className="text-neutral-700 dark:text-neutral-300 text-base mb-6 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-3">
//                 {product.description}
//               </p>
//               <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                 Category: <span className="font-medium text-blue-600 dark:text-blue-400">{product.category}</span>
//               </p>
//               <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                 Status: <span className={`font-medium px-2 py-1 rounded-full text-xs ${product.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-400'}`}>
//                   {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
//                 </span>
//               </p>
//               <button
//                 onClick={() => openModal(product)}
//                 className="group/btn inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300"
//               >
//                 View Details
//                 <EyeIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {totalPages > 1 && (
//         <div className="flex justify-center items-center space-x-6 mb-20 animate-fade-in-up animation-delay-400">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="group disabled:opacity-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 disabled:cursor-not-allowed"
//             aria-label="Previous page"
//           >
//             <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
//           <span className="text-lg text-neutral-700 dark:text-neutral-300 font-medium bg-white/80 dark:bg-neutral-900/80 px-6 py-3 rounded-full shadow-md">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="group disabled:opacity-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 disabled:cursor-not-allowed"
//             aria-label="Next page"
//           >
//             <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>
//       )}

//       {/* "Good systems outlive projects" Section - Enhanced with icons and glows */}
//       <div className="max-w-6xl w-full mb-24 animate-fade-in-up animation-delay-600">
//         <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-neutral-900 dark:text-white bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-lg">
//           Good systems outlive projects
//         </h2>
//         <p className="text-xl text-neutral-700 dark:text-neutral-300 mb-16 max-w-4xl mx-auto leading-relaxed opacity-90">
//           The real question isn’t can it be built? It’s will it endure?
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//           <div className="group bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-blue-400/70 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-700 relative overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
//             <div className="relative z-10 flex items-start gap-4">
//               <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
//                 <ShieldCheckIcon className="w-6 h-6 text-blue-700 dark:text-blue-400" />
//               </div>
//               <div className="flex-1">
//                 <h4 className="font-bold text-xl mb-3 text-blue-700 dark:text-blue-400 group-hover:underline underline-offset-4">Trust</h4>
//                 <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">We build with care, precision, and respect for your domain.</p>
//               </div>
//             </div>
//           </div>
//           <div className="group bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-green-400/70 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-green-500/20 hover:-translate-y-2 transition-all duration-700 relative overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
//             <div className="relative z-10 flex items-start gap-4">
//               <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
//                 <SparklesIcon className="w-6 h-6 text-green-700 dark:text-green-400" />
//               </div>
//               <div className="flex-1">
//                 <h4 className="font-bold text-xl mb-3 text-green-700 dark:text-green-400 group-hover:underline underline-offset-4">Clarity</h4>
//                 <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">Language of your business in labels & permissions. Flows mirror how work actually happens.</p>
//               </div>
//             </div>
//           </div>
//           <div className="group bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-purple-400/70 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-700 relative overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
//             <div className="relative z-10 flex items-start gap-4">
//               <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
//                 <CodeBracketIcon className="w-6 h-6 text-purple-700 dark:text-purple-400" />
//               </div>
//               <div className="flex-1">
//                 <h4 className="font-bold text-xl mb-3 text-purple-700 dark:text-purple-400 group-hover:underline underline-offset-4">Craft</h4>
//                 <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">Quality engineering baked in. Discovery → Implementation → AMS - a clear path.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Product Card - Compact, below "Good systems" */}
//       {productCard && (
//         <div className="max-w-5xl w-full mb-16 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 lg:p-8 border border-white/20 hover:border-blue-400/50 hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-800">
//           <div className="text-center">
//             <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">{productCard.title}</h2>
//             <p className="text-neutral-700 dark:text-neutral-300 mb-6 text-base leading-relaxed max-w-3xl mx-auto">{productCard.description}</p>
//             {productCard.features?.length > 0 && (
//               <div className="grid grid-cols-1 gap-4 mb-6">
//                 {productCard.features.map((feature, idx) => (
//                   <div key={idx} className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
//                     <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                     <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{feature}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//             {productCard.buttonText && (
//               <a
//                 href={productCard.buttonLink}
//                 className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
//               >
//                 {productCard.buttonText}
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </a>
//             )}
//           </div>
//         </div>
//       )}

//       {/* CTA Section - Enhanced gradient and lift */}
//       <div className="max-w-5xl w-full text-center mt-16 animate-slide-in-up animation-delay-1000">
//         <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-neutral-900 dark:text-white bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-lg">
//           Ready to turn complexity into clarity?
//         </h2>
//         <p className="text-xl text-neutral-700 dark:text-neutral-300 mb-10 leading-relaxed max-w-3xl mx-auto opacity-90">
//           Start with a 10-day discovery sprint - plan, prototype, estimate.
//         </p>
//         <a
//           href="#"
//           className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-semibold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
//           aria-label="Book a discovery sprint"
//         >
//           Book Discovery
//           <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//           </svg>
//         </a>
//       </div>

//       {/* Enhanced Modal for Product Details */}
//       {selectedProduct && (
//         <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-neutral-900/95 rounded-3xl shadow-2xl border border-white/20 animate-slide-in-up">
//             <div className="p-6 lg:p-8">
//               <div className="flex justify-between items-start mb-6">
//                 <div className="flex items-center gap-4">
//                   <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
//                     <SparklesIcon className="w-8 h-8 text-blue-700 dark:text-blue-400" />
//                   </div>
//                   <div>
//                     <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400">{selectedProduct.name}</h2>
//                   </div>
//                 </div>
//                 <button
//                   onClick={closeModal}
//                   className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
//                 >
//                   <XMarkIcon className="w-6 h-6" />
//                 </button>
//               </div>
//               <img
//                 src={getProductImage(selectedProduct)}
//                 alt={selectedProduct.name}
//                 className="w-full h-80 object-cover rounded-2xl mb-8 shadow-xl group-hover:scale-105 transition-transform duration-300"
//               />
//               <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
//                 <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{selectedProduct.fullDescription}</p>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-neutral-700 dark:text-neutral-300">
//                 <div className="space-y-4">
//                   <p><strong className="text-blue-600 dark:text-blue-400">ID:</strong> {selectedProduct._id}</p>
//                   <p><strong className="text-blue-600 dark:text-blue-400">Slug:</strong> {selectedProduct.slug}</p>
//                   <p><strong className="text-blue-600 dark:text-blue-400">Category:</strong> {selectedProduct.category}</p>
//                   <p><strong className="text-blue-600 dark:text-blue-400">Status:</strong> {selectedProduct.status.charAt(0).toUpperCase() + selectedProduct.status.slice(1)}</p>
//                   <p><strong className="text-blue-600 dark:text-blue-400">Featured:</strong> {selectedProduct.isFeatured ? 'Yes' : 'No'}</p>
//                   <p><strong className="text-blue-600 dark:text-blue-400">Order:</strong> {selectedProduct.order}</p>
//                 </div>
//                 <div className="space-y-4">
//                   <p><strong className="text-blue-600 dark:text-blue-400">Demo URL:</strong> <a href={selectedProduct.demoUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors">{selectedProduct.demoUrl}</a></p>
//                   <p><strong className="text-blue-600 dark:text-blue-400">Live URL:</strong> <a href={selectedProduct.liveUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors">{selectedProduct.liveUrl}</a></p>
//                   <p><strong className="text-blue-600 dark:text-blue-400">Created At:</strong> {new Date(selectedProduct.createdAt).toLocaleString()}</p>
//                   <p><strong className="text-blue-600 dark:text-blue-400">Updated At:</strong> {new Date(selectedProduct.updatedAt).toLocaleString()}</p>
//                 </div>
//               </div>
//               {selectedProduct.features?.length > 0 && (
//                 <div className="mb-8">
//                   <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400 flex items-center gap-2">
//                     <StarIcon className="w-5 h-5" />
//                     Features
//                   </h3>
//                   <ul className="space-y-3">
//                     {selectedProduct.features.map((feature) => (
//                       <li key={feature._id} className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-neutral-800/50 dark:to-neutral-700/50 rounded-xl">
//                         <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                         <div>
//                           <span className="font-semibold text-neutral-900 dark:text-white">{feature.title}:</span>
//                           <p className="text-neutral-700 dark:text-neutral-300 mt-1">{feature.description}</p>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//               {selectedProduct.technologies?.length > 0 && (
//                 <div className="mb-8">
//                   <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400 flex items-center gap-2">
//                     <CogIcon className="w-5 h-5" />
//                     Technologies
//                   </h3>
//                   <ul className="list-disc pl-6 space-y-2">
//                     {selectedProduct.technologies.map((tech, index) => (
//                       <li key={index} className="text-neutral-700 dark:text-neutral-300">{tech}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//               {selectedProduct.images?.length > 0 && (
//                 <div className="mb-8">
//                   <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400 flex items-center gap-2">
//                     <EyeIcon className="w-5 h-5" />
//                     Images
//                   </h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {selectedProduct.images.map((image, index) => (
//                       <img
//                         key={index}
//                         src={image}
//                         alt={`Product image ${index + 1}`}
//                         className="w-full h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
//                         onClick={() => window.open(image, '_blank')}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//               <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700 flex justify-end">
//                 <button
//                   onClick={closeModal}
//                   className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300"
//                 >
//                   Close
//                   <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { fetchProducts } from '../service/productService'; // Adjust the path as needed
import { fetchCards } from '../service/contactService'; // Reuse from contact service
import { XMarkIcon, EyeIcon, CogIcon, CodeBracketIcon, ShieldCheckIcon, SparklesIcon, BoltIcon, ScaleIcon, StarIcon } from '@heroicons/react/24/outline';
// Add the missing import for CheckCircleIcon at the top
import { CheckCircleIcon } from '@heroicons/react/24/outline';
export default function Products() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [productsRes, cardsRes] = await Promise.all([fetchProducts(currentPage), fetchCards()]);
        if (productsRes.success) {
          setProducts(productsRes.data || []);
          setTotalPages(productsRes.totalPages || Math.ceil(productsRes.count / 10));
        } else {
          setError('Failed to fetch products');
        }
        setCards(cardsRes || []);
      } catch (error) {
        setError('Failed to connect to the server. Please try again later.');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  // Fallback image
  const getProductImage = (product) => {
    return (
      product.images?.[0] ||
      product.logo ||
      'https://via.placeholder.com/400x300?text=No+Image'
    );
  };

  const productCards = cards.filter(card => card.type === 'product' && card.isActive);

  if (loading) {
    return (
      <section className="w-full flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700"></div>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col items-center px-6 pt-20 pb-28 min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23] overflow-hidden">
      {/* Hero Section - Enhanced with gradient text and animations */}
      <div className="max-w-5xl text-center mb-20 animate-fade-in-up">
        <h1 className="text-5xl sm:text-7xl font-extrabold mb-8 leading-tight tracking-tight text-neutral-900 dark:text-white drop-shadow-xl bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
          Products & Accelerators
        </h1>
        <p className="text-xl sm:text-2xl text-neutral-700 dark:text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
          Discover solutions crafted to empower your business with clarity, control, and unstoppable momentum.
        </p>
      </div>

      {error && (
        <div className="max-w-3xl w-full mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-center animate-fade-in-up animation-delay-200">
          <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
        </div>
      )}

      {/* Products Grid - Enhanced cards with glows, scales, and icons */}
      <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-24 animate-fade-in-up animation-delay-200">
        {products.map((product, idx) => (
          <div
            key={product._id}
            className="group relative bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-white/20 hover:border-blue-400/70 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-700 cursor-pointer overflow-hidden"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <img
              src={getProductImage(product)}
              alt={product.name}
              className="w-full h-60 object-cover rounded-2xl mb-6 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-12 h-12 mb-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <SparklesIcon className="w-6 h-6 text-blue-700 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-xl mb-4 text-blue-700 dark:text-blue-400 group-hover:underline underline-offset-4">
                {product.name}
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 text-base mb-6 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-3">
                {product.description}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Category: <span className="font-medium text-blue-600 dark:text-blue-400">{product.category}</span>
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Status: <span className={`font-medium px-2 py-1 rounded-full text-xs ${product.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-400'}`}>
                  {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                </span>
              </p>
              <button
                onClick={() => openModal(product)}
                className="group/btn inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300"
              >
                View Details
                <EyeIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-6 mb-20 animate-fade-in-up animation-delay-400">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="group disabled:opacity-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-lg text-neutral-700 dark:text-neutral-300 font-medium bg-white/80 dark:bg-neutral-900/80 px-6 py-3 rounded-full shadow-md">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="group disabled:opacity-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* "Good systems outlive projects" Section - Enhanced with icons and glows */}
      <div className="max-w-6xl w-full mb-24 animate-fade-in-up animation-delay-600">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-neutral-900 dark:text-white bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-lg">
          Good systems outlive projects
        </h2>
        <p className="text-xl text-neutral-700 dark:text-neutral-300 mb-16 max-w-4xl mx-auto leading-relaxed opacity-90">
          The real question isn’t can it be built? It’s will it endure?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="group bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-blue-400/70 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheckIcon className="w-6 h-6 text-blue-700 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xl mb-3 text-blue-700 dark:text-blue-400 group-hover:underline underline-offset-4">Trust</h4>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">We build with care, precision, and respect for your domain.</p>
              </div>
            </div>
          </div>
          <div className="group bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-green-400/70 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-green-500/20 hover:-translate-y-2 transition-all duration-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                <SparklesIcon className="w-6 h-6 text-green-700 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xl mb-3 text-green-700 dark:text-green-400 group-hover:underline underline-offset-4">Clarity</h4>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">Language of your business in labels & permissions. Flows mirror how work actually happens.</p>
              </div>
            </div>
          </div>
          <div className="group bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-purple-400/70 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                <CodeBracketIcon className="w-6 h-6 text-purple-700 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xl mb-3 text-purple-700 dark:text-purple-400 group-hover:underline underline-offset-4">Craft</h4>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">Quality engineering baked in. Discovery → Implementation → AMS - a clear path.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Cards - Compact grid, below "Good systems" */}
      {productCards.length > 0 && (
        <div className="max-w-7xl w-full mb-16 animate-fade-in-up animation-delay-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCards.map((productCard, idx) => (
              <div key={productCard._id} className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 lg:p-8 border border-white/20 hover:border-blue-400/50 hover:shadow-2xl transition-all duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">{productCard.title}</h2>
                  <p className="text-neutral-700 dark:text-neutral-300 mb-6 text-base leading-relaxed max-w-3xl mx-auto">{productCard.description}</p>
                  {productCard.features?.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 mb-6">
                      {productCard.features.map((feature, featureIdx) => (
                        <div key={featureIdx} className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                          <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {productCard.buttonText && (
                    <a
                      href={productCard.buttonLink}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      {productCard.buttonText}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section - Enhanced gradient and lift */}
      <div className="max-w-5xl w-full text-center mt-16 animate-slide-in-up animation-delay-1000">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-neutral-900 dark:text-white bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-lg">
          Ready to turn complexity into clarity?
        </h2>
        <p className="text-xl text-neutral-700 dark:text-neutral-300 mb-10 leading-relaxed max-w-3xl mx-auto opacity-90">
          Start with a 10-day discovery sprint - plan, prototype, estimate.
        </p>
        <a
          href="#"
          className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-semibold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
          aria-label="Book a discovery sprint"
        >
          Book Discovery
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      {/* Enhanced Modal for Product Details */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-neutral-900/95 rounded-3xl shadow-2xl border border-white/20 animate-slide-in-up">
            <div className="p-6 lg:p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <SparklesIcon className="w-8 h-8 text-blue-700 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400">{selectedProduct.name}</h2>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <img
                src={getProductImage(selectedProduct)}
                alt={selectedProduct.name}
                className="w-full h-80 object-cover rounded-2xl mb-8 shadow-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{selectedProduct.fullDescription}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-neutral-700 dark:text-neutral-300">
                <div className="space-y-4">
                  <p><strong className="text-blue-600 dark:text-blue-400">ID:</strong> {selectedProduct._id}</p>
                  <p><strong className="text-blue-600 dark:text-blue-400">Slug:</strong> {selectedProduct.slug}</p>
                  <p><strong className="text-blue-600 dark:text-blue-400">Category:</strong> {selectedProduct.category}</p>
                  <p><strong className="text-blue-600 dark:text-blue-400">Status:</strong> {selectedProduct.status.charAt(0).toUpperCase() + selectedProduct.status.slice(1)}</p>
                  <p><strong className="text-blue-600 dark:text-blue-400">Featured:</strong> {selectedProduct.isFeatured ? 'Yes' : 'No'}</p>
                  <p><strong className="text-blue-600 dark:text-blue-400">Order:</strong> {selectedProduct.order}</p>
                </div>
                <div className="space-y-4">
                  <p><strong className="text-blue-600 dark:text-blue-400">Demo URL:</strong> <a href={selectedProduct.demoUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors">{selectedProduct.demoUrl}</a></p>
                  <p><strong className="text-blue-600 dark:text-blue-400">Live URL:</strong> <a href={selectedProduct.liveUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors">{selectedProduct.liveUrl}</a></p>
                  <p><strong className="text-blue-600 dark:text-blue-400">Created At:</strong> {new Date(selectedProduct.createdAt).toLocaleString()}</p>
                  <p><strong className="text-blue-600 dark:text-blue-400">Updated At:</strong> {new Date(selectedProduct.updatedAt).toLocaleString()}</p>
                </div>
              </div>
              {selectedProduct.features?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400 flex items-center gap-2">
                    <StarIcon className="w-5 h-5" />
                    Features
                  </h3>
                  <ul className="space-y-3">
                    {selectedProduct.features.map((feature) => (
                      <li key={feature._id} className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-neutral-800/50 dark:to-neutral-700/50 rounded-xl">
                        <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-neutral-900 dark:text-white">{feature.title}:</span>
                          <p className="text-neutral-700 dark:text-neutral-300 mt-1">{feature.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedProduct.technologies?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400 flex items-center gap-2">
                    <CogIcon className="w-5 h-5" />
                    Technologies
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {selectedProduct.technologies.map((tech, index) => (
                      <li key={index} className="text-neutral-700 dark:text-neutral-300">{tech}</li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedProduct.images?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400 flex items-center gap-2">
                    <EyeIcon className="w-5 h-5" />
                    Images
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedProduct.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => window.open(image, '_blank')}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700 flex justify-end">
                <button
                  onClick={closeModal}
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300"
                >
                  Close
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
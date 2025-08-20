import React, { useState, useEffect } from 'react';
import ProductCatalog from './ProductCatalog.jsx';
import axios from 'axios';
function MainProduct() {
    const [product, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchProducts = async (req,res) => {
        try {
            setLoading(true);
            const response = await axios.get('https://sahu-seed-backed.onrender.com/api/get-product');
            // console.log(response.data.product);
            setProducts(response.data.product);
            setError(null);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to fetch products. Please try again later.');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleRefresh = () => {
        fetchProducts();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Products</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button 
                        onClick={handleRefresh} 
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <ProductCatalog products={product} onRefresh={handleRefresh} />
        </div>
    );
}

export default MainProduct;

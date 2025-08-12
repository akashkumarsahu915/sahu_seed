import React from 'react';
// import theme from '';
import ProductCatalog from './ProductCatalog.jsx';
import { mockRootProps } from './constants.js';

function MainProduct() {
    return (

        <div className="min-h-screen bg-gray-50">
        <ProductCatalog products={mockRootProps.products} />
      </div>
    )
}

export default MainProduct

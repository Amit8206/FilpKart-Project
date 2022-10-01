import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import getParams from '../../utils/getParams'
import ClothingAndAccessories from './ClothingAndAccessories'
import ProductPage from './ProductPage/ProductPage'
import ProductStore from './ProductStore'
import './style.css'



const ProductListPage = (props) => {

    let { slug } = useParams();
    const location  = useLocation();
    
    const renderProduct = () => {
        // console.log({slug,location});
        const params = getParams(location.search);
        console.log(params)

        let content = null;
        switch (params.type) {
            case "store":
              content = <ProductStore location={location} slug={slug} />;
              break;
            case "page":
              content = <ProductPage location={location} slug={slug} />;
              break;
            default:
              content = <ClothingAndAccessories location={location} slug={slug} />
          }
          return content;
    }
    return (
        <Layout>
           {/* <ProductStore location={location} slug={slug}/> */}
           {renderProduct()}
        </Layout>
    )
}

export default ProductListPage
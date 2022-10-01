import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsBySlug } from '../../../actions';
import Card from '../../../components/UI/Card';
import { generatePublicUrl } from '../../../urlConfig';
import Price from '../../../components/UI/Price'
import Rating from '../../../components/UI/Rating'

const ProductStore = (props) => {

    const product = useSelector(state => state.product);
    const [priceRange, setPriceRange] = useState({
        under5k: 5000,
        under10k: 10000,
        under15k: 15000,
        under20k: 20000,
        under25k: 25000,
        under30k: 30000

    })

    const dispatch = useDispatch();

    // let params = useParams();
    const { slug, location } = props;

    useEffect(() => {
       console.log({slug,location})
        dispatch(getProductsBySlug(slug));
    }, []);


    return (
        <>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <Card
                            headerLeft={`${slug} Mobiles Under ${priceRange[key]}`}
                            headerRight={<button>View All</button>}
                            style={{
                                width: 'calc(100% - 40px)',
                                margin: '20px'
                            }}
                        >


                            {/* <div className="cardHeader">
                                <div>{slug} Under {priceRange[key]}</div>
                                <button>View All</button>
                            </div> */}
                            <div style={{ display: 'flex' }}>
                                {
                                    product.productsByPrice[key].map(product =>
                                        <Link 
                                        to={`/${product.slug}/${product._id}/p`} 
                                        style={{display: 'block', textDecoration: 'none' }} 
                                        className="productContainer"
                                        >
                                            <div className="productImgContainer">
                                                <img src={generatePublicUrl(product.productPictures[0].img)} alt="samsung-galaxy-s10-plus" />
                                            </div>
                                            <div className='productInfo'>
                                                <div style={{ margin: '10px 0' }}>{product.name}</div>
                                                <div>
                                                    {/* <span>4.4</span><br />&nbsp; */}
                                                    <Rating value='4.3' /> 
                                                    <span 
                                                    style={{ 
                                                        color: '#777',
                                                        fontWeight: '500',
                                                        fontSize: '14px',
                                                        marginLeft: '5px'
                                                     }}>(4044)</span>
                                                </div>
                                                {/* <div className='productPrice'>₹ {product.price}</div> */}
                                                <Price value={product.price} />
                                            </div>
                                        </Link>
                                    )
                                }
                            </div>
                        </Card>
                    );
                })
            }

        </>
    )
}

export default ProductStore
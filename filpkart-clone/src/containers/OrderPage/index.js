// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { getOrders } from "../../actions";
// import Layout from "../../components/Layout";
// import Card from "../../components/UI/Card";
// import { BiRupee } from "react-icons/bi";
// import { IoIosArrowForward } from "react-icons/io";

// import "./style.css";
// import { Breed } from "../../components/MaterialUI";

// /**
//  * @author
//  * @function OrderPage
//  **/

// const OrderPage = (props) => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user);

//   useEffect(() => {
//     dispatch(getOrders());
//   }, []);

//   console.log(user);

//   return (
//     <Layout>
//       <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
//         <Breed
//           breed={[
//             { name: "Home", href: "/" },
//             { name: "My Account", href: "/account" },
//             { name: "My Orders", href: "/account/orders" },
//           ]}
//           breedIcon={<IoIosArrowForward />}
//         />
//         {user.orders.map((order) => {
//           return order.items.map((item) => (
//             <Card style={{ display: "block", margin: "5px 0" }}>
//               <Link
//                 to={`/order_details/${order._id}`}
//                 className="orderItemContainer"
//               >
//                 <div className="orderImgContainer">
//                   <img
//                     className="orderImg"
//                     src={item.productId.productPictures[0].img}
//                   />
//                 </div>
//                 <div className="orderRow">
//                   <div className="orderName">{item.productId.name}</div>
//                   <div className="orderPrice">
//                     <BiRupee />
//                     {item.payablePrice}
//                   </div>
//                   <div>{order.paymentStatus}</div>
//                 </div>
//               </Link>
//             </Card>
//           ));
//         })}
//       </div>
//     </Layout>
//   );
// };

// export default OrderPage;





























import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { BiRupee } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { getOrders } from "../../actions";

import "./style.css";
import { Breed } from "../../components/MaterialUI";
import { generatePublicUrl } from "../../urlConfig";



/**
 * @author
 * @function OrderPage
 **/

const OrderPage = (props) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);


  console.log( user.orders );

  return (
    <Layout>
      <div style={{ maxWidth: "1750px", margin: "5px auto" }}>
        <Breed
          breed={[
            { name: "Home", href: "/" },
            { name: "My Account", href: "/account" },
            { name: "My Orders", href: "/account/orders" },
          ]}
          breedIcon={<IoIosArrowForward />}
        />
        {user.orders && user.orders.map((order) => {
          return order.items.map((item) => (
            <Card style={{  margin: "5px 0" }}>
              <Link to={`/order_details/${order._id}`} className="orderItemContainer">
                <div className="orderImgContainer" style={{
                  width: '150px',
                  height: '150px',
                  overflow: 'hidden',
                  textAlign: 'center'
                }}
                >
                  <img className="orderImg" style={{
                    maxWidth: 150,
                    maxHeight: 150,
                  }}
                    src={generatePublicUrl(item.productId.productPictures[0].img)} alt="" />
                </div>
                <div className="orderRow" style={{ display: 'flex', flex: '1', justifyContent: 'space-between' }}>
                  <div className="orderName" style={{ width: '300px' }}>{item.productId.name}</div>
                  <div className="orderPrice"><BiRupee /> {item.payablePrice}</div>
                  <div>{order.paymentStatus}</div>
                </div>
              </Link>
            </Card>
          ))
        }) // : <div>Login First</div>
        }
      </div>

    </Layout>
  )
}

export default OrderPage;


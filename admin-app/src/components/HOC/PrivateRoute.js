import { Navigate, Outlet } from 'react-router-dom'



const PrivateRoute = ( ) => {
    const token = window.localStorage.getItem('token');

    
   
return token ? ( 
                <Outlet />
    
      )  :  (   <Navigate to='/signin' />       )
         
}


export default PrivateRoute;







// return token ? ( 
//     <Routes>
//             <Route {...rest}  element={<Home />}  />           
//     </Routes>
    
//       )  :  (   <Navigate to='/signin' />       )
    














// const token = window.localStorage.getItem('token');
    
    // let navigate = useNavigate();

    // const signInNav = () => {
        
    //     return <Navigate to='/signin' />
    // }

    // const homeNav = () =>{
    //     return(
    //         <Routes>
    //             <Route exact path={path} element={element} />
    //         </Routes>
    //     )
    // }















  // () => homeNav()
        // <>
            // navigate('/signin'),
        //  </>
        // <Routes>
        //     <Navigate to='/signin' />
        // </Routes>



    //     return token ? (
    //         <Routes>
    //             <Route {...rest} element={element} />
    //         </Routes>
    //     ) : (
    //         <Navigate to={'/signin'} />  
    
          
    //     );
    // }
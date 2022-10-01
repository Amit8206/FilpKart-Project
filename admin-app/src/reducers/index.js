import { combineReducers } from "redux";
import authReducer from "./authReducers";
import userReducer from "./userReducers";
import categoryReducer from "./categoryReducer"
import productReducer from "./productReducer"
import orderReducer from "./orderReducer"
import pageReducer from "./pageReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    page: pageReducer
})


export default rootReducer;
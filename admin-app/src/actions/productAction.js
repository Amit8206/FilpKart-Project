import axios from "../helpers/axios"
import { categoryConstants } from "./constants";


export const addProduct = (form) => {
    return async (dispatch) => {
        const res = await axios.post(`product/create`, form);
        console.log(res);
    }      
}
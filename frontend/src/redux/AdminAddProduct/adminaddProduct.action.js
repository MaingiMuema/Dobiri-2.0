import axios from "axios";
import { ADMIN_ADD_PRODUCT } from "./adminaddProduct.type";

const mainUrl = "http://localhost:5000";
const token = localStorage.getItem("AdminToken");
const config = {
  headers: {
    admintoken: token,
  },
};
export const addProduct = (product) => async (dispatch) => {
  try {
    let res = await axios.post(`${mainUrl}/products/add`, product, config);
    dispatch({ type: ADMIN_ADD_PRODUCT, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

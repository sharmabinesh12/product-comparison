import { GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR } from "./action_types";

export const getProducts = () => ({
	type:GET_PRODUCTS
});

export const getProductsSuccess  = (productData) =>({
	type: GET_PRODUCTS_SUCCESS,
	productData
})

export const getProductsError  = (error) =>({
	type: GET_PRODUCTS_ERROR,
	error
})
import { GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR } from "../actions/action_types";
const initialState = {
	isLoading: false,
	error: false,
	productData: null
}
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_PRODUCTS:
			return {
				...state,
				isLoading: true,
				error: false,
				productData: null
			};
		case GET_PRODUCTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: false,
				productData: action.productData
			};
		case GET_PRODUCTS_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.error,
				productData: null
			};
		default:
			return state;
	}
}
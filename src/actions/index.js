import {fetchData} from "./utilityActions";
import {FetchFoodSuccess} from "../constants/actionTypes";
import {parseFoodData} from "./foodActions";

export const fetchFoodData = (urls, args) => fetchData(urls, parseFoodData, args, FetchFoodSuccess);

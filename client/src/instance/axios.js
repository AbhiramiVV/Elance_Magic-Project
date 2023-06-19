import axios from "axios";
import { BaseUrl } from "./constraints";
console.log("dfg" , BaseUrl);

const instance = axios.create({

    baseURL:BaseUrl
})
export default instance;
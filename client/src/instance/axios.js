import axios from "axios";
import { BaseUrl } from "./constraints";
console.log("dfg" , BaseUrl);

const instance = axios.create({

    baseURL:'http://localhost:5000'
})
export default instance;
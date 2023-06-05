import axios from "axios";
import { BaseUrl } from "./constraints";

const instance = axios.create({
    baseURL:BaseUrl
})
export default instance;
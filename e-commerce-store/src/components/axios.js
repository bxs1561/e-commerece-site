import React from "react";
import axios from "axios";

const instance = axios.create({
    baseURL: "https://nepkart.herokuapp.com/"
    // baseURL: "http://localhost:9000/"
})
export default instance

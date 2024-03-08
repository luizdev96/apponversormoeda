import axios from "axios";

//https://economia.awesomeapi.com.br/json/all
// json/all

// Rota paa buscar BTC e BRL = all/BTC-BRL

export const api = axios.create({
    baseURL: "https://economia.awesomeapi.com.br/json/"
});

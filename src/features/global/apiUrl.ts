import axios from "axios";

const apiUrl = axios.create({
    baseURL:"https://pokeapi.co/api/v2",
})

export default apiUrl
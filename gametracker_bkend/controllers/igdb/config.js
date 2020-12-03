const axios = require('axios');

let CLIENT_ID = process.env.IGDB_CLIENT_ID
let AUTH_TOKEN = process.env.IGDB_AUTHORIZATION_TOKEN

const igdbApi = axios.create({
    // IF MORE SPECIFIC URL IS NEEDED, CHANGE URL TO BASEURL,
    // AND APPEND SPECIFIC ROUTE ON REQUEST
    baseURL: 'https://api.igdb.com/v4',
    headers: {
        'Client-ID': CLIENT_ID,
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        // 'Content-Type': 'text/plain', 
        // 'Cookie': '__cfduid=d0e187b56d3092f88f3f7ce8435cd65fe1606326498'
    }
    
})

module.exports = igdbApi
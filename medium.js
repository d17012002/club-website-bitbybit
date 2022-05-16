const https = require("https");
let medium_url =
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40bitbybit_vitb";
// https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40bitbybit_vitb
// https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40devanshuyadav1611
async function fetchBlogs() {
    https
        .get(medium_url, (res) => {
            let body = "";
            res.on("data", (chunk) => {
                // console.log(chunk);
                body += chunk;
            });
            res.on("end", () => {
                let json = JSON.parse(body);
                itemsArr = json.items;
            });
        })
        .on("error", (error) => {
            console.error(error.message);
        });
}

module.exports = fetchBlogs();

let e621_base_url = "https://e621.net/";
let tag_join, e621_full_url;
const config = require("../../config/config.json");
let User_Agent = "IzzyMoonsong/Moon.Bot-2.0_Beta";
const axios = require("axios").default;

module.exports.e621 = async(rating, tags, image_array_to_embed, nsfw) => {
    switch(rating){
        case 's':
            rating = "rating:s";
            break;
        case 'q':
            if(nsfw == true) {
                rating = "rating:q";
            } else rating = "rating:s";
            break;
        case 'e':
            if(nsfw == true) {
                rating = "rating:e";
            } else rating = "rating:s";
            break;
    }

    tag_join = tags.replace(" ", "+");
    e621_full_url = e621_base_url+"posts.json?tags="+rating+"+"+tag_join+"+order:random&limit=1";
    console.log(image_array_to_embed); 
    await axios.get(e621_full_url, {
        headers:{
            "User-Agent": User_Agent,
        }, form: {
            "login": config.e621.login,
            "api_key": config.e621.api_key
        }}).then(function (response) {
            if(response.data.posts == 0) {
                image_array_to_embed[0] = "No";
                image_array_to_embed[1] = "-";
                image_array_to_embed[2] = "-";
                image_array_to_embed[3] = "-";
            } else {
                image_array_to_embed[0] = "Yes";
                image_array_to_embed[1] = response.data.posts[0]["id"];
                image_array_to_embed[2] = "https://e621.net/post/show/"+response.data.posts[0]["id"];
                image_array_to_embed[3] = response.data.posts[0]["file"]["url"];
            }

    });
}
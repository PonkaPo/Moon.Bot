let rating, tags, gelbooru_auth, gelbooru_full_url;
let gelbooru_base_url = "https://gelbooru.com/index.php?page=dapi&s=post&q=index";
const axios = require("axios").default;
const config = require("../../config/config.json");

module.exports.gelbooru = async(rating, tags, image_array_to_embed, nsfw) => {
    switch(rating){
        case 'safe':
            rating = "+rating:safe";
            break;
        case 'questionable':
            if(nsfw == true) {
                rating = "+rating:questionable";
                image_array_to_embed[5] = nsfw;
            } else rating = "+rating:safe";
            break;
        case 'explicit':
            if(nsfw == true) {
                rating = "+rating:explicit";
                image_array_to_embed[5] = nsfw;
            } else rating = "+rating:safe";
            break;
    }
    tags = tags.split(" ").join("+");
    tags = tags+rating
    gelbooru_auth = "&api_key="+config.gelbooru.api_key+"&user_id="+config.gelbooru.user_id;
    gelbooru_full_url = gelbooru_base_url+"&tags="+tags+"+sort:random"+gelbooru_auth+"&json=1&limit=1";
    
    await axios.get(gelbooru_full_url).then(function (response) {
        if(response.data.length == 0) {
            image_array_to_embed[0] = "No";
            image_array_to_embed[1] = "-";
            image_array_to_embed[2] = "-";
            image_array_to_embed[3] = "-";
        } else {
            image_array_to_embed[0] = "Yes";
            image_array_to_embed[1] = response.data[0]["id"];
            image_array_to_embed[2] = "https://gelbooru.com/index.php?page=post&s=view&id="+response.data[0]["id"];
            image_array_to_embed[3] = response.data[0]["file_url"];
        }
    });
}
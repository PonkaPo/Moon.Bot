let derpi_base_url = "https://derpibooru.org/api/v1/json/search/images?q=";
const config = require("../../config/config.json");
const axios = require("axios").default;
let derpi_full_url;

module.exports.derpibooru = async(rating, tags, image_array_to_embed, nsfw) => {
    console.log(rating+"\n"+tags);
    switch(rating){
        case 'sa':
            rating = "+AND+safe&filter_id=37431";
            break;
        case 'su':
            if(nsfw == true) {
                rating = "+AND+suggestive&filter_id=37431";
            } else tag = "+AND+safe&filter_id=37431";
            break;
        case 'q':
            if(nsfw == true) {
                rating = "+AND+questionable&filter_id=56027";
            } else rating = "+AND+safe&filter_id=37431";
            break;
        case 'e':
            if(nsfw == true) {
                rating = "+AND+explicit&filter_id=56027";
            } else rating = "+AND+safe&filter_id=37431";
            break;
    }
    tags = tags.split(", ").join("+AND+");
    tags = tags.split(" ").join("+");
    
    derpi_full_url = derpi_base_url+tags+rating+"&sf=random&key="+config.derpi.api_key
    await axios.get(derpi_full_url).then(function (response) {
        if(response.data.images.length == 0) {
            image_array_to_embed[0] = "No";
            image_array_to_embed[1] = "-";
            image_array_to_embed[2] = "-";
            image_array_to_embed[3] = "-";
        } else {
            image_array_to_embed[0] = "Yes";
            image_array_to_embed[1] = response.data.images[0]["id"];
            image_array_to_embed[2] = "https://derpibooru.org/images/"+response.data.images[0]["id"];
            image_array_to_embed[3] = response.data.images[0]["view_url"];
        }
    });
}
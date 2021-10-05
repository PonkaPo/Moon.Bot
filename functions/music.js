module.exports.create_music_table = (DB, artist) => {
    DB.query("CREATE TABLE `music`.`"+artist+"` (name CHAR(50) PRIMARY KEY, song CHAR(50) NOT NULL, artist CHAR(50) NOT NULL, released CHAR(50) NOT NULL, link TEXT(200) NOT NULL)");
};

module.exports.write_song_data = async(DB, ShortArtistName, ShortSongName, SongName, ArtistName, ReleasedDate, SongLink) => {    
    DB.query("INSERT INTO `music`.`"+ShortArtistName.content+"` VALUES ('"+ShortSongName.content+"', '"+SongName.content+"', '"+ArtistName.content+"', '"+ReleasedDate.content+"', '"+SongLink.content+"')");    
};

module.exports.get_music_link = async(DB, message, args) => {
    return new Promise((resolve, reject) => {

        DB.query("SELECT `song`, `artist`, `released`, `link` FROM `music`.`"+args[0]+"` WHERE `name` = '"+args[1]+"'", function (error, music_result) {
            if(error) reject(error);
            resolve(music_result);
        });

    });
};

module.exports.check_if_artist_exists = async(DB, interaction) => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'music' AND table_name = '"+interaction.options.getString("artist")+"'", function (error, artist_result) {
            if(error) reject(error);
            resolve(artist_result);
        });
    });
};

module.exports.check_if_song_exists = async(DB, interaction) => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT * FROM `music`.`"+interaction.options.getString("artist")+"` WHERE `name` = '"+interaction.options.getString("song")+"'", function (error, song_result) {
            if(error) reject(error);
            resolve(song_result);
        });
    });
};

module.exports.artists_from_db = async(DB) => {
    return new Promise((resolve, reject) => {
        DB.query("SHOW TABLES FROM `music`", function (error, artists_list_from_db) {
            if(error) reject(error);
            resolve(artists_list_from_db);
        });    
    });
};

module.exports.get_music = async(DB, interaction) => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT `name`, `song` FROM `music`.`"+interaction+"`", function (error, music_result_from_db) {
            resolve(music_result_from_db);
        });
    });
};
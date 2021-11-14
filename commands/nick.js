const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageMentions } = require("discord.js");
let user,nick,success;

module.exports = {
    name: "nick",
    data: new SlashCommandBuilder()
        .setName("nick")
        .setDescription("Change yours or somebody else's nickname")
        .addStringOption(option => option.setName("nick").setDescription("Nick command (to remove nick, just use /nick without parameters)"))
        .addUserOption(option => option.setName("target").setDescription("Change nickname of target")),
    async execute(interaction) {
        if(!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)) return ia_reply(interaction, "I missing `MANAGE_NICKNAMES` permission.");
        if(!interaction.options.getUser("target")) {
            if (!interaction.member.permissions.has(Permissions.FLAGS.CHANGE_NICKNAME)) return ia_reply(interaction, "You missing `CHANGE_NICKNAME` permission.");
            user = interaction.user;
            success = false;
        } else {
            if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)) return ia_reply(interaction, "You missing `MANAGE_NICKNAMES` permission.");
            user = interaction.options.getUser("target");
            success = true;
        }
        if (interaction.guild.members.resolve(user).roles.highest.position > interaction.member.roles.highest.position) return ia_reply(interaction, "Target member has higher role than you");

        if(!interaction.options.getString("nick")) {
            interaction.guild.members.cache.get(user.id).setNickname("");
            return ia_reply(interaction, user.username+" has removed nick now");
        } else nick = interaction.options.getString("nick");
        if(nick.length > 32) return ia_reply(interaction, "can't be longer than 32 characters.");
        let check_for_ids_in_nick_string = await test_for_user_id(interaction.options.getString("nick"));
        if(check_for_ids_in_nick_string == true) {
            return ia_reply(interaction, " nick cannot contain any user/roles IDs", false);
        }
        try {
            interaction.guild.members.cache.get(user.id).setNickname(nick);
                return ia_reply(interaction, "Member "+user.username+" has a new nick => "+nick, success);
        } catch(err) {
            return ia_reply(interaction, "- Error occured:\n" + err);
        }

    }
}

async function ia_reply(interaction, content, success) {
    interaction.reply({
        content: "**Nick** "+content,
        ephemeral: true
    });
    if(success == true) {
        return interaction.channel.send({
            content: "**Nick** "+content+" --> Changed by **"+interaction.user.username+"**"
        });
    } else return;
}

async function test_for_user_id(nick_string) {
    const user_ids_regex = MessageMentions.USERS_PATTERN;
    return user_ids_regex.test(nick_string);
}
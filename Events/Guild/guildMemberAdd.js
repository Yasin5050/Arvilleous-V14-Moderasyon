const {EmbedBuilder} = require("@discordjs/builders");
const {GuildMember, Embed} = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    execute(member) {
        const {user, guild} = member;

        const TwilightKanal = member.guild.channels.cache.get('1056154742306394162');
        const TwilightMesaj = `<a:elsallama_arvis0011:1048619375655133255> Selamm ${member}, Aramıza Hoş Geldin \n\n> Seninle Birlikte **${member.guild.memberCount}** Kişi Olduk`;

        const TwilightEmbed = new EmbedBuilder()
        .setTitle(`Vahşi Bir ${user.tag} Belirdi!`)
        .setDescription(TwilightMesaj)
        .setFooter({ text: "Made by ❤️ ArviS#0011" })
        .setThumbnail(member.user.displayAvatarURL())
        .setColor(0x03fc07)

        TwilightKanal.send({embeds: [TwilightEmbed]});
    }
}
const {EmbedBuilder} = require("@discordjs/builders");
const {GuildMember, Embed} = require("discord.js");

module.exports = {
    name: "guildMemberRemove",
    execute(member) {
        const {user, guild} = member;

        const ArviSKanal = member.guild.channels.cache.get('1056154742306394162');
        const ArviSMesaj = `${member} Neden Gittin... <a:sigara_arvis0011:1051131551330607104> \n\n> Sensiz **${member.guild.memberCount}** Kişi Kaldık`;
        
        const ArviSEmbed = new EmbedBuilder()
        .setTitle(`Vahşi Üye Aramızdan Ayrıldı :(`)
        .setDescription(ArviSMesaj)
        .setFooter({ text: "Made by ❤️ ArviS#0011" })
        .setThumbnail(member.user.displayAvatarURL())
        .setColor(0xfc0303)

        ArviSKanal.send({embeds: [ArviSEmbed]});
    }
}
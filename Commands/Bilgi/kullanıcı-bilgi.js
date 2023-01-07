const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kullanıcı-bilgi")
    .setDescription("Üyenin Bilgilerini Gösterir")
    .addUserOption(option => 
        option.setName("üye")
        .setDescription("Bir Üye Seç")
        .setRequired(false)
    ),

    async execute(interaction) {
        const { options } = interaction;
        const user = options.getUser("üye") || interaction.user;
        const member = await interaction.guild.members.cache.get(user.id);
        const icon = user.displayAvatarURL()
        const tag = user.tag;

        const arvsembed = new EmbedBuilder()
        .setColor(0x1105fa)
        .setAuthor({ name: tag, iconURL: icon })
        .addFields(
            { name: "İsim", value: `${user}`, inline: true },
            { name: "Kullanıcı Adı", value: `${user.username}#${user.discriminator}`, inline: true },
            { name: "Hesap ID", value: `${user.id}`, inline: true },

            { name: "Giriş Tarihi", value: `<t:${parseInt(member.joinedAt / 1000)}:R>`, inline: true },
            { name: "Hesap Yaşı", value: `<t:${parseInt(member.user.createdAt / 1000)}:R>`, inline: true },

            { name: "Rolleri", value: `${member.roles.cache.map(r => r).join(`` )}`, inline: false }
        )
        .setFooter({ text: "Made by ❤️ ArviS#0011" })

        await interaction.reply({ embeds: [arvsembed] })

    }
}
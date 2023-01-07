const { Client, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("zamanaşımı-kaldır")
        .setDescription("Üyenin, Zamanaşımını Kaldırır")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option.setName("üye")
                .setDescription("Zamanaşımı Yemiş Üye")
                .setRequired(true)
        ),
    async execute(interaction) {
        const { guild, options } = interaction;

        const user = options.getUser("üye");
        const member = guild.members.cache.get(user.id);

        const hatarvsEmbed = new EmbedBuilder()
            .setDescription('Hata! Daha Sonra Tekrar Dene')
            .setColor(0xff0000)

        const başarılıEmbed = new EmbedBuilder()
            .setTitle("**<:tik2_arvis0011:1046067679884234863>・Zamanaşımı Başarıyla Kaldırıldı**")
            //.setDescription(`${user}'ın Zamanaşımı Başarıyla Kaldırıldı`)
            .addFields(
                { name: "Üye", value: `${user}`, inline: true },
            )
            .setColor(0x0eff00)

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [hatarvsEmbed], ephemeral: true }); 

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
            return interaction.reply({ embeds: [hatarvsEmbed], ephemeral: true });

        try {
            await member.timeout(null);

            interaction.reply({ embeds: [başarılıEmbed], ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban-at")
        .setDescription("Üyeyi Sunucudan Banlarsınız")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option.setName("üye")
                .setDescription("Banlanacak Üye")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("sebep")
                .setDescription("Ban Sebebi")
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const üye = options.getUser("üye");
        const sebep = options.getString("sebep") || "Banlanma Sebep Girilmemiş";

        const member = await interaction.guild.members.fetch(üye.id);

        const hatarvsEmbed = new EmbedBuilder()
            .setDescription(`Daha Yüksek Bir Role Sahip Olduğu İçin **${üye.username}** Üstünde İşlem Yapamazsınız`)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setColor("#ff0000");

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [hatarvsEmbed], ephemeral: true });

        await member.ban({ sebep });

        const arvembed = new EmbedBuilder()
        .setTitle("**<:tik2_arvis0011:1046067679884234863>・Üye Başarıyla Yasaklandı**")
            //.setDescription(`${üye} Başarıyla Banlandı \n Sebep: ${sebep}`)
            .addFields(
                { name: "Üye", value: `${üye}`, inline: true },
                { name: "Sebep", value: `${sebep}`, inline: true }
            )
            .setColor(0x0eff00)
            .setFooter({ text: "Made by ❤️ ArviS#0011" });

        await interaction.reply({
            embeds: [arvembed]
        });
    }
}
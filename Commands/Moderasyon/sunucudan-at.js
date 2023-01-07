const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sunucudan-at")
        .setDescription("Üyeyi Sunucudan Kicklersiniz")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName("üye")
                .setDescription("Atılacak Üye")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("sebep")
                .setDescription("Atılma Sebebi")
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const aüye = options.getUser("üye");
        const asebep = options.getString("sebep") || "Atılma Sebep Girilmemiş";

        const member = await interaction.guild.members.fetch(aüye.id);

        const hatarvsEmbed = new EmbedBuilder()
                .setDescription(`Daha Yüksek Bir Role Sahip Olduğu İçin **${aüye.username}** Üstünde İşlem Yapamazsınız`)
            .setColor(0xff0000).setFooter({ text: "Made by ❤️ ArviS#0011" });

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [hatarvsEmbed], ephemeral: true });

        await member.kick(asebep);

        const arvsembed = new EmbedBuilder()
            .setTitle("**<:tik2_arvis0011:1046067679884234863>・Üye Başarıyla Atıldı**")
            //.setDescription(`${aüye} - Başarıyla Kicklendi`)
            .addFields(
                { name: "Üye", value: `${aüye}`, inline: true },
                { name: "Sebep", value: `${asebep}`, inline: true }
            )
            .setColor(0x0eff00)
            .setFooter({ text: "Made by ❤️ ArviS#0011" });

        await interaction.reply({
            embeds: [arvsembed],
        });
    }
}
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban-kaldır")
        .setDescription("Üyenin Banını Açarsınız")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option =>
            option.setName("üyeid")
                .setDescription("Üyenin Kullanıcı ID'si")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const üyeID = options.getString("üyeid");

        try {
            await interaction.guild.members.unban(üyeID);

            const arvsembed = new EmbedBuilder()
            .setTitle("**<:tik2_arvis0011:1046067679884234863>・Üyenin Yasağı Başarıyla Kaldırıldı**")
                .setDescription(`**${üyeID}** ID'sine Sahip Üyenin Banı Kaldırıldı`)
                .setColor("#0eff00")
                .setFooter({ text: "Made by ❤️ ArviS#0011" });

            await interaction.reply({
                embeds: [arvsembed],
            });
        } catch (err) {
            console.log(err);

            const hatarvsEmbed = new EmbedBuilder()
                .setDescription(`Geçersiz Üye ID'si`)
                .setFooter({ text: "Made by ❤️ ArviS#0011" })
                .setColor(0xff0000);

            interaction.reply({ embeds: [hatarvsEmbed], ephemeral: true });
        }
    }
}
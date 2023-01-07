const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("anket-başlat")
        .setDescription("Belirlediğin Kanalda Anket Başlatır")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName("açıklama")
                .setDescription("Anketin Açıklaması")
                .setRequired(true)
        )

        .addChannelOption(option =>
            option.setName("kanal")
                .setDescription("Anketin Atılacağı Kanal")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        ),

    async execute(interaction) {
        const { options } = interaction;

        const channel = options.getChannel("kanal");
        const description = options.getString("açıklama");

        const embed = new EmbedBuilder()
            .setImage("https://media.discordapp.net/attachments/997105193256747028/1039563280315846717/logox2_white.png")
            .setColor("#2f3136")
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(description)

        try {
            const m = await channel.send({ embeds: [embed] });
            await m.react("<:tik_arvis0011:1046067679884234863>");
            await m.react("<:carpi_arvis0011:1046067681515814912>");
            await interaction.reply({ content: "**[ArviS#0011]** Anket, Belirtilen Kanalda Açıldı ", ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}
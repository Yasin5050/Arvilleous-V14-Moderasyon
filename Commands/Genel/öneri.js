const { SlashCommandBuilder, EmbedBuilder } =require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("öneri")
    .setDescription("Önerilerinizi Tek Komutla İletebilirsiniz")
    .addStringOption(option => 
        option.setName("önerin")
        .setDescription("Önerini Yaz")
        .setRequired(true)
    )

    .addStringOption(option => 
        option.setName("açıklama")
        .setDescription("Önerini Açıkla")
        .setRequired(true)
    ),

    async execute(interaction) {
        const { guild, options, member } = interaction;

        const name = options.getString("önerin");
        const description = options.getString("açıklama");

        const embed = new EmbedBuilder()
        .setColor(0x03ff24)
        .setDescription(`${member} Tarafından Yeni Bir Öneri Sunuldu`)
        .addFields(
            { name: "Öneri:", value: `${name}` },
            { name: "Açıklama", value: `${description}` },
        )
        .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) });

        await guild.channels.cache.get("997105193256747028").send ({
            embeds: ([embed]),
        }).then((s) => {
            s.react('<:tik_arvis0011:1046067679884234863>');
            s.react('<:carpi_arvis0011:1046067681515814912>');
        }).catch((err) => {
            throw err;
        });

        interaction.reply({ content: "<:tik_arvis0011:1046067679884234863> Önerin Başarıyla İletildi", ephemeral: true })
    }
}
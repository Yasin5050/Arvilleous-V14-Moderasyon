const {EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('sahte-buton')
    .setDescription('Sahte Buton Sistemini Ayarlar')
    .addChannelOption(option =>
        option.setName('kanal')
        .setDescription('Butonun Gönderileceği Kanalı Ayarla')
        .setRequired(true)
    )

    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel('kanal');
        const nitroEmbed = new EmbedBuilder()
        .setTitle("<a:nitroboost_arvis0011:1058003701496807544>・Nitro Gift")
        .setFooter({ text: "Made by ❤️ ArviS#0011" })
        .setDescription('<a:kertenkelehehe_arvis0011:997610153102807170>・Hızlı Ol, Nitroyu Kap')
        .setImage("https://media.discordapp.net/attachments/1008342006956830790/1048639508515668098/nitro-discord.gif")
        .setColor("#2f3136")

        let sendChannel = channel.send({
            embeds: ([nitroEmbed]),
            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('nitro').setLabel('3 Aylık Boostlu Nitro').setStyle(ButtonStyle.Success),
                ),
            ],
        });

        if (!sendChannel) {
            return interaction.reply({content: '**[ArviS#0011]** Hata! Daha Sonra Tekrar Dene', ephemeral: true});
        } else {
            return interaction.reply({content: '**[ArviS#0011]** Sahte Buton Başarıyla Ayarlandı', ephemeral: true});
        }
    },
};
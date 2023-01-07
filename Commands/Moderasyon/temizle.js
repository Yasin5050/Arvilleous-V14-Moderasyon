const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("temizle")
    .setDescription("Girdiğiniz Sayısal Değer Kadar Mesaj Temizleyin")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(option =>
        option.setName('değer')
        .setDescription('Temizlenecek Mesaj Sayısı')
        .setMinValue(1)
        .setMaxValue(99)
        .setRequired(true)
        )

    .addUserOption(option =>
        option.setName('üye')
        .setDescription('Mesajları Silinecek Üye')
        .setRequired(false)
        ),

    async execute(interaction) {
        const {channel, options} = interaction;

        const değer = options.getInteger('değer');
        const hedef = options.getUser("üye");

        const messages = await channel.messages.fetch({
            limit: değer +1,
        });

        const arvs = new EmbedBuilder()
            .setColor(0x0eff00)

        if(hedef) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) =>{
                if(msg.author.id === hedef.id && değer > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                arvs.setDescription(`${hedef} Üyesinin Attığı **${messages.size} Mesaj** Temizlendi`).setFooter({ text: "Made by ❤️ ArviS#0011" });
                interaction.reply({embeds: [arvs]}); 
            });
        } else {
            await channel.bulkDelete(değer, true).then(messages => {
                arvs.setDescription(`**${messages.size} Mesaj** Kanaldan Temizlendi`).setFooter({ text: "Made by ❤️ ArviS#0011" });
                interaction.reply({embeds: [arvs]});
            });
        }
    }
}

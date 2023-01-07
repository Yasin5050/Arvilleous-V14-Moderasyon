const {SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ChannelType, Embed, embedLength} = require("discord.js");
const logSchema = require("../../Models/Logs");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("log-sistemi")
    .setDescription("Denetim Kaydı Günlüklerini Bir Kanalda Toplamanızı Sağlar")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option => 
        option.setName("kanal")
        .setDescription("Kayıtların Gönderileceği Kanal")
        .setRequired(false)
    ),

    async execute(interaction) {
        const {guildId, options} = interaction;
 
        const logKanal = options.getChannel("kanal") || kanal;
        const arvsembed = new EmbedBuilder()

    

        logSchema.findOne({ Guild: guildId }, async (err, data) => {
            if (!data) {
                logSchema.findOneAndDelete({ Guild: guildId });
                await logSchema.create({
                    Guild: guildId,
                    Channel: logKanal.id
                });

                arvsembed.setDescription("<:tik_arvis0011:1046067679884234863> Veri Başarıyla DataBase'e Gönderildi")
                .setColor(0x03fc17).setFooter({ text: "Made by ❤️ ArviS#0011" })
            } else if (data) {
                await logSchema.create({
                    Guild: guildId,
                    Channel: logKanal.id
                });

                arvsembed.setDescription("<:tik_arvis0011:1046067679884234863> Eski Veri Başarıyla Yeni Verilerle Değiştirildi")
                .setColor(0x03fc17).setFooter({ text: "Made by ❤️ ArviS#0011" })
            }

            if (err) {
                arvsembed.setDescription("<a:dikkat_arvis0011:997074866371039322> Bir Şeyler Ters Gitti, Lütfen **ArviS#0011** İle İletişime Geçin")
                .setColor(0xfc0303).setFooter({ text: "Made by ❤️ ArviS#0011" })
            }

            return interaction.reply({ embeds: [arvsembed], ephemeral: true });
        })
    }
}
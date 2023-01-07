const { SlashCommandBuilder } = require("discord.js");
const afkModel = require("../../Models/Afk");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("afk")
    .setDescription("Sade Bir AFK Sistemi"),

    async execute(interaction) {
        const { guildId, user } = interaction;

        await afkModel.findOne({ GuildId: guildId, UserID: user.id }, async (err, data) => {
            try {
                if (!data) {
                    await afkModel.create({
                        GuildId: guildId,
                        UserID: user.id,
                        Afk: true
                    });
                } else if (data.Afk) {
                    data.Afk = false;
                    data.save();
                    return interaction.reply({ content: "**[ArviS#0011]** AFK Modundan Çıkış Yaptın", ephemeral: true });
                } else {
                    data.Afk = true;
                    data.save();
                }
                return interaction.reply({ content: "**[ArviS#0011]** AFK Moduna Geçtin", ephemeral: true });
            } catch (e) {
                console.log(e);
            }
        }).clone();
    },
};
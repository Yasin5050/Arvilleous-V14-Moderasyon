const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, Embed } = require("discord.js");
const warningSchema = require('../../Models/Warning');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("uyarı")
    .setDescription("Düzeni Bozanları Uyar")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addSubcommand(subcommand =>
        subcommand.setName("at")
        .setDescription("Uyarı Atarsınız")

        .addUserOption(option => 
            option.setName("üye")
            .setDescription("Uyarı Atılacak Kişi")
            .setRequired(true)
        )

        .addStringOption(option => 
            option.setName("sebep")
            .setDescription("Uyarı Sebebi")
            .setRequired(true)
        )

        .addStringOption(option =>
            option.setName("kanıt")
            .setDescription("Uyarı Sebebinin Kanıtı")
            .setRequired(false)
        )

    )

    .addSubcommand(subcommand => 
        subcommand.setName("kontrol")
        .setDescription("Üyenin Uyarılarını Kontrol Edersiniz")

        .addStringOption(option => 
            option.setName("üye")
            .setDescription("Kontrol Edilecek Üye")
            .setRequired(true)
        )
    )

    .addSubcommand(subcommand => 
        subcommand.setName("kaldır")
        .setDescription("Üyenin Uyarısını Kaldırırsınız")

        .addStringOption(option =>
            option.setName("id")
            .setDescription("Üye ID")
            .setRequired(false)
        )
    )

    .addSubcommand(subcommand => 
        subcommand.setName("temizle")
        .setDescription("Üyenin TÜM Uyarılarını Silersiniz")

        .addStringOption(option => 
            option.setName("üye")
            .setDescription("Uyarıları Temizlenecek Üye")
            .setRequired(true)
        )
    ),

    async execute(interaction) {
        const { options, guildId, user, member } = interaction;

        const sub = options.getSubcommand(["at", "kontrol", "kaldır", "temizle"]);
        const target = options.getUser("üye");
        const reason = options.getString("sebep") || "Sebep Girilmemiş";
        const evidance = options.getString("kanıt") || "Kanıt Eklenmemiş";
        const warnId = options.getIntager("id") - 1;
        const warnDate = new Date(interaction.createdTimestamp).toLocaleDateString();

        const userTag = `${target.username}#${target.discriminator}`;

        const embed = new EmbedBuilder();

        switch (sub) {
           case "at": 
                warningSchema.findOne({ GuildID: guildId.id, UserID: target.id, UserTag: userTag }, async (err,data) => {
                    if (err) throw err;

                    if (!data) {
                        data = new warningSchema({
                            GuildID: guildId,
                            UserID: target.id,
                            UserTag: userTag,
                            Content: [
                                {
                                    ExecuterId: user.id,
                                    ExecuterTag: user.tag,
                                    Reason: reason,
                                    Evidance: evidance,
                                    Date: warnDate
                                }
                            ],
                        });
                    } else {
                        const warnContent = {
                            ExecuterId: user.id,
                            ExecuterTag: user.tag,
                            Reason: reason,
                            Evidance: evidance,
                            Date: warnDate
                        }
                        data.Content.push(warnContent);
                    }
                    data.save();
                });

                embed.setColor(0x03ff24)
                .setDescription(`
                **Uyarı Eklendi:** ${userTag} | ||${target.id}|| 
                **Sebep:** ${reason}
                **Kanıt:** ${evidance}
                `)
                    .setFooter({ text: "Made by ❤️ ArviS#0011" })

                interaction.reply({ embeds: [embed] });
            break;

            case "kontrol": 
            warningSchema.findOne({ GuildID: guildId.id, UserID: target.id, UserTag: userTag }, async (err,data) => {
                if (err) throw err;

                if (data) { 
                    embed.setColor(0x03ff24)
                    .setDescription(`${data.Content.map(
                        (w, i) => 
                        `**ID:** ${i + 1}
                        **Kontrol Eden:** ${w.ExecuterTag}
                        **Tarih:** ${w.Date}
                        **Sebep:** ${w.Reason}
                        **Kanıt:** ${w.Evidance} \n\n
                        `
                    ).join(" ")}`)
                    .setFooter({ text: "Made by ❤️ ArviS#0011" })

                    interaction.reply({ embeds: [embed] });
                } else {
                    embed.setColor(0xff1403)
                    .setDescription(`${user.tag} | ||${target.id}|| Üyesinin Uyarıs(lar)ı Bulunmuyor`)
                    .setFooter({ text: "Made by ❤️ ArviS#0011" })

                    interaction.reply({ embeds: [embed] });
                }
            });
                break;

            case "kaldır": 
            warningSchema.findOne({ GuildID: guildId.id, UserID: target.id, UserTag: userTag }, async (err,data) => {
                if (err) throw err;

                if (data) { 
                    data.Content.splice(warnId, 1);
                    data.save();


                    embed.setColor(0x24f032)
                    .setDescription(`${user.tag} Adlı Üyenin Uyarı ID: ${warnId + 1} Sayılı Uyarısı Kaldırıldı`)
                    .setFooter({ text: "Made by ❤️ ArviS#0011" })

                    interaction.reply({ embeds: [embed] });
                } else {
                    embed.setColor(0xff1403)
                    .setDescription(`${user.tag} | ||${target.id}|| Üyesinin Uyarıs(lar)ı Bulunmuyor`)
                    .setFooter({ text: "Made by ❤️ ArviS#0011" })

                    interaction.reply({ embeds: [embed] });
                }
            });
                break;

            case "temizle": 
            warningSchema.findOne({ GuildID: guildId.id, UserID: target.id, UserTag: userTag }, async (err,data) => {
                if (err) throw err;

                if (data) { 
                    await warningSchema.findOneAndDelete({ GuildID: guildId.id, UserID: target.id, UserTag: userTag });


                    embed.setColor(0x24f032)
                    .setDescription(`${user.tag} Adlı Üyenin Uyarıları Temizlendi | ||${target.id}||`)
                    .setFooter({ text: "Made by ❤️ ArviS#0011" })

                    interaction.reply({ embeds: [embed] });
                } else {
                    embed.setColor(0xff1403)
                    .setDescription(`${user.tag} | ||${target.id}|| Üyesinin Uyarıs(lar)ı Bulunmuyor`)
                    .setFooter({ text: "Made by ❤️ ArviS#0011" })

                    interaction.reply({ embeds: [embed] });
                }
            });
            break;
        }
    }
}

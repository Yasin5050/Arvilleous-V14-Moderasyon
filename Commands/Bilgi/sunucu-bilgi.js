const { SlashCommandBuilder, EmbedBuilder, ChannelType, GuildVerificationLevel, GuildExplicitContentFilter, GuildNSFWLevel } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("sunucu-bilgi")
    .setDescription("Sunucunun Bilgilerini Gösterir")
    .setDMPermission(false),

    async execute(interaction) {
        const { guild } = interaction;
        const { members, channels, emojis, roles, stickers } = guild;

        const sortedRoles = roles.cache.map(role => role).slice(1, roles.cache.size).sort((a, b) => b.position - a.position);
        const userRoles = sortedRoles.filter(role => !role.managed);
        const managedRoles = sortedRoles.filter(role => role.managed);
        const botCount = members.cache.filter(member => member.user.bot).sizeM

        const maxDisplayRoles = (roles, maxFieldLength = 1024) => {
            let totalLength = 0;
            const result = [];

            for (const role of roles) {
                const roleString = `<@&${role.id}`;

                if(roleString.length + totalLength > maxFieldLength)
                break;

                totalLength += roleString.length + 1
                result.push(roleString);
            }

            return result.length;

        }

        const splitPascal = (string, separator) => string.split(/(?=[A-U])/).join(separator);
        const toPascalCase = (string, separator = false) => {
            const pascal = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
            return separator ? splitPascal(pascal, separator) : pascal;
        };

        const getChannelTypeSize = type => channels.cache.filter(channel => type.includes(channel.type)).size;

        const totalChannels = getChannelTypeSize([ChannelType.GuildText, ChannelType.GuildNews, ChannelType.GuildVoice, ChannelType.GuildStageVoice, ChannelType.GuildForum, ChannelType.GuildPublicThread, ChannelType.GuildPrivateThread, ChannelType.GuildNewsThread, ChannelType.GuildCategory]);

        const embed = new EmbedBuilder()
        .setColor(0x05fcb2)
        .setTitle(`${guild.name} Sunucusunun Bilgileri`)
        .setThumbnail(guild.iconURL({ size: 1024 }))
        .setImage(guild.bannerURL({ size: 1204 }))
        .addField(
            { name: "Açıklama", value: `📜 ${guild.description || "Sunucu Açıklaması Bulunmuyor"}`},
            {
                name: "Genel",
                value: [
                    `⌚ **Oluşturulma Tarihi** <t:${parseInt(guild.createdTimestamp / 1000)}:R>`,
                    `💳 **ID** ${guild.id}`,
                    `💖 **Sunucu Sahibi** <@${guild.ownerId}>`,
                    `🌍 **Dil** ${new Intl.DisplayNames(["en"], { type: "language"}).of(guild.prefferedLocale)}`,
                    `✨ **Özel URL** ${guild.vanityURLCode || "Sunucuda Özel URL Bulunmuyor"}`
                ].join("\n")
            },

            { name: "Özellikler", value: guild.features?.map(feature => `- ${toPascalCase(feature, " ")}`)?.join("\n") || "Özellik Bulunmuyor", inline: true},
            {
                name: "Güvenlik Seviyesi",
            value: [
                `👁️ **Epilepsi Filtresi** ${splitPascal(GuildExplicitContentFilter[guild.explicitContentFilter], "")}`,
                `🔞 **NSFW Seviyesi** ${splitPascal(GuildNSFWLevel[guild.nsfwLevel], " ")}`,
                `🔔 **Doğrulama Seviyesi** ${splitPascal(GuildVerificationLevel[guild.VerificationLevel])}`
            ].join("\n"),
            inline: true
            },

            { name: `Üye (${guild.memberCount})`,
            value: [
                `👤 **Üyeler** ${guild.memberCount - botCount}`,
                `🤖 **Botlar** ${botCount}`
            ].join("\n"),
            inline: true
            },

            { name: `Kullanıcı Rolleri (${maxDisplayRoles(userRoles)} ArviS#0011 ${userRoles.length})`, value: `${userRoles.slice(0, maxDisplayRoles(userRoles)).join(" ") || "Veri Yok"}`},
            { name: `Bot Rolleri (${maxDisplayRoles(managedRoles)} ArviS#0011 ${managedRoles.length})`, value: `${managedRoles.slice(0, maxDisplayRoles(managedRoles)).join(" ") || "Veri Yok"}`},
            { name: `Kanallar, Başlıklar Ve Kategoriler (${totalChannels})`,
                value: [
                    `💬 **Yazı Kanalları** ${splitPascal(GuildExplicitContentFilter[guild.explicitContentFilter], "")}`,
                    `🎤 **Ses Kanalları** ${splitPascal(GuildNSFWLevel[guild.nsfwLevel], " ")}`,
                    `🧵 **Başlıklar:** ${splitPascal(GuildVerificationLevel[guild.VerificationLevel], " ")}`,
                    `🪪 **Doğrulama Seviyesi** ${splitPascal(GuildVerificationLevel[guild.VerificationLevel], " ")}`,
                ].join("\n"),
                inline: true
            },

            { name: `Emojiler & Çıkartmalar (${emojis.cache.size + stickers.cache.size})` ,
                value: [
                    `📺 **Animasyonlu** ${emojis.cache.filter(emoji => emoji.animated).size}`,
                    `🪨 **Normal** ${emojis.cache.filter(emoji => !emoji.animated).size}`,
                    `😃 **Çıkartmalar** ${stickers.cache.size}`
                ].join("\n"),
                inline: true
        },

        { name: `Nitro`,
            value: [
                `📈 **Boost Seviyesi** ${guild.premiumTier || "Hiç Boost Yok"}`,
                `🚀 **Boost Sayısı** ${guild.preiumSubscriptionCount}`,
                `💜 **Boosters** ${guild.members.cache.filter(member => member.roles.premiumSubscriberRole).size}`,
                `🪟 **Toplam Boosters** ${guild.members.cache.filter(member => member.roles.premiumSince).size}`
            ].join("\n"),
            inline: true
        },

        { name: "Banner", value: guild.bannerURL() ? "** **" : "Keine" }
        )
        interaction.reply({ embeds: [embed] })
    }
}
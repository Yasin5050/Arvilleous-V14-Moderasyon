const { Client, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("zamanaşımı-at")
        .setDescription("Üyeye, Zamanaşımı Uygularsınız")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option.setName("üye")
                .setDescription("Zamanaşımı Atılacak Üye")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("süre")
                .setDescription("Zamanaşımının Süresi")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("sebep")
                .setDescription("Zamanaşımı Atılma Sebebi")
        ),

    async execute(interaction) {
        const { guild, options } = interaction;

        const kullanıcı = options.getUser("üye");
        const member = guild.members.cache.get(kullanıcı.id);
        const zaman = options.getString("süre");
        const dönüşümlüZaman = ms(zaman);
        const sebep = options.getString("sebep") || "Zamanaşımı Atılma Sebep Girilmemiş";

        const hatarvsembed = new EmbedBuilder()
            .setDescription('Hata! Daha Sonra Tekrar Dene')
            .setColor(0xff0000)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })

        const başarılıEmbed = new EmbedBuilder()
            .setTitle("**<:tik2_arvis0011:1046067679884234863>・Zamanaşımı Başarıyla Uygulandı**")
                //.setDescription(`${kullanıcı} - Susturuldu`)
            .addFields(
                { name: "Üye", value: `${kullanıcı}`, inline: true },
                { name: "Sebep", value: `${sebep}`, inline: true },
                { name: "Süre", value: `${zaman}`, inline: true }
            )
            .setColor(0x0eff00)

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [hatarvsembed], ephemeral: true });

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
            return interaction.reply({ embeds: [hatarvsembed], ephemeral: true });

        if (!dönüşümlüZaman)
            return interaction.reply({ embeds: [hatarvsembed], ephemeral: true });

        try {
                await member.timeout(dönüşümlüZaman, sebep);

            interaction.reply({ embeds: [başarılıEmbed], ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}
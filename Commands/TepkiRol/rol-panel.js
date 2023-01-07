const rrSchema = require('../../Models/ReactionRoles');
const {SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, SelectMenuBilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("rol-panel")
    .setDescription("Tepki Rol Paneli")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async execute(interaction) {
        const {options, guildId, guild, channel} = interaction;

        try {
            const data = await rrSchema.findOne({GuildId: guildId});

            if (!data.roles.lenght > 0)
                return interaction.reply({ content: "**[ArviS#0011]** Bu Sunucuda Her Hangi Bir Veri Bulunmuyor", ephemeral: true });

                const panelEmbed = new EmbedBuilder()
                .setDescription("Menüden Rollerini Seçebilirsin")
                .setColor(0x00ccff)
                .setFooter({ text: "Made by ❤️ ArviS#0011" })

                const options = data.roles.map(x => {
                    const role = guild.roles.cache.get(x.roleId);

                    return {
                        label: role.name,
                        value: role.id,
                        description: x.roleDescription,
                        emoji: x.roleEmoji || undefined
                    };
                });

                const menuComponents = [
                    new ActionRowBuilder().addComponents(
                        new SelectMenuBilder()
                        .setCutomId("tepki-rol")
                        .setMaxValues(options.length)
                        .addOptions(options),
                    ),
                ];

                channel.send({ embeds: [panelEmbed], components: menuComponents });

                return interaction.reply({ content: "**[ArviS#0011] Tepki Rol Paneli Başarıyla Ayarlandı**", ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}
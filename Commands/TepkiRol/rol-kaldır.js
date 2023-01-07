const rrSchema = require("../../Models/ReactionRoles");
const {SlashCommandBuilder, PermissionFlagsBits} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("rol-kaldır")
    .setDescription("Panelden Rol Kaldırma")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addRoleOption(option => 
        option.setName("rol")   
        .setDescription("Kaldırılacak Rol Seç")
        .setRequired(true) 
    ),
  async execute(interaction) {
    const { options, guildId, member} = interaction;

    const role = options.getRole("rol");

    try {

        const data = await rrSchema.findOne({ GuildID: guildId});

        if (!data) 
            return interaction.reply ({ content: "**[ArviS#0011]** Bu Sunucuda Her Hangi Bir Veri Bulunmuyor", ephemeral: true })
        
        const roles = data.roles;
        const findRole = roles.find((r) => r.roleId === role.id);

        if (!findRole)
            return interaction.reply ({ content: "Bu Rol Mevcut Değil", ephemeral: true })

        const filteredRoles = roles.filter((r) => r.roleId !== role.id);
        data.roles = filteredRoles;

        await data.save();

        return interaction.reply({ content: `**[ArviS#0011] **Rol **(${role.name})** Panelden Kaldırıldı` });

    } catch (err) {
        console.log(err);
    }
   } 
        
}
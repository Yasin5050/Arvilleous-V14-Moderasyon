const { CommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    const { customId, values, guild, member } = interaction; 
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        return interaction.reply({ content: "**[ArviS#0011]** Bu Komut, Eski Bir Komut. Lütfen Bunu ArviS'e Bildir" });
      }
      command.execute(interaction, client);
    } else if (interaction.isButton()) {

    } else if(interaction.isSelectMenu()) {
      if (customId == "tepki-rol") {
        for (let i = 0; i < values.lenght; i++) {
          const roleId = values[i];

          const role = guild.roles.cache.get(roleId);
          const hasRole = member.roles.cache.has(roleId);

          switch(hasRole) {
            case true:
              member.roles.remove(roleId);
              break;
              
              case false:
                member.roles.add(roleId);
                break;  
          }
        }

        interaction.reply({ content: "**[ArviS#0011]** Rollerin Güncellendi", ephemeral: true })
      }
    } else {
      return;
    }
  },
};
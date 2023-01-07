const {ComponentType, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder,} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("yardım")
    .setDescription("Botta Bulanan Komutları Gösterir"),
  async execute(interaction) {
    const emojiler = {
      bilgi: "<a:buyutec_arvis0011:997610195997966507>",
      eğlence: "<a:mutlupanda_arvis0011:997610164544868454>",
      genel: '<a:kelebek_arvis0011:1058005321504804934>',
      moderasyon: "<a:yilbasiagaci_arvis0011:1046203246055805009>",
      sahip: "<a:kalpa_arvis0011:1058007848543584316>",
      sistemler: '<a:ayar_arvis0011:1043272548370104370>',
      tepkirol: '<a:4dkalp_arvis0011:1051894482381062164>',
    };

    const directories = [
      ...new Set(interaction.client.commands.map((cmd) => cmd.folder)),
    ];

    const formatString = (str) =>
      `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

    const categories = directories.map((dir) => {
      const getCommands = interaction.client.commands
        .filter((cmd) => cmd.folder === dir)
        .map((cmd) => {
          return {
            name: cmd.data.name,
            description:
              cmd.data.description ||
              "Bu Komuta Herhangi Bir Açıklama Girilmemiş",
          };
        });

      return {
        directory: formatString(dir),
        commands: getCommands,
      };
    });

    const embed = new EmbedBuilder()
    .setDescription("<a:pikachuselam:997610147167870986>・Merhaba, Aşağıdaki Menüyü Kullanarak Komutlar Arasında Geçiş Yapabilirsiniz \n\n <a:dikkat:997074866371039322>・__Bu Menünün Bir Süresi Var, Bu Süreyi Geçtiğiniz Takdirde Kategoriler Çalışmayacak. Yeniden /yardım Yazmanız Gerekecek__")
    .setTitle("ArviS#0011 | Yardım Menüsü")
    .setColor("#2f3136")
    .setFooter({ text: "Made by ❤️ ArviS#0011" })
    .setImage("https://media.discordapp.net/attachments/997105193256747028/1051895712792711178/image.png");

    const components = (state) => [
      new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
          .setCustomId("yardım-menüsü")
          .setPlaceholder("Komut Kategorisi")
          .setDisabled(state)
          .addOptions(
            categories.map((cmd) => {
              return {
                label: cmd.directory,
                value: cmd.directory.toLowerCase(),
                description: `${cmd.directory} Dosyasında Bulunan Komutlar`,
                emoji: emojiler[cmd.directory.toLowerCase() || null],
              };
            })
          )
      ),
    ];

    const initialMessage = await interaction.reply({
      embeds: [embed],
      components: components(false),
    });

    const filter = (interaction) =>
      interaction.user.id === interaction.member.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      componentType: ComponentType.SelectMenu,
    });

    collector.on("collect", (interaction) => {
      const [directory] = interaction.values;
      const category = categories.find(
        (x) => x.directory.toLowerCase() === directory
      );

      const categoryEmbed = new EmbedBuilder()
      .setTitle(`ArviS#0011 | Bot Komutları`)
      .setColor("#2f3136")
      .setFooter({ text: "Made by ❤️ ArviS#0011" })
      .setImage("https://media.discordapp.net/attachments/997105193256747028/1051895712792711178/image.png")
        .addFields(
          category.commands.map((cmd) => {
            return {
              name: `\`${cmd.name}\``,
              value: cmd.description,
              inline: true,
            };
          })
        );
      
      interaction.update({ embeds: [categoryEmbed] });
    });

    collector.on("end", () => {
      initialMessage.edit({ components: components(true) });
    });
  },
};

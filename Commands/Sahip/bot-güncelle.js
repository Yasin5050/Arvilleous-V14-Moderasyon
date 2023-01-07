const { SlashCommandBuilder, PermissionFlagsBits, ActivityType, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("bot-güncelle")
    .setDescription("Sadece ArviS#0011 Kullanabilir")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) 
    .addSubcommand(subcommand => 
        subcommand.setName("oynuyor")
        .setDescription("Botun Oynuyor Kısmını Değiştirir")
        .addStringOption(option => 
            option.setName("tür")
            .setDescription("Bir Değer Seç")
            .setRequired(true)
            .addChoices(
                {name: "Oynuyor", value: "Oynuyor"},
                {name: "Yayın Yapıyor", value: "Yayın Yapıyor"},
                {name: "Dinliyor", value: "Dinliyor"},
                {name: "İzliyor", value: "İzliyor"},
                {name: "Yarışmasında Yarışıyor", value: "Yarışmasında Yarışıyor"},
            )
        )
        .addStringOption(option => 
            option.setName("oynuyor")
            .setDescription("Bir Şeyler Yaz")
            .setRequired(true)    
        )
    )
    .addSubcommand(subcommand => 
        subcommand.setName("durum")
        .setDescription("Botun Durum Kısmını Değiştirir")
        .addStringOption(option => 
            option.setName("tür")
            .setDescription("Bir Durum Seç")
            .setRequired(true)
            .addChoices(
                {name: "Aktif", value: "online"},
                {name: "Boşta", value: "idle"},
                {name: "Rahatsız Etme", value: "dnd"},
                {name: "Görünmez", value: "invisible"},
            )
        )
    ),
    async execute (interaction, client) {
        const { options } = interaction;

        const sub = options.getSubcommand(["oynuyor", "durum"]);
        const type = options.getString("tür");
        const activity = options.getString("oynuyor");

        try {

            switch(sub) {
                case "oynuyor":
                    switch(type) {
                        case "Oynuyor":
                            client.user.setActivity(activity, { type: ActivityType.Playing });
                            break;
                        case "Yayın Yapıyor":
                            client.user.setActivity(activity, { type: ActivityType.Streaming });
                            break;
                        case "Dinliyor":
                            client.user.setActivity(activity, { type: ActivityType.Listening });
                            break;
                        case "İzliyor":
                            client.user.setActivity(activity, { type: ActivityType.Watching });
                            break;
                        case "Yarışmasında Yarışıyor":
                            client.user.setActivity(activity, { type: ActivityType.Competing });
                            break;
                    }
                case "durum":
                    client.user.setPresence({ status: type });
                    break;
            }
        } catch (err) {
            console.log(err);
        }

        const arvsembed = new EmbedBuilder();


        return interaction.reply({ embeds: [arvsembed.setDescription(`Oynuyor Kısmı **(${type})** Olarak Değiştirildi`).setFooter({ text: `Made by ❤️ ArviS#0011` }).setColor(0X2f3136)] })
    }
}
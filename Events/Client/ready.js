const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const ayarlar = require("../../Config/ayarlar.json");
mongoose.set('strictQuery', true);

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        await mongoose.connect(ayarlar.mongodb, {
            keepAlive: true,
        });

        console.log(`[AKTİF] ${client.user.username}`);
        client.user.setPresence({
            activities: [{ name: `Made by ❤️ ArviS#0011`, type: ActivityType.Playing }],
            status: 'online',
          });

        if (mongoose.connect) {
            console.log('[DATABASE] MongoDB Bağlantısı Başarılı')
        }
    },
};
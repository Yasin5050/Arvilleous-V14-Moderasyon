const { 
    Client, 
    GatewayIntentBits, 
    Partials, 
    Collection,  
} = require('discord.js');
const logs = require('discord-logs');

const { handleLogs } =require('./Handlers/handleLogs')
const { loadEvents } = require('./Handlers/eventHandler');
const { loadCommands } = require('./Handlers/commandHandler');

const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)],
});


logs (client, {
    debug: true
}); 


client.commands = new Collection();
client.ayarlar = require('./Config/ayarlar.json');


client.login(client.ayarlar.token).then(() => {
    handleLogs(client);
    loadEvents(client);
    loadCommands(client);
});


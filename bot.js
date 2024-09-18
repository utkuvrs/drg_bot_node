const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
require('dotenv').config();
const axios = require('axios');
const { getEmojiByName: emote } = require('./emojis.js'); // Import the emoji functions
const { _decideDeepDiveUrl } = require('./_decideDeepDiveUrl.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences] });

const token = process.env.BOT_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
var BASE_DEEP_DIVE_URL = "https://doublexp.net/static/json/DD_2024-09-12T11-00-00Z.json";
var NEXT_DEEP_DIVE_URL = "https://doublexp.net/static/json/DD_2024-09-19T11-00-00Z.json";
// Register slash commands
const commands = [
    {
        name: 'deepdive',
        description: 'Get information about Deep Dives from a URL',
    },
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
        });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

// When the client is ready, run this code
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Set the bot's presence
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    if (randomNumber <= 50) {
        client.user.setPresence({
            activities: [
                {
                    name: 'Exploring Deep Dives', // Your custom activity
                    type: 'WATCHING', // You can use PLAYING, STREAMING, LISTENING, or WATCHING
                },
            ],
            status: 'online', // The status can be 'online', 'idle', 'dnd', or 'invisible'
        });
    } else if (randomNumber > 50 && randomNumber <= 75) {
        client.user.setPresence({
            activities: [
                {
                    name: 'Sniping Tina :)', // Your custom activity
                    type: 'PLAYING', // You can use PLAYING, STREAMING, LISTENING, or WATCHING
                },
            ],
            status: 'online', // The status can be 'online', 'idle', 'dnd', or 'invisible'
        });
    } else {
        client.user.setPresence({
            activities: [
                {
                    name: 'Balling on Janner', // Your custom activity
                    type: 'PLAYING', // You can use PLAYING, STREAMING, LISTENING, or WATCHING
                },
            ],
            status: 'online', // The status can be 'online', 'idle', 'dnd', or 'invisible'
        });
    }
});

// Function to split a message into chunks
function splitMessage(message, maxLength = 2000) {
    const parts = [];
    while (message.length > maxLength) {
        let chunk = message.slice(0, maxLength);
        const lastLineBreak = chunk.lastIndexOf('\n');
        if (lastLineBreak > 0) {
            chunk = message.slice(0, lastLineBreak + 1);
        }
        parts.push(chunk);
        message = message.slice(chunk.length);
    }
    parts.push(message);
    return parts;
}

// Event handler for interactions (including slash commands)
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'deepdive') {

        const url = _decideDeepDiveUrl(BASE_DEEP_DIVE_URL);

        if (!url || !url.startsWith('http')) {
            await interaction.reply('Invalid URL. Please provide a valid URL.');
            return;
        }

        try {
            // Fetch the JSON data
            const response = await axios.get(url);
            const data = response.data;

            let normalContent = "**Deep Dive Normal Information:**\n";
            let eliteContent = "**Deep Dive Elite Information:**\n";

            const normalDive = data["Deep Dives"]["Deep Dive Normal"];
            const eliteDive = data["Deep Dives"]["Deep Dive Elite"];

            if (normalDive) {
                normalContent += `Biome: (${emote(normalDive.Biome)}) ${normalDive.Biome}\n`;
                normalContent += `CodeName: ${normalDive.CodeName}\n`;

                normalDive.Stages.forEach((stage, index) => {
                    normalContent += `Stage ${index + 1}:\n`;
                    normalContent += `  - Length: (${emote("Length_" + stage.Length)}) ${stage.Length}\n`;
                    normalContent += `  - Complexity: (${emote("Complexity_" + stage.Complexity)}) ${stage.Complexity}\n`;
                    if (stage.MissionWarnings) {
                        normalContent += `  - Mission Warnings: ${stage.MissionWarnings.map(warning => emote(warning)).join(', ')}\n`;
                    }
                    if (stage.MissionMutator) {
                        normalContent += `  - Mission Mutator: ${emote(stage.MissionMutator)}\n`;
                    }
                    normalContent += `  - Primary Objective: (${emote(stage.PrimaryObjective)}) ${stage.PrimaryObjective}\n`;
                    normalContent += `  - Secondary Objective: (${emote(stage.SecondaryObjective)}) ${stage.SecondaryObjective}\n`;
                });

                normalContent += '\n';
            }

            if (eliteDive) {
                eliteContent += `Biome: (${emote(eliteDive.Biome)}) ${eliteDive.Biome}\n`;
                eliteContent += `CodeName: ${eliteDive.CodeName}\n`;

                eliteDive.Stages.forEach((stage, index) => {
                    eliteContent += `Stage ${index + 1}:\n`;
                    eliteContent += `  - Length: (${emote("Length_" + stage.Length)}) ${stage.Length}\n`;
                    eliteContent += `  - Complexity: (${emote("Complexity_" + stage.Complexity)}) ${stage.Complexity}\n`;
                    if (stage.MissionWarnings) {
                        eliteContent += `  - Mission Warnings: ${stage.MissionWarnings.map(warning => emote(warning)).join(', ')}\n`;
                    }
                    if (stage.MissionMutator) {
                        eliteContent += `  - Mission Mutator: ${emote(stage.MissionMutator)}\n`;
                    }
                    eliteContent += `  - Primary Objective: (${emote(stage.PrimaryObjective)}) ${stage.PrimaryObjective}\n`;
                    eliteContent += `  - Secondary Objective: (${emote(stage.SecondaryObjective)}) ${stage.SecondaryObjective}\n`;
                });

                eliteContent += '\n';
            }

            // Split messages if they are too long
            const normalMessageParts = splitMessage(normalContent);
            const eliteMessageParts = splitMessage(eliteContent);

            // Send the normal dive information
            for (const part of normalMessageParts) {
                await interaction.reply({ content: part, ephemeral: true });
            }

            // Send the elite dive information
            for (const part of eliteMessageParts) {
                await interaction.followUp({ content: part, ephemeral: true });
            }
        } catch (error) {
            console.error(error);
            await interaction.reply('Error fetching Deep Dive data. Please check the URL.');
        }
    }
});

// Log in to Discord with the app's token
client.login(token);

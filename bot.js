const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
require('dotenv').config();
const axios = require('axios');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences] });

const token = process.env.BOT_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

// Register slash commands
const commands = [
    {
        name: 'deepdive',
        description: 'Get information about Deep Dives from a URL',
        options: [
            {
                name: 'url',
                type: 3, // STRING type
                description: 'The URL to fetch Deep Dive data from',
                required: true,
            },
        ],
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
    }
    else if (randomNumber > 50 && randomNumber <= 75) {
        client.user.setPresence({
            activities: [
                {
                    name: 'Sniping Tina :)', // Your custom activity
                    type: 'PLAYING', // You can use PLAYING, STREAMING, LISTENING, or WATCHING
                },
            ],
            status: 'online', // The status can be 'online', 'idle', 'dnd', or 'invisible'
        });
    }
    else {
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

// Event handler for interactions (including slash commands)
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'deepdive') {
        const url = options.getString('url');

        if (!url || !url.startsWith('http')) {
            await interaction.reply('Invalid URL. Please provide a valid URL.');
            return;
        }

        try {
            // Fetch the JSON data
            const response = await axios.get(url);
            const data = response.data;

            if (data['Deep Dives']) {
                let reply = '';

                // Use custom emoji in the message
                const customEmoji = '<:Volatile_Guts:1285907803831271475>'; // Replace with your emoji name and ID
                reply += `**${customEmoji} Deep Dive Data**\n`;

                for (const [type, deepDive] of Object.entries(data['Deep Dives'])) {
                    reply += `**${type}**\n`;
                    reply += `**Biome:** ${deepDive.Biome}\n`;
                    reply += `**CodeName:** ${deepDive.CodeName}\n\n`;

                    deepDive.Stages.forEach(stage => {
                        reply += `**Stage ID:** ${stage.id}\n`;
                        reply += `**Length:** ${stage.Length}\n`;
                        reply += `**Complexity:** ${stage.Complexity}\n`;
                        reply += `**Primary Objective:** ${stage.PrimaryObjective}\n`;
                        reply += `**Secondary Objective:** ${stage.SecondaryObjective}\n`;

                        if (stage.MissionWarnings) {
                            reply += `**Mission Warnings:** ${stage.MissionWarnings.join(', ')}\n`;
                        }

                        if (stage.MissionMutator) {
                            reply += `**Mission Mutator:** ${stage.MissionMutator}\n`;
                        }

                        reply += '\n';
                    });

                    reply += '\n---\n\n';
                }

                await interaction.reply(reply);
            } else {
                await interaction.reply('No Deep Dive data found at the provided URL.');
            }
        } catch (error) {
            console.error(error);
            await interaction.reply('Error fetching Deep Dive data. Please check the URL.');
        }
    }
});

// Log in to Discord with the app's token
client.login(token);

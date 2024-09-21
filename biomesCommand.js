
const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

async function fetchBiomesData(url) {
    const response = await axios.get(url);
    const data = response.data;
    return data;
}

function createBiomeEmbed(biomeName, missions) {
    const embed = new EmbedBuilder()
        .setTitle(`Biomes: ${biomeName}`)
        .setTimestamp(new Date());

    missions.forEach(mission => {
        embed.addFields(
            { name: mission.CodeName, value: `Complexity: ${mission.Complexity}\nLength: ${mission.Length}\nPrimary Objective: ${mission.PrimaryObjective}\nSecondary Objective: ${mission.SecondaryObjective}`, inline: true }
        );
    });

    return embed;
}

async function sendBiomesEmbed(interaction, url) {
    try {
        const data = await fetchBiomesData(url);
        const embeds = [];

        for (const [biomeName, missions] of Object.entries(data.Biomes)) {
            const embed = createBiomeEmbed(biomeName, missions);
            embeds.push(embed);
        }

        // Discord has a limit of 10 embeds per message
        for (let i = 0; i < embeds.length; i += 10) {
            const embedChunk = embeds.slice(i, i + 10);
            await interaction.reply({ embeds: embedChunk });
        }
    } catch (error) {
        console.error('Error fetching biomes data:', error);
        await interaction.reply({ content: 'There was an error fetching the biomes data.', ephemeral: true });
    }
}

module.exports = { sendBiomesEmbed };

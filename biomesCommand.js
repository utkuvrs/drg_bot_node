
const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const { getEmojiByName: emote, getBiomeByName: biome, getBiomeColorByName: biomeColor } = require('./emojis.js'); // Import the emoji functions


async function fetchBiomesData(url) {
    const response = await axios.get(url);
    const data = response.data;
    return data;
}

function createBiomeEmbed(biomeName, missions) {
    const embed = new EmbedBuilder()
        .setTitle(`Biomes: ${biomeName}`)
        .setDescription('Details about currently available missions')
        .setThumbnail(biome(biomeName))
        .setColor(biomeColor(biomeName))
        .setAuthor({ name: 'Mission Control', iconURL: 'https://deeprockgalactic.wiki.gg/images/d/d2/Mission_control_portrait.png', url: 'https://doublexp.net' })
        .setFooter({
            text: "2K & rolfos",
            iconURL: "https://slate.dan.onl/slate.png",
        })
        .setTimestamp(new Date());
    missions.forEach(mission => {
        let primaryObjective = mission.PrimaryObjective.replace(/-/g, '');
        let missionDetails = `${emote(primaryObjective)}\n   ${emote(mission.SecondaryObjective)}\n${emote("Complexity_" + mission.Complexity)} ${emote("Length_" + mission.Length)}\n`;

        // Check for Double XP mutator
        if (mission.MissionMutator && mission.MissionMutator.includes("Double XP")) {
            missionDetails += `\n🎉 <@&1287028783492104314>\n`; // Mention the role (use the role ID if needed)
        }

        if (mission.MissionMutator) {
            missionDetails += `${emote(mission.MissionMutator)}`;
        }

        if (mission.MissionWarnings && mission.MissionWarnings.length > 0) {
            missionDetails += `${mission.MissionWarnings.map(warning => emote(warning)).join(', ')}`;
        }

        embed.addFields(
            { name: mission.CodeName, value: missionDetails, inline: true }
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

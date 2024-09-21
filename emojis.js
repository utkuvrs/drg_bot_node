// Example emoji mapping for server emojis
const emojiMap = {
    'Volatile_Guts': '1285907803831271475',
    'Another_Emoji': '123456789012345678',
    'Volatile_Guts': '1285907803831271475',
    "Swarmageddon": '1285907796449296434',
    "Space_Rig": '1285907789356470374',
    "Shield_Disruption": '1285907780967858217',
    "Secret_Secondary": '1285907773590212618',
    "Sandblasted_Corridors": '1285907766082539531',
    "Salvage_Operation": '1285907759467860021',
    "Salt_Pits": '1285907750873858078',
    "Rival_Presence": '1285907743336828989',
    "Rich_Atmosphere": '1285907735614849124',
    "Regenerative_Bugs": '1285907727545012234',
    "Radioactive_Exclusion_Zone": '1285907720276279296',
    "Point_Extraction": '1285907713339162665',
    "Perform_Deep_Scans": '1285907705483235350',
    "Parasites": '1285907698222764102',
    "OnSite_Refining": '1285907690027221002',
    "Mining_Expedition": '1285907682666086505',
    "Mineral_Mania": '1285907674877399040',
    "Mine_Morkite": '1285907662310998108',
    "Magma_Core": '1285907655478476801',
    "Mactera_Plague": '1285907650088796161',
    "Low_Oxygen": '1285907642895826995',
    "Low_Gravity": '1285907635484491862',
    "Lithophage_Outbreak": '1285907623320879105',
    "Lethal_Enemies": '1285907613216935958',
    "Length_3": '1285907606501855243',
    "Length_2": '1285907600600334377',
    "Length_1": '1285907586855604316',
    "Industrial_Sabotage": '1285907578655608883',
    "Hollow_Bough": '1285907572381057064',
    "Hollomite": '1285907565368184844',
    "Haunted_Cave": '1285907557332029524',
    "Gunk_Seeds": '1285907550453239870',
    "Golden_Bugs": '1285907540894416997',
    "Gold_Rush": '1285907530891137136',
    "Glacial_Strata": '1285907522233831434',
    "Get_Alien_Eggs": '1285907513463537694',
    "Fungus_Bogs": '1285907498204790846',
    "Fossils": '1285907490332213258',
    "Fester_Fleas": '1285907471273168936',
    "Exploder_Infestation": '1285907463958429736',
    "Experience": '1285907455716360212',
    "Escort_Duty": '1285907440730116147',
    "Elite_Threat": '1285907433646063616',
    "Elite_Deep_Dive_Banner": '1285907426834382858',
    "Elimination": '1285907419188166697',
    "Eliminate_Dreadnought": '1285907410262823013',
    "Egg_Hunt": '1285907402864066640',
    "Ebonuts": '1285907395993800725',
    "Ebonite_Outbreak": '1285907387592609797',
    "Dystrum": '1285907376482025494',
    "Duck_and_Cover": '1285907368219246652',
    "Double_XP": '1285907358979198978',
    "Dense_Biozone": '1285907328595398656',
    "Deep_Scan": '1285907268671635456',
    "Deep_Dive_Banner": '1285907243040247818',
    "Deep_Dive": '1285906438396444672',
    "Data_Cell": '1285906409329918042',
    "Crystalline_Caverns": '1285906385443356672',
    "Critical_Weakness": '1285906354665422899',
    "Credit": '1285906325330460714',
    "Complexity_3": '1285906301544697856',
    "Complexity_2": '1285906278153060436',
    "Complexity_1": '1285906248746926100',
    "Cave_Leech_Cluster": '1285906225208365108',
    "Build_Liquid_Morkite_Pipeline": '1285906205365108746',
    "Boolo_Caps": '1285906183764578377',
    "Blood_Sugar": '1285906161173925958',
    "Blank_Matrix_Core": '1285906140277899305',
    "Black_Box": '1285906118664650752',
    "Bha_Barnacles": '1285906081142538241',
    "Azure_Weald": '1285905982412816475',
    "ApocaBlooms": '1285905917417619456',
    "Glyphid_Eggs": '1287028555183820840',
};

const biomePngs = {
    "Crystalline Caverns": "https://deeprockgalactic.wiki.gg/images/thumb/4/44/Crystalline_caverns_icon.png/50px-Crystalline_caverns_icon.png",
    "Salt Pits": "https://deeprockgalactic.wiki.gg/images/thumb/3/30/Salt_pits_icon.png/50px-Salt_pits_icon.png",
    "Fungus Bogs": "https://deeprockgalactic.wiki.gg/images/thumb/9/97/Fungus_bogs_icon.png/50px-Fungus_bogs_icon.png",
    "Radioactive Exclusion Zone": "https://deeprockgalactic.wiki.gg/images/thumb/f/f1/Radioactive_exclusion_zone_icon.png/50px-Radioactive_exclusion_zone_icon.png",
    "Glacial Strata": "https://deeprockgalactic.wiki.gg/images/thumb/e/e8/Glacial_strata_icon.png/50px-Glacial_strata_icon.png",
    "Dense Biozone": "https://deeprockgalactic.wiki.gg/images/thumb/a/ac/Dense_biozone_icon.png/50px-Dense_biozone_icon.png",
    "Hollow Bough": "https://deeprockgalactic.wiki.gg/images/thumb/7/7c/Hollow_bough_icon.png/50px-Hollow_bough_icon.png",
    "Azure Weald": "https://deeprockgalactic.wiki.gg/images/thumb/f/f9/Azure_weald_icon.png/50px-Azure_weald_icon.png",
    "Sandblasted Corridors": "https://deeprockgalactic.wiki.gg/images/thumb/4/4e/Sandblasted_corridors_icon.png/50px-Sandblasted_corridors_icon.png",
    "Magma Core": "https://deeprockgalactic.wiki.gg/images/thumb/0/00/Magma_core_icon.png/50px-Magma_core_icon.png",
}

// Function to get an emoji by name
function getEmojiByName(name) {
    const formattedEmoteName = name.toString().replace(/ /g, '_');
    const emojiId = emojiMap[formattedEmoteName];
    return emojiId ? `<:${formattedEmoteName}:${emojiId}>` : null;
}

function getBiomeByName(name) {
    const biomePng = biomePngs[name];
    return biomePng ? biomePng : null;
}

function getBiomeColorByName(name) {
    const colors = {
        "Crystalline Caverns": "#00BFFF", // Deep Sky Blue
        "Salt Pits": "#C0C0C0", // Silver
        "Fungus Bogs": "#6B8E23", // Olive Drab
        "Radioactive Exclusion Zone": "#8B0000", // Dark Red
        "Glacial Strata": "#A9A9A9", // Dark Gray
        "Dense Biozone": "#228B22", // Forest Green
        "Hollow Bough": "#8A2BE2", // Blue Violet
        "Azure Weald": "#4682B4", // Steel Blue
        "Sandblasted Corridors": "#D2B48C", // Tan
        "Magma Core": "#FF4500" // Orange Red
    };

    return colors[name] || "#FFFFFF"; // Return white if biome not found
}


// Export the function and mapping
module.exports = {
    getEmojiByName,
    getBiomeByName,
    getBiomeColorByName,
    emojiMap
};

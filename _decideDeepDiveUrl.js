var { BASE_DEEP_DIVE_URL } = require("./bot");

function addDays(date, days) {
    // Create a new Date object from the provided date
    const newDate = new Date(date);

    // Add the number of days to the current date
    newDate.setDate(newDate.getDate() + days);

    return newDate;
}
function _decideDeepDiveUrl(baseUrl) {
    // Get the current date and time
    const now = new Date();

    // Convert to ISO 8601 string
    const nowIsoString = now.toISOString();

    // Extract the date part from the URL
    // Example URL: https://example.net/static/json/DD_2024-09-12T11-00-00Z.json
    const regex = /DD_(\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2})Z/;
    const match = baseUrl.match(regex);

    if (!match) {
        console.error('Invalid URL format');
        return;
    }

    // Extract and parse the date directly
    const isoUrlString = convertToISO8601(match[1]);
    const dateUrl = new Date(isoUrlString);

    // Check if the date is older than 7 days
    var daysDifference = (now - dateUrl) / (1000 * 60 * 60 * 24);
    if (daysDifference >= 7) {
        console.log('The date is older than 7 days.');

        var nextDeepDiveDate = addDays(dateUrl, 7);
        var nextDeepDiveSubUrl = _convertIsoStringToSubUrl(nextDeepDiveDate.toISOString());

        BASE_DEEP_DIVE_URL = `https://doublexp.net/static/json/DD_${nextDeepDiveSubUrl}.json`;
        console.log("1 | New URL:" + BASE_DEEP_DIVE_URL);
        return BASE_DEEP_DIVE_URL;
    } else {
        console.log('The date is within the last 7 days.');

        var currentDeepDiveSubUrl = _convertIsoStringToSubUrl(dateUrl.toISOString());
        BASE_DEEP_DIVE_URL = `https://doublexp.net/static/json/DD_${currentDeepDiveSubUrl}.json`;
        console.log("2 | New URL: " + BASE_DEEP_DIVE_URL);


        var nextDeepDiveDate = addDays(dateUrl, 7);
        var nextDeepDiveSubUrl = `https://doublexp.net/static/json/DD_${_convertIsoStringToSubUrl(nextDeepDiveDate.toISOString())}.json`;
        console.log("Next URL will be: " + nextDeepDiveSubUrl);
        return BASE_DEEP_DIVE_URL;
    }

    console.log('Current ISO String:', nowIsoString);
    console.log('Extracted Date:', dateUrl.toISOString());
}
exports._decideDeepDiveUrl = _decideDeepDiveUrl;
/**
 * Converts a date-time string from the format "2024-09-12T11-00-00.000Z"
 * to an ISO 8601 string.
 *
 * @param {string} inputDateString - The date-time string to convert.
 * @returns {string} - The formatted ISO 8601 date-time string.
 */
function convertToISO8601(inputDateString) {
    var parts = inputDateString.split('T');

    var date = parts[0];  // '2024-09-12'
    var time = parts[1];  // '11-00-00.000Z'


    // Replace all '-' with ':'
    time = time.replace(/-/g, ':');


    // Create a Date object
    var dateObj = new Date(`${date}T${time}`);
    var tzoffset = (dateObj).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(dateObj - tzoffset)).toISOString().slice(0, -1);


    // Check if the Date object is valid
    if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid date format');
    }

    // Convert the Date object to an ISO 8601 string
    return localISOTime + "Z";
}

function _convertIsoStringToSubUrl(isoString) {
    var parts = isoString.split('T');

    var date = parts[0];
    var time = parts[1];

    time = time.replace(/:/g, '-');
    time = time.replace('.000', '');
    return date + "T" + time;
}
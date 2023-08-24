const { WebClient } = require('@slack/web-api');
const cron = require('node-cron');

// Replace with your Slack API token
const token = '-5792173181173-vBPlht7y0HSsSbWUDBBXm4WC';

const client = new WebClient(token);

// List of names to rotate
const rotatingNames = [
//    'Name 1',
//    'Name 2',
//    'Name 3',
      'Daniel',
      'Harrison',
      'Pam',
      'Taylor',
      'Moriah',
      'Strom',
      'Ashely',
      'Evan',
      'Taj',
      'Anna',
      'Josh',
      'Kasey',
      'Rachel',
      'Jameka',
      'Nick Weis',
      'Lily',
      'Noah',
      'Brenton',
      'Denise',
      'Peach',
      'Ali',
      'Jenna',
    // Add more names as needed
];

// Keep track of the current name index
let currentNameIndex = 0;

// Function to send a message to the general channel
async function sendMessage(message) {
    try {
        const result = await client.chat.postMessage({
            channel: '#general', // Change this to the appropriate channel name
            text: message,
        });
        console.log('Message sent: ', result.ts);
    } catch (error) {
        console.error('Error sending message: ', error);
    }
}

// Schedule the bot to run every Wednesday at 10:00 AM
cron.schedule('0 10 * * 3', () => {
    const now = new Date();
    if (now.getDay() === 3) { // Wednesday (Sunday is 0, Wednesday is 3)
        // Rotate through three names, wrapping around if necessary
        const name1 = rotatingNames[currentNameIndex % rotatingNames.length];
        const name2 = rotatingNames[(currentNameIndex + 1) % rotatingNames.length];
        const name3 = rotatingNames[(currentNameIndex + 2) % rotatingNames.length];

        const message = `This week's snack providers are :\nSalty: ${name1}\nSweet: ${name2}\nDrink: ${name3}`;
        sendMessage(message);

        // Increment the current name index for the next week
        currentNameIndex = (currentNameIndex + 1) % rotatingNames.length;
    }
});

const { schedule } = require("node-cron");

module.exports.config = {
  name: "autopost",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Gems",
  description: "Automatically create and post greetings and meal/snack invitations",
  commandCategory: "post",
  cooldowns: 5,
};

function generateGreeting() {
  const currentHour = new Date().getHours();
  let greeting = "";

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good morning! ☀️";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon! 🌞";
  } else {
    greeting = "Good evening! 🌙";
  }

  if (currentHour >= 7 && currentHour < 9) {
    greeting += " Join us for breakfast!";
  } else if (currentHour >= 12 && currentHour < 14) {
    greeting += " It's lunchtime! 🍽️";
  } else if (currentHour >= 17 && currentHour < 19) {
    greeting += " How about dinner together? 🍴";
  } else if (currentHour >= 15 && currentHour < 16) {
    greeting += " Snack time! 🍪";
  }

  return greeting;
}

module.exports.run = async ({ api }) => {
  schedule("*/15 * * * *", async () => {
    const greeting = generateGreeting();
    const uuid = getGUID();
    const formData = {
      "message": {
        "ranges": [],
        "text": greeting,
      },
      "audience": {
        "privacy": {
          "allow": [],
          "base_state": "EVERYONE",
          "deny": [],
          "tag_expansion_state": "UNSPECIFIED"
        }
      },
    };

    console.log("Posted greeting:", greeting);
  });
};

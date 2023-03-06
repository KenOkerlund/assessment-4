let gratitudes = [
  {
    id: 1,
    text: "Family",
    gratefulRating: 5,
  },
  {
    id: 2,
    text: "Friends",
    gratefulRating: 4,
  },
];
let gratitudeID = gratitudes.length + 1;

module.exports = {
  getCompliment: (req, res) => {
    const compliments = [
      "Gee, you're a smart cookie!",
      "Cool shirt!",
      "Your Javascript skills are stellar.",
    ];

    // choose random compliment
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];

    res.status(200).send(randomCompliment);
  },

  getFortune: (req, res) => {
    const fortunes = [
      "The difference between a novice and a master is the master has failed more times than the novice has tried.",
      "If you don't like the hand that fate's dealt you with, fight for a new one.",
      "Learn to treasure your life because unfortunately, it can be taken away from you anytime.",
      "You have the gift of perseverance, and that's what makes you a genius too!",
      "All efforts are pointless... if you don't believe in yourself",
    ];
    let randomIndex = Math.floor(Math.random() * fortunes.length);
    let randomFortune = fortunes[randomIndex];
    res.status(200).send(randomFortune);
  },

  getGratitudes: (req, res) => {
    res.status(200).send(gratitudes);
  },

  postGratitudes: (req, res) => {
    const { text, gratefulRating } = req.body;
    console.log(text, gratefulRating);
    gratitudes.push({ id: gratitudeID, text, gratefulRating });
    gratitudeID++;
    res.status(200).send(gratitudes);
  },

  updateGratitude: (req, res) => {
    const { id, math } = req.body;

    const gratitude = gratitudes.find((gratitude) => {
      return gratitude.id === id;
    });
    if (gratitude) {
      if (math === "minus" && gratitude.gratefulRating > 1) {
        gratitude.gratefulRating -= 1;
      }
      if (math === "plus" && gratitude.gratefulRating < 5) {
        gratitude.gratefulRating += 1;
      }
      res.status(200).send(gratitude);
    } else {
      res.status(400).send("Nothing found");
    }
  },

  deleteGratitude: (req, res) => {
    const { id } = req.body;
    console.log(req.body);
    gratitudes = gratitudes.filter(item => {
        return item.id != id;
    })
    console.log((gratitudes));
    res.status(200).send("Success!")
  }
};

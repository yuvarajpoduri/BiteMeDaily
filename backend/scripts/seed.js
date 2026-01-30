import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Content from '../models/Content.js';

dotenv.config();

// Helper to get formatted date
const getToday = () => new Date().toISOString().split('T')[0];
const getYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

const contents = [
  {
    title: "Why the Roman Empire Collapsed (Funny Version)",
    description: "Basically, everyone got lead poisoning from their fancy water pipes and decided that fighting each other was more fun than keeping the lights on. Also, they had too many parties and not enough soldiers. Imagine if your Wi-Fi went out forever and some guys with cool hats started taking your lunch money. That was Rome in 476 AD.",
    category: "History Stories",
    publishDate: getToday(),
    historyMetadata: { century: "5th Century", region: "Europe" },
    usefulness: 4
  },
  {
    title: "The Time it Rained Fish in Honduras",
    description: "Every year in Yoro, Honduras, it literally rains fish. Scientists say they're swept up by waterspouts, but locals think it's a miracle from a 19th-century priest. Either way, imagine walking to work and getting slapped in the face by a tilapia. Free sushi, I guess?",
    category: "Useful Facts",
    publishDate: getToday(),
    usefulness: 3
  },
  {
    title: "The Great Emu War of 1932",
    description: "Australia once declared war on birds. Giant, flightless, 3-toed birds. And the birds WON. The army used machine guns, but the emus just ran away too fast and divided into small squads. It's the most embarrassing leaf in military history. Australia: 0, Big Chickens: 1.",
    category: "History Stories",
    publishDate: getToday(),
    historyMetadata: { century: "20th Century", region: "Australia" },
    usefulness: 2
  },
  {
    title: "Why Bananas are Technically Berries",
    description: "Botanically speaking, bananas are berries but strawberries aren't. To be a berry, a fruit must come from one flower with one ovary. Strawberries come from flowers with multiple ovaries. Nature is basically just lying to us at this point. Eat your berries (bananas).",
    category: "Science Bites",
    publishDate: getToday(),
    usefulness: 4
  },
  {
    title: "The Invention of the Sandwich",
    description: "The Earl of Sandwich was such a degenerate gambler he didn't want to leave the poker table to eat. He asked for meat between two slices of bread so he wouldn't get grease on the cards. One addiction led to the world's favorite lunch. Gamblers: 1, Healthy Eating: 0.",
    category: "History Stories",
    publishDate: getYesterday(), // One for yesterday
    historyMetadata: { century: "18th Century", region: "UK" },
    usefulness: 3
  },
  {
    title: "How to Detect a Deepfake",
    description: "Look at the blinking. Early AI models struggled to simulate natural eye blinking because they were trained on still photos where people have eyes open. If the person on your screen blinks like a robot or not at all, it's probably a bot trying to sell you crypto. Stay sharp!",
    category: "Tech Tips",
    publishDate: getToday(),
    usefulness: 5
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    // Instead of deleting, we only add if title doesn't exist to simulate daily additive updates
    for (const item of contents) {
      await Content.findOneAndUpdate(
        { title: item.title },
        item,
        { upsert: true, new: true }
      );
    }
    console.log('Daily bites refreshed successfully! 🍏');
    process.exit();
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedData();

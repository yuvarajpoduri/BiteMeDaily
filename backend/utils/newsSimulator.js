import axios from 'axios';
import Content from '../models/Content.js';

const mockPool = [
  {
    title: "The Mystery of the 'Bloop'",
    description: "In 1997, a massive underwater sound called 'The Bloop' was heard across the Pacific. People thought it was Godzilla. It turned out to be a giant icequake in Antarctica. Nature’s ice cubes are just really loud when they crack.",
    category: "Science Bites"
  },
  {
    title: "Why You Can't Tickle Yourself",
    description: "Your brain is a party pooper. It predicts your own movements, so it filters out the 'surprise' that causes laughter. It's like trying to scare yourself in a mirror—you know what's coming.",
    category: "Science Bites"
  },
  {
    title: "The Great Molasses Flood of 1919",
    description: "A giant tank of molasses burst in Boston and a 25-foot wave of sticky sugar swept through the streets at 35mph. It was literally a slow-motion disaster that wasn't slow at all.",
    category: "History Stories"
  },
  {
    title: "Wombat Poo is Cube-Shaped",
    description: "Wombats are the only animals that poop cubes. They use their square poop to build little towers to mark their territory. It doesn't roll away! It's like biological Minecraft.",
    category: "Useful Facts"
  },
  {
    title: "The Shortest War in History",
    description: "The Anglo-Zanzibar War lasted 38 minutes. Zanzibar surrendered before the British even finished their morning tea. You could watch a short episode of a sitcom and the war would be over.",
    category: "History Stories"
  },
  {
    title: "Why Bananas are Radioactive",
    description: "Bananas contain potassium-40, which is slightly radioactive. You'd have to eat 10 million bananas in one sitting to die of radiation poisoning. At that point, the bananas are the least of your problems.",
    category: "Science Bites"
  },
  {
    title: "The Invention of the Sandwich",
    description: "The Earl of Sandwich was such a gambler he didn't want to leave the poker table to eat. He asked for meat between bread so he wouldn't get grease on the cards.",
    category: "History Stories"
  },
  {
    title: "Honey Never Spoils",
    description: "Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible. Bacteria can't survive in its low-moisture, high-acid environment.",
    category: "Useful Facts"
  },
  {
    title: "Octopuses Have Three Hearts",
    description: "Two hearts pump blood to the gills, while the third pumps it to the rest of the body. Also, their blood is blue because it's copper-based instead of iron-based.",
    category: "Science Bites"
  },
  {
    title: "The Eiffel Tower Can Grow 6 Inches in Summer",
    description: "When the iron heats up, the metal expands due to thermal expansion, making the tower grow during the summer months. It's like the tower is just stretching after a long winter.",
    category: "Useful Facts"
  },
  {
    title: "A Day on Venus is Longer Than a Year on Venus",
    description: "Venus rotates so slowly on its axis that it takes 243 Earth days to complete one single rotation. However, it only takes 225 Earth days to orbit the Sun. Brain melting yet?",
    category: "Science Bites"
  },
  {
    title: "Cows Have Best Friends",
    description: "Research has shown that cows are quite social and have specific friends. When they are separated from their besties, their heart rates increase as a sign of stress. They’re basically just large, grass-eating puppies.",
    category: "Useful Facts"
  },
  {
    title: "The First Keyboard 'QWERTY' Design Was Meant to Slow You Down",
    description: "Early typewriters would jam if keys were pressed too fast. The QWERTY layout was designed to keep frequently used letters apart, forcing people to type slower so the mechanical arms wouldn't tangle.",
    category: "Tech Tips"
  },
  {
    title: "The Sun Makes Up 99.8% of the Solar System's Mass",
    description: "Everything else—all the planets, moons, asteroids, and dust—makes up just 0.2%. The Sun is basically the main character, and we're all just background extras in its giant gravity show.",
    category: "Science Bites"
  },
  {
    title: "GPS is Free Because of the U.S. Government",
    description: "The Global Positioning System is maintained by the U.S. Space Force. It was originally purely military but was opened for public use in the 1980s. It costs billions to run, but you get to find the nearest pizza for free.",
    category: "Tech Tips"
  }
];

export const simulateDailyRefresh = async () => {
  const todayStr = new Date().toISOString().split('T')[0];
  console.log(`[Simulator] Starting generation for ${todayStr}...`);

  try {
    let freshStories = [];

    // 1. Fetch from Spaceflight API with a RANDOM OFFSET - up to 20 stories
    try {
      const randomOffset = Math.floor(Math.random() * 200);
      const res = await axios.get(`https://api.spaceflightnewsapi.net/v4/articles/?limit=20&offset=${randomOffset}`);
      const apiStories = res.data.results.map(art => ({
        title: art.title,
        description: art.summary ? (art.summary.length > 400 ? art.summary.substring(0, 400) + "..." : art.summary) : "Space news without a summary! Truly mysterious.",
        category: "Tech Tips",
        publishDate: todayStr,
        usefulness: 5,
        url: art.url
      }));
      freshStories = [...freshStories, ...apiStories];
      console.log(`[Simulator] Fetched ${apiStories.length} space news with offset ${randomOffset}.`);
    } catch (e) {
      console.log("[Simulator] API fetch failed, using mock pool only.");
    }

    // 2. Add from our mock pool
    const selectedMocks = mockPool.map(story => ({
      ...story,
      publishDate: todayStr,
      usefulness: Math.floor(Math.random() * 5) + 1
    }));
    
    freshStories = [...freshStories, ...selectedMocks];

    // 3. Save to DB - use Title as unique key
    for (const story of freshStories) {
      await Content.findOneAndUpdate(
        { title: story.title }, 
        { ...story, publishDate: todayStr },
        { upsert: true, new: true }
      );
    }

    console.log(`[Simulator] Success! Total ${freshStories.length} stories ready.`);
    return true;
  } catch (err) {
    console.error('[Simulator] Critical failure:', err);
    return false;
  }
};

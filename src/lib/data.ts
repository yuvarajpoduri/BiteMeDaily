export interface ContentItem {
  id: string;
  title: string;
  description: string;
  category: 'Tech Tips' | 'Concepts Simplified' | 'Shortcuts & Tools' | 'Health & Focus' | 'Useful Facts' | 'Daily Fixes' | 'History Stories' | 'News';
  tags?: string[];
  usefulness?: number;
  difficulty?: number;
  imageUrl?: string;
  source?: string;
  publishDate?: string;
  url?: string;
  historyMetadata?: {
    century?: string;
    region?: string;
  };
  createdAt?: string | Date;
}

export const mockedContent: ContentItem[] = [
  {
    id: 'tech-1',
    category: 'Tech Tips',
    title: 'Incognito is a Lie (Sort of)',
    description: 'Incognito mode is like wearing a fake mustache in a small town. Your computer won\'t remember what you did, but your ISP, boss, and the websites you visited definitely recognized your shoes. It just stops your partner from seeing your surprise gift searches, not the FBI from seeing your weird hobbies.',
    tags: ['privacy', 'mustaches'],
    usefulness: 4,
    difficulty: 1,
  },
  {
    id: 'history-1',
    category: 'History Stories',
    title: 'The Great Emu War',
    description: 'In 1932, Australia declared war on emus because they were eating too much wheat. The military brought machine guns. The emus brought... dodging. The emus won. The military withdrew in shame, and the emus continued their snack-filled reign of terror.',
    tags: ['birds', 'military-failures'],
    usefulness: 3,
    difficulty: 1,
    historyMetadata: { century: '20th Century', region: 'Australia' }
  },
  {
    id: 'concept-1',
    category: 'Concepts Simplified',
    title: 'Inflation = More Paper, Less Apple',
    description: 'Imagine there are only 10 apples and 10 dollars in the world. Each apple costs $1. If the government suddenly prints 10 more dollars, but there are still only 10 apples, each apple now costs $2. You didn\'t get richer, the apples just got more expensive. Your money is basically shrinking while it sits in your pocket.',
    tags: ['money', 'apples'],
    usefulness: 5,
    difficulty: 2,
  },
  {
    id: 'history-2',
    category: 'History Stories',
    title: 'Cleopatra Lived Nearer to iPhones than Pyramids',
    description: 'Cleopatra lived closer in time to the invention of the iPhone (2007) than she did to the building of the Great Pyramid of Giza (2560 BC). History is a long, weird noodle and we are just some tiny bits of sauce at the very end of it.',
    tags: ['ancient-egypt', 'timing'],
    usefulness: 3,
    difficulty: 1,
    historyMetadata: { century: 'Ancient', region: 'Egypt' }
  },
  {
    id: 'shortcut-1',
    category: 'Shortcuts & Tools',
    title: 'The Pomodoro Brain-Hack',
    description: 'Your brain is like a puppy; it can\'t focus for too long. Set a timer for 25 minutes (a Pomodoro) and work like a beast. Then take 5 minutes to stare at a wall or eat a snack. Four of these and you get a long break. It tricks your brain into thinking work is just a series of small, manageable sprints.',
    tags: ['productivity', 'tomatoes'],
    usefulness: 5,
    difficulty: 1,
  },
  {
    id: 'health-1',
    category: 'Health & Focus',
    title: 'The 20-20-20 Eye-Saver',
    description: 'Your eyes are literally getting tired of looking at this screen. Every 20 minutes, look at something 20 feet away for 20 seconds. It\'s like a tiny yoga session for your eyeballs. Do it now, or your eyes might start a union and go on strike.',
    tags: ['wellness', 'eyeballs'],
    usefulness: 5,
    difficulty: 1,
  },
  {
    id: 'history-3',
    category: 'History Stories',
    title: 'The Dancing Plague of 1518',
    description: 'In 1518, a woman in Strasbourg started dancing in the street. Then dozens joined. Then hundreds. They danced for weeks without stopping. Some actually died of heart attacks. Doctors thought it was "hot blood" and suggested... even more dancing. Worst. Party. Ever.',
    tags: ['middle-ages', 'rave'],
    usefulness: 2,
    difficulty: 1,
    historyMetadata: { century: '16th Century', region: 'Europe' }
  },
  {
    id: 'fact-1',
    category: 'Useful Facts',
    title: 'Honey: The Immortal Snack',
    description: 'Archaeologists found 3,000-year-old honey in Egyptian tombs and it\'s still perfectly edible. Bacteria hate honey because it sucks the moisture right out of them like a delicious, golden vampire. You could literally eat Pharaoh\'s leftovers and be totally fine.',
    tags: ['food', 'vampires'],
    usefulness: 3,
    difficulty: 1,
  },
  {
    id: 'fix-1',
    category: 'Daily Fixes',
    title: 'Tea Bags for Stinky Shoes',
    description: 'If your shoes smell like a wet basement, put dry tea bags inside them overnight. The tea leaves are like tiny sponges for stink. They\'ll suck up the moisture and odor, leaving your kicks smelling like an Earl Grey afternoon instead of a swamp.',
    tags: ['lifehacks', 'tea'],
    usefulness: 4,
    difficulty: 1,
  },
  {
    id: 'history-4',
    category: 'History Stories',
    title: 'Samurai Could Have Sent Faxes',
    description: 'The first fax machine was patented in 1843. The Samurai class in Japan wasn\'t abolished until 1867. This means a Samurai could have theoretically sent a fax to Abraham Lincoln. Just imagine a noble warrior struggle-pairing his fax machine.',
    tags: ['technology', 'samurai'],
    usefulness: 3,
    difficulty: 1,
    historyMetadata: { century: '19th Century', region: 'Global' }
  },
  {
    id: 'tech-2',
    category: 'Tech Tips',
    title: 'Pwned? Check Your Secrets',
    description: 'Use "Have I Been Pwned" to see if your data has leaked onto the dark web. If your old Neopets password is being sold for half a cent, maybe it\'s time to change your bank password too. Use a manager so you don\'t have to remember "Password123" ever again.',
    tags: ['security', 'leaks'],
    usefulness: 5,
    difficulty: 2,
  },
  {
    id: 'history-5',
    category: 'History Stories',
    title: 'The Pope Declared War on Cats',
    description: 'In the 13th century, Pope Gregory IX declared that black cats were instruments of Satan. People started killing them in droves. Fewer cats meant more rats. More rats meant more Plague. Nice one, Gregory. You literally invited the Black Death to dinner.',
    tags: ['cats', 'plague'],
    usefulness: 2,
    difficulty: 1,
    historyMetadata: { century: '13th Century', region: 'Europe' }
  }
];

import { faker } from '@faker-js/faker'

let minionIdCounter = 1;

const createMinion = () => {
  const weaknesses = new Array(3).fill(0).map(() => {
    const reasons = ['Cannot do', 'Unable to execute', 'Will not build'];
    const reason = reasons[Math.floor(Math.random() * reasons.length)];
    const adj = faker.company.buzzAdjective();
    const noun = faker.company.buzzNoun();
    return `${reason} ${adj} ${noun}`;
  }).join(', ') + ', too ' + faker.hacker.adjective();

  return {
    id: `${minionIdCounter++}`,
    name: faker.person.fullName(),
    title: faker.person.jobTitle(),
    weaknesses: weaknesses,
    salary: 40000,
  };
};

let workIdCounter = 1;

const createWork = (minionId: string) => {
  return {
    id: `${workIdCounter++}`,
    title: `Close deal #${Math.floor(Math.random() * 4) + 3}`,
    description: 'Close the biggest deal!',
    hours: Math.floor(Math.random() * 8) + 1,
    minionId: `${minionId}`,
  };
};

let ideaIdCounter = 1;
const companies = [
  'Codecademy',
  'Uber',
  'Snapchat',
  'Facebook',
  'Microservices',
  'Pets.com',
];

const createIdea = () => {
  const noun = faker.company.buzzNoun();
  const name = companies[Math.floor(Math.random() * companies.length)];
  let weeklyRevenue = 0;
  let numWeeks = 0;
  while (weeklyRevenue * numWeeks < 1000000) {
    weeklyRevenue = Math.floor(Math.random() * 123562);
    numWeeks = Math.floor(Math.random() * 104) + 6;
  }

  return {
    id: `${ideaIdCounter++}`,
    name: `${name} but for ${noun}`,
    description: 'The name says it all!!!',
    weeklyRevenue: weeklyRevenue,
    numWeeks: numWeeks,
  };
};

let meetingIdCounter = 1;

export interface Meeting {
  id: string;
  time: string;
  date: Date;
  day: string;
  note: string;
};

export interface DatabaseCollection<T> {
  data: T[];
  nextId: number;
  isValid: (instance: Partial<T>) => boolean;
}

export interface DatabaseSchema {
  meetings: DatabaseCollection<Meeting>;
}

const createMeeting = () => {
  const options = [`Discussion about`, `Meeting for`, `Brainstorm`];
  const option = options[Math.floor(Math.random() * options.length)];
  const date = faker.date.soon();
  return {
    id: `${meetingIdCounter++}`,
    time: date.toTimeString().slice(0, 5),
    date: date,
    day: date.toDateString(),
    note: `${option} ${faker.company.catchPhrase()}`,
  };
};

const allMinions = new Array(10).fill(0).map(createMinion);
const allIdeas = new Array(10).fill(0).map(createIdea);
const allWork = allMinions.map(minion => createWork(minion.id));
const allMeetings = new Array(3).fill(0).map(createMeeting);

export const testParamType = (param: string | number) => {
  return !isNaN(typeof param === 'string' ? parseFloat(param) : param) 
  && isFinite(typeof param === 'number' ? param : parseFloat(param));
}

export const isValidMinion = (instance: { name: string; weaknesses: string; title: string; salary: string | number; }) => {
  instance.name = instance.name || '';
  instance.weaknesses = instance.weaknesses || '';
  instance.title = instance.title || '';
  if (typeof instance.name !== 'string' || typeof instance.weaknesses !== 'string'
    || typeof instance.title !== 'string') {
    throw new Error('Minion\'s name, title, and weaknesses must be strings');
  }
  if (testParamType(instance.salary)) {
    instance.salary = Number(instance.salary);
  } else {
    throw new Error('Minion\'s salary must be a number.');
  }
  return true;
};

export const isValidIdea = (instance: { name: string; description: string; numWeeks: string | number; weeklyRevenue: string | number; }) => {
  instance.name = instance.name || '';
  instance.description = instance.description || '';
  if (typeof instance.name !== 'string' || typeof instance.description !== 'string') {
    throw new Error('Idea\'s name and description must be strings');
  }
  if (testParamType(instance.numWeeks)) {
    instance.numWeeks = Number(instance.numWeeks);
  } else {
    throw new Error('Idea\'s numWeeks must be a number.');
  }
  if (testParamType(instance.weeklyRevenue)) {
    instance.weeklyRevenue = Number(instance.weeklyRevenue);
  } else {
    throw new Error('Idea\'s weeklyRevenue must be a number.');
  }
  return true;
};

export const isValidWork = (instance: { title: string; description: string; hours: string | number; minionId: string; }) => {
  instance.title = instance.title || '';
  instance.description = instance.description || '';
  if (typeof instance.title !== 'string' || typeof instance.description !== 'string') {
    throw new Error('Work\'s title and description must be strings');
  }
  if (testParamType(instance.hours)) {
    instance.hours = Number(instance.hours);
  } else {
    throw new Error('Work\'s hours must be a number.');
  }
  let isValidMinionId = db.allMinions.data.find((minion) => {
    return minion.id === instance.minionId;
  });
  if (!isValidMinionId) {
    throw new Error('Work must have a valid minionId that actually exists in the database');
  }
  return true;
};

export const isValidMeeting = (instance: { time: string | any[]; date: any; day: any; note: any; }) => {
  if (typeof instance.time !== 'string' || instance.time.length < 4) {
    throw new Error('Meeting time must be valid!');
  }
  if (!(instance.date instanceof Date)) {
    throw new Error('Meeting date must be a JS Date object');
  }
  if (!instance.day || typeof instance.day !== 'string') {
    throw new Error('Meeting must have a day property');
  }
  if (!instance.note || typeof instance.note !== 'string') {
    throw new Error('Meeting must have a valid note property');
  }
  return true;
};

export const db = {
  allMinions: {
    data: allMinions,
    nextId: minionIdCounter,
    isValid: isValidMinion,
  },
  allIdeas: {
    data: allIdeas,
    nextId: ideaIdCounter,
    isValid: isValidIdea,
  },
  allWork: {
    data: allWork,
    nextId: workIdCounter,
    isValid: isValidWork,
  },
  allMeetings: {
    data: allMeetings,
    nextId: meetingIdCounter,
    isValid: isValidMeeting,
  }
};

export const findDataArrayByName = (name: string) => {
  switch (name) {
    case 'minions': return db.allMinions;
    case 'ideas': return db.allIdeas;
    case 'work': return db.allWork;
    case 'meetings': return db.allMeetings;
    default: return null;
  }
};

export const getAllFromDatabase = (modelType: any) => {
  const model = findDataArrayByName(modelType);
  return model ? model.data : null;
};

export const getFromDatabaseById = (modelType: any, id: string) => {
  const model = findDataArrayByName(modelType);
  return model ? model.data.find(el => el.id === id) : null;
};

export const addToDatabase = (modelType: any, instance: { id: string; time: string; date: Date; day: string; note: string; } & { id: string; title: string; description: string; hours: number; minionId: string; } & { id: string; name: string; description: string; weeklyRevenue: number; numWeeks: number; } & {
    id: string; name: string;
    title: string; weaknesses: string; salary: number;
  }) => {
  const model = findDataArrayByName(modelType);
  if (model && model.isValid(instance)) {
    instance.id = `${model.nextId++}`;
    model.data.push(instance);
    return instance;
  }
  return null;
};
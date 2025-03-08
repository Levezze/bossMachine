"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToDatabase = exports.getFromDatabaseById = exports.getAllFromDatabase = exports.findDataArrayByName = exports.db = exports.isValidMeeting = exports.isValidWork = exports.isValidIdea = exports.isValidMinion = exports.testParamType = void 0;
const faker_1 = require("@faker-js/faker");
let minionIdCounter = 1;
const createMinion = () => {
    const weaknesses = new Array(3).fill(0).map(() => {
        const reasons = ['Cannot do', 'Unable to execute', 'Will not build'];
        const reason = reasons[Math.floor(Math.random() * reasons.length)];
        const adj = faker_1.faker.company.buzzAdjective();
        const noun = faker_1.faker.company.buzzNoun();
        return `${reason} ${adj} ${noun}`;
    }).join(', ') + ', too ' + faker_1.faker.hacker.adjective();
    return {
        id: `${minionIdCounter++}`,
        name: faker_1.faker.person.fullName(),
        title: faker_1.faker.person.jobTitle(),
        weaknesses: weaknesses,
        salary: 40000,
    };
};
let workIdCounter = 1;
const createWork = (minionId) => {
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
    const noun = faker_1.faker.company.buzzNoun();
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
;
const createMeeting = () => {
    const options = [`Discussion about`, `Meeting for`, `Brainstorm`];
    const option = options[Math.floor(Math.random() * options.length)];
    const date = faker_1.faker.date.soon();
    return {
        id: `${meetingIdCounter++}`,
        time: date.toTimeString().slice(0, 5),
        date: date,
        day: date.toDateString(),
        note: `${option} ${faker_1.faker.company.catchPhrase()}`,
    };
};
const allMinions = new Array(10).fill(0).map(createMinion);
const allIdeas = new Array(10).fill(0).map(createIdea);
const allWork = allMinions.map(minion => createWork(minion.id));
const allMeetings = new Array(3).fill(0).map(createMeeting);
const testParamType = (param) => {
    return !isNaN(typeof param === 'string' ? parseFloat(param) : param)
        && isFinite(typeof param === 'number' ? param : parseFloat(param));
};
exports.testParamType = testParamType;
const isValidMinion = (instance) => {
    instance.name = instance.name || '';
    instance.weaknesses = instance.weaknesses || '';
    instance.title = instance.title || '';
    if (typeof instance.name !== 'string' || typeof instance.weaknesses !== 'string'
        || typeof instance.title !== 'string') {
        throw new Error('Minion\'s name, title, and weaknesses must be strings');
    }
    if ((0, exports.testParamType)(instance.salary)) {
        instance.salary = Number(instance.salary);
    }
    else {
        throw new Error('Minion\'s salary must be a number.');
    }
    return true;
};
exports.isValidMinion = isValidMinion;
const isValidIdea = (instance) => {
    instance.name = instance.name || '';
    instance.description = instance.description || '';
    if (typeof instance.name !== 'string' || typeof instance.description !== 'string') {
        throw new Error('Idea\'s name and description must be strings');
    }
    if ((0, exports.testParamType)(instance.numWeeks)) {
        instance.numWeeks = Number(instance.numWeeks);
    }
    else {
        throw new Error('Idea\'s numWeeks must be a number.');
    }
    if ((0, exports.testParamType)(instance.weeklyRevenue)) {
        instance.weeklyRevenue = Number(instance.weeklyRevenue);
    }
    else {
        throw new Error('Idea\'s weeklyRevenue must be a number.');
    }
    return true;
};
exports.isValidIdea = isValidIdea;
const isValidWork = (instance) => {
    instance.title = instance.title || '';
    instance.description = instance.description || '';
    if (typeof instance.title !== 'string' || typeof instance.description !== 'string') {
        throw new Error('Work\'s title and description must be strings');
    }
    if ((0, exports.testParamType)(instance.hours)) {
        instance.hours = Number(instance.hours);
    }
    else {
        throw new Error('Work\'s hours must be a number.');
    }
    let isValidMinionId = exports.db.allMinions.data.find((minion) => {
        return minion.id === instance.minionId;
    });
    if (!isValidMinionId) {
        throw new Error('Work must have a valid minionId that actually exists in the database');
    }
    return true;
};
exports.isValidWork = isValidWork;
const isValidMeeting = (instance) => {
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
exports.isValidMeeting = isValidMeeting;
exports.db = {
    allMinions: {
        data: allMinions,
        nextId: minionIdCounter,
        isValid: exports.isValidMinion,
    },
    allIdeas: {
        data: allIdeas,
        nextId: ideaIdCounter,
        isValid: exports.isValidIdea,
    },
    allWork: {
        data: allWork,
        nextId: workIdCounter,
        isValid: exports.isValidWork,
    },
    allMeetings: {
        data: allMeetings,
        nextId: meetingIdCounter,
        isValid: exports.isValidMeeting,
    }
};
const findDataArrayByName = (name) => {
    switch (name) {
        case 'minions': return exports.db.allMinions;
        case 'ideas': return exports.db.allIdeas;
        case 'work': return exports.db.allWork;
        case 'meetings': return exports.db.allMeetings;
        default: return null;
    }
};
exports.findDataArrayByName = findDataArrayByName;
const getAllFromDatabase = (modelType) => {
    const model = (0, exports.findDataArrayByName)(modelType);
    return model ? model.data : null;
};
exports.getAllFromDatabase = getAllFromDatabase;
const getFromDatabaseById = (modelType, id) => {
    const model = (0, exports.findDataArrayByName)(modelType);
    return model ? model.data.find(el => el.id === id) : null;
};
exports.getFromDatabaseById = getFromDatabaseById;
const addToDatabase = (modelType, instance) => {
    const model = (0, exports.findDataArrayByName)(modelType);
    if (model && model.isValid(instance)) {
        instance.id = `${model.nextId++}`;
        model.data.push(instance);
        return instance;
    }
    return null;
};
exports.addToDatabase = addToDatabase;

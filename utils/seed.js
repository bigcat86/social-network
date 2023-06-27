const connection = require('../config/connection');
const { User, Thought } = require('../models');
const users = require('./dataUser.json');
const thoughts = require('./dataThought.json');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected to socialNetwork db');

    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('------ cleared db -------');

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.log('------ Database seeded ------');
    process.exit(0);
});
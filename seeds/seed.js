
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('tweets').del(),
    knex('users').del(),
    knex('follows').del(),

    // Inserts seed entries
    knex('tweets').insert({id: 1, tweeted: 'There are 10 types of people in the world, those who understand binary and those who do not', userId: 1}),
    knex('tweets').insert({id: 2, tweeted: 'Thank crunchie its friday', userId: 2}),
    knex('tweets').insert({id: 3, tweeted: 'I wrote a lesson on higher order js  using Harry Potter spells.', userId: 3}),
    knex('users').insert({id: 1, userName: 'Eldritch Wizard', email: 'yeayea@yes.hmm', hashed_password: 'sdkfuwekg'}),
    knex('users').insert({id: 2, userName: 'Tomato Jam', email: 'no@never.com', hashed_password: 'sdkfuw23542436ekg'}),
    knex('users').insert({id: 3, userName: 'Ru!', email: 'maybe@wellsee.com', hashed_password: 'sdkfuwedgkg'}),
    knex('follows').insert({followerId: 1, followingId: 2}),
    knex('follows').insert({followerId: 2, followingId: 1}),
    knex('follows').insert({followerId: 2, followingId: 3})
  );
};


exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('tweets').del(),

    // Inserts seed entries
    knex('tweets').insert({id: 1, tweeted: 'hello world'}),
    knex('tweets').insert({id: 2, tweeted: 'Thank crunchie its friday'}),
    knex('tweets').insert({id: 3, tweeted: 'Roll on the weekend'})
  );
};

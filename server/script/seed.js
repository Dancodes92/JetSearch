const { db, User } = require("../db");

async function seed() {
  try {
    await db.sync({ force: true });
    console.log("db synced!");

    const users = await Promise.all([
      User.create({
        email: "dan@mail.com",
        password: "123",
        avinodeUserName: "dan",
        avinodePassword: "123",
        flightListProUserName: "dan",
        flightListProPassword: "123",
      }),
    ]);
    console.log(`seeded ${users.length} users`);
    console.log(`seeded successfully`);
    return users;
  } catch (err) {
    console.log(err);
    console.log("error while seeding");
  }
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;

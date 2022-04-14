'use strict'

const {
  db,
  models: { User, Product },
} = require('../server/db');
const Order = require('../server/db/models/Order');
const OrderProduct = require('../server/db/models/OrderProduct');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])
  const products = await Promise.all([
    Product.create({
      name: 'Lily',
      imageURL:
        'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559326767974-6UG31CD8FBVD689DA8X3/Ecomm_02_Lily_004.jpg?format=750w',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: 20,
    }),
    Product.create({
      name: 'Cactus',
      imageURL:
        'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559327121147-RG1ANONPMAAXJKDWRODD/Ecomm_04_Orchid_005.jpg?format=750w',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: 30,
    }),
    Product.create({
      name: 'Pencil Plant',
      imageURL:
        'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559327121147-RG1ANONPMAAXJKDWRODD/Ecomm_04_Orchid_005.jpg?format=750w',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: 15,
    }),
    Product.create({
      name: 'Alocasia',
      imageURL:
        'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559326925194-SH58FE5Q44V6AO38THEH/Ecomm_05_Alocasia_008.jpg?format=750w',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: 20,
    }),
    Product.create({
      name: 'Snake',
      imageURL:
        'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559326971697-R6LD4Q9Z5V1EU4496JRZ/Ecomm_17_Snake_001.jpg?format=750w',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: 20,
    }),
    Product.create({
      name: 'Orchid',
      imageURL:
        'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559327121147-RG1ANONPMAAXJKDWRODD/Ecomm_04_Orchid_005.jpg?format=750w',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: 35,
    }),
    Product.create({
      name: 'Pink Calathea',
      imageURL:
        'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559327213969-3LILJM6OQFB49I6HBOT8/Ecomm_03_CalatheaPink_006.jpg?format=750w',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: 20,
    }),
    Product.create({
      name: 'Maiden Hair',
      imageURL:
        'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559833414098-VOZ0QVGIQDABJ1MZA0I7/Ecomm_13_MaidenHair_006.jpg?format=750w',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: 12,
    }),
    Product.create({
      name: 'Palm',
      imageURL:
        'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559833646039-FTYEXWSDNPJG79BCWWQQ/Ecomm_18_Palm_004.jpg?format=750w',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: 18,
    }),
    Product.create({
      name: 'Gift Card',
      imageURL:
        'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1559834442430-DBRWR0KGWCXAJFOUOG2S/giftcard-template.jpg?format=750w',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: 25,
    }),
  ]);


  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

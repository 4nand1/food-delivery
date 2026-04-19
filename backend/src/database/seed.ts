import {
  CategoryModel,
  FoodModel,
  OrderModel,
  UserModel,
} from "./schema";

const defaultCategories = [
  { name: "Main dishes" },
  { name: "Burgers" },
  { name: "Desserts" },
  { name: "Drinks" },
];

const defaultUsers = {
  admin: {
    username: "admin@nomnom.mn",
    email: "admin@nomnom.mn",
    password: "Admin123!",
    role: "admin",
    address: "NomNom HQ, Ulaanbaatar",
  },
  customer: {
    username: "customer@nomnom.mn",
    email: "customer@nomnom.mn",
    password: "Customer123!",
    role: "customer",
    address: "Peace Avenue 1, Ulaanbaatar",
  },
};

export const seedDatabase = async () => {
  const categories = await Promise.all(
    defaultCategories.map(({ name }) =>
      CategoryModel.findOneAndUpdate(
        { name },
        { $setOnInsert: { name } },
        { upsert: true, new: true },
      ),
    ),
  );

  const mainDish = categories.find((category) => category.name === "Main dishes");
  const burger = categories.find((category) => category.name === "Burgers");
  const dessert = categories.find((category) => category.name === "Desserts");
  const drinks = categories.find((category) => category.name === "Drinks");

  if (!mainDish || !burger || !dessert || !drinks) {
    throw new Error("Failed to initialize default categories.");
  }

  const adminUser =
    (await UserModel.findOneAndUpdate(
      { email: defaultUsers.admin.email },
      { $setOnInsert: defaultUsers.admin },
      { upsert: true, new: true },
    ))!;

  const customerUser =
    (await UserModel.findOneAndUpdate(
      { email: defaultUsers.customer.email },
      { $setOnInsert: defaultUsers.customer },
      { upsert: true, new: true },
    ))!;

  const defaultFoods = [
    {
      name: "Spicy Chicken Bowl",
      price: 18.9,
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
      ingredients: "Chicken, rice, avocado, greens, chili sauce",
      categoryId: mainDish._id,
    },
    {
      name: "Classic Cheeseburger",
      price: 14.5,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
      ingredients: "Beef patty, cheddar, tomato, lettuce, brioche bun",
      categoryId: burger._id,
    },
    {
      name: "Lotus Pancake Stack",
      price: 11.75,
      image:
        "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1200&q=80",
      ingredients: "Pancakes, lotus cream, berries, maple syrup",
      categoryId: dessert._id,
    },
    {
      name: "Berry Lemonade",
      price: 6.25,
      image:
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80",
      ingredients: "Lemon, strawberry, mint, sparkling water",
      categoryId: drinks._id,
    },
  ];

  const foods = await Promise.all(
    defaultFoods.map((food) =>
      FoodModel.findOneAndUpdate(
        { name: food.name },
        { $setOnInsert: food },
        { upsert: true, new: true },
      ),
    ),
  );

  const existingCustomerOrder = await OrderModel.findOne({
    userId: customerUser._id,
  });

  if (!existingCustomerOrder) {
    await OrderModel.create({
      userId: customerUser._id,
      address: customerUser.address,
      status: "pending",
      orderItems: [
        {
          foodId: foods[0]._id,
          quantity: 1,
          price: foods[0].price,
        },
        {
          foodId: foods[3]._id,
          quantity: 2,
          price: foods[3].price,
        },
      ],
    });
  }

  console.log("Seeded mock users, categories, foods, and orders.");
  console.log(
    `Admin login: ${adminUser.email} / ${defaultUsers.admin.password}`,
  );
  console.log(
    `Customer login: ${customerUser.email} / ${defaultUsers.customer.password}`,
  );
};

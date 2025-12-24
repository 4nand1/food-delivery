export type FoodCategory = "appetizers" | "salads" | "lunch";

export type FoodItem = {
  id: string;
  title: string;
  price: number;
  desc: string;
  image: string;
  category: FoodCategory;
};

export const foods: FoodItem[] = [
  // Appetizers
  {
    id: "1",
    title: "Finger food",
    price: 12.99,
    desc: "Fluffy pancake stacked with fruits, cream, syrup, and powdered sugar.",
    image: "/food-1.png",
    category: "appetizers",
  },
  {
    id: "2",
    title: "Cranberry Brie Bites",
    price: 12.99,
    desc: "Fluffy pancake stacked with fruits, cream, syrup, and powdered sugar.",
    image: "/food-2.png",
    category: "appetizers",
  },
  {
    id: "3",
    title: "Sunshine Stackers",
    price: 12.99,
    desc: "Fluffy pancake stacked with fruits, cream, syrup, and powdered sugar.",
    image: "/food-3.png",
    category: "appetizers",
  },

  // Salads
  {
    id: "4",
    title: "Grilled chicken cobb salad",
    price: 12.99,
    desc: "Fresh greens, grilled chicken, eggs, and classic dressing.",
    image: "/food-4.png",
    category: "salads",
  },
  {
    id: "5",
    title: "Burrata Caprese",
    price: 12.99,
    desc: "Burrata, tomatoes, basil, olive oil, and balsamic.",
    image: "/food-5.png",
    category: "salads",
  },
  {
    id: "6",
    title: "Beetroot and orange salad",
    price: 12.99,
    desc: "Sweet beetroot, citrus, and light vinaigrette.",
    image: "/food-6.png",
    category: "salads",
  },

  // Lunch favorites
  {
    id: "7",
    title: "Lunch plate special",
    price: 14.99,
    desc: "Balanced lunch plate with protein and sides.",
    image: "/food-7.png",
    category: "lunch",
  },
  {
    id: "8",
    title: "Grilled chicken",
    price: 12.99,
    desc: "Grilled chicken served with light sides.",
    image: "/food-8.png",
    category: "lunch",
  },
];

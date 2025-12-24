import type { Dish, DishCategory } from "./types";

export const mockCategories: DishCategory[] = [
  { id: "all", name: "All dishes" },
  { id: "appetizers", name: "Appetizers" },
  { id: "salads", name: "Salads" },
  { id: "pizzas", name: "Pizzas" },
];

export const mockDishes: Dish[] = [
  {
    id: "d1",
    title: "Brie Crostini Appetizer",
    price: 10.9,
    ingredients: "Brie, toast, honey, nuts",
    imageUrl: "/food-3.png",
    categoryId: "appetizers",
  },
  {
    id: "d2",
    title: "Grilled Chicken Cobb Salad",
    price: 12.9,
    ingredients: "Chicken, lettuce, eggs, tomatoes",
    imageUrl: "/food-1.png",
    categoryId: "salads",
  },
  {
    id: "d3",
    title: "Pepperoni Pizza",
    price: 14.9,
    ingredients: "Pepperoni, cheese, tomato sauce",
    imageUrl: "/food-2.png",
    categoryId: "pizzas",
  },
  {
    id: "d4",
    title: "Brie Crostini Appetizer",
    price: 10.9,
    imageUrl:"/food-3.png",
    categoryId: "lunch-favorites",
  },
  
];

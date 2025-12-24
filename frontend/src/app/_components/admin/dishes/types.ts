export type DishCategory = {
  id: string;
  name: string;
};

export type Dish = {
  id: string;
  title: string;
  price: number;
  ingredients?: string;
  imageUrl?: string;
  categoryId: string;
};

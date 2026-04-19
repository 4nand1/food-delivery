"use client";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CataAdd, foodArr } from "../_components/CataAdd";
import { Profile } from "../_components/Profile";
import { ToggleCata } from "../_components/ToggleCata";
import { api } from "@/lib/axios";

import { Food } from "@/app/(client)/context/cart-context";
export type categorType = { name: string; _id: string };

const buildCategoriesWithFood = (
  categories: categorType[],
  foods: Food[],
  expandedIds: string[],
): foodArr[] => {
  const merged = categories.map((cat) => ({
    id: cat._id,
    name: cat.name,
    state: expandedIds.includes(cat._id),
    food: foods
      .filter((food) => food.categoryId && food.categoryId._id === cat._id)
      .map((food) => ({
        foodName: food.name,
        price: food.price,
        foodId: food._id,
        overview: food.ingredients,
        img: food.image,
      })),
  }));

  const hasNullCategoryFoods = foods.some((food) => !food.categoryId);

  if (hasNullCategoryFoods) {
    const uncategorizedFoods = foods
      .filter((food) => !food.categoryId)
      .map((food) => ({
        foodName: food.name,
        price: food.price,
        foodId: food._id,
        overview: food.ingredients,
        img: food.image,
      }));

    merged.push({
      id: "uncategorized",
      name: "Uncategorized",
      state: expandedIds.includes("uncategorized"),
      food: uncategorizedFoods,
    });
  }

  return merged;
};

export default function Home() {
  const [allState, setAllstate] = useState<boolean>(true);
  const [Category, setCategory] = useState<categorType[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<string[]>([]);

  const fetchCategories = useCallback(async () => {
    const { data } = await api.get<categorType[]>("/categories");
    setCategory(data);
  }, []);

  const fetchFoods = useCallback(async () => {
    const { data } = await api.get<Food[]>("/foods");
    setFoods(data);
  }, []);

  useEffect(() => {
    void (async () => {
      const { data } = await api.get<categorType[]>("/categories");
      setCategory(data);
    })();
  }, []);

  useEffect(() => {
    void (async () => {
      const { data } = await api.get<Food[]>("/foods");
      setFoods(data);
    })();
  }, []);

  const categoriesWithFood = useMemo<foodArr[]>(() => {
    return buildCategoriesWithFood(Category, foods, expandedCategoryIds);
  }, [foods, Category, expandedCategoryIds]);

  const setMap: Dispatch<SetStateAction<foodArr[]>> = (value) => {
    setExpandedCategoryIds((previousExpandedIds) => {
      const previousMap = buildCategoriesWithFood(
        Category,
        foods,
        previousExpandedIds,
      );
      const nextMap =
        typeof value === "function" ? value(previousMap) : value;

      return nextMap
        .filter((item) => item.state && item.id)
        .map((item) => String(item.id));
    });
  };

  return (
    <div className="flex min-w-0 w-full flex-col gap-10 bg-[#E4E4E7] px-7 py-6">
      <Profile />
      <div className="flex min-w-0 w-full flex-col gap-10">
        <ToggleCata
          mapData={categoriesWithFood}
          setMap={setMap}
          setAllstate={setAllstate}
          allState={allState}
          onCategoriesChange={fetchCategories}
          onFoodsChange={fetchFoods}
        />
        <CataAdd
          mapData={categoriesWithFood}
          setAllstate={setAllstate}
          allState={allState}
          onFoodsChange={fetchFoods}
        />
      </div>
    </div>
  );
}

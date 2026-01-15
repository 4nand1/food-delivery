"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { api } from "@/lib/axios";
import { CategoriesFood } from "./_components/CategoriesFood";


type Food = {
  _id: string;
  name: string;
  price: number;
  ingredients: string;
  imageUrl: string;
  categoryId: [
    {
      _id: string;
      name: string;
    }
  ];
};

export default function Home() {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await api.get<Food[]>("/foods");
      setFoods(data);
    };
    getData();
  }, []);

  const onAddToCart = (food: Food) => {
    console.log("Added to cart:", food);
  };

  return (
    <div className="min-h-screen bg-secondary p-8">
      <div className="flex justify-end mb-4">
        <Button variant="ghost" className="rounded-full">
          <img src="/Container (7).png" alt="Logo" />
        </Button>
      </div>
    <CategoriesFood/>
      
    </div>
  );
}

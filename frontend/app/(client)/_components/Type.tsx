"use client";

import { useEffect, useMemo, useState } from "react";
import { FoodCart } from "./FoodCart";
import { Food } from "../context/cart-context";
import { api } from "@/lib/axios";
import { foodType } from "./CartInfo";

export const Type = () => {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    void (async () => {
      const { data } = await api.get<Food[]>("/foods");
      setFoods(data);
    })();
  }, []);

  const orderInfo = useMemo<foodType[]>(() => {
    return foods.map((food) => ({
      ...food,
      quantity: 1,
    }));
  }, [foods]);

  const categories: string[] = useMemo(() => {
    return Array.from(
      new Set(
        orderInfo.map((item) =>
          item.categoryId ? item.categoryId.name : "Uncategorized",
        ),
      ),
    );
  }, [orderInfo]);

  return (
    <>
      {categories.map((ele) => {
        return (
          <div
            key={ele}
            className="flex flex-col gap-10 items-center bg-[#404040] pt-12 pb-10"
          >
            <h1 className="w-316 text-[30px] text-white font-semibold">
              {ele}
            </h1>
            <div className="flex flex-wrap w-316 gap-9">
              {orderInfo.map((foodele, index) => {
                if (
                  (ele === "Uncategorized" && !foodele.categoryId) ||
                  ele === foodele.categoryId?.name
                )
                  return (
                    <FoodCart
                      key={index}
                      id={foodele._id}
                      orderInfo={orderInfo}
                    />
                  );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

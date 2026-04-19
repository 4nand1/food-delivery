"use client";

import { useParams } from "next/navigation";
import { Food } from "../context/cart-context";
import { FoodCart } from "./FoodCart";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/axios";
import { foodType } from "./CartInfo";

type Params = {
  ele: string;
};

export const TypeCata = () => {
  const params = useParams<Params>();
  const slug = params.ele ?? "";
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

  const a = decodeURIComponent(slug);
  const filtered = orderInfo.filter((ele) => ele.categoryId?.name === a);

  if (!slug) return null;

  return (
    <>
      <div className="flex flex-col gap-10 items-center bg-[#404040] pt-22 pb-10">
        <h1 className="w-316 text-[30px] text-white font-semibold">{a}</h1>
        <div className="flex flex-wrap w-316 gap-9">
          {filtered.map((ele) => {
            return (
              <FoodCart
                key={ele._id}
                id={ele._id}
                orderInfo={orderInfo}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

 import { CreateFoodDialog } from "./CreateFood";
import { FoodEditCard } from "./FoodEditCard";


export const CategoriesFood = () => {
    return (
        <div className="border rounded-lg bg-white p-5">
        <p className="text-lg font-semibold mb-5">{categories.name}</p>

        <div className="grid grid-cols-4 gap-5">
          <CreateFoodDialog />
        
          {foods.map((food) => (
            <FoodEditCard
              key={food._id}
              food={food}
              name={food.name}
              price={food.price}
              ingredients={food.ingredients}
              imageUrl={food.imageUrl}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    )
}
import { Schema, model } from 'mongoose';

const foodSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    ingredients: { type: String, required: true },
    image: { type: String, required: true },
    categoryId: [{ type: Schema.Types.ObjectId, required: true, ref: 'Category' },
    ]
}, {
    timestamps: true,
});

export const FoodModel = model('Food', foodSchema);

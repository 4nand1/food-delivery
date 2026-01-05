import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    userId: { type:Schema.Types.ObjectId, required: true, ref: 'User'}
    OrderItems: [
        {
            foodId: { type: Schema.Types.ObjectId, required: true, ref: 'Food' },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ]
    status: { type: String, required: true, default: 'pending' },
    totalPrice: { type: Number, required: true },
    
}, {
    timestamps: true,
});

export const Order = model('Order', orderSchema);


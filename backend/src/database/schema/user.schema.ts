import { Schema, model } from 'mongoose';

const userChema = new Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, required: false },
    adress: { type: String, required: false },
    role: { type: String, required: true, default: 'costumer' },
   
    
}, {
    timestamps: true,
});

export const UserModel = model('User', userChema);



import { Schema, model } from 'mongoose';

const userChema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, required: false },
    adress:
   
    
}, {
    timestamps: true,
});

export const UserModel = model('User', userChema);



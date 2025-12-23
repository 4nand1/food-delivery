import { connect } from 'mongoose'

export const connectToDatabase = async () => {
    await connect('mongodb+srv://Anand:UlD2N3PzC2jydjth@cluster1.evz3dmj.mongodb.net/?appName=Cluster1')
}
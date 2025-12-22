import { connect } from 'mongoose'

export const connectToDatabase = async () => {
    await connect('mongodb+srv://Anand:1yvPRY9lzNwu6zzt@clister1.pqsj91j.mongodb.net/?appName=Cluster1')
}
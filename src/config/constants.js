import env from 'dotenv'
env.config()

export const constant = {
    SERVER_PORT : process.env.SERVER_PORT,
    DB_URL : process.env.DB_URL,
    SECRET_KEY: process.env.SECRET_KEY
}
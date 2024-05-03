import "dotenv/config"

const config = {
    DB_HOST: process.env.DB_HOST,
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_USER: process.env.MAIL_USER,
    NODE_ENV: process.env.NODE_ENV
}

export default config

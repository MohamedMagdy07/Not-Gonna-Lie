import 'dotenv/config';
import z from 'zod'

const schema = z.object(
    {
        APP_PORT: z.string().default('3000'),

        NODE_MAILER_EMAIL: z.string().trim().toLowerCase().includes("@"),
        NODE_MAILER_PASSWORD: z.string(),

        MAILJET_API_KEY: z.string(),
        MAILJET_API_SECRET: z.string(),
        MAILJET_FROM_EMAIL: z.string(),
        MAILJET_FROM_NAME: z.string(),

        EMAIL_PROVIDERS: z.string(),

        JWT_SECRET_KEY: z.string(),

        GOOGLE_OAUTH_WEB_CLIENT_ID: z.string(),
        GOOGLE_OAUTH_CLIENT_SECRET: z.string(),

        MONGODB_URI: z.string(),

        REDIS_HOST: z.string(),
        REDIS_PORT: z.string().default('6379'),
        REDIS_PASSWORD: z.string(),

    }
)

const parsed = schema.parse(process.env);

export const env = {
    app_port: Number(parsed.APP_PORT),
    providers: parsed.EMAIL_PROVIDERS,
    db: {
        url: parsed.MONGODB_URI,
    },
    redis: {
        host: parsed.REDIS_HOST,
        port:Number(parsed.REDIS_PORT),
        password: parsed.REDIS_PASSWORD,
    },
    nodemailer: {
        email: parsed.NODE_MAILER_EMAIL,
        password: parsed.NODE_MAILER_PASSWORD,
    },
    mailjet:{
        key: parsed.MAILJET_API_KEY,
        secret: parsed.MAILJET_API_SECRET,
        fromEmail: parsed.MAILJET_FROM_EMAIL,
        fromName: parsed.MAILJET_FROM_NAME,
    },
    jwt: {
        secret: parsed.JWT_SECRET_KEY,
    },
    google: {
        webClientId: parsed.GOOGLE_OAUTH_WEB_CLIENT_ID,
        clientSecret: parsed.GOOGLE_OAUTH_CLIENT_SECRET,
    }
}

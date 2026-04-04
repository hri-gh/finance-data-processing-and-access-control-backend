"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conf = {
    // Server settings
    PORT: Number(process.env.PORT) || 3000,
    ENV: process.env.NODE_ENV || 'development',
    // Database settings
    DATABASE_URL: process.env.DATABASE_URL,
    // JWT settings
    JWT_SECRET: process.env.JWT_SECRET,
    // CORS settings
    CORS_ORIGIN: process.env.CORS_ORIGIN,
};
exports.default = conf;

// import { UserRole } from "../generated/prisma/enums";

export { };

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                // role: UserRole;
                role: "ADMIN" | "ANALYST" | "VIEWER";
            };
        }
    }
}

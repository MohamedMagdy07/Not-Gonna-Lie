import z from "zod"
import {AppError} from "../error/error.js";

export function validationBody (dto,body) {
    const result = z.safeParse(dto,body);
    if (result.success===false) {
        const error=result.error.issues.map(issue => `${issue.path[0]} : ${issue.message}`).join('\n');
        throw new AppError(error,400);
    }
    return result.data;
}
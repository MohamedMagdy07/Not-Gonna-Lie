import bcrypt from "bcrypt";

export async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export async function comparePassword(hash, password) {
    const match = await bcrypt.compare(hash, password);
    return match;
}
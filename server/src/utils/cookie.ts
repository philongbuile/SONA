export function generateCookie(token: string): string {
    return `Authorization=${token}; HttpOnly; Path=/; Max-Age=3600`;
}
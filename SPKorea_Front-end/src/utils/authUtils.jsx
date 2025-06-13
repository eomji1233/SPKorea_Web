export function parseJwt(token) {
    if (!token) return null;
    try {
        const base64Payload = token.split('.')[1];
        const payload = atob(base64Payload);
        return JSON.parse(payload);
    } catch {
        return null;
    }
}

export function getRolesFromToken(token) {
    const parsed = parseJwt(token);
    return parsed?.roles ? parsed.roles.split(',') : [];
}

export function isTokenExpired(token) {
    const parsed = parseJwt(token);
    if (!parsed || !parsed.exp) return true;
    return parsed.exp * 1000 < Date.now();
}

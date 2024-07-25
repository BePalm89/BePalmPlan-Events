const blacklistedToken = new Set();

export const blacklistToken = (token) => {
    blacklistedToken.add(token);
}

export const isTokenBlacklisted = (token)  => {
    return blacklistedToken.has(token);
}


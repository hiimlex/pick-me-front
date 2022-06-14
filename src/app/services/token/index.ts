const TOKEN_KEY = "auth-token";

function getAuthToken(): string {
  return localStorage.getItem(TOKEN_KEY) || "";
}

function setAuthToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

function removeAuthToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export { TOKEN_KEY, getAuthToken, setAuthToken, removeAuthToken };

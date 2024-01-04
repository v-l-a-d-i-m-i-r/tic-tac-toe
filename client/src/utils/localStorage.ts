enum LocalStorageKeys {
  Token = 'token',
}

export function setToken(token: string): void {
  localStorage.setItem(LocalStorageKeys.Token, token);
}

export function getToken(): string | undefined {
  return localStorage.getItem(LocalStorageKeys.Token);
}

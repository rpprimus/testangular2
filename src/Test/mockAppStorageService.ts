export class mockAppStorageService{
    setToken(token: string) {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('isLoggedIn', 'true');
      }
}
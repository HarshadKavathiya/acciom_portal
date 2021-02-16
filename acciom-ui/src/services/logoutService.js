export const logoutService = async () => {
    localStorage.removeItem('token');
};
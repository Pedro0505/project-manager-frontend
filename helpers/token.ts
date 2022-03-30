export const storeToken = (token: string) => {
  localStorage.setItem('@project-manager/token', token);
};

export const getToken = () => localStorage.getItem('@project-manager/token');

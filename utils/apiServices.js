import axiosRequester from "./../Utils/API";

export const getUserData = async () => {
  const usersData = await axiosRequester.get(`/`);
  return usersData?.data;
};

export const getUser = async (id) => {
  const usersData = await axiosRequester.get(`${id}`);
  return usersData?.data;
};

import { myAxios } from "./helper";

export const signup = (user) => {
  return myAxios.post("/auth/register", user).then((response) => response.data);
};

export const loginUser = (loginDetail) => {
  return myAxios
    .post("/auth/generate-token", loginDetail)
    .then((response) => response.data);
};


export const getUser=(userId)=>{
  return myAxios.get(`/users/${userId}`).then(resp=>resp.data);
}

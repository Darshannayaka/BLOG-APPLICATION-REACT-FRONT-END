import { privateAxios } from "./helper";
import { myAxios } from "./helper";
//create post function
export const createPost = (postData) => {
  //console.log(postData);
  return privateAxios
    .post(
      `/user/${postData.userId}/category/${postData.categoryId}/posts`, // Use backticks here
      postData
    )
    .then((Response) => Response.data);
};

//get all posts
export const loadAllPosts = (pageNumber, pageSize) => {
  return myAxios
    .get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`)
    .then((Response) => Response.data);
};


//load single post of given id
export const loadPost=(postId)=>{
  return myAxios.get("/posts/"+postId).then((Response)=> Response.data);
};


export const createComment=(comment,postId)=>{
  return privateAxios.post(`/post/${postId}/comments`,comment)
}

//upload post banner image
export const uploadPostImage=(image,postId)=>{
let formData= new FormData()
formData.append("image",image)

return privateAxios.post(`/posts/image/upload/${postId}`,formData,{
  headers:{
    'Content-Type':'multipart/form-data'
  }
}).then((response)=>response.data);
};


//get category wise posts
export function loadPostCategoryWise(categoryId)
{
  return privateAxios.get(`/category/${categoryId}/posts`).then(res=>res.data);
};


export function loadPostUserWise(userId){
  return privateAxios.get(`/user/${userId}/posts`).then(res=>res.data);
}

//delete post
export function deletePostService(postId){
  return privateAxios.delete(`/posts/${postId}`).then(res=>res.data);
} 


//update Post
export function updatepost(post,postId){
  console.log(post);
  return privateAxios.put(`/posts/${postId}`,post).then(resp=>resp.data);
}
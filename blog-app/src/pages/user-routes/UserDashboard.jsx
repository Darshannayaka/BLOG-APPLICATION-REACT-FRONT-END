// type rfce for below import
import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import AddPost from "../../components/AddPost";
import { Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getCurrentUserDetail } from "../../auth";
import { loadPostUserWise } from "../../services/post-service";
import { deletePostService } from "../../services/post-service";
import { toast } from "react-toastify";
import Post from "../../components/Post";

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    setUser(getCurrentUserDetail());
    loadPostData();
  }, []);

  function loadPostData() {
    loadPostUserWise(getCurrentUserDetail().id)
      .then((data) => {
        console.log(data);
        setPosts([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error loading user post");
      });
  }

  // Function to open the delete post confirmation modal
  const openDeletePostModal = (post) => {
    setPostToDelete(post);
    setDeletePostModal(true);
  };

  // Function to close the delete post confirmation modal
  const closeDeletePostModal = () => {
    setDeletePostModal(false);
    setPostToDelete(null);
  };

  // Function to delete post
  const handleDeletePost = () => {
    if (postToDelete) {
      deletePostService(postToDelete.postId)
        .then((res) => {
          console.log(res);
          toast.success("Post Is Deleted..");
          let newPosts = posts.filter((p) => p.postId !== postToDelete.postId);
          setPosts([...newPosts]);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in deleting post");
        })
        .finally(() => {
          closeDeletePostModal();
        });
    }
  };

  return (
    <Base>
      <Container>
        <AddPost />
        <h1 className="my-3">Posts Count : ({posts.length})</h1>
        {posts.map((post, index) => {
          return (
            <Post
              post={post}
              key={index}
              deletePost={() => openDeletePostModal(post)}
            />
          );
        })}

        {/* Bootstrap Modal for Delete Confirmation */}
        <Modal isOpen={deletePostModal} toggle={closeDeletePostModal}>
          <ModalHeader toggle={closeDeletePostModal}>Delete Confirmation</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this post?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleDeletePost}>
              Delete
            </Button>
            <Button color="secondary" onClick={closeDeletePostModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </Base>
  );
};

export default UserDashboard;

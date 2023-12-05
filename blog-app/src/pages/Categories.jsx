import React, { useEffect, useState } from 'react';
import Base from '../components/Base';
import { useParams } from 'react-router-dom';
import CategorySideMenu from '../components/CategorySideMenu';
import { Col, Container, Row, Button, Modal } from 'reactstrap';
import NewFeed from '../components/NewFeed';
import { deletePostService, loadPostCategoryWise } from '../services/post-service';
import { toast } from 'react-toastify';
import Post from '../components/Post';

function Categories() {
  const [posts, setPosts] = useState([]);
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const { categoryId } = useParams();

  useEffect(() => {
    console.log(categoryId);
    loadPostCategoryWise(categoryId)
      .then((data) => {
        setPosts([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error in loading posts');
      });
  }, [categoryId]);

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
          toast.success('Post Is Deleted..');
          let newPosts = posts.filter((p) => p.postId !== postToDelete.postId);
          setPosts([...newPosts]);
        })
        .catch((error) => {
          console.log(error);
          toast.error('Error in deleting post');
        })
        .finally(() => {
          closeDeletePostModal();
        });
    }
  };

  return (
    <Base>
      <Container className="mt-3">
        <Row>
          <Col md={2} className="pt-4">
            <CategorySideMenu />
          </Col>
          <Col md={10}>
            <h1>Blogs Count ({posts.length})</h1>
            {posts &&
              posts.map((post, index) => {
                return <Post deletePost={() => openDeletePostModal(post)} key={index} post={post} />;
              })}
            {posts.length <= 0 ? <h1>No post in this category</h1> : ''}
          </Col>
        </Row>
      </Container>

      {/* Bootstrap Modal for Delete Confirmation */}
      <Modal isOpen={deletePostModal} toggle={closeDeletePostModal}>
        <div className="modal-header">
          <h5 className="modal-title">Delete Confirmation</h5>
          <button type="button" className="btn-close" onClick={closeDeletePostModal}></button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete this post?</p>
        </div>
        <div className="modal-footer">
          <Button color="danger" onClick={handleDeletePost}>
            Delete
          </Button>
          <Button color="secondary" onClick={closeDeletePostModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </Base>
  );
}

export default Categories;

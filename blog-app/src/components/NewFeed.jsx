import React, { useEffect, useState } from "react";
import { deletePostService, loadAllPosts } from "../services/post-service";
import { toast } from "react-toastify";
import {
  Col,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";

function NewFeed() {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    changePage(currentPage);
  }, [currentPage]);

  const changePage = (pageNumber = 0, pageSize = 5) => {
    if (pageNumber > postContent.pageNumber && postContent.lastPage) {
      return;
    }
    if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
      return;
    }
    loadAllPosts(pageNumber, pageSize)
      .then((data) => {
        setPostContent({
          content: [...postContent.content, ...data.content],
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          pageSize: data.pageSize,
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
        });
      })
      .catch((error) => {
        toast.error("Error in loading posts");
      });
  };

  const changePageInfinite = () => {
    setCurrentPage(currentPage + 1);
  };

  const openDeletePostModal = (post) => {
    setPostToDelete(post);
    setDeletePostModal(true);
  };

  const closeDeletePostModal = () => {
    setDeletePostModal(false);
    setPostToDelete(null);
  };

  const handleDeletePost = () => {
    if (postToDelete) {
      deletePostService(postToDelete.postId)
        .then((res) => {
          toast.success("Post Is Deleted..");
          let newPostContents = postContent.content.filter((p) => p.postId !== postToDelete.postId);
          setPostContent({ ...postContent, content: newPostContents });
        })
        .catch((error) => {
          toast.error("Error in deleting post");
        })
        .finally(() => {
          closeDeletePostModal();
        });
    }
  };

  return (
    <div className="container-fluid">
      <Row>
        <Col md={{ size: 12 }}>
          <h1>Blogs Count ({postContent?.totalElements})</h1>
          <InfiniteScroll
            dataLength={postContent.content.length}
            next={changePageInfinite}
            hasMore={!postContent.lastPage}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {postContent.content.map((post) => (
              <Post deletePost={() => openDeletePostModal(post)} post={post} key={post.postId} />
            ))}
          </InfiniteScroll>

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
        </Col>
      </Row>
    </div>
  );
}

export default NewFeed;

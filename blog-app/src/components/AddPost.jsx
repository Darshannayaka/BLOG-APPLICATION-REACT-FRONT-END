import { InputGroup, InputGroupText } from "reactstrap";
import { X } from "react-feather";
import {
  Card,
  CardBody,
  Form,
  CardHeader,
  FormGroup,
  Input,
  Label,
  Container,
  Button,
  Row,
  Col,
} from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { createPost as doCreatePost, uploadPostImage } from "../services/post-service";
import { getCurrentUserDetail } from "../auth";
const AddPost = () => {
  const editor = useRef(null);

  const [user, setUser] = useState(undefined);

  const [categories, setCategories] = useState([]);

  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

  useEffect(() => {
    setUser(getCurrentUserDetail());
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //field change function
  const fieldChanged = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const contentFiledChanged = (data) => {
    setPost({ ...post, content: data });
  };

  //create post function
  const createPost = (event) => {
    event.preventDefault();

    if (post.title.trim() === "") {
      toast.error("post title is required");
      return;
    }
    if (post.content.trim() === "") {
      toast.error("post Content is required");
      return;
    }
    if (post.categoryId.trim() === "") {
      toast.error("post category is required");
      return;
    }

    //submit the form on server
    post['userId'] = user.id;
    doCreatePost(post)
      .then(data => {


        uploadPostImage(image,data.postId).then(data=>{
          toast.success("Image Uploaded");
        }).catch(error=>{
          toast.error("Error in uploading image")
          console.log(error);
        })


        toast.success("Post is Created");
        setPost({
          title: "",
          content: "",
          categoryId: "",
        })

      })
      .catch((error) => {
        toast.error("Post not Created due to some Error !!");
      });
  };

  // Function to reset form fields
  const resetForm = () => {
    setPost({
      title: "",
      content: "",
      categoryId: "",
    });
  };

  const [image,setImage]=useState(null)

  //handling file change event
  const handleFileChange=(event)=>{
    console.log(event.target.files[0])
    setImage(event.target.files[0])
  }

  

  return (
    <div className="wrapper" >
      <Row className="mt-3">
        <Col sm={{ size: 10, offset: 1 }}>
          <Card className="shadow mt-3" style={{ background: "linear-gradient(45deg, #2196F3, #FFC107, #F44336)", padding: "20px", borderRadius: "10px", }}>
            <CardBody>
              {/* {JSON.stringify(post)} */}
              <h3 align="center">What going in your mind ?</h3>
              <Form onSubmit={createPost}>
                {/* <div className="my-3">
                  <Label for="title">Post Title</Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="Enter post title"
                    name="title"
                    onChange={fieldChanged}
                  />
                </div> */}
                <div className="my-3">
                  <Label for="title">Post Title</Label>
                  <InputGroup>
                    <Input
                      type="text"
                      id="title"
                      placeholder="Enter post title"
                      name="title"
                      value={post.title}
                      onChange={fieldChanged}
                    />
                    <InputGroupText>
                      <Button
                        color="secondary"
                        onClick={() => setPost((prevPost) => ({ ...prevPost, title: "" }))}
                      >
                        <X size={18} />
                      </Button>
                    </InputGroupText>
                  </InputGroup>
                </div>

                <div className="my-3">
                  <Label for="content">Post Content</Label>
                  {/* <Input
                    type="textarea"
                    id="content"
                    placeholder="Enter post content"
                    style={{ height: "300px" }}
                  /> */}
                  <JoditEditor
                    ref={editor}
                    value={post.content}
                    onChange={contentFiledChanged}
                  />
                </div>

                {/* {file filed} */}
                <div className="mt-3">
                  <Label for="image">Select Post Banner</Label>
                  {/* {to store multiple images use mutiple inside input field} */}
                  {/* <Input id="image" type="file" multiple/> */}
                  <Input id="image" type="file" onChange={handleFileChange}/>
                </div>

                <div className="my-3">
                  <Label for="category">Post Category</Label>
                  <Input
                    type="select"
                    id="category"
                    placeholder="Select category"
                    name="categoryId"
                    onChange={fieldChanged}
                    defaultValue={0}
                  >
                    <option disabled value={0}>
                      ---Select Category---
                    </option>
                    {categories.map((category) => (
                      <option
                        value={category.categoryId}
                        key={category.categoryId}
                      >
                        {category.categoryTitle}
                      </option>
                    ))}
                  </Input>
                </div>

                <Container className="text-center">
                  <Button type="submit" color="primary">
                    Create Post
                  </Button>
                  <Button className="ms-2" color="danger" onClick={resetForm}>
                    Reset Content
                  </Button>
                </Container>
              </Form>
              {/* {content} */}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddPost;

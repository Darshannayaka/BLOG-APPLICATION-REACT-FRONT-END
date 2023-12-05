import React from 'react'
import Base from '../components/Base'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
import userContext from '../context/userContext'
import { useEffect } from 'react'
import { loadPost, updatepost as doUpdatePost} from '../services/post-service'
import { toast } from 'react-toastify'
import { useState } from 'react'
import JoditEditor from "jodit-react";
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
import { loadAllCategories } from '../services/category-service'
import { useRef } from 'react'


function UpdateBlog() {

  const editor = useRef(null);
  const [categories, setCategories] = useState([]);

const {blogId} = useParams()
const object = useContext(userContext)
const navigate = useNavigate()
const [post,setPost]= useState(null)

useEffect(()=>{

  loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });


  //load the blog from database
  loadPost(blogId).then(data=>{
    console.log(data);
    setPost({...data,categoryId:data.category.categoryId})
  }).catch(error=>{
    console.log(error);
    toast.error("error in loading the blog")
  })
},[])

useEffect(()=>{
  console.log("first")
  if(post){
    if(post.user.id != object.user.data.id){
      toast.error("This is not your post !!")
      navigate("/")
    }
  }
},[post])

const handleChange=(event,fieldName)=>{
setPost({
  ...post,
  [fieldName]:event.target.value
})
}

const updatePost=(event)=>{
  event.preventDefault()
  console.log(post);
  doUpdatePost({...post,category:{categoryId: post.categoryId}},post.postId)
  .then(res=>{
    console.log(res);
    toast.success("post Updated");
  }).catch(error=>{
    console.log(error);
    toast.error("Error in updating post")
  })
}


const updateHtml=()=>{
  return(
    <div className="wrapper" >
    <Row className="mt-3">
      <Col sm={{ size: 10, offset: 1 }}>
        <Card className="shadow mt-3" style={{ background: "linear-gradient(45deg, #2196F3, #FFC107, #F44336)", padding: "20px", borderRadius: "10px", }}>
          <CardBody>
            {/* {JSON.stringify(post)} */}
            <h3 align="center">Update Post From Here</h3>
            <Form onSubmit={updatePost}>
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
                    onChange={(event)=>handleChange(event,'title')}
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
                  onChange={newContent=>setPost({...post,content:newContent})}
                />
              </div>

              {/* {file filed} */}
              <div className="mt-3">
                <Label for="image">Select Post Banner</Label>
                {/* {to store multiple images use mutiple inside input field} */}
                {/* <Input id="image" type="file" multiple/> */}
                <Input id="image" type="file" onChange={''}/>
              </div>

              <div className="my-3">
                <Label for="category">Post Category</Label>
                <Input
                  type="select"
                  id="category"
                  placeholder="Select category"
                  name="categoryId"
                  onChange={(event)=>handleChange(event,'categoryId')}
                  value={post.categoryId}
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
                  Update Post
                </Button>
                <Button className="ms-2" color="danger" >
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
  )
}

  return (
    <Base>
    <Container>
    {post && updateHtml()}
    </Container>
    </Base>
  )
}

export default UpdateBlog
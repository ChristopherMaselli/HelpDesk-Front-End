import React from "react";
import "./PostForm.css";
import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { SketchPicker } from "react-color";
import axios from "axios";

const PostForm = props => {
  const [formInfo, setFormInfo] = useState({
    postId: props.postdata.id,
    postName: props.postdata.name,
    postDesc: props.postdata.desc,
    postStatus: props.postdata.status,
    postBackgroundColorValue: props.postdata.backgroundColorValue,
    postMidColorValue: props.postdata.midColorValue,
    postTextColorValue: props.postdata.textColorValue,
    postState: props.postdata.state,
    postUpArrow: props.postdata.upArrow,
    postNumber: props.postdata.number,
    postLetters: props.postdata.letters,
    postOwner: props.postdata.owner
  });

  const postNameRef = React.createRef();
  const postDescRef = React.createRef();
  const postStatusRef = React.createRef();
  const postStateRef = React.createRef();
  const postUpArrowRef = React.createRef();
  const postNumberRef = React.createRef();
  const postLettersRef = React.createRef();

  const handleChange = e => {
    const tempFormInfo = { ...formInfo };
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    tempFormInfo[name] = value;
    setFormInfo(tempFormInfo);
  };

  const handleDelete = async e => {
    const id = formInfo.postId;
    await axios.delete("https://localhost:5001/api/Postitems/" + id);
    props.closeForm();
    return props.refreshposts;
  };

  const handleColorChangeEffect = (color, name) => {
    const tempFormInfo = { ...formInfo };
    tempFormInfo[name] = color.hex;
    setFormInfo(tempFormInfo);
  };

  const handleChangeBackgroundColor = color => {
    handleColorChangeEffect(color, "postBackgroundColorValue");
  };

  const handleChangeMidColor = color => {
    handleColorChangeEffect(color, "postMidColorValue");
  };

  const handleChangeTextColor = color => {
    handleColorChangeEffect(color, "postTextColorValue");
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const obj = {
      name: formInfo.postName,
      desc: formInfo.postDesc,
      status: formInfo.postStatus,
      backgroundColorValue: formInfo.postBackgroundColorValue,
      midColorValue: formInfo.postMidColorValue,
      textColorValue: formInfo.postTextColorValue,
      state: parseInt(formInfo.postState),
      upArrow: parseInt(formInfo.postUpArrow),
      number: parseInt(formInfo.postNumber),
      letters: formInfo.postLetters,
      owner: "Test"
    };

    if (formInfo.postId == -1) {
      await axios.post("https://localhost:5001/api/PostItems", obj);
    } else {
      obj["id"] = formInfo.postId;
      await axios.put("https://localhost:5001/api/PostItems/" + obj.id, obj);
    }

    props.closeForm();
    return await props.refreshposts;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            ref={postNameRef}
            autoFocus
            value={formInfo.postName}
            onChange={postNameRef => handleChange(postNameRef)}
            name="postName"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="Status">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            ref={postStatusRef}
            value={formInfo.postStatus}
            onChange={postStatusRef => handleChange(postStatusRef)}
            name="postStatus"
          >
            <option>TO DO</option>
            <option>IN PROGRESS</option>
            <option>CODE REVIEW</option>
            <option>DONE</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="Desc">
        <Form.Label>Desc</Form.Label>
        <Form.Control
          as="textarea"
          rows="4"
          ref={postDescRef}
          value={formInfo.postDesc}
          onChange={postDesc => handleChange(postDesc)}
          name="postDesc"
        />
      </Form.Group>
      <Form.Row>
        <Form.Group controlId="BackgroundColor">
          <Form.Label>Background Color</Form.Label>
          <SketchPicker
            color={formInfo.postBackgroundColorValue}
            onChangeComplete={color => handleChangeBackgroundColor(color)}
          />
        </Form.Group>

        <Form.Group controlId="MiddleColor">
          <Form.Label>Middle Color</Form.Label>
          <SketchPicker
            color={formInfo.postMidColorValue}
            onChangeComplete={color => handleChangeMidColor(color)}
          />
        </Form.Group>

        <Form.Group controlId="TextColor">
          <Form.Label>Text Color</Form.Label>
          <SketchPicker
            color={formInfo.postTextColorValue}
            onChangeComplete={color => handleChangeTextColor(color)}
          />
        </Form.Group>
      </Form.Row>
      <Form.Group controlId="Letters">
        <Form.Label>Letters</Form.Label>
        <Form.Control
          ref={postLettersRef}
          value={formInfo.postLetters}
          onChange={postLettersRef => handleChange(postLettersRef)}
          name="postLetters"
        />
      </Form.Group>

      <Form.Row>
        <Form.Group as={Col} controlId="State">
          <Form.Label>State</Form.Label>
          <Form.Control
            as="select"
            ref={postStateRef}
            value={formInfo.postState}
            onChange={postStateRef => handleChange(postStateRef)}
            name="postState"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="upArrow">
          <Form.Label>Up Arrow</Form.Label>
          <Form.Control
            as="select"
            ref={postUpArrowRef}
            value={formInfo.postUpArrow}
            onChange={postUpArrowRef => handleChange(postUpArrowRef)}
            name="postUpArrow"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Number</Form.Label>
          <Form.Control
            as="select"
            ref={postNumberRef}
            value={formInfo.postNumber}
            onChange={postNumberRef => handleChange(postNumberRef)}
            name="postNumber"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <div className="wrapper">
        <Button variant="primary" type="submit" onClick={props.refreshPosts}>
          Submit
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete Post
        </Button>
      </div>
    </Form>
  );
};

export default PostForm;

import React from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import Header from "../Header/Header.jsx";
import { useLocation } from "react-router-dom";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "../../api/axios";
import { useState, useEffect } from "react";
import $ from "jquery";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {successToast, errorToast} from "../../Toasts"
const ContentTypeFields = () => {
  // const axiosPrivate = useAxiosPrivate();
  // const [url,setUrl] = useState("https://localhost:44325/api/ContentTypes")
  const [data, setData] = useState();
  const [count, setCount] = useState();
  const [show, setShow] = useState(false);
  const [modalFields, setModalFields] = useState([]);
  const [newData, setNewData] = useState();
  const location = useLocation().pathname.split("/");
  const content_type_id = location[location.length - 1];
  const [fieldId, setFieldId] = useState();
  const [url, setUrl] = useState(
    "https://62a492ef47e6e40063951ec5.mockapi.io/api/contentTypes/" +
      content_type_id +
      "/field"
  );
  const readData = async () => {
    await axios.get(url).then(function (response) {
      // setData(response.data.data.contentTypes);
      setData(response.data);
      setCount(response.data.count);
      // setCount(response.data.data.totalCount);
    });
  };
  useEffect(() => {
    readData();
  }, []);
  function addContent(edit) {
    modalFields.push(
      <Form.Group className="mb-3">
        <Form.Label>Field Name</Form.Label>
        <Form.Control
          id="fieldName"
          defaultValue={edit?.fieldName}
          type="text"
        />
        <Form.Label>Field Description</Form.Label>
        <Form.Control
          id="fieldDescription"
          defaultValue={edit?.fieldDescription}
          type="text"
        />
        {edit ? (
          <Form.Group className="mb-3">
            <Form.Label>Field Type</Form.Label>
            <Form.Control
              id="fieldType"
              value={edit.fieldType}
              type="text"
              disabled
            />
            <Form.Check
              type="checkbox"
              id="mandatory"
              label="Mandatory"
              checked={edit.mandatory}
              disabled
            />
          </Form.Group>
        ) : (
          <Form.Group className="mb-3">
            <Form.Label>Field Type</Form.Label>
            <Form.Select id="fieldType">
              <option value="0">Number</option>
              <option value="1">String</option>
              <option value="2">Date</option>
              <option value="3">Boolean</option>
            </Form.Select>
            <Form.Check type="checkbox" id="mandatory" label="Mandatory" />
          </Form.Group>
        )}
      </Form.Group>
    );
  }

  async function handleSubmit() {
    let fieldData= {
      contentId: content_type_id,
      fieldName: $("#fieldName")[0].value,
      fieldType: $("#fieldType")[0].value,
      fieldDescription: $("#fieldDescription")[0].value,
      mandatory: $("#mandatory")[0].checked,
    };
    if(fieldId){
        fieldData["id"]=fieldId
    }
    console.log(fieldData);
    try {
      if (fieldId) {
        await axios.put(
          "https://62a492ef47e6e40063951ec5.mockapi.io/api/contentTypes/" +
            content_type_id +
            "/field/" +
            fieldId,
            fieldData
        );
      } else {
        await axios.post(
          "https://62a492ef47e6e40063951ec5.mockapi.io/api/contentTypes/" +
            content_type_id +
            "/field",
            fieldData
        );
      }
      successToast("Field added successfully !");
      readData();
    } catch (err) {
      errorToast(err);
    }
  }

  function sendData(){
    setNewData({
        fieldName: $("#fieldName")[0].value,
        fieldType: $("#fieldType")[0].value,
        fieldDescription: $("#fieldDescription")[0].value,
        mandatory: $("#mandatory")[0].checked
    })
    console.log(newData)
    setShow(!show)
     setModalFields([])
     setNewData();
  }

  return (
    <div>
        <ToastContainer />
      <Header />
      {/* <Table isParent = {false} url = {'https://62a492ef47e6e40063951ec5.mockapi.io/api/contentTypes/'+content_type_id.toString()+'/contents'}/> */}
      <div class="container">
        <div className="row">
        <div class="table-responsive">
        <Button className="mb-4 float-end" onClick={() => (setShow(true), addContent())}>Add Field</Button>
          {data ? (
            <table class="table table-bordered">
              <thead>
                {Object.keys(data[0]).map((value) => (
                  <th>{value}</th>
                ))}
                <th>Actions</th>
              </thead>
              <tbody>
                {data.map((value) => (
                  <tr>
                    {Object.values(value).map((v) => (
                      <td>
                        {typeof v === "boolean"
                          ? v == true
                            ? "True"
                            : "False"
                          : v}
                      </td>
                    ))}
                    {/* satıra tıklandığında seçili girdi için eğer alt tablo varsa onun gösterildiği tablo sayfası açılır.  */}
                    <td className="d-flex justify-content-around">
                      <button className="btn btn-danger" >
                        <i class="far fa-trash-alt"></i>
                      </button>
                      <button className="btn btn-success" >
                        <i
                          class="far fa-edit"
                          onClick={() => (setShow(true), addContent(value), setFieldId(value.id))}
                        ></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Spinner animation="grow" />
          )}
        </div>
        </div>
     
      </div>
      <Modal
        show={show}
        onHide={() => (setShow(!show), setModalFields([]))}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Field</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalFields}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => (setShow(!show), setModalFields([]))}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={()=>handleSubmit()}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContentTypeFields;

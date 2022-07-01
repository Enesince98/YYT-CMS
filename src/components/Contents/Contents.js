import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import content from "../contentList.json";
import newContent from "../content.json";
import Header from "../Header/Header.jsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Button, Modal, Form } from "react-bootstrap";
const Contents = () => {
  const [data, setData] = useState();
  const [count, setCount] = useState();
  const [show, setShow] = useState(false);
  const [modalFields, setModalFields] = useState([]);
  const location = useLocation().pathname.split("/");
  const content_type_id = location[location.length - 1];
  function capitalize(string){
    return string.trim().replace(/^\w/, (c) => c.toUpperCase())
  }
  useEffect(() => {
    const readData = async () => {
      await axios
        .get(
          "https://62a492ef47e6e40063951ec5.mockapi.io/api/contentTypes/2/contents"
        )
        .then(function (response) {
          setData(response.data.data);
        });
    };
    readData();
  }, []);
  function addContent(edit) {
    let row = {};
    if (edit) {
      row = Object.values(edit);
      console.log(row);
    }
    newContent.fields.map((field, idx) => {
      let inputType;
      switch (field.fieldType) {
        case 0:
          inputType = <Form.Control defaultValue={row[idx]} type="number" />;
          break;
        case 1:
          inputType = <Form.Control defaultValue={row[idx]} type="text" />;
          break;
        case 2:
          inputType = (
            <Form.Control
              defaultValue={row[idx]?.split("T")[0]}
              type="date"
            />
          );
          break;
        case 3:
          inputType = (
            <Form.Select>
              <option value="True">True</option>
              <option value="False" >False</option>
            </Form.Select>
          );
          break;
      }
      modalFields.push(
        <Form.Group className="mb-3">
          <Form.Label>{capitalize(field.fieldName)}</Form.Label>
          {inputType}
        </Form.Group>
      );
    });
  }
  return (
    <div>
      <Header />
      {/* <Table isParent = {false} url = {'https://62a492ef47e6e40063951ec5.mockapi.io/api/contentTypes/'+content_type_id.toString()+'/contents'}/> */}
      <div class="container row">
        <Button onClick={() => (setShow(true), addContent())}>
          Add Content
        </Button>
        <div class="table-responsive">
          {data ? (
            <table class="table table-bordered">
              <thead>
                {Object.keys(data[0]).map((value) => (
                  <th>{capitalize(value)}</th>
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
                    <td className="d-flex">
                      <button className="btn btn-danger">
                        <i class="far fa-trash-alt"></i>
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => (setShow(!show), addContent(value))}
                      >
                        <i class="far fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>Yükleniyor</div>
          )}
        </div>
      </div>
      <Modal
        show={show}
        onHide={() => (setShow(!show), setModalFields([]))}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new Content</Modal.Title>
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
            onClick={() => (setShow(!show), setModalFields([]))}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Contents;

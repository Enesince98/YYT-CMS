import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import content from "../contentList.json";
import newContent from "../content.json";
import Header from "../Header/Header.jsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {Button,Modal,Form,} from "react-bootstrap";
const Contents = () => {
  const [data, setData] = useState();
  const [count, setCount] = useState();
  const [show, setShow] = useState(false);
  const [modalFields, setModalFields] = useState([]);
  const location = useLocation().pathname.split("/");
  const content_type_id = location[location.length - 1];
  useEffect(() => {
  const readData = async () => {
    await axios.get("https://62a492ef47e6e40063951ec5.mockapi.io/api/contentTypes/2/contents").then(function (response) {
      setData(response.data.data);
    });
  };
  readData();},[]);
function addContent(e){
  let row = {};
  if (e) {row = Object.values(data[e.target.parentElement.parentElement.rowIndex])
  console.log(row[1])
  }
  newContent.fields.map((field,idx)=>{
    let inputType;
    switch(field.fieldType){
      case 0:
        inputType=(<Form.Control value = {row[1]} type="number"/>)
        break;
      case 1:
        inputType=(<Form.Control value = {row[0]} type="text"/>)
      break;
      case 2:
        inputType=(<Form.Control value = {row[2]?.split("T")[0]} onChange={(e)=> console.log(e.target.value)} type="date"/>)
      break;
      case 3:
        inputType=(<Form.Select>
                      <option value = "True">doru</option>
                      <option value = "False" selected>yanlis</option>
                    </Form.Select>)
      break;
    }
    modalFields.push(
      <Form.Group className="mb-3" >
          <Form.Label>{field.fieldName}</Form.Label>
          {inputType}
        </Form.Group>
    )
})
}
  return (
    <div>
      <Header />
      {/* <Table isParent = {false} url = {'https://62a492ef47e6e40063951ec5.mockapi.io/api/contentTypes/'+content_type_id.toString()+'/contents'}/> */}
      <div class="container row">
        <Button onClick = {() => (setShow(true),addContent()) }> Add Content</Button>
        <div class="table-responsive">
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
                      <td>{v}</td>
                    ))}
                    {/* satıra tıklandığında seçili girdi için eğer alt tablo varsa onun gösterildiği tablo sayfası açılır.  */}
                  <td className="d-flex"><button className="btn btn-danger"><i class="far fa-trash-alt"></i></button>
                  <button className="btn btn-success"
                          onClick={(e) => (setShow(!show), addContent(e))}><i class="far fa-edit"></i></button>
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
      <Modal show={show} onHide={() => (setShow(!show), setModalFields([]))} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add new Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalFields}</Modal.Body>
        <Modal.Footer>
							<Button variant="secondary" onClick={() => (setShow(!show), setModalFields([]))}>
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
import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import {
  Button,
  Modal,
  Form,
  ToggleButton,
  ButtonGroup,
  Spinner,
} from "react-bootstrap";
import Header from "../Header/Header.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { successToast, errorToast } from "../../Toasts";
import "./ContentTypeManager.css";

const ContentTypeManager = () => {
  const axiosPrivate = useAxiosPrivate();
  const [show, setShow] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [url, setUrl] = useState("https://localhost:44325/api/ContentTypes");
  const [contentName, setContentName] = useState("");
  const [contentDescription, setContentDescription] = useState("");
  const [contentType, setContentType] = useState();
  const [data, setData] = useState(); // API den gelen response içindeki datayı tutmamıza yarayan değişken. Veri geldiğinde tablonun güncellenmesi için state içinde tutuluyor.
  const [count, setCount] = useState();
  const [fields, setFields] = useState([]);
  const [fieldName, setFieldName] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [mandatory, setMandatory] = useState(false);
  const [form, setForm] = useState([]);
  //field name textboxı boşsa veya radio button seçilmemişse butonları disable et.
  //add fielda tıklanınca ekranı boşalt. ehe
  function capitalize(string) {
    return string.trim().replace(/^\w/, (c) => c.toUpperCase());
  }
  const readData = async () => {
    try {
      await axiosPrivate
        .get("https://localhost:44325/api/ContentTypes")
        .then(function (response) {
          //Genel bir async api isteği işlemidir. Gelen veriyi stateler içinde tutar
          setData(response.data.data.contentTypes); //useEffect ile url değiştikçe yeniden istek atılması sağlanır.
          setCount(response.data.data.totalCount);
        });
    } catch (err) {
      errorToast(err);
    }
  };
  useEffect(() => {
    readData();
  }, []);

  // useEffect(()=> {
  // 	console.log(radioValue)
  // },[radioValue])

  function loadNext() {
    setShow(!show);
    setShowNext(true);
  }

  const handleSubmit = async () => {
    setContentType({
      name: contentName,
      description: contentDescription,
      fields,
    });
    try {
      const response = await axios.post(
        "https://localhost:44325/api/ContentTypes",
        {
          name: contentName,
          description: contentDescription,
          fields: fields,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setContentType();
      successToast("Content Type added successfully !");
      setFields([]);
      setShowNext(false);
      setUrl("https://localhost:44325/api/ContentTypes");
    } catch (err) {
      errorToast(err);
    }
  };
  const radios = [
    { name: "String", value: "0" },
    { name: "Number", value: "1" },
    { name: "Boolean", value: "2" },
    { name: "Date", value: "3" },
  ];

  const addField = (e) => {
    // fields.push({fieldName,fieldType: Number(radioValue),mandatory});
    setFields((current) => [
      ...current,
      { fieldName, fieldType: Number(radioValue), mandatory },
    ]);
    setFieldName("");
    setRadioValue("");
    setMandatory(false);
    successToast("Field added succesfully !");
  };

  function editContentType(contentTypeInfo) {
    form.push(
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Content Type Name</Form.Label>
          <Form.Control
            type="text"
            value={contentTypeInfo?.name}
            placeholder="Enter content type name"
            id="contentName"
            autoFocus
            onBlur={(e) => setContentName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content Type Description</Form.Label>
          <Form.Control
            type="text"
            value={contentTypeInfo?.description}
            id="contentDescription"
            placeholder="Enter content type description"
            autoFocus
            onBlur={(e) => setContentDescription(e.target.value)}
          />
        </Form.Group>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => (setShow((prev) => !prev), setForm([]))}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={
              contentTypeInfo?.name
                ? () => (handleSubmit(), setShow((prev) => !prev), setForm([]))
                : loadNext
            }
          >
            {contentTypeInfo?.name ? "Submit" : "Next"}
          </Button>
        </Modal.Footer>
      </Form>
    );
    if (typeof contentTypeInfo === "undefined") {
    }
    console.log(form);
    console.log(contentTypeInfo);
  }

  return (
    <div>
      <ToastContainer />
      <Header />
      {/*<Table url = 'https://localhost:44325/api/ContentTypes' isParent = {true} whoseParent = "contents"/>*/}
      <div className="ContentTypeContainerBoxLight">
        <div className="row">
          <h1 className="contentTitle">{`Content Types`}</h1>
          <div class="table-responsive">
            <button
              className="button-57"
              role="button"
              onClick={() => (setShow(true), editContentType())}
            >
              <span className="text">New Content Type</span>
              <span className="text">Add a Content Type</span>
            </button>
            {data ? (
              <table className="table table-bordered">
                <thead>
                  {Object.keys(data[0]).map((value) => (
                    <th>{capitalize(value)}</th>
                  ))}
                  <th>Actions</th>
                </thead>
                <tbody>
                  {data.map((value, idx) => (
                    <tr>
                      {Object.values(value).map((v) => (
                        <td>{typeof v === "object" ? v.length : v}</td>
                      ))}
                      {/* satıra tıklandığında seçili girdi için eğer alt tablo varsa onun gösterildiği tablo sayfası açılır.  */}
                      <td className="d-flex justify-content-around">
                        <Link
                          to={
                            "/contents/" +
                            Object.values(value)[1] +
                            "/" +
                            (idx + 2)
                          }
                        >
                          <button type="button" class="btn btn-success me-3">
                            <i class="far fa-eye" />
                          </button>
                        </Link>
                        <Link to={"/content-type/" + (idx + 2)}>
                          <button type="button" class="btn btn-primary me-3">
                            <i class="far fa-edit" />
                          </button>
                        </Link>
                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={() => (
                            setShow(true), editContentType(value)
                          )}
                        >
                          <i
                            class="fa-solid fa-spell-check"
                            onClick={() => (
                              () => setShow(true), editContentType(value)
                            )}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={(e) =>
                            removeContentType(
                              e.target.parentElement.parentElement.rowIndex
                            )
                          }
                          class="btn btn-danger"
                        >
                          <i
                            class="far fa-trash-alt"
                            onClick={(e) =>
                              removeContentType(
                                e.target.parentElement.parentElement
                                  .parentElement.rowIndex
                              )
                            }
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
        onHide={() => (setShow((prev) => !prev), setForm([]))}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>New Content Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>{form}</Modal.Body>
      </Modal>

      <Modal show={showNext} onHide={() => setShowNext(!showNext)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Choose Field</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Field Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter field name"
              autoFocus
              id="fieldName"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
            />
            <ButtonGroup className="mt-4 d-flex justify-content-between">
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <div class="form-check mt-3">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                checked={mandatory}
                onChange={() => setMandatory(!mandatory)}
              />
              <label class="form-check-label" htmlFor="flexCheckDefault">
                Required
              </label>
            </div>

            <div className="ContentTypeContainerBoxLight">
              <Modal.Footer>
                {fieldName.length == 0 || radioValue.length == 0 ? (
                  <Button variant="primary" disabled>
                    Add field
                  </Button>
                ) : (
                  <Button variant="primary" onClick={addField}>
                    Add field
                  </Button>
                )}

                {fields.length == 0 ||
                (fields.length != 0 &&
                  (fieldName.length != 0 || radioValue.length != 0)) ? (
                  <Button variant="success" disabled>
                    Submit
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={() => (
                      handleSubmit(), setForm([]), setShow((prev) => !prev)
                    )}
                  >
                    Submit
                  </Button>
                )}
              </Modal.Footer>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ContentTypeManager;

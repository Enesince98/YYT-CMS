import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import {
	Button,
	Modal,
	Form,
	ToggleButton,
	ButtonGroup,
} from "react-bootstrap";
import Header from "../Header/Header.jsx";
import $ from "jquery";

const ContentTypeManager = () => {
	const [show, setShow] = useState(false);
	const [showNext, setShowNext] = useState(false);
	const [contentName, setContentName] = useState("");
	const [contentDescription, setContentDescription] = useState("");
	const [contentType, setContentType] = useState();
	const [fields, setFields] = useState([])
	const [radioValue, setRadioValue] = useState()
	const [mandatory, setMandatory] = useState(false);
	const[isDisabled, setIsDisabled] = useState(false);
	//field name textboxı boşsa veya radio button seçilmemişse butonları disable et.
	//add fielda tıklanınca ekranı boşalt. ehe

	function loadNext() {
		setShow(!show);
		setShowNext(true);
		setContentName($('#contentName').val());
		setContentDescription($('#contentDescription').val());
	}


	const handleSubmit = (e) => {
		e.preventDefault();
		addField();
		setContentType({
			contentName,
			contentDescription,
			field: fields
		});
	};
	const radios = [
		{ name: "Number", value: "0" },
		{ name: "String", value: "1" },
		{ name: "Date", value: "2" },
		{ name: "Boolean", value: "3" },
	];
	function addField() {
		fields.push({ "fieldName": $('#fieldName').val(), "fieldType": radioValue, "mandatory": mandatory });
	}
	return (
		<div>
			<Header />
			<Button onClick={() => setShow(true)}>New Content Type</Button>
			{/*<Table url = 'https://localhost:44325/api/ContentTypes' isParent = {true} whoseParent = "contents"/>*/}
			<Table url="https://localhost:44325/api/ContentTypes" isParent={false} />

			<Modal show={show} onHide={() => setShow(!show)} centered>
				<Modal.Header closeButton>
					<Modal.Title>New Content Type</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" >
							<Form.Label>Content Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter content name"
								id="contentName"
								autoFocus

							/>
						</Form.Group>

						<Form.Group className="mb-3" >
							<Form.Label>Content Description</Form.Label>
							<Form.Control
								type="text"
								id="contentDescription"
								placeholder="Enter content description"
								autoFocus
							/>
						</Form.Group>
						<Modal.Footer>
							<Button variant="secondary" onClick={() => setShow(!show)}>
								Close
							</Button>
							<Button
								variant="primary"
								onClick={loadNext}
								className={isDisabled ? "disabled" : ""}
							>
								Next
							</Button>
						</Modal.Footer>
					</Form>
				</Modal.Body>
			</Modal>

			<Modal show={showNext} onHide={() => setShowNext(!showNext)} centered>
				<Modal.Header closeButton>
					<Modal.Title>Choose Field</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Label>Field Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter field name"
							autoFocus
							id="fieldName"
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
								value={mandatory}
								id="flexCheckDefault"
								onChange={() => setMandatory(!mandatory)}
							/>
							<label class="form-check-label" for="flexCheckDefault">
								Required
							</label>
						</div>

						<Modal.Footer>
							<Button variant="primary" onClick={addField}>
								Add field
							</Button>
							<Button variant="success" onClick={handleSubmit}>
								Submit
							</Button>
						</Modal.Footer>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default ContentTypeManager;

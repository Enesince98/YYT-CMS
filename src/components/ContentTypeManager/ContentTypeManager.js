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
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



const ContentTypeManager = () => {
	const [show, setShow] = useState(false);
	const [showNext, setShowNext] = useState(false);
	const [url,setUrl] = useState("https://localhost:44325/api/ContentTypes")
	const [contentName, setContentName] = useState("");
	const [contentDescription, setContentDescription] = useState("");
	const [contentType, setContentType] = useState();

	const [fields,setFields] = useState([])
	const [fieldName,setFieldName] = useState('');
	const [radioValue,setRadioValue] = useState('')
	const [mandatory,setMandatory] = useState(false);
	//field name textboxı boşsa veya radio button seçilmemişse butonları disable et.
	//add fielda tıklanınca ekranı boşalt. ehe
	

	
	useEffect(()=> {
		console.log(radioValue)
	},[radioValue])


  function loadNext() {
	  setShow(!show);
	  setShowNext(true);
	}


	const handleSubmit = async() => {
		setContentType({
			name:contentName,
			description:contentDescription,
			fields
		});

		console.log(fields);

		try {
			const response = await axios.post('https://localhost:44325/api/ContentTypes',{
				name: contentName,
				description:contentDescription,
				fields:fields
			},  
			{
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			  });
			  setContentType()
			  toast.success('Content Type added successfully !', {
				position: "bottom-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				});
				setFields([])
			  
		}
		catch(err) {
			toast.error(err, {
				position: "bottom-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				});
		}

	}
	const radios = [
		{ name: "String", value: "0" },
		{ name: "Number", value: "1" },
		{ name: "Boolean", value: "2" },
		{ name: "Date", value: "3" },
	];

	const addField = (e) => {
		// fields.push({fieldName,fieldType: Number(radioValue),mandatory});
		setFields( current => [...current,{fieldName,fieldType: Number(radioValue),mandatory}])
		setFieldName('');
		setRadioValue('');
		setMandatory(false);
		toast.success('Field added succesfully !', {
			position: "bottom-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			});
	}

	return (
		<div>
			<ToastContainer
			position="bottom-right"
			autoClose={2000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			limit={5}
			/>		
			<Header />
			<Button onClick={() => setShow(true)}>New Content Type</Button>
			{/*<Table url = 'https://localhost:44325/api/ContentTypes' isParent = {true} whoseParent = "contents"/>*/}
			<Table url={url} isParent={false} />

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
								onBlur={(e)=> setContentName(e.target.value)}
								
							/>
						</Form.Group>

						<Form.Group className="mb-3" >
							<Form.Label>Content Description</Form.Label>
							<Form.Control
								type="text"
                id="contentDescription"
								placeholder="Enter content description"
								autoFocus
								onBlur={(e) => setContentDescription(e.target.value)}
							/>
						</Form.Group>
						<Modal.Footer>
							<Button variant="secondary" onClick={() => setShow(!show)}>
								Close
							</Button>
							<Button
								variant="primary"
								onClick={loadNext}
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
							required
							type="text"
							placeholder="Enter field name"
							autoFocus
							id = "fieldName"
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
                onChange={()=> setMandatory(!mandatory)}
							/>
							<label class="form-check-label" htmlFor="flexCheckDefault">
								Required
							</label>
						</div>

						<Modal.Footer>
							{fieldName.length ==0 || (radioValue.length == 0) ? (
							<Button variant="primary" disabled>
							Add field
							</Button>	
							) : (
								<Button variant="primary"  onClick={addField} >
								Add field
								</Button>	
							) }


							{(fields.length == 0 || (fields.length!=0 && (fieldName.length !=0 || radioValue.length != 0)))  ? (
							<Button variant="success"  disabled>
							Submit
							</Button>		
							) : (
								<Button variant="success"  onClick={handleSubmit} >
								Submit
								</Button>	
							) }
							
						</Modal.Footer>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default ContentTypeManager;

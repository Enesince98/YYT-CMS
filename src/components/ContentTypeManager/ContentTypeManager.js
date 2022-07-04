import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import {
	Button,
	Modal,
	Form,
	ToggleButton,
	ButtonGroup,
	Spinner
} from "react-bootstrap";
import Header from "../Header/Header.jsx";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import {successToast, errorToast} from "../../Toasts"
import $ from "jquery";



const ContentTypeManager = () => {
	
	const axiosPrivate = useAxiosPrivate();
	const [show, setShow] = useState(false);
	const [showNext, setShowNext] = useState(false);
	const [url,setUrl] = useState("https://localhost:44325/api/ContentTypes")
	const [contentName, setContentName] = useState("");
	const [contentDescription, setContentDescription] = useState("");
	const [contentType, setContentType] = useState();
	const [data, setData] = useState(); // API den gelen response içindeki datayı tutmamıza yarayan değişken. Veri geldiğinde tablonun güncellenmesi için state içinde tutuluyor.
	const [count, setCount] = useState(0);
	const [fields,setFields] = useState([])
	const [fieldName,setFieldName] = useState('');
	const [radioValue,setRadioValue] = useState('')
	const [mandatory,setMandatory] = useState(false);
	const [form, setForm] = useState([]);
	const [limit,setLimit] = useState(4)
	const [offset,setOffset] = useState(0);



	function capitalize(string){
		return string.trim().replace(/^\w/, (c) => c.toUpperCase())
	  }


	const readData = async () => {
		try{
		await axiosPrivate.get(`https://localhost:44325/api/ContentTypes?offset=${offset}&limit=${limit}`)
		.then(function (response) {
			//Genel bir async api isteği işlemidir. Gelen veriyi stateler içinde tutar
			setData(response.data.data.contentTypes); //useEffect ile url değiştikçe yeniden istek atılması sağlanır.
			setCount(response.data.data.totalCount);
		  });}
		  catch (err) {
			errorToast(err)
		}
	  };


	  useEffect(() => {
		readData();
	  }, [offset,limit]);
	



  function loadNext() {
	  setShow(!show);
	  setShowNext(true);
	}


	const handleSubmit = async() => {
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
			  successToast("Content Type added successfully !")
				setFields([])
				setShowNext(false);
				readData()
			  
		}
		catch(err) {
			errorToast(err)
		}

	}
	const handleEdit = async(editData) => {

		

		try {
			
			if($("#contentName")[0].value.length > 0 && $("#contentDescription")[0].value.length > 0) {
				editData.name=$("#contentName")[0].value
			editData.description=$("#contentDescription")[0].value
			const response = await axios.put('https://localhost:44325/api/ContentTypes',editData,  
			{
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			  });
			  setContentType()
			  successToast("Content Type edited successfully !")
				setFields([])
				setForm([])
				setShowNext(false);
				setShow(prev => !prev)
				readData()
			  
			}
			else {
				errorToast('Name and description can not be empty !')
				
	
			}	
		}
			
		catch(err) {
			errorToast(err)
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
		successToast('Field added succesfully !')
	}

	function editContentType(contentTypeInfo){
		form.push(<Form>
			<Form.Group className="mb-3" >
				<Form.Label>Content Type Name</Form.Label>
				<Form.Control
					type="text"
					defaultValue = {contentTypeInfo?.name}
					placeholder="Enter content type name"
					id="contentName"
					autoFocus
					onBlur={(e) => setContentName(e.target.value)}
				/>
			</Form.Group>
			<Form.Group className="mb-3" >
				<Form.Label>Content Type Description</Form.Label>
				<Form.Control
					type="text"
					defaultValue = {contentTypeInfo?.description}
					id="contentDescription"
					placeholder="Enter content type description"
					autoFocus
					onBlur={(e) => setContentDescription(e.target.value)}
				/>
			</Form.Group>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => (setShow(prev => !prev), setForm([]))}>
					Close
				</Button>
				<Button
					variant="primary"
					onClick={contentTypeInfo?.name ? (()=> (handleEdit(contentTypeInfo) )):loadNext}
					id="submitData"
				>
					{contentTypeInfo?.name ? "Submit":"Next"}
				</Button>
			</Modal.Footer>
		</Form>)
		if (typeof(contentTypeInfo) === "undefined"){
		}
	}


   async function removeContentType(ctid) {
		if (ctid) {
			try {
				await axios.delete(`https://localhost:44325/api/contentTypes/${ctid}`)
				successToast('Content Type was deleted successfully')
				readData();
			}
			catch(err) {
				errorToast(err);
			}
		}
	  }
	return (
		<div>
			<ToastContainer/>		
			<Header />
			{/*<Table url = 'https://localhost:44325/api/ContentTypes' isParent = {true} whoseParent = "contents"/>*/}
	<div className="container">
        <div className="row">
        <h1 className="mt-5">{`Content Types`}</h1>
        <div class="table-responsive">
        <Button className="mb-4 float-end" onClick={() => (setShow(true), editContentType())}>
          New Content Type
        </Button>
          { data?.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                {Object.keys(data[0]).map((value) => (
					
                  <th>{capitalize(value)}</th>
                ))}
                <th>Actions</th>
              </thead>
              <tbody>
                {data.map((value,idx) => (
                  <tr>
                    {Object.values(value).map((v) => (
                      <td>
					  {typeof(v)==="object"? v.length:v}
                    </td>
                    ))}
                    {/* satıra tıklandığında seçili girdi için eğer alt tablo varsa onun gösterildiği tablo sayfası açılır.  */}
                    <td className="d-flex justify-content-evenly">
					<Link to={"/contents/"+(Object.values(value)[1])+"/"+(idx+2)}> 
                        <button
                            type="button"
                            class="btn btn-success"
                          >
                            <i class="far fa-eye"/>

                          </button>
                         </Link>
						 <Link to={"/content-type/"+(idx+2)}>
                          <button
                            type="button"
                            class="btn btn-primary"
                          >
                            <i class="far fa-edit"/>
                            </button>
                          </Link>
						  <button type="button" className="btn btn-warning" onClick={() => (setShow(true), editContentType(value))}>
						  <i class="fa-solid fa-spell-check"/>
						  </button>
						  <button
                            type="button"
                            onClick={(e) =>
                              removeContentType(
                                value.id
                              )
                            }
                            class="btn btn-danger"
                          >
                            <i class="far fa-trash-alt" ></i>
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

		{/* PAGINATION  */}

		<div className="container-fluid">
		<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class={`page-item ${offset == 0 ? 'disabled' : ''} `}>
      <button class="page-link" href="#" onClick={() => setOffset(prev=> prev - 1)}>Previous</button>
    </li>
	{
		    (() => {
				let li = [];
				for (let i = 0; i < Math.ceil(count/limit); i++) {
				  li.push(<li class={`page-item ${offset == i ? 'active' : ''}`}> <button className="page-link" onClick={() => setOffset(i)}>{i+1}</button> </li>);
				}
				return li;
			})()
	}

	
 
    <li class={`page-item ${Math.ceil(count/limit) == offset + 1 ? 'disabled' : ''} `}>
      <button class="page-link" href="#" onClick={() => setOffset(prev => prev + 1)}>Next</button>
    </li>
  </ul>

</nav>


		</div>

	{/* SELECT LIMIT  */}

	
<div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Rows
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li className="dropdown-item" onClick={() => {setLimit(2); setOffset(0)} }>2</li>
    <li className="dropdown-item" onClick={() => {setLimit(5); setOffset(0)} }>5</li>
    <li className="dropdown-item"onClick={() => {setLimit(10); setOffset(0)} }>10</li>
  </ul>
</div>



        </div>
     
      </div>

	  <Modal show={show} onHide={() => (setShow(false), setForm([]))} centered>
				<Modal.Header closeButton>
					<Modal.Title>New Content Type</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{form}
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

import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import Header from "../Header/Header.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserManager = () => {
	const [data, setData] = useState();
	const [editUser, setEditUser] = useState();
	const [newUserModal, setNewUserModal] = useState(false);
	const [editUserModal, setEditUserModal] = useState(false);
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const readData = async () => {
		await axios
			.get("https://62a492ef47e6e40063951ec5.mockapi.io/api/users")
			.then(function (response) {
				setData(response.data.data);
			});
	};

	useEffect(() => {
		readData();
	}, []);

	const handleSubmit = async () => {
		if (password == confirmPassword) {
			try {
				await axios.post(
					"https://62a492ef47e6e40063951ec5.mockapi.io/api/users",
					{
						name: userName,
						password,
					}
				);
				toast.success("User added successfully !", {
					position: "bottom-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				readData();
			} catch (err) {
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
		} else if(userName == '' ) {
      toast.error("User name can not be empty", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }  else if(password.length ==0) {
      toast.error("Password can not be empty", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } 
    
    
    else{
			toast.error("Password doesn't match !", {
				position: "bottom-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}

		setNewUserModal(false);
	};


  const editSubmit = async(id) => {
		if (password == confirmPassword) {
			try {
				await axios.put(
					`https://62a492ef47e6e40063951ec5.mockapi.io/api/users/${id}`,
					{
						name: userName,
						password,
					}
				);
				toast.success("User updated successfully !", {
					position: "bottom-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				readData();
			} catch (err) {
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
		} else {
			toast.error("Password doesn't match !", {
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

	const deleteUser = async (id) => {
		try {
			await axios.delete(
				`https://62a492ef47e6e40063951ec5.mockapi.io/api/users/${id}`
			);
			toast.success("User deleted successfully !", {
				position: "bottom-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			readData();
		} catch (err) {
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
	};

	return (
		<div>
			<ToastContainer></ToastContainer>
			<Header />
			<div class="container">
				<div className="row">
					<h1 className="mt-5">Users</h1>
					{data ? (
						<div class="table-responsive">
							<Button
								className="mb-4 float-end"
								onClick={() => setNewUserModal(true)}
							>
								{" "}
								Add User
							</Button>
							<table class="table table-bordered">
								<thead>
									{Object.keys(data[0]).map((value) => (
										<th>{value}</th>
									))}
									<th>Actions</th>
								</thead>
								<tbody>
									{data.map((value, idx) => (
										<tr>
											{Object.values(value).map((v) => (
												<td>{v}</td>
											))}
											{/* satıra tıklandığında seçili girdi için eğer alt tablo varsa onun gösterildiği tablo sayfası açılır.  */}
											<td className="d-flex justify-content-evenly">
												<button
													className="btn btn-success"
													onClick={() => {
														setEditUser({
															id: value.id,
															name: value.name,
															password: value.password,
														});
														setEditUserModal(true);
													}}
												>
													<i className="far fa-edit"></i>
												</button>
												<button
													className="btn btn-danger"
													onClick={() => deleteUser(value.id)}
												>
													<i className="far fa-trash-alt"></i>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<Spinner animation="grow"></Spinner>
					)}
				</div>

				{/* Add new user modal  */}

				<Modal
					show={newUserModal}
					onHide={() => setNewUserModal(!newUserModal)}
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title>Add new user</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group className="mb-3">
								<Form.Label>User Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter user name"
									id="userName"
									autoFocus
									onBlur={(e) => setUserName(e.target.value)}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									id="password"
									placeholder="Enter user password"
									autoFocus
									onBlur={(e) => setPassword(e.target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type="password"
									id="confirmPassword"
									autoFocus
									placeholder="Enter confirm password"
									onBlur={(e) => setConfirmPassword(e.target.value)}
								/>
							</Form.Group>
							<Modal.Footer>
								<Button
									variant="secondary"
									onClick={() => setNewUserModal(!newUserModal)}
								>
									Close
								</Button>
								<Button variant="primary" onClick={handleSubmit}>
									Submit
								</Button>
							</Modal.Footer>
						</Form>
					</Modal.Body>
				</Modal>

				{/* Edit Modal  */}

				<Modal
					show={editUserModal}
					onHide={() => setEditUserModal(!editUserModal)}
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title>Edit user</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group className="mb-3">
								<Form.Label>User Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter user name"
									id="userName"
									defaultValue={editUser?.name}
									autoFocus
									onBlur={(e) => setUserName(e.target.value)}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									id="password"
									placeholder="Enter user password"
									autoFocus
									onBlur={(e) => setPassword(e.target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type="password"
									id="confirmPassword"
									autoFocus
									placeholder="Enter confirm password"
									onBlur={(e) => setConfirmPassword(e.target.value)}
								/>
							</Form.Group>
							<Modal.Footer>
								<Button
									variant="secondary"
									onClick={() => setEditUserModal(!editUserModal)}
								>
									Close
								</Button>
								<Button variant="primary" onClick={() =>{
                  editSubmit(editUser.id)
                  setEditUserModal(false);
                  } }>
									Submit
								</Button>
							</Modal.Footer>
						</Form>
					</Modal.Body>
				</Modal>
			</div>
		</div>
	);
};

export default UserManager;

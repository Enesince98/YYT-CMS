import React, { useEffect, useState } from 'react'
import axios from '../../api/axios';
import {Button,Modal,Form,Spinner} from "react-bootstrap";
import Header from '../Header/Header.jsx'


const UserManager = () => {
  const[data, setData] = useState();

  useEffect(() => {
    const readData = async () => {
      await axios.get("https://62a492ef47e6e40063951ec5.mockapi.io/api/users").then(function (response) {
        setData(response.data.data);
      });
    };
    readData();},[]);

  return (
    <div>
      <Header />
      <div class="container">
        <div className="row">
       <h1 className="mt-5">Users</h1>
        <div class="table-responsive">
        <Button className="mb-4 float-end"> Add User</Button>
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
                  <td className="d-flex justify-content-evenly">
                  <button className="btn btn-success"><i className="far fa-edit"></i></button>
                    <button className="btn btn-danger"><i className="far fa-trash-alt"></i></button>
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Spinner />
          )}
        </div>
        </div>
     
      </div>
    </div>
  )
}

export default UserManager
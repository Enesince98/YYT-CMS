import React from "react";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "../../api/axios";
import "./Table.css";
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import $ from "jquery";
import InputGroup from 'react-bootstrap/InputGroup';
let data;
const Table = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const [editSection, setEditSection] = useState([]);
  const [page, setPage] = useState(0);                              // Pagination için hangi sayfanın gösterilmesi gerektiğini tutan değişken. State içinde tutulmasının sebebi yeni sayfaya geçildiğinde re-render edilmesi.
  const [rowCount, setRowCount] = useState(2);
  const [url, setUrl] = useState();   // Pagination için API tarafında hangi adrese istek atılması gerektiğini tutan değişken.  State içinde tutulmasının sebebi url değiştiğinde sayfanın re-render edilmesi.
  const [data, setData] = useState([]);                             // API den gelen response içindeki datayı tutmamıza yarayan değişken. Veri geldiğinde tablonun güncellenmesi için state içinde tutuluyor.
  const [count, setCount] = useState();
  // API den gelen response içindeki data miktarını tutan değişkendir. 
  const [saveButton,setSaveButton] = useState(false);
  useEffect(() => {
    setUrl(props.url + "?offset=" + page + "&limit=" + rowCount);              //Page değişkeni değiştiğinde yani önceki/sonraki sayfaya geçilmek istendiğinde url içini yeni sayfa numarasına göre günceller.
  }, [page, rowCount]);

  useEffect(() => {
    const readData = async () => {
      await axiosPrivate.get(url).then(function (response) {             //Genel bir async api isteği işlemidir. Gelen veriyi stateler içinde tutar
        setData(response.data.data.contentTypes);                                //useEffect ile url değiştikçe yeniden istek atılması sağlanır.
        setCount(response.data.data.totalCount);
      });
    };
    readData(); //istek atmak için oluşturulan fonksiyonu çağırır (BUNUN OLMAMASI DAHA MANTIKLI AMA KALDIRAMADIK.)
  }, [url]);

  function nextData() {
    if (page + 1 < count / rowCount) setPage((prev) => prev + 1);           //Sayfa değerini bir sonraki
  }
  function prevData() {
    if (page + 1 > 1) setPage((prev) => prev - 1);                    //Decrease value of page by 1 to get the next page if there is one.
  }

  let col = [];                                                   //Sütun başlıklarını tutmak için dizi
  if (data[0]) { col = Object.keys(data[0]) }                          //Renderlanma sırasında data geç gelebildiği için eğer data geldiyse, ilkinin keylerini sütun başlıkları olarak diziye aktarıyoruz.
  let navigate = useNavigate();
  const routeChange = (id) => {                                   //Satıra tıklandığında eğer tablonun alt bir tablosu varsa seçilen id için alt tablo açılır.
    if (props.isParent) {                                         //Tablonun alt tablosu olup olmadığı prop tan gelen veri kullanılarak kontrol edilir.
      let path = `/${props.whoseParent}/${id}`;                   //Seçilen id ye göre alt tablonun yüklenmesi için gereken path oluşturulur.
      navigate(path);                                             //Alt tablonun yükleneceği url adresine gidilir.
    }
  };
  let pagination = []
  for (let i = 0; i < Math.ceil(count / rowCount); i++) {
    pagination.push(
      <li className={`page-item ${page == i ? 'active' : ''}`} ><a className="page-link pointer" onClick={() => setPage(i)} class="page-link" >{i + 1}</a></li>
    );
  }
  let types = ["String", "Number", "Boolean", "Date"]
  function showContentType(ctid) {
    if (ctid) {
      let editingRow = [];
      editingRow.push(
        <div class="container">
          <h1>{data[ctid - 1].name}</h1>
          <h4>{data[ctid - 1].description}</h4>
          <div class="row">
            <div class="table-responsive">
              <table class="table table-bordered">
                <tbody>
                  <tr><th>Name</th><th>Type</th><th>Mandatory</th><th>Actions</th></tr>
                  {data[ctid - 1].fields.map(
                    (value, index) => (
                      <tr>
                        <td><input type="text" defaultValue={value["fieldName"]} /></td>
                        <td>{types[value["fieldType"]]}</td>
                        <td>{value["mandatory"] ? "Required" : "Non-required"}</td>
                        <td>
                          <button type="button" onClick={(e) => removeContentType(e.target.parentElement.parentElement.rowIndex)} class="btn btn-danger" >
                            <i class="far fa-trash-alt"></i>
                          </button></td>
                      </tr>

                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <button onClick={() => setEditSection([])}>Go back</button>
        </div>
      );
      setEditSection(editingRow);
    }
  }
  //console.log(Object.values(data[0].fields));
  function removeContentType(ctid) {
    let rowidx = ctid - 1
    console.log("Remove : " + rowidx);
    if (ctid) {
      const readData = async () => {
        await axios.delete("https://localhost:44325/api/contentTypes/" + data[rowidx].id); alert("slşadkslaşd");
      };
      readData();
    };

  }
  function updateData(e){
    setSaveButton(e.target.value===e.target.defaultValue);
    console.log(e.target.parentElement.parentElement.parentElement[0])
    console.log(data[e.target.parentElement.parentElement.parentElement.rowIndex-1])
  }
  return (
    <div>
      {editSection}
      <div class={`container ${editSection.length === 0 ? "" : "d-none"}`}>
        <div class="row">
          <div class="table-responsive">
            {data.length > 0 ? (
              <table class="table table-bordered">
                <thead>
                  <tr>
                    {col.map((value) => (
                      <th scope="col">{value}</th>   //col dizisindeki her bir eleman sütun başlıklarını içerdiği için herbir elemanı th ile form başlığına yazdırılır.
                    ))}
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((value) => (                               //data değişkeni içerisinde responsedaki tablo girdi verileri bulunur. Bu verilerdeki her bir girdi için yeni bir satır oluşturulur.
                    <tr>      {/* satıra tıklandığında seçili girdi için eğer alt tablo varsa onun gösterildiği tablo sayfası açılır.  */}
                      
                      <td>
                      <InputGroup className="mb-3">
                              <InputGroup.Text>{Object.values(value)[0]}</InputGroup.Text>
                            </InputGroup>
                            
                        </td>
                        <td>
                        <InputGroup className="mb-3">
                              <Form.Control aria-label="Amount (to the nearest dollar)" defaultValue = {Object.values(value)[1]} key = {Object.values(value)[1]} onChange={updateData}/>
                            </InputGroup>
                        </td>
                        <td>
                        <InputGroup className="mb-3">
                              <Form.Control aria-label="Amount (to the nearest dollar)" defaultValue = {Object.values(value)[2]} key = {Object.values(value)[1]} onChange={updateData}/>
                            </InputGroup>
                        </td>
                        <td>
                        <InputGroup className="mb-3">
                              <InputGroup.Text>{Object.values(value)[3].length}</InputGroup.Text>
                            </InputGroup>
                        </td>
                      <td className="d-flex justify-content-evenly">
                        <button type="button" onClick={(e) => showContentType(e.target.parentElement.parentElement.rowIndex)} class="btn btn-primary" >
                          <i class="far fa-eye"></i>
                        </button>
                        <button type="button" onClick={(e) => removeContentType(e.target.parentElement.parentElement.rowIndex)} class="btn btn-danger" >
                          <i class="far fa-trash-alt"></i>
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
        <Button className={saveButton?"disabled":""}>Save</Button>
      </div>
      <div className={`container ${editSection.length === 0 ? "" : "d-none"}`}>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li className={(page + 1 > 1 ? "page-item is-active" : "page-item disabled")}><a class="page-link pointer" onClick={prevData}>Previous</a></li>
            {pagination}
            <li className={(page + 1 < count / rowCount ? "page-item is-active" : "page-item disabled")}><a class="page-link pointer" onClick={nextData}>Next</a></li>
            <div class="btn-group">
              <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Rows
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" onClick={() => { setRowCount(1); setPage(0) }}>1</a></li>
                <li><a class="dropdown-item" onClick={() => { setRowCount(2); setPage(0) }}>2</a></li>
                <li><a class="dropdown-item" onClick={() => { setRowCount(5); setPage(0) }}>5</a></li>
              </ul>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Table;

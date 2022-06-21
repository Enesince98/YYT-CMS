import React from "react";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import "./Table.css";
import { Link, useNavigate } from 'react-router-dom'
import Header from "../Header/Header.jsx";
let data;
const Table = (props) => {

  const [page, setPage] = useState(0);                              // Pagination için hangi sayfanın gösterilmesi gerektiğini tutan değişken. State içinde tutulmasının sebebi yeni sayfaya geçildiğinde re-render edilmesi.
  const [rowCount, setRowCount] = useState(1);
  const [url, setUrl] = useState(props.url + "?pn=0&ps=1");   // Pagination için API tarafında hangi adrese istek atılması gerektiğini tutan değişken.  State içinde tutulmasının sebebi url değiştiğinde sayfanın re-render edilmesi.
  const [data, setData] = useState([]);                             // API den gelen response içindeki datayı tutmamıza yarayan değişken. Veri geldiğinde tablonun güncellenmesi için state içinde tutuluyor.
  const [count, setCount] = useState();                             // API den gelen response içindeki data miktarını tutan değişkendir. 

  useEffect(() => {
    setUrl(props.url + "?pn=" + page + "&ps=" + rowCount);              //Page değişkeni değiştiğinde yani önceki/sonraki sayfaya geçilmek istendiğinde url içini yeni sayfa numarasına göre günceller.
  }, [page, rowCount]);

  useEffect(() => {
    const readData = async () => {
      await axios.get(url).then(function (response) {               //Genel bir async api isteği işlemidir. Gelen veriyi stateler içinde tutar
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
  }
  console.log(count);
  let pagination = []
  for (let i = 0; i < Math.ceil(count / rowCount); i++) {
    pagination.push(
      <li className={`page-item ${page == i ? 'active' : ''}`} ><a className="page-link pointer" onClick={() => setPage(i)} class="page-link" >{i + 1}</a></li>
    )
  }
  return (
    <div>
      <Header />
      <div class="container">
        <div class="row">
          <div class="table-responsive">
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
                    {
                      Object.values(value).map((v) => (               // Response içindeki girdilerin kendi içinde bir döngü oluşturarak girdilerin içerdiği değerler de okunur.
                        <td >{Array.isArray(v) ? v.length : v}</td>     // Her bir satırda, girdinin içerdiği değerler, sütunlarına karşılık gelen hücrelere yazdırılır.
                      ))}
                    <td className='d-flex justify-content-evenly'>
                      <button type="button" class="btn btn-primary"><i class="far fa-eye"></i></button>
                      <button type="button" class="btn btn-success"><i class="fas fa-edit"></i></button>
                      <button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
                    </td>
                  </tr>

                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="container">


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

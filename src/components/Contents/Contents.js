import React from "react";
import Table from "../Table/Table";
import { useLocation } from "react-router-dom";
import content from "../contentList.json";
import Header from "../Header/Header.jsx"
const Contents = () => {
  const location = useLocation().pathname.split("/");
  const content_type_id = location[location.length - 1];
  console.log(content_type_id);
  console.log(content.contents);
  let data=content.contents;
  data.map((value) => Object.values(value).map((v)=> console.log(v)))
  return (
    <div>
      <Header/>
      {/* <Table isParent = {false} url = {'https://62a492ef47e6e40063951ec5.mockapi.io/api/contentTypes/'+content_type_id.toString()+'/contents'}/> */}
      <div class="container row">
        <div class="table-responsive">
          {data ? (
            <table class="table table-bordered">
              <thead>
                {Object.keys(data[0]).map((value)=>
                <th>{value}</th>)}
              </thead>
              <tbody>
                {data.map((value) => (
                    <tr>
                      {Object.values(value).map((v) => 
                        <td>{v}</td>
                      )}
                      {/* satıra tıklandığında seçili girdi için eğer alt tablo varsa onun gösterildiği tablo sayfası açılır.  */}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          ) : (
            <div>Yükleniyor</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contents;

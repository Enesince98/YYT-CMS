import React from 'react'
import Table from '../Table/Table'
import { useLocation } from 'react-router-dom';
const Contents = () => {
  const location = useLocation().pathname.split("/");
  const content_type_id = location[location.length-1];
  console.log(content_type_id);
  return (
    <div><Table isParent = {false} url = {'https://62a492ef47e6e40063951ec5.mockapi.io/api/contentTypes/'+content_type_id.toString()+'/contents'}/></div>
  )
}

export default Contents
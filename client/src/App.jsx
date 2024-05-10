
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Formtable from './components/Formtable'

axios.defaults.baseURL = "http://localhost:8080/api/"

const App = () => {

  const [addSection, setAddSection] = useState(false)
  const [editSection, setEditSection] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: ""
  })

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: ""
  })
  const [dataList, setDataList] = useState([])

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('/create', formData)
    // console.log("response: ", response);
    if(response.data.success) {
      setAddSection(false)
      alert(response.data.message)
      getFetchData();
      setFormData({
        name: "",
        email: "",
        mobile: ""
      })
    }
  }

  const getFetchData = async() => {
    const response = await axios.get('/')
    console.log(response);
    if(response.data.success) {
      setDataList(response.data.data)
    }
  }

  useEffect(() => {
    getFetchData()
  }, [])

  // console.log("Datalist: ", dataList);

  const handleDelete = async(id) => {
    const response = await axios.delete('/delete/' + id)
    if(response.data.success) {
      alert(response.data.message)
      getFetchData()
    }
  }

  const handleUpdate = async(e) => {
    e.preventDefault();
    const response = await axios.put('/update', formDataEdit)
    if(response.data.success) {
      alert(response.data.message)
      getFetchData()
      setEditSection(false)
      setFormDataEdit({
        name: "",
        email: "",
        mobile: "",
        _id: ""
      })
    }
  }

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleEdit = (el) => {
    setFormDataEdit(el)
    setEditSection(true)
  }

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>Add</button>

        {
          addSection && (
            <Formtable 
              handleOnChange={handleOnChange}
              handleSubmit={handleSubmit}
              handleClose = {() => setAddSection(false)}
              rest={formData}
            />
          )
        }

        {
          editSection && (
            <Formtable 
              handleOnChange={handleEditOnChange}
              handleSubmit={handleUpdate}
              handleClose = {() => setEditSection(false)}
              rest={formDataEdit}
            />
          )
        }

        <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>
                  
                </th>
              </tr>
            </thead>
            <tbody>
              {
                dataList[0] ? (
                  dataList.map((el) => {
                    return(
                      <tr key={el._id}>
                        <td>{el.name}</td>
                        <td>{el.email}</td>
                        <td>{el.mobile}</td>
                        <td>
                          <button 
                            className='btn btn-edit' 
                            onClick={() => handleEdit(el)}
                          >
                            Edit
                          </button>
                          <button 
                            className='btn btn-delete' 
                            onClick={() => handleDelete(el._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      <p>No data</p>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
import { MdClose } from 'react-icons/md'
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8080/api/"

const App = () => {

  const [addSection, setAddSection] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: ""
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

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>Add</button>

        {
          addSection && (
            <div className="addContainer">
              <form onSubmit={handleSubmit}>
                <div className="close-btn" onClick={() => setAddSection(false)}><MdClose /></div>
                <label htmlFor="name">Name : </label>
                <input type="text" id="name" name="name" onChange={handleOnChange}/>

                <label htmlFor="email">Email : </label>
                <input type="email" id="email" name="email" onChange={handleOnChange}/>

                <label htmlFor="mobile">mobile : </label>
                <input type="number" id="mobile" name="mobile" onChange={handleOnChange}/>

                <button className="btn">Submit</button>
              </form>
            </div>
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
                dataList.map((el) => {
                  return(
                    <tr key={el._id}>
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.mobile}</td>
                      <td>
                        <button className='btn btn-edit'>Edit</button>
                        <button className='btn btn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
/* eslint-disable react/prop-types */
import { MdClose } from 'react-icons/md'
import '../App.css'

const Formtable = ({handleOnChange, handleSubmit, handleClose, rest}) => {
    return (
        <div className="addContainer">
            <form onSubmit={handleSubmit}>
                <div className="close-btn" onClick={handleClose}><MdClose /></div>
                <label htmlFor="name">Name : </label>
                <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name}/>

                <label htmlFor="email">Email : </label>
                <input type="email" id="email" name="email" onChange={handleOnChange} value={rest.email}/>

                <label htmlFor="mobile">mobile : </label>
                <input type="number" id="mobile" name="mobile" onChange={handleOnChange} value={rest.mobile}/>

                <button className="btn">
                    {
                        rest._id ? "Update" : "Submit"
                    }
                </button>
            </form>
        </div>
    )
}

export default Formtable
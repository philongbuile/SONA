import './AuthorizationTable.css'
import {useState, useRef} from 'react'
import {useNavigate} from 'react-router-dom'

const AuthorizationTable = ({
    data = null,
    columns = null,
    hover = true,
    striped = true,
  }) => {
    const getCaps = (head, field) => {
      if (head) return head.toUpperCase();
      return field.toUpperCase();
    };
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)

    let revokeDoctor = (doctor) => {
      return (() => {
        fetch('http://localhost:8080/patient/revoke_doctor/peter123/' + doctor)
        .then(()=> {
          console.log('REVOKE SUCCESSFULLY ' + doctor)
        })
        .then(res => navigate(0))
      })
    }

    // useEffect(() => {
    //   const timer = setTimeout(() => {
    //     setLoading(false)
    //   })}, []);
      
    // let refreshPage = (e) => {
    //   // window.location.reload(false);
    //   e.preventDefault();
    //   window.onload = function () {
    //     alert('Hello!') // it will not work!!!
    //   }
    //   navigate(0)
    // }

    return (
      <div>
        <table>
          <thead>
            <tr>
              {columns &&
                columns.map((head) => (
                  <th><h2>{getCaps(head.header, head.field)}</h2></th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.AuthorizedDoctors.map((row) => (
                <tr className={`${hover && "hover"} ${striped && "striped"}`} onClick={revokeDoctor(row)}  >
                  <td>{row}</td>
                  <td><button>Remove</button></td>
                </tr>
              ))}
          </tbody>
        </table>
        {data ? null : <p>PLEASE WAIT FOR A MOMENT</p>}
      </div>
    );
  };
  
export default AuthorizationTable;
import './AuthorizationTable.css'
import {useState, useRef} from 'react'

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
    
    let revokeDoctor = (doctor) => {
      return (() => {
        fetch('http://localhost:8080/patient/revoke_doctor/camtu123/' + doctor)
        .then(()=> {
          console.log('REVOKE SUCCESSFULLY ' + doctor)
        })
      })
    }

    return (
      <div>
        <table>
          <thead>
            <tr>
              {columns &&
                columns.map((head) => (
                  <th>{getCaps(head.header, head.field)}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.AuthorizedDoctors.map((row) => (
                <tr className={`${hover && "hover"} ${striped && "striped"}`} onClick={revokeDoctor(row)} >
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
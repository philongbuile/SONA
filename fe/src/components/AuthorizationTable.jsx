import './AuthorizationTable.css'

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
<<<<<<< HEAD
              data.AuthorizedDoctors.map((row) => (
                <tr className={`${hover && "hover"} ${striped && "striped"}`}>
                  {/* {columns.map((col) => (
                    <td></td>
                  ))} */}
                  {row}
=======
              data.map((row) => (
                <tr className={`${hover && "hover"} ${striped && "striped"}`}>
                  {columns.map((col) => (
                    <td>{row[col.field]}</td>
                  ))}
>>>>>>> origin
                </tr>
              ))}
          </tbody>
        </table>
<<<<<<< HEAD
        {data ? null : <p>PLEASE WAIT FOR A MOMENT</p>}
=======
        {data ? null : <p>No Row to show :)</p>}
>>>>>>> origin
      </div>
    );
  };
  
export default AuthorizationTable;
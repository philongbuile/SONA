import listStyles from '../../assets/css/TableItem.module.css'
import tableStyles from '../../assets/css/TableList.module.css'
import {Card, Button } from 'antd'

interface DoctorCardProps {
  username: string;
  role: string;
}


const DoctorCard: React.FC<DoctorCardProps> = ({
    username,
    role,
}) => {
  return (

      <div className={tableStyles.table_list}>

        <Card className={listStyles.item}>
          <p className={listStyles.id}> Username: {username} </p>
          <p className={listStyles.name}>Role: {role}</p>
          <Button className={listStyles.revoke} >Authorize</Button>
        </Card>
      </div>
  )
}

export default DoctorCard;
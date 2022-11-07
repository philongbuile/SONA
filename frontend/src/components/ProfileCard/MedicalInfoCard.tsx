import listStyles from '../../assets/css/TableItem.module.css'
import tableStyles from '../../assets/css/TableList.module.css'
import { Divider, Card, Button } from 'antd'

interface MedicalCardProps {
  medical_id: string;
  tag: string;
}


const MedicalInfoCard: React.FC<MedicalCardProps> = ({
    medical_id,
    tag,
}) => {
  return (

      <div className={tableStyles.table_list}>

        <Card className={listStyles.item}>
          <p className={listStyles.id}> Medical_Info_ID: {medical_id} </p>
          <p className={listStyles.name}>Tag: {tag}</p>
          <Button className={listStyles.revoke} >Ask For Authorization 🐶</Button>
          <Button className={listStyles.revoke} >Ask For Access Deeper 🐶</Button>

        </Card>
      </div>
  )
}

export default MedicalInfoCard;
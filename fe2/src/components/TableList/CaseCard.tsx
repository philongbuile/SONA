import listStyles from '../../assets/css/TableItem.module.css'
import tableStyles from '../../assets/css/TableList.module.css'
import { Divider, Card, Button } from 'antd'

interface CaseCardProps {
  case_id: string;
  testresult: string;
  diagnosis: string;
  treatment: string;
}


const CaseCard: React.FC<CaseCardProps> = ({
  case_id,
  testresult,
  diagnosis,
  treatment,
}) => {
  return (

      <div className={tableStyles.table_list}>

        <Card className={listStyles.item}>
          <p className={listStyles.id}> Case_ID: {case_id} </p>
          <p className={listStyles.name}>{testresult}</p>
          <p className={listStyles.name}>{diagnosis}</p>
          <p className={listStyles.name}>{treatment}</p>
          <Button className={listStyles.revoke} >😭</Button>
        </Card>
      </div>
  )
}

export default CaseCard;
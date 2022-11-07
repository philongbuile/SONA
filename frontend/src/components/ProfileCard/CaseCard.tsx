import listStyles from '../../assets/css/TableItem.module.css'
import tableStyles from '../../assets/css/TableList.module.css'
import { Divider, Card, Button } from 'antd'

interface CaseCardProps {
  testresult: string;
  diagnosis: string;
  treatment: string;
}


const CaseCard: React.FC<CaseCardProps> = ({
  testresult,
  diagnosis,
  treatment,
}) => {
  return (

      <div className={tableStyles.table_list}>

        <Card className={listStyles.item}>
          <p className={listStyles.testresults}>Test Result: {testresult}</p>
          <p className={listStyles.diagnosis}>Diagnosis: {diagnosis}</p>
          <p className={listStyles.treatment}>Treatment: {treatment}</p>
        </Card>
      </div>
  )
}

export default CaseCard;
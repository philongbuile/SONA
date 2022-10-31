import styles from '../../assets/css/TableItem.module.css'

import { Card } from 'antd'




const TableItem = () => {

  return (
    <Card className={styles.item}>
      <p className={styles.name}> abc </p>
      <p className={styles.phone}> 123 </p>
    </Card>
  )
}

export default TableItem;
import styles from '../../assets/css/TableItem.module.css'

import { Button, Card } from 'antd'

// import AuthorizationItem from '../models/AuthorizationItem'




const TableItem = () => {

  return (
    <Card className={styles.item}>
      <p className={styles.name}> 123 </p>
      <p className={styles.id}> abc </p>
      <Button className={styles.revoke} >X</Button>

    </Card>
  )
}

export default TableItem;
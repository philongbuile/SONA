import styles from '../../assets/css/TableList.module.css'

import { Divider, Card } from 'antd'
import TableItem from './TableItem'


const TableList = () => {
    return (
        <div className={styles.table_list}>

            <Divider orientation="left"style={{fontSize: 40}}>Authorization List</Divider> 

        <Card className={styles.list} >
            <TableItem/>
            <TableItem/>
        </Card>
        </div>
    )
}

export default TableList;
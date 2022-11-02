import styles from '../../assets/css/TableList.module.css'

import { Divider, Card } from 'antd'
import ItemPatient from './ItemPatient'


const ListPatient = () => {
    return (
        <div className={styles.table_list}>

            <Divider orientation="left"style={{fontSize: 40}}>Patient List</Divider> 

        <Card className={styles.list} >
            <ItemPatient/>
            <ItemPatient/>
        </Card>
        </div>
    )
}

export default ListPatient;
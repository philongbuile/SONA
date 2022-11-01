import {Table} from 'antd';
import './AuthorizationTable.css'

const AuthorizationTable = (props) => {   
    return (
        <Table className = 'authorizationTable' columns={props.column} dataSource={props.row} />
    );
}

export default AuthorizationTable;
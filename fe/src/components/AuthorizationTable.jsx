import {Table} from 'antd';

const AuthorizationTable = (props) => {   
    return (
        <Table className = 'authorizationTable' columns={props.column} dataSource={props.row} />
    );
}

export default AuthorizationTable;
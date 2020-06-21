import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

class CustomerDelete extends React.Component{

    /*
        생성자를 통해 모달창의 활성화 상태 확인
    */
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }

    /*
        삭제 확인 창 Open/Close
    */
    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }

    deleteCustomer(id) {
        const url = '/api/customers/'+id;
        fetch(url, {
            method: "DELETE"
        });
        this.props.stateRefresh();
    }
    render(){
        return (
            /*
                Dialog 태그는 어떤 상태이든 열려있는지 확인 하기 위해서 open 속성을 넣어주어야 한다.
                또한, 모달 창이 정상적으로 닫히는 것이 진행 되기 위해서 onClose 속성 필요
            */
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객 정보가 삭제 됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</Button>
                        <Button variant="outlined" color="pirmary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            /*
            기존의 단순 삭제 버튼 태그
            <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
            */
        )
    }
}

export default CustomerDelete;
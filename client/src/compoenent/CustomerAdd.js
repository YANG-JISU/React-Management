import React from 'react';
import { post } from 'axios';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {withStyles} from '@material-ui/core/styles';


const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            file: null,
            userName: '',
            birth: '',
            gender: '',
            job: '',
            fileName: '',
            /* 모달 창의 실행 상태를 확인해 주기 위해 open 이라는 변수 생성 */
            open: false
        }
    }
    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                /*추가된 부분
                : 비 동기적 리스트 추가로 페이지 전체 리로딩이 아닌 고객 리스트 부분만 리프레시 하는 방식
                */
                this.props.stateRefresh();
            })
            this.setState({
                file: null,
                userName: '',
                birth: '',
                gender: '',
                job: '',
                fileName: '',
                open: false
            })
            /*
            페이지 전체를 리로드 하여 리스트를 새로고침 하는 방식
            window.location.reload();
            */
    }
    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = 'api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file)
        formData.append('name', this.state.userName)
        formData.append('birth', this.state.birth)
        formData.append('gender', this.state.gender)
        formData.append('job', this.state.job)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    /*
        고객 리스트 추가를 위해 모달 창 Open 및 Close를 위한 작업
        open 이 true 면 화면에 출력된 상태, false 면 출력되지 않은 상태

        handelClickOpen '=' () '=>' {
            ~~
        }
        에서 '='와 '=>' 은 지칭된 메소드에 자동으로 바인딩 처리 한다는 의미로써 사용
        ※ 바인딩 관련 내용은 React 기본 강의편 참조
    */
    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }
    handleClose = () => {
        this.setState({
            file: null,
            userName: '',
            birth: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })
    }

    /*
        render 는 화면에 직접적으로 뿌려지는 부분
    */
    render() {
        const { classes } = this.props;
        return (
            /*
                Button 버튼(고객 추가하기)를 눌렀을 때 Dialog모달창이 펼쳐지는 형식
                1. Button 에서 onclick 옵션으로 handleClickOpen 메소드를 실행
                2. handleClickOpen 메소드에서 open state를 True 로 설정
                3. 설정 되면서 Dialog의 open 값이 true가 되면서 보여지게 됨

                파일 업로드 코드
                1. 기본적인 입력 값이 보이지 않도록 하기 위해서 className={classes.hidden} 속성 추가
                2. 사용자가 파일 값으로 이미지 파일만 넣을 수 있도록 accept 속성으로 명시
                <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br/>
                
                label 태그를 이용하여 디자인 작업
                1. htmlFor -> input태그에서 정의한 id 값으로 호출
                <label htmlFor="raised-button-file">
                    <Button variant="contained" color="primary" component="span" name="file">
                        {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                    </Button>
                </label>
            */
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br/>
                        <TextField label="생년월일" type="text" name="birth" vlaue={this.state.birth} onChange={this.handleValueChange} /><br/>
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br/>
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            /*
            모달 창을 사용하지 않고 Form 태그를 이용하여 HTML 단에서 작업할 때 사용
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지 : <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br/>
                이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br/>
                생년월일 : <input type="text" name="birth" vlaue={this.state.birth} onChange={this.handleValueChange} /><br/>
                성별 : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br/>
                직업 : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br/>
                <button type="submit">추가하기</button>
            </form>
            */
        )
    }
}

/*
    기존 export
    export default CustomerAdd;

    새로운 스타일이 적용되었기 때문에 withStyle 함수와 함께 export 작업
*/
export default withStyles(styles)(CustomerAdd);
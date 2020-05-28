import React from 'react';//특정 라이브러리 호출

class Customer extends React.Component{
    render(){ //React.Component 에 포함되는 함수로 항상 실행되는 함수
        return(
            <div>
                <CustomerProfile
                    id={this.props.id}
                    name={this.props.name}
                    image={this.props.image}
                />
                <CustomerInfo 
                    birth={this.props.birth}
                    gender={this.props.gender}
                    job={this.props.job}
                />
            </div>
        )
    }
}

class CustomerProfile extends React.Component{
    render(){
        return( 
            <div>
                <img src={this.props.image} alt="profile"/>
                <h2>{this.props.name}({this.props.id})</h2>
            </div>
        )
    }
}

class CustomerInfo extends React.Component{
    render(){
        return( 
            <div>
                <p>{this.props.birth}</p>
                <p>{this.props.gender}</p>
                <p>{this.props.job}</p>
            </div>
        )
    }
}

export default Customer;//특정 라이브러리 내보내기
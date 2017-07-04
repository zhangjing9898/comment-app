import React,{ Component } from 'react'
import PropTypes from 'prop-types'
class CommentInput extends Component{
    static propTypes = {
        comment: PropTypes.object.func
    }
    constructor(){
        super();
        this.state={
            username:'',
            content:''
        }
    }

    componentDidMount(){
        this.textarea.focus()
        this._loadUsername()
    }

    _loadUsername(){
        const username=localStorage.getItem('username')
        if(username){
            this.setState({
                username
            })
        }
    }

    _saveUsername(username){
        localStorage.setItem('username',username)
    }

    handleUsernameBlur(event){
        this._saveUsername(event.target.value)
    }

    handleUsernameChange(event){
        this.setState({
            username:event.target.value
        })
    }
    handleContentChange(event){
        this.setState({
            content:event.target.value
        })
    }

    //组件中的props是一种父级向子级传递数据的方式

    handleSubmit(){
        if(this.props.onSubmit){
            const {
                username,content
            }=this.state
            this.props.onSubmit({
                username:this.state.username,
                content:this.state.content,
                createdTime:+new Date()
            })
        }
        this.setState({content:''})
    }
    render(){
        return (
            <div className="comment-input">
                <div className="comment-field">
                    <span className="comment-field-name">用户名:</span>
                    <div className="comment-field-input">
                        <input value={this.state.username}
                               onBlur={this.handleUsernameBlur.bind(this)}
                                onChange={this.handleUsernameChange.bind(this)}/>
                    </div>
                </div>
                <div className="comment-field">
                    <span className="comment-field-name">评论内容：</span>
                    <div className="comment-field-input">
                        <textarea
                            ref={(textarea)=>this.textarea=textarea}
                            value={this.state.content}
                            onChange={this.handleContentChange.bind(this)}/>
                    </div>
                </div>
                <div className="comment-field-button">
                    <button onClick={this.handleSubmit.bind(this)}>发布</button>
                </div>
            </div>
        )
    }
}

export default CommentInput
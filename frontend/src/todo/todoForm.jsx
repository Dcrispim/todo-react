import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {changeDescription, search} from './todoActions'

import Grid from '../template/Grid';
import IconButton from '../template/IconButton';

class TodoForm extends Component{
    constructor(props){
        super(props)

        this.keyHandler = this.keyHandler.bind(this)
    }

    keyHandler(e){
        if(e.key == 'Enter'){
            e.shiftKey ? this.props.handleSearch() : this.props.handleAdd()
        }else if (e.key == 'Escape'){
            this.props.handleClear()
        }
    }

    componentWillMount(){
        console.log(this.props.search())
        this.props.search()
    }

    render (){
        return (
            <div role='form' className='todoForm'>
                <Grid cols="12 9 10">
                    <input id='description' className='form-control'
                    placeholder='Adicione uma tarefa' 
                    value={this.props.description} 
                    onChange={this.props.changeDescription}
                    onKeyUp={this.keyHandler}>
                    </input>
                </Grid>
                <Grid cols='12 3 2'>
                    <IconButton style='primary' icon='plus' onClick={this.props.handleAdd}/>
                    <IconButton style='info' icon='search' onClick={this.props.search}/>
                    <IconButton style='light' icon='close' onClick={this.props.handleClear}/>
                </Grid>
            </div>
        )
}
}


const MapStateToProps = state => ({description: state.todo.description})
const MapDispatchToProps = dispatch => 
    bindActionCreators({changeDescription, search}, dispatch)

export default connect(MapStateToProps, MapDispatchToProps)(TodoForm)
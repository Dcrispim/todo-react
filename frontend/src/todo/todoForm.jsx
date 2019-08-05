import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {clear, add, changeDescription, search} from './todoActions'

import Grid from '../template/Grid';
import IconButton from '../template/IconButton';

class TodoForm extends Component{
    constructor(props){
        super(props)

        this.keyHandler = this.keyHandler.bind(this)
    }

    keyHandler(e){
        const { clear, add, search, description} = this.props
        if(e.key == 'Enter'){
            e.shiftKey ? search() : add(description)
        }else if (e.key == 'Escape'){
            clear()
        }
    }

    componentWillMount(){
        this.props.search()
    }

    render (){
        const {clear, add, search, description} = this.props
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
                    <IconButton style='primary' icon='plus' onClick={()=> add(description)}/>
                    <IconButton style='info' icon='search' onClick={()=>search()}/>
                    <IconButton style='light' icon='close' onClick={clear}/>
                </Grid>
            </div>
        )
}
}


const MapStateToProps = state => ({description: state.todo.description})
const MapDispatchToProps = dispatch => 
    bindActionCreators({changeDescription, search, add, clear}, dispatch)

export default connect(MapStateToProps, MapDispatchToProps)(TodoForm)
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {changeDescription} from './todoActions'

import Grid from '../template/Grid';
import IconButton from '../template/IconButton';

const TodoForm = props =>{
    const keyHandler = (e) =>{
        if(e.key == 'Enter'){
            e.shiftKey ? props.handleSearch() : props.handleAdd()
        }else if (e.key == 'Escape'){
            props.handleClear()
        }
    }

    return (
                <div role='form' className='todoForm'>
                    <Grid cols="12 9 10">
                        <input id='description' className='form-control'
                        placeholder='Adicione uma tarefa' 
                        value={props.description} 
                        onChange={props.changeDescription}
                        onKeyUp={keyHandler}>
                        </input>
                    </Grid>
                    <Grid cols='12 3 2'>
                        <IconButton style='primary' icon='plus' onClick={props.handleAdd}/>
                        <IconButton style='info' icon='search' onClick={props.handleSearch}/>
                        <IconButton style='light' icon='close' onClick={props.handleClear}/>
                    </Grid>
                </div>
            )
}

const MapStateToProps = state => ({description: state.todo.description})
const MapDispatchToProps = dispatch => 
    bindActionCreators({changeDescription}, dispatch)

export default connect(MapStateToProps, MapDispatchToProps)(TodoForm)
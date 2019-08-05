import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators } from 'redux';

import {markAsDone, markAsPending, remove} from './todoActions'

import IconButton from '../template/IconButton';



const TodoList =  props =>{

    const ListRows = () =>{
        const List =  props.list || []
        return(
            List.map(todo =>(
            <tr key={todo._id}>
                <td  className={todo.done ? 'markedAsDone' : ''} >{todo.description}</td>
                <td>
                    <IconButton 
                        style='success' icon='check' hide={todo.done}
                        onClick={() => props.markAsDone(todo)}
                    />
                    <IconButton 
                        style='warning' icon='refresh' hide={!todo.done}
                        onClick={() => props.markAsPending(todo)}
                    />
                    <IconButton 
                        style='danger' icon='trash-o' hide={!todo.done}
                        onClick={() => props.remove(todo)}
                    />
                </td>
            </tr>
            )
            )
        )
    }

    return(
    <table className='table'>
        <thead>
            <tr>
                <th>Descrição</th>    
                <th className= 'tableActions' >Ações</th>
            </tr>
        </thead>
        <tbody>
            {ListRows()}
        </tbody>
    </table>
    )
}

const MapStateToProps = state => ({list: state.todo.list})
const MapDispatchToProps = dispatch => 
    bindActionCreators({markAsDone, markAsPending, remove}, dispatch)
export default connect(MapStateToProps, MapDispatchToProps)(TodoList)
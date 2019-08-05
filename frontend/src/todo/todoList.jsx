import React from 'react'
import IconButton from '../template/IconButton';

export default props =>{

    const ListRows = () =>{
        const List =  props.list || []
        return(
            List.map(todo =>(
            <tr key={todo._id}>
                <td  className={todo.done ? 'markedAsDone' : ''} >{todo.description}</td>
                <td>
                    <IconButton 
                        style='success' icon='check' hide={todo.done}
                        onClick={() => props.handleMarkedAsDone(todo)}
                    />
                    <IconButton 
                        style='warning' icon='refresh' hide={!todo.done}
                        onClick={() => props.handleMarkedAsPend(todo)}
                    />
                    <IconButton 
                        style='danger' icon='trash-o' hide={!todo.done}
                        onClick={() => props.handleRemove(todo)}
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
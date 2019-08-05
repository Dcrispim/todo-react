import React, {Component} from 'react'
import axios from 'axios'

import PageHeader from '../template/pageheader';
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
    constructor(props){
        super(props)
        this.state = {
            description: '',
            list: []
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkedAsDone = this.handleMarkedAsDone.bind(this)
        this.handleMarkedAsPend = this.handleMarkedAsPend.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.refresh()
    }

    refresh(description = ''){
        const search = description ? `&description__regex=/${description}/` : '' 
        axios.get(`${URL}?sort=-createAt${search}`)
            .then(
                resp => this.setState({...this.state, description, list:resp.data})
            )
    }

    handleChange(e){
        this.setState({...this.state, description: e.target.value})
    }

    handleAdd(){
        let a
        const description = this.state.description
        axios.post(URL, {description})
            .then(resp =>(
                    this.refresh()
                
            )
        )
    }

    handleRemove(todo){
        axios.delete(`${URL}/${todo._id}`)
            .then(
                resp =>(
                    this.refresh(this.state.description)
                )
            )
    }

    handleMarkedAsDone(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done:true})
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkedAsPend(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done:false})
            .then(resp => this.refresh(this.state.description))
    }

    handleSearch(){
        this.refresh(this.state.description)
    }

    handleClear(){
        this.refresh()
    }


    render(){
        return (
            <div>
                <PageHeader name="Tarefas" small="Cadastro"/>
                <TodoForm handleAdd={this.handleAdd} 
                description={this.state.description}
                handleChange={this.handleChange}
                handleSearch={this.handleSearch}
                handleClear={this.handleClear}/>
                <TodoList 
                handleRemove={this.handleRemove}
                handleMarkedAsPend={this.handleMarkedAsPend}
                handleMarkedAsDone ={this.handleMarkedAsDone}
                />
            </div>
        )
    }
}
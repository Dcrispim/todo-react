const INITIAL_STATE = {
    description: 'Ler Livro',
    list: [
        {
            _id:1,
            description:'Pagar Fatura',
            done: true
        },
        {
            _id:2,
            description: 'Reunião',
            done:false

        },
        {
            _id:3,
            description:'Consulta',
            done: false
        }
    ]
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'DESCRIPTION_CHANGED':
            return {...state, description: action.payload}
        default:
            return state
    }
}
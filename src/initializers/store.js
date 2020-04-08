import {createStore, combineReducers, compose} from 'redux'
//potenciador
import persistState from 'redux-localstorage'
function RespReducer (state=null,action){
    switch(action.type){
        case 'SET_RESP':
            return action.resp;
        case 'CLEAR_RESP':
            return null
        default:
            return state;
    }
}
function costosReducer (state=null,action){
    switch(action.type){
        case 'SET_COSTOS':
            return action.costos;
        case 'CLEAR_COSTOS':
            return null
        default:
            return state;
    }
}

function cuposReducer (state=null,action){
    switch(action.type){
        case 'SET_CUPOS':
            return action.cupos;
        case 'CLEAR_CUPOS':
            return null
        default:
            return state;
    }
}

function proveedoresReducer (state=null,action){
    switch(action.type){
        case 'SET_PROVEEDORES':
            return action.proveedores;
        case 'CLEAR_PROVEEDORES':
            return null
        default:
            return state;
    }
}

function necesidadReducer (state=null,action){
    switch(action.type){
        case 'SET_NECESIDAD':
            return action.necesidad;
        case 'CLEAR_NECESIDAD':
            return null
        default:
            return state;
    }
}



let rootReducer = combineReducers({
    resp: RespReducer,
    costos:costosReducer,
    cupos:cuposReducer,
    proveedores:proveedoresReducer,
    necesidad:necesidadReducer


})
                                //guarda lo de rootReducer                               
let mainEnhancer = compose(persistState('resp'));

export default createStore(rootReducer,{},mainEnhancer)
import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import allUsersReducer from './allUsersReducer';
import currentGroupReducer from "./currentGroupsReducer";
import followReducer from './followReducer';
import groupsReducer from './groupsReducer';
import messageReducer from './messageReducer';
import postReducer from './postReducer';
import userReducer from './userReducer';
import targetReducer from './targetProfileReducer';
const reducers = combineReducers({allUsersReducer,currentGroupReducer,followReducer,groupsReducer,messageReducer,postReducer,userReducer,targetReducer});
const store = ()=>{
    return createStore(reducers,applyMiddleware(thunk));
}

export default store();
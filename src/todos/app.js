import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases';


const ElementIDs={
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input'
}


/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos=()=>{
        const todos= todoStore.getTodos(todoStore.getCurrentFilter() );
        renderTodos(ElementIDs.TodoList, todos);
        console.log(todos);

    }

    //Cuando la función App() se llama
    (()=>{
        const app= document.createElement('div');
        app.innerHTML= html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //REFERENCIAS HTML se crea aquí porque si lo hago arriba no van a existir esas referencias debido a que no se ha ejecutado la funcionn anónima

    const newDescriptionInput= document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL= document.querySelector(ElementIDs.TodoList);

    //Listeners
    newDescriptionInput.addEventListener('keyup', (event)=>{
        if (event.key !== 'Enter') return; 
        if(event.target.value.trim().length===0) return;

        todoStore.addTodo(event.target.value); 
        displayTodos();
        event.target.value='';
    });

    todoListUL.addEventListener('click', (event)=>{
        const element= event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    })

    todoListUL.addEventListener('click', (event)=>{
        const isDestroyElement= event.target.className==='destroy';
        const element= event.target.closest('[data-id]');

        if(!isDestroyElement) return;
        
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();

       
    })


}


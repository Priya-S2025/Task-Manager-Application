class Task{

constructor(id,title,description,priority,category){
this.id=id
this.title=title
this.description=description
this.priority=priority
this.category=category
this.completed=false
}

toggleComplete(){
this.completed=!this.completed
}

}

class TaskManager{

constructor(){
this.tasks=[]
}

addTask(task){
this.tasks.push(task)
}

deleteTask(id){
this.tasks=this.tasks.filter(task=>task.id!==id)
}

}

const manager=new TaskManager()

const form=document.getElementById("taskForm")
const taskList=document.getElementById("taskList")
const error=document.getElementById("error")
const notification=document.getElementById("notification")

function render(){

taskList.innerHTML=""

manager.tasks.forEach(task=>{

const li=document.createElement("li")

if(task.completed){
li.classList.add("completed")
}

li.innerHTML=`
<b>${task.title}</b> (${task.priority})<br>
${task.description}<br>
Category: ${task.category}<br><br>

<button onclick="completeTask(${task.id})">Complete</button>
<button onclick="deleteTask(${task.id})">Delete</button>
`

taskList.appendChild(li)

})

}

form.addEventListener("submit",function(e){

e.preventDefault()

const title=document.getElementById("title").value
const desc=document.getElementById("description").value
const priority=document.getElementById("priority").value
const category=document.getElementById("category").value

if(title===""){
error.innerText="Title cannot be empty"
return
}

const task=new Task(Date.now(),title,desc,priority,category)

manager.addTask(task)

if(priority==="High"){
showNotification("High Priority Task Added")
}

render()

form.reset()

error.innerText=""

})

function deleteTask(id){

manager.deleteTask(id)

render()

}

function completeTask(id){

const task=manager.tasks.find(t=>t.id===id)

task.toggleComplete()

if(task.priority==="High"){
showNotification("High Priority Task Completed")
}

render()

}

function showNotification(message){

notification.innerText=message
notification.style.display="block"

setTimeout(()=>{
notification.style.display="none"
},4000)

}

document.getElementById("themeToggle").addEventListener("click",function(){

document.body.classList.toggle("dark")

})
// Get the elemrnt will deal with it
const input = document.querySelector(".title");
const submit = document.querySelector(".submit");
const error = document.querySelector(".error");
const list = document.querySelector(".list");
const sort = document.querySelector(".sort");

const values = [];
let text = '';
let id = 0;
// Make Validation for the input
input.addEventListener("keyup", (e) =>{
    const todoTitle = e.target.value.trim();
    if(/^[a-zA-Z0-9]|\s+$/.test(todoTitle)){
        error.textContent = "";
        text = todoTitle;
    }
    else{
        error.textContent = "Please Put Your title with characters and numbers";
        text = "";
    }
});

// Add title on the page
submit.addEventListener("click", (e) =>{
    if(!text){
        error.textContent = "Please Put Your title with characters and numbers";
    }
    else{
        const titleObject = {id:++id, value:text};
        values.push(titleObject);
        var storedValues = JSON.stringify(values);
        localStorage.setItem("values", storedValues);
        var Changedvalues = JSON.parse(localStorage.getItem("values"));
        additions(id,text);
    }
});

const sortFun = (text1, text2) => {
    if(text1.value.toLowerCase() > text2.value.toLowerCase()){
        return 1;
    }
    if(text1.value.toLowerCase() < text2.value.toLowerCase()){
        return -1;
    }
    return 0;
};

// Sort the list
sort.addEventListener("click",(e) =>{
    const sortedValue = values.sort(sortFun);
    list.textContent = "";
    sortedValue.forEach(element => {
        var idEle = element.id;
        var textEle = element.value;
        var doneEle = element.done;
        additions(idEle, textEle, doneEle);
    });
});

function additions(id,text){
    const child = document.createElement("li");
    const span = document.createElement("span");
    const editChild = document.createElement("button");
    const deleteChild = document.createElement("button");
    const doneChild = document.createElement("button");
    // Add text for new element
    editChild.classList.add("fas","fa-edit");
    editChild.classList.add("edit");
    deleteChild.classList.add("fas","fa-trash-alt");
    deleteChild.classList.add("remove");
    doneChild.classList.add("fa","fa-check");
    doneChild.classList.add("done");
    span.textContent = text;
    child.id = id;
    // Append li in its parent
    child.append(span);
    child.append(editChild);
    child.append(deleteChild);
    child.append(doneChild);
    list.append(child);
    input.value = '';
    text = '';
    console.log(localStorage);
    // Remove item from list
    deleteChild.addEventListener("click", (e) => {
        const par = deleteChild.parentElement;
        values.pop(par.id);
        par.remove();
    });
    editChild.addEventListener("click", (e) =>{
        const par = editChild.parentElement;
        const childList = par.children[0];
        console.log(par.children[0].textContent);
        childList.contentEditable = true;
        values= values.map(element =>{
            if(element.id == par.id){
                element.value = childList.textContent;
            }
            return element;
        });
        console.log(values[idElement-1].value);
            if(!childList.textContent){
                childList.textContent = "Task must not be empty";
                par.style.backgroundColor = "lightslategrey";
            }
    });
    doneChild.addEventListener("click", (e) => {
        const par = editChild.parentElement;
        const childList = par.children[0];
        childList.style.color = "green";
        doneChild.style.color = "white";
        doneChild.style.backgroundColor = "green";
    });
}
    // localStorage.setItem("values", JSON.stringify(values));
    // var values = JSON.parse(localStorage.getItem("values"));
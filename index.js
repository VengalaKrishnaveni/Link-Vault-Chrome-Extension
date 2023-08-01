let inputEl = document.getElementById("input-el")
const saveInputBtn = document.getElementById("save-input-btn")
const saveTabBtn = document.getElementById("save-tab-btn")
const deleteAllBtn = document.getElementById("delete-all-btn")
let olEl = document.getElementById("ol-el")
const deleteBtn = document.getElementById("delete-btn")
const deleteInput = document.getElementById("delete-input")


let pastLeads = JSON.parse(localStorage.getItem("myLeads"))
let myLeads = []

if(pastLeads){
    myLeads = pastLeads
    render(myLeads)
}

saveInputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
})

function render(leads){
    let leadsList = ""
    for(let i=0;i<leads.length;i++){
        leadsList += 
        "<li>" + "<a target='_blank' href='" + leads[i] + "'>" + leads[i] + "</a>" + "</li>"
    }
    olEl.innerHTML = leadsList
}


function deleteEntry(number){
    myLeads.splice(number-1,1)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
}

saveTabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true,currentWindow: true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
})

deleteBtn.addEventListener("click",function(){
    deleteEntry(deleteInput.value)
    deleteInput.value = ""
})

deleteAllBtn.addEventListener("dblclick",function(){
    myLeads = []
    localStorage.clear()
    render(myLeads)
})

deleteAllBtn.addEventListener("mouseover", () => {
    deleteAllBtn.textContent = "Double click to delete"
});

deleteAllBtn.addEventListener("mouseout", () => {
    deleteAllBtn.textContent = "Delete All"
});
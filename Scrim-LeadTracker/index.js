let leads = []

const leadEl = document.getElementById("lead-el")
const saveEl = document.getElementById("save-el")
const showEl = document.getElementById("show-el")
const deleteEl = document.getElementById("delete-el")
const tabbtn = document.getElementById("tabsave-el")

let leadFromLocalStorage = JSON.parse(localStorage.getItem("leads"))

if (leadFromLocalStorage) {
    leads = leadFromLocalStorage
    render(leads)
}

const tabs = [
    {url: "https://www.linkedin.com/in/per-harald-borger/"}
]

tabbtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        leads.push(tabs[0].url)
        localStorage.setItem("leads", JSON.stringify(leads))
        render(leads)
    })
})

function render(myleads) {
    let listItems = "";
    for (let i = 0; i < myleads.length; i++) {
        listItems += 
        `<li>
            <a target='_blank' style="color: #5f9341" href=${myleads[i]}>${myleads[i]}</a>
        </li>`
    }
    showEl.innerHTML = listItems
}

deleteEl.addEventListener("dblclick", function() {
    localStorage.clear()
    leads = []
    render(leads)
})

saveEl.addEventListener("click", function() {
    leads.push(leadEl.value) 
    showEl.value = ""
    localStorage.setItem("leads", JSON.stringify(leads))
    render(leads)
})



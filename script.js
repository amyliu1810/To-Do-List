const inputBox = document.getElementById('input-box')
const listContainer = document.getElementById('list-container')

// console.log(listContainer);

function addTask() {
    if (inputBox.value == '') {
        alert('請輸入代辦事項');
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);  

        let span = document.createElement('span');
        span.innerHTML = '\u00d7';  // 將 span 的內容設為 '×'，表示刪除
        li.appendChild(span);  // 把 span 元素添加到剛剛創建的列表項中
    }
    inputBox.value = '';
    saveDate();
}

listContainer.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveDate();
    }
    else if (e.target.tagName === 'SPAN') {
        const taskElement = e.target.parentElement;
        taskElement.remove();
        removeFromLocalStorage(taskElement);
    }
}, false);

// 從當前任務列表中獲取所有任務的內容和完成狀態，然後將這些數據以 JSON 格式保存到本地存儲中。
function removeFromLocalStorage(taskElement) {
    const tasks = Array.from(listContainer.children).map(task => {
        return { content: task.innerHTML, checked: task.classList.contains('checked') };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));  // 將包含任務數據的數組轉換為JSON字符串，並保存到本地存儲中的'tasks'鍵
}

// function saveDate(){
//     localStorage.setItem('data', listContainer.innerHTML);
// }

// function showTask(){
//     listContainer.innerHTML = localStorage.getItem('data');
// }

function saveDate() {
    const tasks = Array.from(listContainer.children).map(task => {
        return { 
            content: task.innerHTML, checked: task.classList.contains('checked') 
        };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showTask() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    listContainer.innerHTML = tasks.map(task => {
        return `<li class="${task.checked ? 'checked' : ''}">${task.content}<span>\u00d7</span></li>`;
    }).join('');
}

showTask();


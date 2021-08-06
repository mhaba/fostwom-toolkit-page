import { questions } from "./questions.js";

const trans_time = 0.5

questions.forEach(q => {
    const item = document.createElement("p");
    q.question_parent.appendChild(item)

    item.className = "question__item";
    item.innerHTML = q.question;
    item._data = q;

    const more_button = document.createElement("button");
    more_button.className = "more__button"
    more_button.innerHTML = ">>";
    appendItem(more_button, item, trans_time);

    createQuestionEventListener(q, item)
    more_button.addEventListener('click', addClassSelected)
    
})

function addClassSelected(evt){
    evt.target.classList.add("selected");
}

function createQuestionEventListener(q, item) {
    item.addEventListener('click', function(evt) {
        const answer_item = document.createElement("p");
        
        answer_item.className = "answer__item";
        answer_item.innerHTML = this._data.answer;
        
        Array.from(document.getElementsByClassName('more__button')).forEach(b => b.classList.remove("selected"))
        if(evt.target.className != "more__button") {
            evt.target.lastElementChild.focus();
            evt.target.lastElementChild.classList.add("selected");
        }

        const child = q.answer_parent.lastElementChild;
        if (child) {
            if (child.innerHTML != answer_item.innerHTML) {
                q.answer_parent.removeChild(child);

                appendItem(answer_item, q.answer_parent, trans_time)
            }
        }
        else {
            appendItem(answer_item, q.answer_parent, trans_time)
        }
    })
}

function appendItem(item, parent_item, seconds) {
    const ms = seconds * 1000;
    item.style.transition = "opacity " + ms + "ms ease";
    
    item.style.opacity = 0;
    parent_item.appendChild(item)
    setTimeout(function() {
        item.style.opacity = 1;
    }, seconds)
}
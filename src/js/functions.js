import { questions } from "./questions.js";

const trans_time = 0.5

main()

function main() {
    questions.forEach(q => {
        const item = document.createElement("p");
        q.question_parent.appendChild(item)

        item.className = "question__item";
        item.innerHTML = q.question;
        item._data = q;

        const more_button = document.createElement("button");
        more_button.className = "more__button"
        more_button.innerHTML = ">>";
        more_button.title = "Show more";
        appendItem(more_button, item, trans_time);

        createQuestionEventListener(q, item);
        more_button.addEventListener('click', addClassSelected);
        
    })

    const content_btn = document.getElementById("content_exp_btn");
    const visual_btn = document.getElementById("visual_desg_btn");

    content_btn.addEventListener('click', hideOpposite);
    visual_btn.addEventListener('click', hideOpposite);
}

function hideOpposite() {
    const btn_id = this.id;
    let to_hide;
    let to_show;
    if(btn_id == "content_exp_btn") {
        to_hide = document.getElementsByClassName("visual__designer");
        to_show = document.getElementsByClassName("content__expert");
    }
    else {
        to_hide = document.getElementsByClassName("content__expert");
        to_show = document.getElementsByClassName("visual__designer");
    }
    Array.from(to_hide).forEach(e => {
        e.classList.add("hide");
        e.classList.remove("show");
    })
    Array.from(to_show).forEach(e => {
        e.classList.add("show");
        e.classList.remove("hide")
    })
}

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
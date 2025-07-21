const main = document.getElementById("main");
const form = document.getElementById("input_form");
const button = document.getElementById("btn");
const task = document.getElementById("task_name");
const date_and_time = document.getElementById("time_and_date");
const input = document.getElementsByClassName("input");

function add_element_to_screen(task_value: string, date_and_time_value: string) {
    const task_wraper = document.createElement("div");
    const btn_wraper = document.createElement("div");

    const task_element = document.createElement("p");
    const date_and_time_element = document.createElement("p");
    const edit = document.createElement("button");
    const delet = document.createElement("button");

    task_wraper.id = "task_wraper";
    btn_wraper.id = "btn_wraper";

    task_element.textContent = task_value;
    date_and_time_element.textContent = date_and_time_value;
    edit.textContent = "Edit";
    delet.textContent = "Remove";

    edit.id = "edit";
    delet.id = "delet";

    btn_wraper.appendChild(edit);
    btn_wraper.appendChild(delet);

    task_wraper.appendChild(task_element);
    task_wraper.appendChild(date_and_time_element);
    task_wraper.appendChild(btn_wraper);

    if (main) {
        main.appendChild(task_wraper);
    }

    for (let i = 0; i < input.length; i++) {
        const element = input[i] as any;
        element.value = "";
    }
}

function add_task() {
    if (task && date_and_time) {
        const task_value = (task as any).value;
        const date_and_time_value = (date_and_time as any).value;

        if (task_value === "" || date_and_time_value === "") {
            return;
        }

        add_element_to_screen(task_value, date_and_time_value);
    }
}

function edit_task(element: any) {
    const task_wraper = element.closest("#task_wraper");

    const task_element = task_wraper.querySelector("p:nth-child(1)");
    const date_and_time_element = task_wraper.querySelector("p:nth-child(2)");

    const current_task = task_element.textContent || "";
    const current_datetime = date_and_time_element.textContent || "";

    const task_input = document.createElement("input");
    task_input.type = "text";
    task_input.value = current_task;
    task_input.className = "edit-input";

    const datetime_input = document.createElement("input");
    datetime_input.type = "datetime-local";
    datetime_input.value = current_datetime;
    datetime_input.className = "edit-input";

    const save_button = document.createElement("button");
    save_button.textContent = "Save";
    save_button.id = "edit";
    save_button.style.backgroundColor = "rgb(159, 159, 244)";

    while (task_wraper.firstChild) {
        task_wraper.removeChild(task_wraper.firstChild);
    }

    const new_btn_wraper = document.createElement("div");
    new_btn_wraper.id = "btn_wraper";
    new_btn_wraper.appendChild(save_button);

    task_wraper.appendChild(task_input);
    task_wraper.appendChild(datetime_input);
    task_wraper.appendChild(new_btn_wraper);

    task_input.focus();

    save_button.onclick = function () {
        const new_task_element = document.createElement("p");
        new_task_element.textContent = task_input.value;

        const new_datetime_element = document.createElement("p");
        new_datetime_element.textContent = datetime_input.value;

        const edit_btn = document.createElement("button");
        edit_btn.textContent = "Edit";
        edit_btn.id = "edit";

        const delete_btn = document.createElement("button");
        delete_btn.textContent = "Remove";
        delete_btn.id = "delet";

        const restored_btn_wraper = document.createElement("div");
        restored_btn_wraper.id = "btn_wraper";
        restored_btn_wraper.appendChild(edit_btn);
        restored_btn_wraper.appendChild(delete_btn);

        while (task_wraper.firstChild) {
            task_wraper.removeChild(task_wraper.firstChild);
        }

        task_wraper.appendChild(new_task_element);
        task_wraper.appendChild(new_datetime_element);
        task_wraper.appendChild(restored_btn_wraper);
    };
}

function remove_task(element: any) {
    const task = element.parentElement.parentElement;
    if (task && task.parentNode) {
        task.parentNode.removeChild(task);
    }
}

document.addEventListener("click", function (event) {
    const clicked = event.target;

    if (clicked && (clicked as any).id === "btn") {
        add_task();
    } else if (clicked && (clicked as any).id === "edit") {
        edit_task(clicked);
    } else if (clicked && (clicked as any).id === "delet") {
        remove_task(clicked);
    }
});

const con = document.getElementsByClassName("con")[0];
const random = document.getElementById("random")
const sort = document.getElementById("sort")
let range = document.getElementById("range")
let speed = document.getElementById("speed")
let algos = Array.from(document.getElementsByClassName("algos")[0].children)
let cons = con.children;
let algo = "Bubble"
const arr = []
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, 1000 - ms));
}

window.addEventListener("DOMContentLoaded", () => {
    for (let index = 0; index < 10; index++) {

        let li = document.createElement("li")
        li.style.height = rand() + "rem";
        con.appendChild(li)
        arr.push(parseInt(li.style.height))
    }
})

algos.forEach(but => {
    but.addEventListener("click", () => {
        algo = but.textContent;
    })
});

let slider = 0
range.addEventListener('input', () => {
    let val = Number(range.value)
    while (val < slider) {
        con.removeChild(con.lastElementChild)
        arr.pop()
        slider--
    }
    while (slider < val) {

        let li = document.createElement("li")
        li.style.height = rand() + "rem";
        con.appendChild(li)
        arr.push(parseInt(li.style.height))
        slider++
    }




})



random.addEventListener("click", () => {
    for (let i = 0; i < arr.length; i++) {
        cons[i].style.height = rand() + "rem";
        arr[i] = parseInt(cons[i].style.height)
    }
})


function rand() {
    return Math.floor(Math.random() * 21) + 1;
}
async function bubble(array) {
    random.disabled = true
    speed.disabled = true
    range.disabled = true
    sort.disabled = true
    let i, j;
    for (i = 0; i < cons.length; i++) {
        for (j = 0; j < cons.length - i - 1; j++) {

            let cj = parseInt(cons[j].style.height)

            cons[j].style.backgroundColor = "red"
            cons[j + 1].style.backgroundColor = "red"

            let cj1 = parseInt(cons[j + 1].style.height)

            for (let k = 0; k < cons.length; k++) {
                if (k != j && k != j + 1)
                    cons[k].style.backgroundColor = "black"
            }
            if (cj > cj1) {
                swap(cons[j], cons[j + 1])
                swapNum(array, j, j + 1)
                await sleep(speed.value)
            }
        }
    }
    for (i = 0; i < cons.length; i++) {
        cons[i].style.backgroundColor = "black"
    }

    random.disabled = false
    speed.disabled = false
    sort.disabled = false
    range.disabled = false

}

async function insertionSort(array) {
    random.disabled = true
    speed.disabled = true
    range.disabled = true
    sort.disabled = true

    let i, key, j;
    for (i = 1; i < cons.length; i++) {
        key = parseInt(cons[i].style.height);
        j = i - 1;

        while (j >= 0 && parseInt(cons[j].style.height) > key) {
            cons[j].style.backgroundColor = "red"
            cons[j + 1].style.backgroundColor = "red"
            for (let k = 0; k < cons.length; k++) {
                if (k != j && k != j + 1)
                    cons[k].style.backgroundColor = "black"
            }
            cons[j + 1].style.height = parseInt(cons[j].style.height) + "rem";
            array[j + 1] = array[j]
            j = j - 1;
            await sleep(speed.value)
        }
        cons[j + 1].style.height = key + "rem"
        array[j + 1] = array[i]
    }
    for (i = 0; i < cons.length; i++) {
        cons[i].style.backgroundColor = "black"
    }
    random.disabled = false
    speed.disabled = false
    sort.disabled = false
    range.disabled = false
}





async function partition(items, left, right) {
    let pivot = items[Math.floor((right + left) / 2)], //middle element
        i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            cons[i].style.backgroundColor = "yellow"
            for (let k = 0; k < items.length; k++) {
                if (k != i)
                    cons[k].style.backgroundColor = "black"
            }
            i++;
            await sleep(speed.value)
        }
        while (items[j] > pivot) {
            cons[i].style.backgroundColor = "yellow"
            for (let k = 0; k < items.length; k++) {
                if (k != j)
                    cons[k].style.backgroundColor = "black"
            }
            j--;
            await sleep(speed.value)
        }
        if (i <= j) {
            cons[i].style.backgroundColor = "red"
            cons[j].style.backgroundColor = "red"
            for (let k = 0; k < items.length; k++) {
                if (k != i && k != j)
                    cons[k].style.backgroundColor = "black"
            }
            swap(cons[i], cons[j])
            swapNum(items, i, j); //sawpping two elements
            i++;
            j--;
            await sleep(speed.value)
        }
        for (let k = 0; k < items.length; k++) {

            cons[k].style.backgroundColor = "black"
        }

    }
    return i;
}

async function quickSort(items, left, right) {

    random.disabled = true
    speed.disabled = true
    range.disabled = true
    sort.disabled = true

    let index;
    if (items.length > 1) {
        index = await partition(items, left, right); //index returned from partition
        // await sleep(speed.value)
        if (left < index - 1) { //more elements on the left side of the pivot
            await quickSort(items, left, index - 1);
            // await sleep(speed.value)
        }
        if (index < right) { //more elements on the right side of the pivot
            await quickSort(items, index, right);
            // await sleep(speed.value)
        }
    }
    random.disabled = false
    speed.disabled = false
    sort.disabled = false
    range.disabled = false

    return items;

}


function swap(ele1, ele2) {
    let temp = ele1.style.height
    console.log(ele2.style.height);
    ele1.style.height = ele2.style.height
    ele2.style.height = temp
}

function swapNum(array, a, b) {
    const temp = array[a]
    array[a] = array[b]
    array[b] = temp
}


sort.addEventListener('click', () => {

    switch (algo) {
        case "Bubble":
            bubble(arr);
            break;
        case "Insertion":
            insertionSort(arr);
            break;
        case "Quick":
            quickSort(arr, 0, arr.length - 1);
            console.log(arr);
            break;
        default:
            bubble(arr);
            break;
    }
})




class NodeImg
{
    constructor(img, next)
    {
        this.img = img;
        this.next = next;
    }
}

let first;
let second;
let time;
let timerOn;//timer za vreme dok su otvorena polja
let timeStarted;
let remainingPairs;
let stopWatch;
let numberOfTries;
let points;
let headImg;
let listSize;
let arr;

function load()
{
    loadTable(4, 5);
    popupInform();
    window.addEventListener('resize', function(event)
{
    let table = document.getElementById("game");
    let row = table.rows.length;
    let col = table.rows[0].cells.length;
    let w = window.innerWidth;
    if(w > window.innerHeight)
    {
        w = window.innerHeight;
    }
    for(let i = 0; i < row; i++)
    {
        for(let j = 0; j < col; j++)
        {

            let colLocal = document.getElementById("col" + (i * col + j));
            colLocal.width = (w * 0.75) / col;
            colLocal.height = colLocal.width;
            if(colLocal.getElementsByTagName("img").length > 0)
            {
                let img = document.getElementById("imgcol" + (i * col + j));
                img.width = (w * 0.75) / col;
                img.height = img.width;
            }
        }
    }

});
    
    setMouseListenerPopupInform();
    setMouseListenerRestart();
    setMouseListenersGame();
    setMouseListenerFinished();

    initVariables();

}

window.onload = load;

function shuffleImg()
{
    //init
    const arr = new Array(20);
    for(let i = 0; i < 10; i++)
    {
        arr[2 * i] = i;
        arr[2 * i + 1] = i;
    }

    //shuffle
    for(let i = 0; i < 20; i++)
    {
        let j = Math.floor((Math.random() * 20));
        let tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }

    return arr;

}

function makeAnImageList(arr)
{
    let headListTmp = null;
    for(let i = 0; i < 20; i++)
    {
        let img = document.createElement("img");
        img.classList.add("gameImg");
        //img.id = "img" + "col" + i;
        img.src = "./images/img" + arr[i] + ".png";
        headListTmp = new NodeImg(img, headListTmp);
        arr[i] = null;
    }
    return headListTmp;
}

function loadTable(row, col)
{
    //const arr = shuffleImg();
    let table = document.getElementById("game");
    let w = window.innerWidth;
    if(w > window.innerHeight)
    {
        w = window.innerHeight;
    }

    for(let i = 0; i < row; i++)
    {
        let rowLocal = table.insertRow(i);
        rowLocal.id = "row" + i;
        for(let j = 0; j < col; j++)
        {
            let colLocal = rowLocal.insertCell(j);
            colLocal.id = "col" + (i * col + j);
            colLocal.classList.add("gameCol");
            //let img = document.createElement('img');

            //img.src = "./images/img" + arr[i * col + j] + ".png";
            //img.id = "img" + colLocal.id;
            colLocal.width = Math.floor((w * 0.75)  / col) ;
            colLocal.height = colLocal.width;
            //img.width = colLocal.width;
            //img.height = colLocal.height;
            //img.classList.add("gameImg");
            //img.style = "visibility: hidden";
            //colLocal.append(img);
        }
    }
}




function popupInform()
{
    document.getElementById("div-shadow").style = "visibility: visible";
    document.getElementById("popup-inform").style = "visibility: visible";
}

function popupInformClose()
{
    //document.getElementById("div-finished").style = "visibility: visible";
    document.getElementById("div-shadow").style = "visibility: hidden";
    document.getElementById("popup-inform").style = "visibility: hidden";
}

function setMouseListenerPopupInform()
{
    document.getElementById("inform-confirm").addEventListener('click', function(event)
    {
        popupInformClose();
    });
}

function setMouseListenerRestart()
{
    document.getElementById("restart").addEventListener('click', function(event)
    {
        location.reload();
    }
    );
}

function setMouseListenersGame()
{
    let arrCol = document.getElementsByClassName("gameCol");

    for(let i = 0; i < arrCol.length; i++)
    {
        arrCol[i].addEventListener('click', function(event)    {
            clickGame(this);
        }
        );
    }
}

function initVariables()
{
    first = {
        value: [null, false, null],
        get curValue()
        {
            return this.value;
        },
        set curValue(value)
        {
            this.value = value;
            
        }
    };

    second = {
        value: [null, false, null],
        get curValue()
        {
            return this.value;
        },
        set curValue(value)
        {
            this.value = value;
            secondOpened();
        }
    };

    time = {
        value: 0,
        get curValue()
        {
            return this.value;
        },
        set curValue(value)
        {
            this.value = value;
            changeTime();
        }
    };

    remainingPairs = 10;
    timerOn = false;
    timeStarted = false;
    numberOfTries = 0;
    points = 0;

    arr = shuffleImg();
    headImg = makeAnImageList(arr);
    listSize = arr.length;
}

function secondOpened()
{
    if(second.curValue[1] == true)
    {
        //numberOfTries++;
        if(first.curValue[0].src != second.curValue[0].src)
        {
            timerOn = true;
            setTimeout(closeOpened, 750);
        }
        else
        {
            remainingPairs--;
            first.curValue = [null, false, null];
            second.curValue = [null, false, null];
            if(remainingPairs == 0)
            {
                stopTime();
                points += time.curValue;
                popupFinished();
            }
        }

    }
}

function closeOpened()
{
    //second.curValue[0].style = "visibility: hidden";
    //first.curValue[0].style = "visibility: hidden";

    first.curValue[2].removeChild(first.curValue[0]);
    second.curValue[2].removeChild(second.curValue[0]);
    first.curValue[2].style = "background-color: transparent";
    second.curValue[2].style = "background-color: transparent";

    first.curValue = [null, false, null];
    second.curValue = [null, false, null];
    timerOn = false;
}

function clickGame(clicked)
{
    if(timeStarted == false)
    {
        timeStarted = true;
        startTime();
    }
    if((first.curValue[1] == false || second.curValue[1] == false) && timerOn == false)
    {
        if(clicked.getElementsByTagName("img").length == 0)
        {
            points += 1;
            clicked.style = "background-color: #fcf9f8";
            if(arr[getColNum(clicked.id)] == null)
            {
                let j = Math.floor((Math.random() * 20)) % listSize;
                listSize--;
                let tmp = headImg;
                let prev = null;
                for(let i = 0; i < j; i++)
                {
                    prev = tmp;
                    tmp = tmp.next;
                }

                if(prev != null) 
                {
                    prev.next = tmp.next;
                }
                else
                {
                    headImg = tmp.next;
                }

                arr[getColNum(clicked.id)] = tmp.img;
                tmp.img.id = "img" + clicked.id;

            }
            let image = arr[getColNum(clicked.id)];
            image.width = clicked.width;
            image.height = clicked.height;
            clicked.append(image);
            if(first.curValue[1])
            {
                second.curValue = [image, true, clicked];
            }
            else
            {
                first.curValue = [image, true, clicked];
            }

        }
            
        //let image = document.getElementById("img" + clicked.id);
       /* if(window.getComputedStyle(image).visibility == "hidden")
        {
            //image.style = "visibility:visible";
            //clicked.style = "background-color: #fcf9f8";
            if(first.curValue[1])
            {
                second.curValue = [image, true, clicked];
            }
            else
            {
                first.curValue = [image, true, clicked];
            }
        }*/
    }

}

function startTime()
{
    stopWatch = setInterval(incTime, 1000);
}

function incTime()
{
    time.curValue = time.curValue + 1;
}

function changeTime()
{
    let par = document.getElementById("time");
    let min = Math.floor(time.curValue / 60);
    let sec = time.curValue % 60;
    if(min < 10)
    {
        min = '0' + min;
    }
    if(sec < 10)
    {
        sec = '0' + sec;
    }

    par.innerHTML = min + ":" + sec;

}

function stopTime()
{
    clearInterval(stopWatch);
}

function setMouseListenerFinished()
{
    document.getElementById("submit-finished").addEventListener("click", function(event){
        event.preventDefault();
        let url = "https://script.google.com/macros/s/AKfycbydLCqQw-NaO_2AptoZ8NHIstFhNHSzX63JKVfPvBDdMZ2YKwyoSeNTxaIHnbcjwy7B/exec";

        let xhr = new XMLHttpRequest();
        xhr.open("POST", url);

        //xhr.setRequestHeader("Accept", "application/json");
        //xhr.setRequestHeader("Content-Type", "application/json");
        //xhr.setRequestHeader("Access-Control-Allow-Origin", "application/json");

      /*  xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }};*/


        const d = new Date();
        let hh = d.getHours();
        if(hh < 10)
        {
            hh = "0" + hh;
        }
        let mm = d.getMinutes();
        if(mm < 10)
        {
            mm = "0" + mm;
        }

        let ss = d.getSeconds();
        if(ss < 10)
        {
            ss = "0" + ss;
        }

        let dd = d.getDate();
        if(dd < 10)
        {
            dd = "0" + dd;
        }

        let mo = d.getMonth() + 1;
        if(mo < 10)
        {
            mo = "0" + mo;
        }

        let yy = d.getFullYear();

        var data = `{
        "userName": "` + document.getElementById("input-name").value + `" ,
        "userSurname": "` + document.getElementById("input-surname").value + `",
        "userEmail": "` + document.getElementById("input-email").value + `",
        "userPoints": "` + points + `",
        "userTime": "` + hh + 
        `:` + mm +
        `:` + ss + 
        ` ` + dd + 
        `.` + mo + 
        `.` + yy + `"
        }`;

        xhr.send(data);
        document.getElementById("div-shadow").style = "visibility: hidden";
        document.getElementById("div-finished").style = "visibility: hidden";

    });
}

/*function timeScale()
{
    if(time.curValue < 20)
    {
        return 1.1;
    }
    else if(time.curValue < 30)
    {
        return 1;
    }
    else if(time.curValue < 45)
    {
        return 0.9;
    }
    else if(time.curValue < 60)
    {
        return 0.8;
    }
    else if(time.curValue < 90)
    {
        return 0.7;
    }
    else if(time.curValue < 120)
    {
        return 0.6;
    }
    else
    {
        return 0.5;
    }
}*/

/*function addNewRow(name, surname, email, points)
{
    localStorage.setItem(localStorage.length + 1, (localStorage.length + 1) + "," + name + "," + surname + "," + email + "," + points + "\n");
}*/

function popupFinished()
{
    //points =  Math.floor(points * 20 / numberOfTries);
    document.getElementById("points").innerHTML = "Imali ste " + points + " poena!";
    document.getElementById("div-shadow").style = "visibility: visible";
    document.getElementById("div-finished").style = "visibility: visible";
}

/*function downloadFile()
{
    let text = "";
    for(let i = 0; i < localStorage.length; i++)
    {
        text += localStorage.getItem(i + 1);
    }
    let file = new Blob([text], {type: 'text/csv'});
    let url = URL.createObjectURL(file);
    window.open(url, "_blank");
    localStorage.clear();
}*/


function getColNum(id)
{
    return parseInt(id.slice(3));
}
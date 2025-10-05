export function displayDialogue(text, onDisplayEnd){
    const dialogueUI = document.getElementById("textbox-container");
    const dialogue = document.getElementById("dialogue");
    dialogueUI.style.display = "block";// this shows the dialogue box which is rendered invisible by us in the html code by writing style display none so now the dialogue box is going to be visible with the text in it

    let index= 0;// create an index variable to keep track of which character we are on
    let currentText ="";// this contains the text we are going to add to the innerHTML of the dialogue box 
    const intervalRef = setInterval(() =>{// it will run the functions every 5 seoconds
        if(index < text.length){// as long as the index is less than the length of the text we are going to keep adding characters to the dialogue box
            currentText += text[index];// in this we take the current text and add the character at the current index to it and put it into the innerHTML of the dialogue box
            dialogue.indexHTML = currentText;// this will add one character at a time to the dialogue box, innerHTML is not reccomended to be used in this case as it can lead to security issues as u could be prone ot cross site scripting attacks but in this case it is safe to use innerHTML as we are not taking any input from the user
            index++;// we cannot use innerTEXT as it will not render the html tags like <br> for new line or links that we might want to add in the dialogue box to make it clickable
            return;// we skip this until the condition is no longer true
        }

        clearInterval(IntervalRef)// this will stop the interval from running once we have displayed all the characters in the text
    }, 5);// this is the time interval in milliseconds, so every 5 milliseconds we will add a character to the dialogue box

    const closeBtn = document.getElementById("close");// we get the close button by getting simple the id of the button

    function onCloseBtnClick(){// we create a function that will be called when the close button is clicked
        onDisplayEnd();// this will call the onDisplayEnd function which will be passed as a parameter to the displayDialogue function, in this function we will set the player on display function to be false without passing it to the orignal method which is displayDialogue, a good way to pass a function without passing it to the original method is to use a callback function or adding a third parameter it is much more extensible when we want to do other behaviours when the dialogue ends like display etc etc
        dialogueUI.style.display = "none";// we are doing this so that dialogue box is not visible anymore
        dialogue.innerHTML ="";// in this we could have used innerTEXT as we are not rendering any html tags in the dialogue box
        clearInterval(intervalRed);// clear the interval if it has not been cleared already
        closeBtn.removeEvenListener("click", onCloseBtnClick);// this will remove the event listener from the close button so that we do not have multiple event listeners attached to the close button which can lead to memory leaks and other issues and to make it recursive remove the function within the function
    }

    closeBtn.addEventListener("click", onCloseBtnClick);// remove the event listener when there is a click then it kills itself when the loop is complete and then it starts again when the dialogue box is displayed again or clicked upon again
}
const quoteElement = document.getElementById("quote");
const randomValues = [];
const userInput = document.getElementById("userInput");
const score = document.getElementById("score");
const prompt = document.getElementById("prompt");

fetch('https://type.fit/api/quotes')
  .then((response) => response.json())
  .then((data) => {
    // add 10 randome values for choosing random quotes
    for (let i=0; i<10; i++) {
        let random = Math.floor(Math.random() * (data.length));
        while (randomValues.includes(random)) {  // check if random value generated is same
            random = Math.floor(Math.random() * (data.length));
        }
        randomValues.push(random);
    }
    const quote = data[randomValues[0]];
    quoteElement.innerHTML = quote.text; // add the quote to the element

    // prevent page from reloading

    document.getElementById("form").addEventListener("submit", (e) => {
        e.preventDefault();
  });

    //timer logic
    let curSec = 0;

    userInput.addEventListener('focus', () => {
        setInterval(timer, 1000);
    })

    function timer() {
        curSec += 1;
    }

    // score calcualting logic when enter is pressed

    let index = 1, currentScore = 0;
    const timeArr = []
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            if (index < randomValues.length) {
                if (userInput.value === quoteElement.innerHTML ) {
                    // console.log()
                    currentScore++;
                    userInput.classList.remove('scoreBorder');
                    prompt.classList.remove('promptVisible');
                    prompt.classList.add('promptHidden');
                } else {
                    alert("The input is not same as the quote");
                    userInput.classList.add('scoreBorder');
                    prompt.classList.remove('promptHidden');
                    prompt.classList.add('promptVisible');
                }
                console.log(curSec);
                timeArr.push(curSec);
                curSec = 0;
                quoteElement.innerHTML = data[randomValues[index]].text;
                index++;
                userInput.value = "";

            } else if (index === randomValues.length) {
                index++;
                let sum = 0;
                timeArr.forEach( (val) => {
                    sum += val;
                })
                console.log(timeArr);
                console.log("Your average time is " + sum/timeArr.length);
                document.getElementById("time").innerHTML = "Your average time is " + Math.round(sum/timeArr.length);
            } else if (index>randomValues.length) {
                alert("Game over!! Your score is "+score);
            }
            score.innerHTML = currentScore;
        }
    });
});


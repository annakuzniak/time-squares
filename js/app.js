var Game = function() { //tworzę konstruktor Game, w którym przechowuję zmienne:
    var game = this;    //game
    this.score = 0;     //punkty
    this.clicks = 0;    //liczba kliknięć
    this.ignored = 0;   //liczba zignorowanych kwadratów, na które nie reagujemy
    var randomTimeInterval = Math.floor(Math.random() * 3000);
    this.coinClicked = false;    //czy nasz prostokąt został kliknięty, wartość początkowa to false
    this.checkForGameOver = function () {
        var mistakesCounter = game.clicks - game.score + game.ignored;    //licznik błędów, jakie gracz może popełnić

        if(mistakesCounter >= 5) {//jeśli błędów jest 5 lub więcej
            var gameSection = document.querySelector('#board');    //chowam sekcję z polem gry
            gameSection.classList.add("invisible");

            var gameOverSection = document.querySelector('#gameOver');  //pokazuję sekcję game over
            gameOverSection.classList.remove("invisible");

            return true;
        }
    };

    var points = document.querySelector('div #points');      //zmienna, w której trzymam div,
    points.innerHTML = this.score.toString();                //w którym wyświetlam bieżącą liczbę zdobytych punktów

    var coin = document.querySelector('div.coin');           //prostokąt, który staje się niewidoczny po kliknięciu
    coin.addEventListener('click', function() {              //na niego
        this.classList.add("invisible");
        game.coinClicked = true;                            //informacja, że prostokąt został kliknięty
        game.score += 1;                                    //doliczam punkt do zmiennej score
        points.innerHTML = game.score.toString();           //przekazuję wynik do html'a
        game.checkForGameOver();                            //sprawdzam, czy nie ma stanu końca gry
    });

    var board = document.querySelector("#board>div");       //plansza, pole gry
    board.addEventListener('click', function () {           //po kliknięciu na planszę, doliczamy do clicks 1 punkt
        game.clicks += 1;
        console.log('klik', game.clicks);
        game.checkForGameOver();
    });

    this.showCoin = function() {                           //funkcja, za pomocą której wyświetlam prostokąt na planszy
        var interval = setInterval(function() {                           //co 3 sek

            if (game.coinClicked === false)                //jeśli nie klikamy na prostokąt, doliczamy 1 punkt do
                game.ignored += 1;                         //ignored

            game.coinClicked = false;                       //zresetowanie informacji o kliknięciu

            coin.style.position = "relative";               //ustawiam pozycję prostokąta na losową, poprzez dodanie

            var left = Math.floor(Math.random() * 700).toString();          //styli
            coin.style.left = left + 'px';
            var top = Math.floor(Math.random() * 700).toString();
            coin.style.top = top + 'px';

            coin.classList.remove("invisible");            //wyświetlam na planszy kolejny prostokąt

            if (game.checkForGameOver()) {
                clearInterval(interval);
            }

        }, randomTimeInterval);
    };
};


var startButton = document.querySelector(".button"); //ustawiamy click na button start


startButton.addEventListener('click', function() {

    var hideStartSection = document.querySelector('#start');    //chowamy sekcję z buttonem start
    hideStartSection.classList.add("invisible");

    var gameOverSection = document.querySelector('#gameOver');
    gameOverSection.classList.add("invisible");



    var newGame = new Game();                               //przechodzimy do planszy i gry




    newGame.showCoin();                    //wywołuję metodę showCoin


});






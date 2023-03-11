(function ($) {
    /***** INITIAL VARIABLES *****/
    let intervalId; 
    let score = {
        a1: '', a2: '', a3: '',
        b1: '', b2: '', b3: '',
        c1: '', c2: '', c3: ''
    };
    let playing = true;
    let turn = 'X';
    let warning = '';

    $('.turn').html(turn);
    $('.result').html(warning);

    /***** CONFETTI CONGLATULATION *****/
    const Confettiful = function(el) {
        this.el = el;
        this.containerEl = null;
        
        this.confettiFrequency = 3;
        this.confettiColors = ['#EF2964', '#00C09D', '#2D87B0', '#48485E','#EFFF1D'];
        this.confettiAnimations = ['slow', 'medium', 'fast'];
        
        this._setupElements();
        this._renderConfetti();
        };

        Confettiful.prototype._setupElements = function() {
        const containerEl = document.createElement('div');
        const elPosition = this.el.style.position;
        
        if (elPosition !== 'relative' || elPosition !== 'absolute') {
            this.el.style.position = 'relative';
        }
        
        containerEl.classList.add('confetti-container');
        
        this.el.appendChild(containerEl);
        
        this.containerEl = containerEl;
        };

        Confettiful.prototype._renderConfetti = function() {
            intervalId = setInterval(() => {
                const confettiEl = document.createElement('div');
                const confettiSize = (Math.floor(Math.random() * 3) + 7) + 'px';
                const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
                const confettiLeft = (Math.floor(Math.random() * this.el.offsetWidth)) + 'px';
                const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];
                
                confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
                confettiEl.style.left = confettiLeft;
                confettiEl.style.width = confettiSize;
                confettiEl.style.height = confettiSize;
                confettiEl.style.backgroundColor = confettiBackground;
                
                confettiEl.removeTimeout = setTimeout(function() {
                confettiEl.parentNode.removeChild(confettiEl);
                }, 3000);
                
                this.containerEl.appendChild(confettiEl);
            }, 30);
        };

    /***** GAME FUNCTIONALITY *****/
    reset();

    $(document).on('click', '.reset', function() {
        reset();
    });

    $(document).on('click', '.item', function() {
        let item = $(this).attr('data-item');

        if(playing && score[item] === ''){
            score[item] = turn;
            renderScore();
            togglePlayer();
        }
    });
    
    function reset() {
        warning = '';

        // Define turn
        let random = Math.floor(Math.random() * 2);
        turn = (random === 0) ? 'X' : 'O';

        // Clean the scores
        for(let i in score) {
            score[i] = '';
        }
        $('.divBorder').removeClass('vertical');
        $('.divBorder').removeClass('horizontal');
        $('.divBorder').removeClass('cross_right');
        $('.divBorder').removeClass('cross_left');

        renderScore();
        renderInfo();
        clearInterval(intervalId);
        playing = true;
    }

    function renderScore() {
        for(let i in score){
            let item = $(`div[data-item=${i}]`);
            $(item).html(score[i]);
        }

        checkGame();
    }

    function renderInfo() {
        $('.turn').html(turn);
        $('.result').html(warning);
    }

    function togglePlayer() {
        turn = (turn === 'X') ? 'O' : 'X';
        renderInfo();
    }

    function checkGame() {
        if(checkWinnerFor('X')) {
            warning = 'X wins!';
            playing = false;
        } else if(checkWinnerFor('O')) {
            warning = 'O wins!';
            playing = false;
        } else if(isFull()) {
            warning = 'Drawn!';
            playing = false;
        }     
    }

    function checkWinnerFor(i) {
        let pos = [
            'a1,a2,a3;horizontal',
            'b1,b2,b3;horizontal',
            'c1,c2,c3;horizontal',
    
            'a1,b1,c1;vertical',
            'a2,b2,c2;vertical',
            'a3,b3,c3;vertical',
    
            'a1,b2,c3;cross_right',
            'a3,b2,c1;cross_left'
        ];
    
        for(let w in pos) {
            let wArray = pos[w].split(';');
            let pArray = wArray[0].split(',');
            let hasWon = pArray.every(option=>score[option] === i);
            if(hasWon){
                for(let aux in pArray)
                    $(`.divBorder${pArray[aux]}`).addClass(wArray[1]);
                
                window.confettiful = new Confettiful(document.querySelector('body'));
                return true;
            } 
            
        }
    
        return false;
    }

    function isFull() {
        for(let i in score) {
            if(score[i] === '') {
                return false;
            }
        }
        return true;
    }

})(jQuery);
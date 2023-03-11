(function ($) {
    let score = {
        a1: '', a2: '', a3: '',
        b1: '', b2: '', b3: '',
        c1: '', c2: '', c3: ''
    };
    let playing = true;
    let turn = 'x';
    let warning = '';

    $('.turn').html(turn);
    $('.result').html(warning);
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
        debugger;
        warning = '';

        // Define turn
        let random = Math.floor(Math.random() * 2);
        turn = (random === 0) ? 'x' : 'o';

        // Clean the scores
        for(let i in score) {
            score[i] = '';
        }

        renderScore();
        renderInfo();
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
        turn = (turn === 'x') ? 'o' : 'x';
        renderInfo();
    }

    function checkGame() {
        if(checkWinnerFor('x')) {
            warning = 'x wins!';
            playing = false;
        } else if(checkWinnerFor('o')) {
            warning = 'o wins!';
            playing = false;
        } else if(isFull()) {
            warning = 'Drawn!';
            playing = false;
        }     
    }

    function checkWinnerFor(i) {
        let pos = [
            'a1,a2,a3',
            'b1,b2,b3',
            'c1,c2,c3',
    
            'a1,b1,c1',
            'a2,b2,c2',
            'a3,b3,c3',
    
            'a1,b2,c3',
            'a3,b2,c1'
        ];
    
        for(let w in pos) {
            let pArray = pos[w].split(',');
            let hasWon = pArray.every(option=>score[option] === i);
            if(hasWon) return true;
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
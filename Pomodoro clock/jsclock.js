var $button1 = document.getElementById('button1');
var $pauzeCount = document.getElementById('pauzecount');
var $pauze = document.getElementById('pauze');
var $reset = document.getElementById('reset');
var $continue = document.getElementById('continue');

$button1.addEventListener('click', function () {
    $pauzeCount.value = parseInt($pauzeCount.value);// `parseInt` converts the `value` from a string to a number
    if ($pauzeCount.value < 20) {
        $pauzeCount.value++;
    }
    // $pauzeCount.value = $pauzeCount.value + ":00";
}, false);

var $button2 = document.getElementById('button2');

$button2.addEventListener('click', function () {
    $pauzeCount.value = parseInt($pauzeCount.value); // `parseInt` converts the `value` from a string to a number
    if ($pauzeCount.value > 1) {
        $pauzeCount.value--;
    }
    // $pauzeCount.value = $pauzeCount.value + ":00";
}, false);

var $button3 = document.getElementById('button3');
var $sessionCount = document.getElementById('sessioncount');
var $display = document.getElementById("SessDiv2");

$button3.addEventListener('click', function () {
    $sessionCount.value = parseInt($sessionCount.value); // `parseInt` converts the `value` from a string to a number
    $display.value = parseInt($display.value);
    if ($sessionCount.value < 60) {
        $sessionCount.value++;
        $display.value++;
    };
    $display.value = $display.value + ":00";
    return $display.value;

}, false);

var $button4 = document.getElementById('button4');

$button4.addEventListener('click', function () {
    $sessionCount.value = parseInt($sessionCount.value); // `parseInt` converts the `value` from a string to a number
    $display.value = parseInt($display.value);
    if ($sessionCount.value > 20) {
        $sessionCount.value--;
        $display.value--;
    };
    $display.value = $display.value + ":00";
    return $display.value;
}, false);



var timerId = 0; //We set timerId to set default time to zero
function clockCountdown() {

    var timeoutHandle;
    if (timerId === 0) { //if time is equal to zero we start function countdown
        var countdownSess = document.getElementById('SessDiv2'); //we take the value from html sessiondiv which is the starting point of the function and we put it inside the function because it needs to be updated after every minute
        var minSecArr = countdownSess.value.split(':'); // We take the value of our new var and we split it and we take the first part of the splitted value and make it a new var
        function countdown(minutes, seconds) { //function countdown officially take two input values but we actually only have to input minutes because the seconds are default starting at 00
            function tick() {
                var counter = document.getElementById("SessDiv2"); //We take this var to declare the place where the countdown needs to work. 
                counter.value =
                    minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds); //here we say take the value of the counter and make it a string whith zero's where needed
                seconds--;
                if (seconds >= 0) { //we set seconds to change after every second
                    timeoutHandle = setTimeout(tick, 1000); //we make the ticking function execute once (!!) every second
                } else { //if minutes is more then one we start the countdown function again 
                    if (minutes >= 1) {
                        // countdown(mins-1);   never reach “00″ issue solved:Contributed by Victor Streithorst          
                        timerId = setTimeout(function () {
                            countdown(minutes - 1, 59);

                        }, 1000);

                    }
                }
            }
            tick();
        }

        countdown(minSecArr[0], 0);

        function pauzeStart() {
            
            if ($pauze.value == 1) {
        
                // To add it later : Add a function to countinue the counting. 
                $pauze.innerHTML = 'pause';
        
                $pauze.value = 0;
                clearTimeout(timerId);
        
                timerId = 0;
                var minSecArr2 = countdownSess.value.split(':'); // we take the var with the current value of the html and we make it a new var and we split it

                countdown(minSecArr2[0], minSecArr2[1]); //then we call the function that counts down the current value and we pass the two new values to it. 
                // console.log('TEST1');
            } else if ($pauze.value == 0) {
                clearTimeout(timeoutHandle);
                $pauze.innerHTML = 'continue';
                $pauze.value = 1;
                // $pauze.setAttribute("id", "continue");
                // console.log('TEST2');
            }
        }

            $pauze.addEventListener('click', pauzeStart);
        


        //     $continue.addEventListener('click', continueStart);

        //     function continueStart() {
        //        alert('this is puase');
        //         $pauze.innerHTML = 'pause';
        //     //     if($pauze.innerHTML = 'continue') {
        //     //         // setInterval(timeoutHandle);
        //     //         // pauzeStart = false;
        //     //     $pauze.innerHTML = 'pause';
        //     //     // var $pauze = document.getElementById('continue');
        //     // } 
        // }              
        // {

        // }

        // while ($pauze.innerHTML = 'continue') {
        //     $pauze.addEventListener('click', continueStart);
        //         function continueStart() {
        //             pauzeStart = false;
        //             $continue.innerHTML = 'pause';
        //         }
        //     }

        // var $continue = document.getElementById('continue');
        // $continue.addEventListener('click', continueStart) {
        //     function continueStart() {
        //     pauzeStart = false;
        // $continue.innerHTML = 'pause';
        //var $pauze = document.getElementById('continue');
        //         }
        // }      



        $reset.addEventListener('click', resetStart);

        function resetStart() {
            clearInterval(timeoutHandle);
            var counterSess = document.getElementById("SessDiv2");
            counterSess.value = $sessionCount.value + ":00";
            var x = document.getElementById("myAudio"); 
            x.play(); 
            location.reload();
        }

    }

};


//function to start the break when the session is zero
// var countdownSess = document.getElementById('SessDiv2'); 
// var countdownSess.value = countdownSess.value + ":00";
//         var minSecArr = countdownSess.value.split(':'); 
//         countdown(minSecArr2[0], minSecArr2[1]);




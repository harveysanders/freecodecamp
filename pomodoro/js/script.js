$(document).ready(function(){
    var breakTime, counter, min, sec, audio, sessionTime, isCounting;
    
    sessionTime = 0;
    breakTime = 5;
    min = 0;
    sec = 0;
    audio = $('audio');
    isCounting = false;
    
    console.log(sessionTime);

    $('#timer').html(min);
    $('#breakTime').html(breakTime);
    
    function setSessionTime(){
        sessionTime = parseFloat($('#sessTime').text()); //secs
        min = sessionTime;
        console.log(sessionTime);
    }

    function timer(){
        
            if(min === 0 && sec =="00"){
                clearInterval(counter);
                $('#timer').html(min  + ":" + sec);
               console.log('is zero');
            }
            else if (min > 0){
                $('#timer').html(min - 1 + ":" + sec);
                  sec--;
            } else {
                $('#timer').html(min  + ":" + sec);
                  sec--;
            }
            
            if(sec < 10 && sec > -1){
                sec = "0" + sec;
              
            }
            if(sec < 0){
                sec = 59;
                min--;
            }
            
    }
    
    setSessionTime();

    $('#timer').on('click', function(){
        if (!isCounting) {
            counter = setInterval(timer, 1000);
        }
        else {
            clearInterval(counter);
        }
        isCounting = !isCounting;
    });
    
    $('#plus').click(function(){
        if(breakTime > 59){
            breakTime = 60;
        }
        breakTime++;
         $('#breakTime').html(breakTime);
    });
    
    $('#minus').click(function(){
        breakTime--;
        if (breakTime < 1) {
            breakTime = 1;
        }
         $('#breakTime').html(breakTime);
    });
   
    
    
});
$(document).ready(function(){
    var breakTime, counter, min, sec, audio, sessionTime, totalSecs, isCounting;
    
    totalSecs = 25 * 60;
    breakTime = 5;
    audio = $('audio');
    isCounting = false;

    $('#breakTime').html(breakTime);
    
    function updateTimer(){
        min = Math.floor(totalSecs/60);
        sec = totalSecs % 60;

        $('#timer').html(min + ':' + pad(sec,2));
    }

    function timer(){
        if (totalSecs > 0) {
            totalSecs--;    
        }
        
        updateTimer();
    }
    $('#timer').on('click', function(){
        if (!isCounting) {
            counter = setInterval(timer, 1000);
        }
        else {
            clearInterval(counter);
        }
        isCounting = !isCounting;
    });
    
    //Break Buttons
    $('#setBreak .plus').click(function(){
        if(breakTime > 59){
            breakTime = 60;
        }
        breakTime++;
         $('#breakTime').html(breakTime);
    });
    
    $('#setBreak .minus').click(function(){
        breakTime--;
        if (breakTime < 1) {
            breakTime = 1;
        }
         $('#breakTime').html(breakTime);
    });
   
   //Session Buttons
   $('#setSession .plus').click(function(){ 
        totalSecs+= 60;
        sessionTime = Math.floor(totalSecs / 60);
        if(sessionTime > 59){
            sessionTime = 60;
        }
        $('#sessTime').html(sessionTime);
        updateTimer();
   });
   $('#setSession .minus').click(function(){ 
        totalSecs-=60;
        sessionTime = Math.floor(totalSecs / 60);
        if(sessionTime < 1){
            sessionTime = 1;
        }
        $('#sessTime').html(sessionTime);
        updateTimer();
   });


   //Initialize Page
   $('#sessTime').html(Math.floor(totalSecs/60));
   updateTimer();
    
});

function pad(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }
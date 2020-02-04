addEventListener('DOMContentLoaded', () => {

    const cl = (text = 'hello world') => {
        console.log(text);
    };

    const hammerList = [
        {hit:[17, 29, 41]},
        {hit:[11, 17, 23]},
        {hit:[5, 9, 13]}
    ];

    let hammer    = 0;
    let currTemp  = 600;
    let inForge   = 0;
    let forgeTemp = 900;

    const progressBarContainer      = document.querySelector('.progress-bar__container');
    const progressBarSample         = document.querySelector('.progress-bar');
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////БЛЯТЬ//////////////////////////////////////////////////////
    const infoBar                   = document.querySelector('.temperature-indicator');
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    const hammerButtons             = document.querySelector('.hammer-selection__container');
    const hitButtons                = document.querySelector('.hammer-action__container');
    const forgeButton               = document.querySelector('.furnace-action-toggle');
    let   progressBarList           = document.querySelectorAll('.progress-bar');
    progressBarContainer.value      = 0;
    hammer = hammerList[0];
    hammerButtons.addEventListener('click', (event) => {
        if (!!event.target.closest('button')) {
            hammer = hammerList[event.target.value];
            cl(hammer);
        }
    });

    hitButtons.addEventListener('click', (event) => {
        if (!!event.target.closest('button')) {
            if (!inForge) {
                cl(event.target);
                progressBarContainer.value += hammer.hit[event.target.value*1]*(1+(currTemp-600)*(currTemp-600)/40000);
                //progressBarList[0].innerText = Math.floor(progressBarContainer.value) + '/500';
                cl('Набито ' + progressBarContainer.value);
            } else {
                alert('Нужно достать заготовку из печи чтобы начать работать');
            }
        }
    });

    forgeButton.addEventListener('click', () => {
        if (inForge) {
            forgeButton.innerText = 'Положить заг-ку';
            inForge = 0;
        } else {
            forgeButton.innerText = 'Достать заг-ку';
            inForge = 1;
        }
    });

    let stepF = () => {
        if (inForge) {
            currTemp += Math.log(forgeTemp - currTemp + 1)/4;
        } else {
            currTemp -= Math.log((currTemp - 30)/2 + 1)/50;
        }
        if (currTemp < 900)
        {
            infoBar.style.backgroundColor='rgb(' + (currTemp-300)/600*256 + ',0,0)';
            //infoBar.style.
        } else {
            infoBar.style.backgroundColor='rgb(255,' + 255*Math.sqrt((currTemp-900)/400) +
                    ',' + 255*((currTemp-900)/400)*((currTemp-900)/400)*((currTemp-900)/400) + ')';
        }
        if ((currTemp+'').slice(-1) == 1)
            {cl(currTemp);}
            /**/
    };

    setInterval(stepF, 100);
});
/*b.addEventListener('click', () => {
*/
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;
const popupVideo= document.getElementById('video');
popupVideo.addEventListener('click', function(e){
    popupOpen(document.getElementById('popup_video'));
    e.preventDefault();
})
const popupCloseButton = document.querySelectorAll('.close-popup');
if(popupCloseButton.length >0){
    for(let index =0;index<popupCloseButton.length;index++){
        const el = popupCloseButton[index];
        el.addEventListener('click', function (e){
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}
function popupOpen(currentPopup){
    if(currentPopup && unlock){
        const popupActive = document.querySelector('.popup.open');
        if(popupActive){
            popupClose(popupActive,false);
        } else{
            bodyLock();
        }
        currentPopup.classList.add('open');
        const temp=document.querySelector('.header');
        temp.classList.add('blure')
        currentPopup.addEventListener('click',function(e){
            if(!e.target.closest('.popup__content')){
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}
function popupClose(popupActive,doUnlock=true){
    if(unlock){
        popupActive.classList.remove('open');
        const temp=document.querySelector('.header');
        temp.classList.remove('blure')
        if(doUnlock){
            bodyUnlock();
        }
    }
}
function bodyLock(){
    const lockPaddingValue= window.innerWidth - document.querySelector('header').offsetwidth + 'px';
    if(lockPadding.length > 0){
        for(let index=0;index<lockPadding.length;index++){
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight= lockPaddingValue;
    body.classList.add('lock');
    unlock=false;
    setTimeout(function(){
        unlock=true;
    },timeout);
}
function bodyUnlock(){
    setTimeout(function(){
        for(let index=0;index<lockPadding.length;index++){
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    },timeout);
    unlock=false;
    setTimeout(function(){
        unlock=true;
    },timeout);
}
document.addEventListener('keydown',function(e){
    if(e.which === 27){
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});
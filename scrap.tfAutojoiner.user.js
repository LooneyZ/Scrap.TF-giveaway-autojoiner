// ==UserScript==
// @name         Scrap.tf autojoiner
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Automatical join for scrap giveaways 
// @author       Looney
// @match        https://scrap.tf/raffles*
// @updateURL    https://raw.githubusercontent.com/LooneyZ/Scrap.TF-giveaway-autojoiner/master/scrap.tfAutojoiner.user.js
// @downloadURL  https://raw.githubusercontent.com/LooneyZ/Scrap.TF-giveaway-autojoiner/master/scrap.tfAutojoiner.user.js
// @grant        none
// ==/UserScript==

(function() {
	
    mainer();
	
    function scrollIt(){
        var scrollText = document.getElementsByClassName("pag-loading")[0].innerHTML;
        if("That's all, no more!" != scrollText){
            window.scrollTo(0,1000000000);
            setTimeout(scrollIt,5000);
        }
        else startJoin();
    }

    function startJoin(){
        var panel = document.getElementsByClassName('panel')[0];
        var raffles = panel.getElementsByClassName('panel-raffle');
        var amount = raffles.length;
        var i = 0;
		
        function getRaffle(){
            if(amount > i){
                var opacity = window.getComputedStyle(raffles[i]).getPropertyValue("opacity");
                if(1 == opacity){
                    var urlElement = raffles[i].id.substr(11);
                    var url = "https://scrap.tf/raffles/"+urlElement+"#join";
                    console.log(url);
                    var win = window.open(url, "", "width=0,height=0");
                    win.blur();
                    win.resizeTo(0,0);
                    win.moveTo(0,window.screen.availHeight+10);
                    window.focus();
                    ++i;
                    setTimeout(getRaffle, 30000);
                }
                else{
                    ++i;
                    getRaffle();
                }   
            }
			else setTimeout(function(){location.reload();}, 300000);
        }
		
        getRaffle();
    }

    function mainer(){
		var currenthref = window.location.href;
		if("/" === currenthref[currenthref.length-1]) currenthref.slice(0,-1);
        if("https://scrap.tf/raffles/ending" !== currenthref && "https://scrap.tf/raffles" !== currenthref){
            if(window.location.hash == "#join"){
                console.log("Entering started");
                enterRaffle();
            }
            else window.close();
        }
        else scrollIt();
    }

    function enterRaffle(){
        if(typeof document.getElementById('raffle-enter') !== 'undefined'){
			if(null == document.getElementById('raffle-enter')) window.close();
            var butvalue = document.getElementById('raffle-enter').innerText;
            if(" Enter Raffle" == butvalue){
                document.getElementById('raffle-enter').click();
            }
            else if(" Leave Raffle" == butvalue) window.close();
        }
        else setTimeout(enterRaffle,1000);
    }
})();
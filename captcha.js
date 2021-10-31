/*
-------------------------------------------------------
CAPTCHAJS
-------------------------------------------------------
(C) 2021 Mr Techtroid - github.com/mrtechtroid
Copyright 2021 Mr Techtroid - github.com/mrtechtroid
-------------------------------------------------------
Terms And Conditions
-------------------------------------------------------
General Rules
-> By Contributing To The Following You Agree That You Are Transferring All Rights Of The Contributing Content To The Owner Or Come Up With A Agreement With The Owner To License The Code. 
-> Modifying/Altering The Code In Such A Way To Make It Malicious Script. (Exceptions Include Modification of User Variables According To THe Situation.)
-> Not Following The Guidelines Here May Result In DMCA Takedowns. 
-------------------------------------------------------
For Non Commerical And Demonstrational Purposes 
-> All Conditions Of General Rules. 
-> You Can Modify THe Code According To Your Needs And Use It In Various Builds. 
-> You Need To Attribute The Author Properly And Not Remove The Original LICENSE Notice.
-------------------------------------------------------
For Commericial Purposes
-> All Conditions Of Non Commercial Purpose Uses And General Rules. 
-> No Part Of The Code Should NOT be Reproduced in any manner digitally without prior permission of the author for Commercial Purposes And Without Attribution To The Author. 
-------------------------------------------------------
Released Under MIT License
*/

/*
This Part Of Code Contains Variables Which Should Be Changed By User.  Do Not Change Any Other Part Of Code
*/
// Create A Captcha Window  In The First Place
// If You Dont Want A Premade Captcha Window And Want to Create On Your Own. Refer To Creating A Captcha Window Section At The Last. 

const CaptchaJS = new Object()
CaptchaJS.author = "Mr Techtroid 2021"
CaptchaJS.versioning = "Beta v0.1.2"
CaptchaJS.createcaptcha = 0
// Location Where The Captcha Window Will Be Added
CaptchaJS.embeddivname = ""
// No Of Random Letters In A Captcha
CaptchaJS.captchalength = 6
// Generate Lines In Captcha
CaptchaJS.linegen = 1
// Generate Background Color In Captcha
CaptchaJS.colorgen = 1
// Generate Dots In Captcha
CaptchaJS.dotsgen = 1
// Audio Captcha
CaptchaJS.audiogen = 0
// Random Letter Captcha 
CaptchaJS.rancaptcha = 1
// Math Problem Captcha 
CaptchaJS.mathcaptcha = 0
// Generate Curves In Captcha
CaptchaJS.curvegen = 1
// No Of Dots Inside THe Captcha
CaptchaJS.nodots = 100
// No Of Lines Inside The Captcha
CaptchaJS.nolines = 5
// No of Curves Inside the Captcha
CaptchaJS.nocurves = 4
// Font Style Of The CAPTCHA
CaptchaJS.captchafont = "30px Arial"
// Amount Of Randomness (0 - No Pixalation)
CaptchaJS.noranddt = 500
/* 
Code - MTT
*/

// NOT TO CHANGED BY USER - ANY CHANGES MADE BELOW THIS LINE MAY CAUSE THE CODE TO MALFUNCTION
// MODIFY THE LINES BELOW THIS AT YOUR OWN RISK

var CaptchaKey = ""
var canv
var ctx
var color = "#"
var MCaptchaSol = ""
var cptsuccess = ""
// 
//  Helper Functions - Used By Other Main Functions For Calculation Of Various Values
CaptchaJS.verifycptc = function(){
    if (document.getElementById("ip-captcha").value == CaptchaKey){
        alert("Success")
        document.getElementById("ip-captcha").value = ""
        CaptchaJS.master()
        document.getElementsByTagName("captcha")[0].remove()
    } else {
        alert("Incorrect Captcha");
        CaptchaJS.master()
        throw new Error ("CAPTCHA Not Correct");
    }
}
CaptchaJS.master = function(){
    function getRandomInt( min, max ) {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
       }
    
    
    function getRC() {
        var letters = 'ABCDEF0123456789';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        
    };
    
    // Main Functions - The Various Functions Used For Generating Various Elements Of The Captcha
    function gentext(){
        printtext = ""
        if (CaptchaJS.mathcaptcha === 1){
            printtext = MCaptchaSol
        }else if (CaptchaJS.rancaptcha === 1){
            printtext = CaptchaKey
        }else {
            printtext = "ERROR"
        };
        // printtext = MCaptchaSol
        ctx.font = CaptchaJS.captchafont;
        ctx.strokeStyle = "black";
        textWidth = ctx.measureText(printtext).width;
        ctx.strokeText(printtext, (canv.width/2) - (textWidth / 2), 30);
        // ctx.setTransform (1, -0.2, 0, 1, 0, 0);
    };
    function genabt(){
        a = "CAPTCHA JS"
        ctx.font = "6px Arial";
        ctx.fillStyle = "white";
        ctx.fillRect(canv.width-40,canv.height-7, canv.width, canv.height);
        ctx.strokeStyle = "black";
        ctx.strokeText(a, canv.width-40, canv.height);
    }
    function gencolor(){
        getRC();
        var grd = ctx.createLinearGradient(0, 0, 200, 0);
        grd.addColorStop(0, color);
        grd.addColorStop(1, "white");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canv.width, canv.height);
    }
    
    function genlines(){
        for (var i= 0; i<CaptchaJS.nolines; i++) {
            ctx.beginPath();
            ctx.moveTo(canv.width*Math.random(),canv.height*Math.random());
            ctx.lineTo(canv.width*Math.random(),canv.height*Math.random());
            ctx.strokeStyle= "rgb(" + Math.round(256*Math.random()) + "," + Math.round(256*Math.random()) + "," + Math.round(256*Math.random()) + ")";
            ctx.stroke();
            ctx.strokeStyle = "black"
        }
    }
    
    function gencurves(){
        for (var i = 0; i<CaptchaJS.nocurves; i++) {
            ctx.beginPath();
            ctx.moveTo(canv.width*Math.random(),canv.height*Math.random());
            ctx.bezierCurveTo(canv.width*Math.random(), canv.height*Math.random(), canv.width*Math.random(), canv.height*Math.random(), canv.width*Math.random(), canv.height*Math.random());
            ctx.strokeStyle= "rgb(" + Math.round(256*Math.random()) + "," + Math.round(256*Math.random()) + "," + Math.round(256*Math.random()) + ")";
            ctx.stroke();
            ctx.strokeStyle = "black"
        }
    }
    function gendots(){
        for (var i=0; i<CaptchaJS.nodots; i++){
            ctx.fillRect(canv.width*Math.random(),canv.height*Math.random(),1,1);
        }
    }
    
    function genaudio(){}
    function pixrandomizer(){
        for (i = 1;CaptchaJS.noranddt>i;i++){
            a = getRandomInt(0,canv.width)
            b = getRandomInt(0,canv.height)
            c = getRandomInt(-5,+5)
            d = getRandomInt(-5,+5)
            p = a + c
            q = b + d
            if (a>canv.width-40 & b>canv.height-7){
            }else {
                var imgData = ctx.getImageData(a,b, 2, 2);
                ctx.putImageData(imgData, p, q);
            }
            
        }
    }
    function gencaptcha() {
        var tokens = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            chars = CaptchaJS.captchalength,
            segments = 1;
            CaptchaKey = ""
            // tokens = "0123456789"
            
        for( var i = 0; i < segments; i++ ) {
            var segment = "";
            
            for( var j = 0; j < chars; j++ ) {
                var k = getRandomInt( 0, tokens.length - 1);
                segment += tokens[ k ];
            }
            
            CaptchaKey += segment;
            
            if( i < ( segments - 1 ) ) {
                CaptchaKey += "-";
            }
        }
    }
    function genRandomCaptcha(){
        gencaptcha()
    }
    
    function genMathCaptcha(){
        var c001, c002 = ""
        c001 = getRandomInt(0, 50);
        c002 = getRandomInt(0,50);
        MCaptchaSol = c001 + "+" + c002
        CaptchaKey = c001 + c002
    }
    canv = document.getElementById("cjsimg")
    ctx = canv.getContext("2d");
    document.getElementById("ip-captcha").value = ""
    ctx.clearRect(0, 0, canv.width, canv.height);
    color = "#"
    if (CaptchaJS.colorgen == 1){
        gencolor()
    }
    if (CaptchaJS.linegen == 1){
        genlines()
    }
    if (CaptchaJS.dotsgen == 1){
        gendots()
    }
    genabt()
    if (CaptchaJS.rancaptcha == 1){
        genRandomCaptcha()
    }
    if (CaptchaJS.mathcaptcha == 1){
        genMathCaptcha()
    }
    if (CaptchaJS.curvegen ==1){
        gencurves()
    }
    gentext()
    pixrandomizer()
    
}
CaptchaJS.init = function () {
    // ct = document.getElementsByTagName("captcha")[0]
    ct = document.getElementsByTagName("captcha")[0]
    ct.insertAdjacentHTML('beforeend', '<div id = "cjsmain" style = "background-color: white;max-width: max-content;max-height: max-content;background-color: #663737;border: lime;border-width: 3px;border-style: solid;border-radius: 10px;width: 290px;"> <div id = "ctpimgholder" style = "margin: 5px;"> <center> <canvas id = "cjsimg" width="200" height="50" style="z-index: 4;">Your Browser Doesnt Support JS</canvas> </center> </div> <div id = "ctpvalidator" style="display: flex;flex-direction: row;"> <input placeholder="CAPTCHA" id = "ip-captcha" style = "outline: none;padding: 10px 20px;margin: 8px 0;box-sizing: border-box;background-color: white;color: black;border-color:crimson;width:180px;"> <span style = "display: flex;flex-direction: column;width:28px;"><span onclick = "CaptchaJS.master();" style = "color: blue;font-size: 20px;margin: 0%;padding: 0%;">🔄</span><span onclick = "CaptchaJS.verifycptc();" style = "color: green;font-size: 20px;margin: 0%;padding: 0%;">✔️</span></span> </div> </div>')
    console.log("Captcha JS Initisalised!")
    CaptchaJS.master()
}
CaptchaJS.init()

/*
 FICHIER JAVASCRIPT
 */
var c;
var ctx;
var ctxw;
var ctxh;

var D = new Date();
var H_min = D.getMinutes();
var H_h = D.getHours();
var H_s = D.getSeconds();

function Losange(pd,gds,gdi,tab_couleur) {
    this.pd = pd;
    this.gds = gds;
    this.gdi = gdi;
    this.tab_couleur = tab_couleur;
}
Losange.prototype.draw = function(ctx) {
	var W = ctx.canvas.width;
	var H = ctx.canvas.height;
	ctx.fillStyle = "rgb("
		+ this.tab_couleur[0]+","
		+ this.tab_couleur[1]+","
		+ this.tab_couleur[2]+")";
	ctx.beginPath();
	ctx.moveTo(this.pd/2*W,0);
	ctx.lineTo(0,-this.gds*H);
	ctx.lineTo(-this.pd/2*W,0);
	ctx.lineTo(0,this.gdi*H);
	ctx.lineTo(this.pd/2*W,0);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

var auiguille = { 
    petite : new Losange(3E-2,0.25,4E-2,[0,255,0]),
    grande : new Losange(1E-2,0.30,6E-2,[0,0,255]),
    troteuse : new Losange(5E-3,0.35,8E-2,[255,0,0]),
}    
function log(msg) {
    console.log(msg);
}
function page_chargee() {
    console.log("Page Chargée");
	c = document.getElementById('zone_canvas');
	ctx = c.getContext("2d");
	ctxw = ctx.canvas.width;
	ctxh = ctx.canvas.height;
	setInterval(draw,50)
}

function draw_fond(){
	//ctx.save() //sauvegarde cadre+graduations
}
function draw() {
	ctx.clearRect(0,0,ctxw,ctxh);
	horloge_cadre();
	horloge_graduations();
	ctx.translate(ctxw/2,ctxh/2);
	D = new Date();
	H_s = D.getSeconds()+D.getMilliseconds()/1000;
	H_min = D.getMinutes()+H_s/60;
	H_h = D.getHours()+H_min/60;
	horloge_auiguille_petite();
	horloge_auiguille_grande();
	horloge_auiguille_troteuse();
	ctx.translate(-ctxw/2,-ctxh/2);
}
function horloge_cadre() {
	ctx.fillStyle = '#CCCCCC';
	ctx.strokeStyle = '#000000';
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.arc(ctxw/2,ctxh/2,ctxw*0.4,0,2*Math.PI,true);
	ctx.fill();
	ctx.stroke();
}
function horloge_graduations() {
	ctx.beginPath();
	var dx;
	var dy;
	for ( var t = 0 ; t < 12 ; t++) {
		ctx.moveTo(ctxw/2,ctxh/2);
		dx = ctxw*.4*Math.cos(t*2*Math.PI/12);
		dy = ctxw*.4*Math.sin(t*2*Math.PI/12);
		ctx.lineTo(ctxw/2+dx,ctxh/2+dy);
		ctx.stroke();
	}		

	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.arc(ctxw/2,ctxh/2,ctxw*0.35,0,2*Math.PI,true);
	ctx.fill();
}
function horloge_auiguille_grande() {
	ctx.rotate(2*Math.PI/60*H_min);
	auiguille.grande.draw(ctx);
	ctx.rotate(-2*Math.PI/60*H_min);
}

function horloge_auiguille_petite() {
	ctx.rotate(2*Math.PI/12*H_h);
	auiguille.petite.draw(ctx);
	ctx.rotate(-2*Math.PI/12*H_h);
}
function horloge_auiguille_troteuse() {
	ctx.rotate(2*Math.PI/60*H_s);
	auiguille.troteuse.draw(ctx);
	ctx.rotate(-2*Math.PI/60*H_s);
}


window.addEventListener("load",page_chargee);

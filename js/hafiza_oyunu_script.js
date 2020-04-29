const resimler = document.querySelectorAll('.resimler');
var cevrilenler = new Array();
var i = 0;
var x;
var hamleSayisi = 0;
var gecenSure = "";
var oyunCalisiyor = false;
var zamanlayiciDurumu;
let resimCevrildi = false;
let dondu = false;
let secim1;
let secim2;

function kartiCevir() {
	if (oyunCalisiyor) {
		if (dondu) return;
		if (this === secim1) return;
		this.classList.add('cevir');
		if (!resimCevrildi) {
			resimCevrildi = true;
			secim1 = this;
			return;
		}
		secim2 = this;
		ayniMi();
	}
	else	return;
}

function ayniMi() {
	hamleSayisi++;
	x = document.getElementsByClassName("hamle_sayisi");
	x[0].innerHTML = "<i class = \"hamle_sayisi\">Hamle sayisi: " + hamleSayisi + "</i>";
	if (secim1.dataset.framework === secim2.dataset.framework)	kartlariTut();
	else	kartlariCevir(secim1, secim2);
}

function kartlariTut() {
	cevrilenler[i] = secim1;
	i++;
	cevrilenler[i] = secim2;
	i++;
	secim1.removeEventListener('click', kartiCevir);
	secim2.removeEventListener('click', kartiCevir);
	yeniCekimeHazirla(secim1, secim2);
	if (i > 18) {
		oyunuBitir("KAZANDIN!");
	}
}

function kartlariCevir(s1, s2) {
	dondu = true;
	setTimeout(() => {
		s1.classList.remove('cevir');
		s2.classList.remove('cevir');
		yeniCekimeHazirla(s1, s2);
	}, 800);
}

function yeniCekimeHazirla(c1, c2) {
	resimCevrildi = false;
	dondu = false;
	c1 = null;
	c2 = null;
}

function karistir() {
	resimler.forEach(resim => {
		resim.style.order = Math.floor(Math.random() * 25);
	});
}

function yapiyiCalistir() {
	if (oyunCalisiyor) {
		alert("Once oyunu bitirmelisiniz!");
		return;
	}
	for (j = 0; j < i - 1; j++)	kartlariCevir(cevrilenler[j], cevrilenler[j + 1]);
	//	YENIDEN BASLATILIYOR
	i = 0;
	for (i; i < 10; i++) {
		yeniCekimeHazirla(cevrilenler[i], cevrilenler[i + 1]);
		cevrilenler[i] = null;
	}
	i = 0;
	karistir();
	x = document.getElementsByClassName("sonuc");
	x[0].innerHTML = "<i class = \"sonuc\">Kartlar yeniden karistirildi.</i>";
	location.reload();
}

function oyunuDurumu() {
	oyunCalisiyor = !oyunCalisiyor;
	if (oyunCalisiyor) {
		x = document.getElementsByClassName("dugme2_yazi");
		x[0].innerHTML = "<i class = \"dugme2_yazi\">Oyunu bitir</i>";
		//	OYUN BASLADI
		zamanlayiciyiCalistir();
		x = document.getElementsByClassName("sonuc");
		x[0].innerHTML = "<i class = \"sonuc\"></i>";
		karistir();
	}
	else {
		oyunuBitir("KAYBETTIN!");
	}
}

function zamanlayiciyiCalistir() {
	var suan = new Date();
	zamanlayiciDurumu = setInterval(() => zamaniGoster(suan), 1000);
}

function zamaniGoster(onceki) {
	var simdi = new Date();
	x = document.getElementsByClassName("gecen_sure");
	if (Math.floor((simdi - onceki) / 1000) >= 60) {
		x[0].innerHTML = "<i class = \"gecen_sure\">Gecen sure: "
						+ Math.floor((simdi - onceki) / 1000 / 60)
						+ " dakika "
						+ Math.floor((simdi - onceki) / 1000 % 60)
						+ " saniye</i>";
	}
	else {
		x[0].innerHTML = "<i class = \"gecen_sure\">Gecen sure: "
						+ Math.floor((simdi - onceki) / 1000)
						+ " saniye</i>";
	}
	gecenSure = x[0].innerHTML;
}

function oyunuBitir(ileti) {
	x = document.getElementsByClassName("dugme2_yazi");
	x[0].innerHTML = "<i class = \"dugme2_yazi\">Oyunu baslat</i>";
	clearInterval(zamanlayiciDurumu);
	x = document.getElementsByClassName("sonuc");
	x[0].innerHTML = "<i class = \"sonuc\">"
						+ gecenSure
						+ "<br>Hamle sayisi: " + hamleSayisi
						+ "<br><i style = \"color: red;\">" + ileti + "</i></i>";
	hamleSayisi = 0;
	oyunCalisiyor = false;
}

karistir();

resimler.forEach(resim => resim.addEventListener('click', kartiCevir));
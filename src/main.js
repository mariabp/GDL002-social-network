'use strict';

const dataObj = SERVICES.vendors;
/* ---------------- FETCHING DATA ---------------- */
/*
fetch('https://raw.githubusercontent.com/shareazc/GDL002-social-network/master/src/data/services.json')
  .then((data) => {
	// convert data to JSON
	return data.json();
  }).then((dataAsJSON) => {
	// cualquier operación con la data ya procesada
	console.log(Object.values(dataAsJSON));
  });
*/
///

//----------------------------------------
let servicesList = [];
let servicesInfo = "";
/* ------------------ SELECT DIVS AS ELEMENTS ----------------- */
//--------------Searchbar & Menu --------------------------------
const searchBtn = document.querySelector('#btnsearch');
const searchInput = document.querySelector('#searchbar');
const menuBtn = document.querySelector('#btnmenu');
//------------------Categories-------------------------------------
const healthBtn = document.querySelector('#health');
const accomodationBtn = document.querySelector('#accomodation');
const placesBtn = document.querySelector('#places');
const shoppingBtn = document.querySelector('#shopping');
const educationBtn = document.querySelector('#education');
const nonprofitBtn = document.querySelector('nonprofit');
//-------------------Review Elements------------------------------

let givenVendorsList = dataObj;

const cardInfoLayout = (givenVendorsList) => {

	feed.innerHTML = "";

	let cardInfo = "";

	let cardInfoId = 1;

	const showSecondaryInfo = (event) => {

		let cardInfoIdDiv = event.currentTarget;
		let clickedElement = cardInfoIdDiv.querySelector("[id^='secondaryinfoid']");

		if (clickedElement.style.display === "grid") {
			clickedElement.style.display = "none";
		} else {
			clickedElement.style.display = "grid";
		}

	};

	//Función que aparece div donde se muestran las opiniones
	const showReviews = () => {

		let reviewContainer = document.querySelector("[id^='reviewcontainer']");

		if (reviewContainer.style.display === "grid") {
			reviewContainer.style.display = "none";
		} else {
			reviewContainer.style.display = "grid";
		}

	};

	//Funcion para mostrar div para ingresar opinión
	const showRateForm = () => {
		rateForm = document.querySelector('#rateform');
		rateForm.style.display = 'grid';
	};

	givenVendorsList.forEach((element) => {

		cardInfo =

			`<div id="cardinfoid${cardInfoId}" class="cardinfolayout">

					<div id="primaryinfoid${cardInfoId}" class="primaryinfolayout">

						<div id="leftbar"></div>
						<div id="rating">${element.rating}</div>
						<div id="name">${element.name}</div>
						<div id="btnfavorite"><i class="far fa-star"></i></div>
						<div id="generals">${element.general}</div>

					</div>

					<div id="secondaryinfoid${cardInfoId}" class="secondaryinfolayout">

						<div id="secondaryleftbar"></div>

						<div id="contactinfo">
							<div id="schedule"><i class="fas fa-clock"></i></div>
							<div id="scheduleinfo">${element.hours}</div>
							<div id="telephone"><i class="fas fa-phone"></i></div>
							<div id="telephoneinfo">${element.phone}</div>
							<div id="website"><i class="fas fa-globe"></i></div>
							<div id="websiteinfo">${element.website}</div>
							<div id="address"><i class="fas fa-map-marker"></i></div>
							<div id="addressinfo">${element.address}</div>
						</div>

						<div id="perks">${element.perks}</div>

						<div id="reviewgrid">
							<div id="btnshowreviews${cardInfoId}" class="btnshowreviewsstyle">Opiniones</div>
							<div id="btnrate">Calificar</div>
						</div>

					</div>

					<div id="reviewcontainer${cardInfoId}" class="reviewcontainerstyle">

						<div id="btnedit"><i class="far fa-edit fa-xs"></i></div>
						<div id="authorinfo">Fulanita escribió:</div>
						<div id="writtenreview">"Fido se enfermó de la panza y el veterinario lo apapachó y lo curó."</div>
						<div id="heartcount">3</div>
						<div id="heart"><i class="far fa-heart"></i></div>

					</div>

					<form id="rateform">

						<div id="ratetitle">Tu calificación:</div>

						<div id="ratebar">
							<div id="onestar"><i class="far fa-star"></i></div>
							<div id="twostar"><i class="far fa-star"></i></div>
							<div id="threestar"><i class="far fa-star"></i></div>
							<div id="fourstar"><i class="far fa-star"></i></div>
							<div id="fivestar"><i class="far fa-star"></i></div>
						</div>

						<div id="opiniontitle">Tu opinión: </div>
						<textarea id="opinion" class="textinput" placeholder="Escribe aquí tu opinión..."></textarea>
						<div id="veracitycheck" ><input type="checkbox" value="true">Juro que es la verdad y nadamas que la verdad</div> 
						<input id="btnsubmit" type="button" value="Enviar">

					</form>

				</div>`
		;

		cardInfoId++;
		feed.innerHTML += cardInfo;

	});

	let cardInfoIds = document.querySelectorAll("[id^='cardinfoid']");

	cardInfoIds.forEach((element) => {
		element.addEventListener('click', showSecondaryInfo);
	});

	let btnShowReviews = document.querySelector("[id^='btnshowreviews']");

	btnShowReviews.addEventListener('click', showReviews);

	document.querySelector('#btnrate').addEventListener('click', showRateForm);

};

//---------------------- BUTTONS ---------------------------------
healthBtn.addEventListener('click',cardInfoLayout(givenVendorsList));
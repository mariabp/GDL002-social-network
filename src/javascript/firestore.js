//------------------Categories-------------------------------------

const feed = document.querySelector('#feed');

const healthBtn = document.querySelector('#health');
const accommodationBtn = document.querySelector('#accommodation');
const petfriendlyBtn = document.querySelector('#petfriendly');
const shoppingBtn = document.querySelector('#shopping');
const educationBtn = document.querySelector('#education');

const subHealthBtn = document.querySelector('#subhealth');
const subAccommodationBtn = document.querySelector('#subaccommodation');
const subPetFriendlyBtn = document.querySelector('#subpetfriendly');
const subShoppingBtn = document.querySelector('#subshopping');
const subEducationBtn = document.querySelector('#subeducation');
const subNonProfitBtn = document.querySelector('#subnonprofit');

const suggestForm = document.querySelector('#suggestform');

const reviewContainer = document.querySelector('#reviewcontainer');

const db = firebase.firestore();
//Función que muestra elementos según la categoría seleccionada

const showCategory = (event) => {

	feed.innerHTML = '';

	let eventTargetCategory = event.currentTarget.dataset.category;

	const renderCard = (doc) => {

		const showSecondaryInfo = () => {

			if (secondaryInfo.style.display === 'grid') {
				secondaryInfo.style.display = 'none';
			} else {
				secondaryInfo.style.display = 'grid';
			}

		};

		const showReviews = () => {

            reviewContainer.innerHTML = '';

			const renderReviewCard = (element) => {

                let singleReview = document.createElement('div');
                singleReview.setAttribute('id', 'singlereview');
                singleReview.setAttribute('data-id', element.id);


                let editBtn = document.createElement('div');
                editBtn.setAttribute('id', 'btnedit');
                editBtn.innerHTML = '<i class="fas fa-pen fa-xs"></i>';

                let deleteBtn = document.createElement('div');
                deleteBtn.setAttribute('id', 'btndelete');
                deleteBtn.innerHTML = '<i class="fas fa-trash-alt fa-xs"></i>';

                let authorInfo = document.createElement('div');
                authorInfo.setAttribute('id', 'authorinfo');
                authorInfo.innerHTML = 'Un usuario escribió: '

                let writtenReview = document.createElement('div');
                writtenReview.setAttribute('id', 'writtenreview');
                writtenReview.innerHTML = element.data().opinion;

                singleReview.appendChild(editBtn);
                singleReview.appendChild(deleteBtn);
                singleReview.appendChild(authorInfo);
                singleReview.appendChild(writtenReview);
                reviewContainer.appendChild(singleReview);
                cardInfo.appendChild(reviewContainer);

                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    let id = element.id;
                    //console.log(id);
                    db.collection('reviews').doc(id).delete();
                    showReviews();
                });
            };

                /* real-time listener
                db.collection('reviews').onSnapshot(snapshot => {
                    let changes = snapshot.docChanges();
                    changes.forEach(change => {
                        console.log(change.doc.data());
                        if(change.type == 'added'){
                            renderReviewCard(change.doc);
                        } else if (change.type == 'removed'){
                            let singleReview = reviewContainer.querySelector('[element.id=' + change.element.id + ']');
                            reviewContainer.removeChild(singleReview);
                        }
                    });
                });*/

            db.collection('reviews').get().then((snapshotreviews) => {

                let selectedReviews = [];

                snapshotreviews.forEach((reviewsdoc) => {

                    if (reviewsdoc.data().name === doc.data().name) {
                        selectedReviews.push(reviewsdoc);
                    }

                });

                selectedReviews.forEach((element) => {

                    renderReviewCard(element);

                });

            });

            if (reviewContainer.style.display === 'grid') {
                reviewContainer.style.display = 'none';
            } else {
                reviewContainer.style.display = 'grid';
            }

    };

		const showRateForm = () => {

			if (rateForm.style.display === 'grid') {
				rateForm.style.display = 'none';
			} else {
				rateForm.style.display = 'grid';
			}

		};

		let cardInfo = document.createElement('div');
		cardInfo.setAttribute('class', 'cardinfolayout');

		let primaryInfo = document.createElement('div');
		primaryInfo.setAttribute('class', 'primaryinfolayout')

		let leftbar = document.createElement('div');
		leftbar.setAttribute('id', 'leftbar');

        let name = document.createElement('div');
        name.setAttribute('name', 'name');
		name.setAttribute('id', 'name');
		name.innerHTML = doc.data().name;

		let likes = document.createElement('div');
		likes.setAttribute('id', 'likes');
		likes.innerHTML = doc.data().likes;

		let perks = document.createElement('div');
		perks.setAttribute('id', 'perks');
		perks.innerHTML = doc.data().perks;

		let btnLike = document.createElement('div');
		btnLike.setAttribute('id', 'btnlike');
		btnLike.innerHTML = '<i class="far fa-thumbs-up"></i>';

		let btnMore = document.createElement('div');
		btnMore.setAttribute('id', 'btnmore');
		btnMore.innerHTML = '<i class="fas fa-caret-down"></i>';
		btnMore.addEventListener('click', showSecondaryInfo);

		primaryInfo.appendChild(leftbar);
		primaryInfo.appendChild(name);
		primaryInfo.appendChild(likes);
		primaryInfo.appendChild(perks);
		primaryInfo.appendChild(btnLike);
		primaryInfo.appendChild(btnMore);

		cardInfo.appendChild(primaryInfo);

		let secondaryInfo = document.createElement('div');
		secondaryInfo.setAttribute('class', "secondaryinfolayout");

		let secondaryLeftBar = document.createElement('div');
		secondaryLeftBar.setAttribute('id', 'secondaryleftbar');

		let contactInfo = document.createElement('div');
		contactInfo.setAttribute('id', 'contactinfo');

		let schedule = document.createElement('div');
		schedule.setAttribute('id', 'schedule');
		schedule.innerHTML = '<i class="fas fa-clock"></i>';

		let scheduleInfo = document.createElement('div');
		scheduleInfo.setAttribute('id', 'scheduleinfo');
		scheduleInfo.innerHTML = doc.data().scheduleinfo;

		let telephone = document.createElement('div');
		telephone.setAttribute('id', 'telephone');
		telephone.innerHTML = '<i class="fas fa-phone"></i>';

		let telephoneInfo = document.createElement('div');
		telephoneInfo.setAttribute('id', 'telephoneinfo');
		telephoneInfo.innerHTML = doc.data().telephoneinfo;

		let website = document.createElement('div');
		website.setAttribute('id', 'website');
		website.innerHTML = '<i class="fas fa-globe"></i>';

		let websiteInfo = document.createElement('div');
		websiteInfo.setAttribute('id', 'websiteinfo');
		websiteInfo.innerHTML = doc.data().websiteinfo;

		let address = document.createElement('div');
		address.setAttribute('id', 'address');
		address.innerHTML = '<i class="fas fa-map-marker"></i>';

		let addressInfo = document.createElement('div');
		addressInfo.setAttribute('id', 'addressinfo');
		addressInfo.innerHTML = doc.data().addressinfo;

		let reviewGrid = document.createElement('div');
		reviewGrid.setAttribute('id', 'reviewgrid');

		let showReviewsBtn = document.createElement('div');
		showReviewsBtn.setAttribute('class', 'btnshowreviewsstyle');
		showReviewsBtn.innerHTML = 'Opiniones';
		showReviewsBtn.addEventListener('click', showReviews);

		let showRateFormBtn = document.createElement('div');
		showRateFormBtn.setAttribute('id', 'btnrate');
		showRateFormBtn.innerHTML = 'Calificar';
		showRateFormBtn.addEventListener('click', showRateForm);

		reviewGrid.appendChild(showRateFormBtn);
		reviewGrid.appendChild(showReviewsBtn);

		contactInfo.appendChild(addressInfo);
		contactInfo.appendChild(address);
		contactInfo.appendChild(websiteInfo);
		contactInfo.appendChild(website);
		contactInfo.appendChild(telephoneInfo);
		contactInfo.appendChild(telephone);
		contactInfo.appendChild(scheduleInfo);
		contactInfo.appendChild(schedule);

		secondaryInfo.appendChild(reviewGrid);
		secondaryInfo.appendChild(contactInfo);
		secondaryInfo.appendChild(secondaryLeftBar);

		cardInfo.appendChild(secondaryInfo);


		const validateReview = () => {

			if (opinion.value.length < 1) {

				opinion.placeholder = "Tu opinión no puede estar vacía"
				opinion.style.background = 'rgb(255, 153, 153)';

			} else {

				opinion.style.background = 'rgb(255, 255, 255)';
				sendReview();

			}
		};

        const sendReview = () => {

            db.collection('reviews').add({

                opinion: rateForm.opinion.value,
                name: doc.data().name

            });

            opinion.value = '';
			opinion.placeholder = '¡Gracias por tu valioso aporte!';
			opinionTitle.style.display = 'none';
			submitBtn.style.display = 'none';
			veracityCheck.style.display = 'none';

        };



		//Elementos de RateForm
		let rateForm = document.createElement('form');
		rateForm.setAttribute('id', 'rateform');

		let rateTitle = document.createElement('div');
		rateTitle.setAttribute('id', 'ratetitle');
		rateTitle.innerHTML = ('¡Comparte tu opinión acerca de este establecimiento!');

		let opinionTitle = document.createElement('div');
		opinionTitle.setAttribute('id', 'opiniontitle');
		opinionTitle.innerHTML = ('Tu opinión: ');

		let opinion = document.createElement('textarea');
		opinion.setAttribute('id', 'opinion');
		opinion.setAttribute('name', 'opinion')
		opinion.setAttribute('class', 'textinput');
		opinion.setAttribute('placeholder', 'Escribe aquí tu opinión...');

		let veracityCheck = document.createElement('div');
		veracityCheck.setAttribute('id', 'veracitycheck');
		veracityCheck.innerHTML = ('Juro que estoy diciendo la verdad');

		let checkbox = document.createElement('input');
		checkbox.setAttribute('id', 'checkbox');
		checkbox.setAttribute('type', 'checkbox');
		checkbox.setAttribute('value', 'true');

		let checkboxBtn = document.createElement('input');
		checkboxBtn.setAttribute('type', 'checkbox');
		checkboxBtn.setAttribute('value', 'true');

		let submitBtn = document.createElement('input');
		submitBtn.setAttribute('id', 'btnsubmit');
		submitBtn.setAttribute('type', 'button');
		submitBtn.setAttribute('value', 'Enviar');
		submitBtn.addEventListener('click', sendReview);

		rateForm.appendChild(submitBtn);
		veracityCheck.appendChild(checkbox);
		rateForm.appendChild(veracityCheck);
		rateForm.appendChild(opinion);
		rateForm.appendChild(opinionTitle);
		rateForm.appendChild(rateTitle);
		cardInfo.appendChild(rateForm);

		feed.appendChild(cardInfo);

	};

    db.collection('vendors').get().then((snapshot) => {

		snapshot.forEach((doc) => {

			if (eventTargetCategory === doc.data().category) {
				renderCard(doc);
			}

		});

	});

};

//Función que se ejecuta al hacer click en botón y agrega lugares sugeridos a base de datos en firestore
suggestForm.addEventListener('submit', (event) => {

    event.preventDefault();

    db.collection('suggestedVendors').add({
        name: suggestForm.name.value,
        category: suggestForm.category.value,
        website: suggestForm.website.value,
        address: suggestForm.address.value,
        telephone: suggestForm.telephone.value,
        schedule: suggestForm.schedule.value,
        perks: suggestForm.perks.value,
    });

    suggestForm.name.value = '';
    suggestForm.category.value = '';
    suggestForm.website.value = '';
    suggestForm.address.value = '';
    suggestForm.telephone.value = '';
    suggestForm.schedule.value = '';
    suggestForm.perks.value = '';

});

//Botones de la barra de categorías

healthBtn.addEventListener('click', showCategory);
accommodationBtn.addEventListener('click', showCategory);
petfriendlyBtn.addEventListener('click', showCategory);
shoppingBtn.addEventListener('click', showCategory);
educationBtn.addEventListener('click', showCategory);

//Botones de la barra de menú
subHealthBtn.addEventListener('click', showCategory);
subAccommodationBtn.addEventListener('click', showCategory);
subPetFriendlyBtn.addEventListener('click', showCategory);
subShoppingBtn.addEventListener('click', showCategory);
subEducationBtn.addEventListener('click', showCategory);
subNonProfitBtn.addEventListener('click', showCategory);

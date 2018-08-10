'use strict';

const programsName = {
    'gym': 'Тренажерный зал',
    'fitness': 'Фитнес',
    'individual-sessions': 'Индивидуальные занятия',
    'cross-fit':'Кроссфит',
    'pilates': 'Пилатес',
    'yoga-w': 'Женская йога',
    'yoga-m': 'Мужская йога',
    'boxing':'Бокс',
    'boxing-t':'Тайский бокс',
    'powerlifting':'Пауэрлифтинг',
    'fitness-k':'Детский фитнес'
}

const programs = [
    {
        id:'gym',
        name:'Тренажерный зал',
        price:'200 грн',
        time:'Пн-Сб 18:00-20:00',
        place: 'г. Киев, ул.Центр, дом. 1',
        age: false,
        sex: false,
        weight: false,
        sportKinds:[]
    },
    {
        id:'fitness',
        name:'Фитнес',
        price:'235 грн',
        time:'Пн-Сб 18:00-20:00',
        place:'г. Киев, ул.Центр, дом. 1',
        age:false,
        sex:false,
        weight:[0,120],
        sportKinds:['fitness']
    },
    {
        id:'individual-sessions',
        name:'Индивидуальные занятия',
        price:'300 грн',
        time:'Пн-Сб 18:00-20:00',
        place:'г. Киев, ул.Центр, дом. 1',
        age:false,
        sex:false,
        weight:false,
        sportKinds:[]
    },
    {
        id:'cross-fit',
        name:'Кроссфит',
        price:'200 грн',
        time:'Пн-Сб 18:00-20:00',
        place:'г. Киев, ул.Центр, дом. 1',
        age:[16,50],
        sex:false,
        weight:[50,120],
        sportKinds:['fitness']
    },
    {
        id:'pilates',
        name:'Пилатес',
        price:'220 грн',
        time:'Пн-Сб 18:00-20:00',
        place:'г. Киев, ул.Центр, дом. 1',
        age:[16,60],
        sex:'Female',
        weight:[0,120],
        sportKinds:['fitness']
    },
    {
        id:'yoga-w',
        name:'Женская йога',
        price:'235 грн',
        time:'Пн-Сб 18:00-20:00',
        place:'г. Киев, ул.Центр, дом. 1',
        age:[16,60],
        sex:'Female',
        weight:[0,120],
        sportKinds:['yoga']
    },
    {
        id:'yoga-m',
        name:'Мужская йога',
        price:'235 грн',
        time:'Пн-Сб 18:00-20:00',
        place:'г. Киев, ул.Центр, дом. 1',
        age:[16,60],
        sex:'Male',
        weight:[0,120],
        sportKinds:['yoga']
    },
    {
        id:'box',
        name:'Бокс',
        price:'235 грн',
        time:'Пн-Сб 18:00-20:00',
        place:'г. Киев, ул.Центр, дом. 1',
        age:[18,40],
        sex:'Male',
        weight:[0,120],
        sportKinds:['boxing']
    },
    {
        id:'box-t',
        name:'Тайский бокс',
        price:'235 грн',
        time:'Пн-Сб 18:00-20:00',
        place:'г. Киев, ул.Центр, дом. 1',
        age:[18,40],
        sex:'Male',
        weight:[0,120],
        sportKinds:['boxing', 'thai-boxing']
    },
    {
        id:'powerlifting',
        name:'Пауэрлифтинг',
        price:'235 грн',
        time:'Пн-Сб 18:00-20:00',
        place:'г. Киев, ул.Центр, дом. 1',
        age:[20,40],
        sex:'Male',
        weight:[0,120],
        sportKinds:['weightlifting', 'powerlifting']
    },
    {
        id:'fitness-k',
        name:'Детский фитнес',
        price:'150 грн',
        time:'Пн-Сб 18:00-20:00',
        place:'г. Киев, ул.Центр, дом. 1',
        age:[7,16],
        sex:false,
        weight:false,
        sportKinds:['fitness']
    },
];

const getPrograms = (data) => {
    const result = [];

    programs.forEach(program=>{
        if(program.weight && (data.weight <= program.weight[0] || data.weight >= program.weight[1])){
            return;
        };
        if(program.age && (data.age <= program.age[0] || data.age >= program.age[1])){
            return;
        };
        if(program.sex && data.sex !== program.sex){
            return;
        };
        if(program.sportKinds.length>0 && data.sportKinds !== 'any' && program.sportKinds.indexOf(data.sportKinds) === -1){
            return;
        };
        result.push(program)
    });

    return result
};

const selectedPrograms = [];

function initMap() {
    const coordinates = {lat: 50.448538, lng: 30.522542};
    const image = 'svg/map-pointer32.png';
    const map = new google.maps.Map(document.getElementById('map'), {
            center: coordinates,
            disableDefaultUI: true,
            zoom: 8
        });
    const marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        icon: image,
        animation: google.maps.Animation.BOUNCE
    });
}

const checkFields = () =>{
    const userName = document.getElementById('user_name').value;
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const sex = document.getElementById('sex').value;
    const sportKinds = document.getElementById('sport-kinds').value;
    const fields = {
        userName,
        age:parseInt(age),
        weight:parseInt(weight),
        sex,
        sportKinds
    };

    for (let key in fields){
      if(fields[key] === '') return;
    }

    const programs = getPrograms(fields);
    let programsHTML = '';

    programs.forEach(item=>{
        programsHTML +=`
                    <div class="program-container">
						<div class="program-name">${item.name}</div>
						<div class="program-info">
							<input type="checkbox" id="${item.id}" class="program-checkbox">
							<label for="${item.id}"></label>
							<div class="program-details">
								<div class="program-price">
								    <svg class="icon">
							            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="./svg/iconsprite.svg#price" ></use>
						            </svg>
                                    ${item.price}
								</div>
								<div class="program-held-time">
								    <svg class="icon">
							            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="./svg/iconsprite.svg#clock" ></use>
						            </svg>
                                    ${item.time}
                                    </div>
								<div class="program-held-place">
								    <svg class="icon">
							            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="./svg/iconsprite.svg#location" ></use>
						            </svg>
                                    ${item.place}
                                </div>
							</div>
						</div>
					</div>
        `
    });

    document.getElementById('programs-list').innerHTML = programsHTML;
    document.getElementById('programs').style.display = 'flex'
};

const modalClose = () => {
    document.getElementById('modal-window-background').style.display = 'none';
    document.getElementById('subscribe').style.display = 'none';
    document.getElementById('subscribed-program').style.display = 'none';
};

const modalShow = () => {
    const modalContent = selectedPrograms.length === 0 ? 'subscribe':'subscribed-program';
    document.getElementById(modalContent).style.display = 'flex';
    document.getElementById('modal-window-background').style.display = 'flex';
};

const checkPrograms = () => {
    const checkBoxes = document.getElementsByClassName("program-checkbox");
    for (let i = 0;i < checkBoxes.length;i++){
        if(checkBoxes[i].checked  === true){
            document.getElementById('subscribe-button').style.display = 'flex';
            return;
        }
    }
    document.getElementById('subscribe-button').style.display = 'none';

};

const subscribe = () => {
    const checkBoxes = document.getElementsByClassName("program-checkbox");
    const selectedProgramsList = document.getElementById("subscribed-program-list");
    for (let i = 0;i < checkBoxes.length;i++){
        if(checkBoxes[i].checked  === true){
            selectedPrograms.push(checkBoxes[i].id);
            selectedProgramsList.innerHTML += `<li>${programsName[checkBoxes[i].id]}</li>`
        }
    }
    document.getElementById('modal-window-background').style.display = 'none';
    document.getElementById('subscribe').style.display = 'none';
};

const subscribeMore = () => {
    document.getElementById('subscribed-program').style.display = 'none';
    document.getElementById('subscribe').style.display = 'flex';
};

$(document).ready(function() {
    svg4everybody();

    const screenWidth = $(window).width();
    let reviewsDisplayCount = 3;
    if (screenWidth < 850 && screenWidth > 500) reviewsDisplayCount = 2;
    if (screenWidth < 500) reviewsDisplayCount = 1;

    const slides = $("#reviews-containers").children(".review");
    const width = $("#reviews-containers").width()/reviewsDisplayCount;
    let slidesCount = slides.length;
    let offset = slidesCount * width;
    $("#reviews-containers").css('width',offset);
    $(".review").css('width',$(".slider").width());


    offset = 0;
    $("#slider-button-right").click(function(){
        console.log(offset)
        console.log(width * (slidesCount-reviewsDisplayCount))
        if (offset < width * (slidesCount-reviewsDisplayCount)) {
            offset += width;
            $("#reviews-containers").css("transform","translate3d(-"+offset+"px, 0px, 0px)");
        }
    });

    $("#slider-button-left").click(function(){
        console.log(offset)
        if (offset > 0) {
            offset -= width;
            $("#reviews-containers").css("transform","translate3d(-"+offset+"px, 0px, 0px)");
        }
    });
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 60) {
        $(".nav-bar").css('position','fixed');
        $(".nav-bar").css('height','11%');
        $(".contacts").css('display','none');
        $(".header").css('height','auto');

    } else {
        $(".nav-bar").css('position','unset');
        $(".nav-bar").css('height','61%');
        $(".contacts").css('display','inline-flex');
        $(".header").css('height','16%');
    }
});
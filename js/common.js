'use strict';

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

const videoPlay = () => {
    document.getElementById('video').play();
    document.getElementById('video-filter').style.display = 'none';
}

const videoPause = () => {
    document.getElementById('video').pause();
    document.getElementById('video-filter').style.display = 'flex';
}

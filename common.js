'use strict';

const displayServiceInfo = (serviceName) => {
    document.getElementById(serviceName+'-description').style.display = 'flex';
} ;

const hideServiceInfo = (serviceName) => {
    document.getElementById(serviceName+'-description').style.display = 'none';
} ;

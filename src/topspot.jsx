import React from 'react';

let test = 0;

function calcDist(loc, dest) {
    let lat = loc.latitude;
    let lon = loc.longitude;
    let destLat = dest[0];
    let destLon = dest[1];

    let latCos = Math.cos(Math.PI / 180 * lat);
    let destLatCos = Math.cos(Math.PI / 180 * destLat);
    let lonDist = latCos * 69.172; //Distance between degrees of longitude at the equator
    let destLonDist = destLatCos * 69.172;
    //Averaging the distance between longitudes at the two latitudes, which isn't accurate but it sort of works as an approximation for the time being
    let avgLonDist = lonDist + destLonDist / 2;

    let hDist = avgLonDist * (destLon - lon);
    let vDist = 69.055 * (destLat - lat);

    // //Really bad math that kind of works for vertical distances but gets pretty inaccurate as you start heading in a more longitudinal direction
    // let rawDist = Math.sqrt(Math.pow(hDist, 2) + Math.pow(vDist, 2)).toFixed(0);

    //Copypasted haversine formula code from https://www.movable-type.co.uk/scripts/latlong.html, this should be fairly accurate
    var R = 6371e3; // metres
    var φ1 = latCos;
    var φ2 = destLatCos;
    var Δφ = Math.PI/180 * (destLat - lat);
    var Δλ = Math.PI/180 * (destLon - lon);

    var a = 
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c;

    d *= 0.000621371; //Convert to miles from meters to not confuse poor americans
    d = d.toFixed(2);
    let dirAngle = Math.round(180 / Math.PI * Math.atan2(vDist, hDist));
    if (dirAngle < 0) dirAngle += 360;

    let heading;

    if (dirAngle == 0)
        heading = `East`;
    else if (dirAngle > 0 && dirAngle < 45)
        heading = `at ${(dirAngle).toFixed(0)}º North of East`;
    else if (dirAngle == 45)
        heading = `North East`;
    else if (dirAngle > 45 && dirAngle < 90)
        heading = `at ${(90 - dirAngle).toFixed(0)}º East of North`;
    else if (dirAngle == 90)
        heading = `North`;
    else if (dirAngle > 90 && dirAngle < 135)
        heading = `at ${(dirAngle - 90).toFixed(0)}º West of North`;
    else if (dirAngle == 135)
        heading = `North West`;
    else if (dirAngle > 135 && dirAngle < 180)
        heading = `at ${(180 - dirAngle).toFixed(0)}º North of West`;
    else if (dirAngle == 180)
        heading = `West`;
    else if (dirAngle > 180 && dirAngle < 225)
        heading = `at ${(dirAngle - 180).toFixed(0)}º South of West`;
    else if (dirAngle == 225)
        heading = `South West`;
    else if (dirAngle > 225 && dirAngle < 270)
        heading = `at ${(270 - dirAngle).toFixed(0)}º West of South`;
    else if (dirAngle == 270)
        heading = `South`;
    else if (dirAngle > 270 && dirAngle < 315)
        heading = `at ${(dirAngle - 270).toFixed(0)}º East of South`;
    else if (dirAngle == 315)
        heading = `South East`;
    else if (dirAngle > 315 && dirAngle < 360)
        heading = `at ${(360 - dirAngle).toFixed(0)}º South of East`;
    else heading = `East`;

    return (<span>{d}mi {heading}</span>)
}

export default props => (
    <div className='panel panel-info'>
        <div className='panel-heading lead'>{props.name}</div>
        <div className='panel-body'>
            <p className='lead loc-desc'>{props.description}</p>
            {props.userLoc != '' ? (<p className='lead'>Approximate distance from current location: {calcDist(props.userLoc, props.location)}</p>) : <p className='lead'>Waiting for Location Data</p>}
        </div>
        <div className='panel-footer'>
            <a href={`https://maps.google.com/?q=${props.location[0]},${props.location[1]}`}>Go to Google Maps</a>
        </div>
    </div>
);
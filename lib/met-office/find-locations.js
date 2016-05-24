import sites from './sites';

// adapted from http://www.metoffice.gov.uk/datapoint/support/tutorials/nearest-lat-long

var distVars = {
    r: 6371.01,
    radian: Math.PI / 180
};

function Location(id, name, latitude, longitude) {
    // public
    this.id = id;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;

    // private(ish)
    this.lat = latitude * distVars.radian;
    this.lon = longitude * distVars.radian;
  this.coslat = Math.cos(this.lat);
    this.sinlat = Math.sin(this.lat);

}
Location.prototype = {

    // return the rough distance from this (standpoint) to forepoint. no specific distance, only relative to other points.
    // will return the correct closet point 90% of the time, otherwise likely to be second closest
    roughDistance: function(forepoint) {

        return Math.pow(this.lat - forepoint.lat, 2) + Math.pow(this.lon - forepoint.lon, 2);

    },

    // return distance from this (standpoint) to forepoint in kilometres
    distance: function(forepoint) {
        // uses the Vincety formula to calculate the creat circle distance

        // difference - only used for this calculation so no point in keeping
        var dlon = this.lon - forepoint.lon;
        var cosdlon = Math.cos(dlon);
        var sindlon = Math.sin(dlon);

        // central angle
        var dca = Math.atan2(Math.sqrt(Math.pow(forepoint.coslat * sindlon, 2) + Math.pow(this.coslat * forepoint.sinlat - this.sinlat * forepoint.coslat * cosdlon, 2)), this.sinlat * forepoint.sinlat + this.coslat * forepoint.coslat * cosdlon);
        // distance is radius times central angle
        return (distVars.r * dca);
    }
};

function locationFromPoint({ latitude, longitude }) {
  return new Location(null, null, latitude, longitude);
}

/* return an array of distances and Location objects n long that are closest to standpoint
[
  [
    'dist': distance,
    'location': Location
  ],...
}
*/
export var getNNearest = function(point, n) {
    var standpoint = locationFromPoint(point);
    var siteList = [],
        newDist, i, len, j;

    for (i = 0; i < sites.length; i++) { // all of the sites

    // get the distance to the site
        newDist = standpoint.distance(sites[i]);

    // large perfomace gains made by sorting sites as they are found

    // we don't have a full list or is closer than the nth distance
    if (!siteList[n] || (siteList[n] && newDist < siteList[n].dist)) {
     // n attempts to find where to inset this location in to the found list
      for (j = 0; j < n; j++) {
        if (!siteList[j] || newDist < siteList[j].dist) { // at the end or list OR the next one is further away
          // insert the location in the correct place
          siteList.splice(j, 0, {
            dist: newDist,
            location: sites[i]
          });
          break;
        } //endif
      } //endfor
    }
    }


    // just return the portion we are interested in
    return siteList.slice(0, n);

};

/* return the Location object in sites that is closest to standpoint

[
  'dist': distance,
  'location': Location
]
 */
export var getNearest = function(point) {
    var standpoint = locationFromPoint(point);

    var i, site = {dist: Number.MAX_VALUE}, newDist;

    for (i = 0; i < sites.length; i++) { // all of the sites
        newDist = standpoint.distance(sites[i]);
        if (newDist < site.dist) { // is closer than we have seen before
            site = {
        dist: newDist,
        location: sites[i]
      };
        }
    }

    return site;

};

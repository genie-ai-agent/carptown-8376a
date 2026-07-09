// Carptown boundary: the rough quadrilateral bounded by
//   Clinton St (west) · Pitt St (east)
//   Rivington St (north) · Delancey St (south)
// Attorney and Ridge run through the interior.
const BOUNDARY = [
  [40.71908, -73.98508], // NW  Rivington & Clinton
  [40.71831, -73.98252], // NE  Rivington & Pitt
  [40.71717, -73.98314], // SE  Delancey & Pitt
  [40.71783, -73.98572]  // SW  Delancey & Clinton
];

// Center used both for the map view and the label
const CENTER = [
  (BOUNDARY[0][0] + BOUNDARY[1][0] + BOUNDARY[2][0] + BOUNDARY[3][0]) / 4,
  (BOUNDARY[0][1] + BOUNDARY[1][1] + BOUNDARY[2][1] + BOUNDARY[3][1]) / 4
];

const map = L.map('map', {
  center: CENTER,
  zoom: 17,
  zoomControl: true,
  scrollWheelZoom: false,
  attributionControl: true
});

// Soft, feminine basemap: CARTO Positron (light, minimal)
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  maxZoom: 19,
  subdomains: 'abcd',
  attribution: '© <a href="https://openstreetmap.org">OSM</a> · tiles © <a href="https://carto.com/">CARTO</a>'
}).addTo(map);

// Soft halo underneath — a thick, transparent rose glow
const halo = L.polygon(BOUNDARY, {
  color: '#e6a5a0',
  weight: 18,
  opacity: 0.32,
  fill: false,
  lineJoin: 'round'
}).addTo(map);

// The Carptown polygon — blush fill, wine outline, dashed like a hand-drawn boundary
const carp = L.polygon(BOUNDARY, {
  color: '#7a3a44',
  weight: 2.5,
  opacity: 0.95,
  dashArray: '6, 6',
  fillColor: '#e6a5a0',
  fillOpacity: 0.3,
  lineJoin: 'round',
  lineCap: 'round'
}).addTo(map);

// Ornamental dots at each corner
BOUNDARY.forEach(pt => {
  L.circleMarker(pt, {
    radius: 4,
    color: '#7a3a44',
    weight: 2,
    fillColor: '#fbf3ee',
    fillOpacity: 1
  }).addTo(map);
});

// (label is rendered as an HTML overlay outside Leaflet, in index.html)

// Fit map nicely around the polygon with generous breathing room
map.fitBounds(carp.getBounds().pad(0.55));

// Enable scroll zoom only after user clicks on the map (nicer scroll UX)
map.on('click', () => map.scrollWheelZoom.enable());
map.on('mouseout', () => map.scrollWheelZoom.disable());

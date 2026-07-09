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

// Minimal black-and-white basemap: Stadia Stamen Toner Lite
L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png', {
  maxZoom: 20,
  attribution: '© <a href="https://stadiamaps.com/">Stadia Maps</a> · <a href="https://stamen.com/">Stamen</a> · <a href="https://openstreetmap.org">OSM</a>'
}).addTo(map);

// Soft halo underneath — a thick, transparent black glow
const halo = L.polygon(BOUNDARY, {
  color: '#0a0a0a',
  weight: 18,
  opacity: 0.14,
  fill: false,
  lineJoin: 'round'
}).addTo(map);

// The Carptown polygon — hand-drawn dashed boundary in ink
const carp = L.polygon(BOUNDARY, {
  color: '#0a0a0a',
  weight: 2.5,
  opacity: 0.95,
  dashArray: '6, 6',
  fillColor: '#0a0a0a',
  fillOpacity: 0.06,
  lineJoin: 'round',
  lineCap: 'round'
}).addTo(map);

// Ornamental dots at each corner
BOUNDARY.forEach(pt => {
  L.circleMarker(pt, {
    radius: 4,
    color: '#0a0a0a',
    weight: 2,
    fillColor: '#ffffff',
    fillOpacity: 1
  }).addTo(map);
});

// Fit map nicely around the polygon with generous breathing room
map.fitBounds(carp.getBounds().pad(0.55));

// Enable scroll zoom only after user clicks on the map
map.on('click', () => map.scrollWheelZoom.enable());
map.on('mouseout', () => map.scrollWheelZoom.disable());

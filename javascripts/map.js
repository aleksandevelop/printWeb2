DG.then(function () {
    map = DG.map("map_70852858", {
      center: [55.829856, 49.138955],
      zoom: 16,
      zoomControl: false
    });
    
    const customZoom = `
    <div style="position:absolute; top:100px; right:10px; z-index:1000; background:transparent;">
      <button onclick="map.setZoom(map.getZoom()+1)" style="width:40px;height:40px;border: 5px solid #3d3d3d;background:white;font-size:20px;cursor:pointer; border-radius:50%; filter: contrast(0.9);">+</button>
      <div style="border-top:1px solid #ddd; z-index: 5"></div>
      <button onclick="map.setZoom(map.getZoom()-1)" style="width:40px;height:40px;border: 5px solid #3d3d3d;background:white;font-size:20px;cursor:pointer; border-radius:50%; filter: contrast(0.9);">-</button>
    </div>
  `;

    document.getElementById('map_70852858').insertAdjacentHTML('beforeend', customZoom);
    DG.marker([55.829856, 49.138955]).addTo(map).bindPopup("Мы тут!");
  });

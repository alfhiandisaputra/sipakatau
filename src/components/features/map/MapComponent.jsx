// src/components/features/map/MapComponent.jsx (updated)
import { useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup,
  Circle
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent = forwardRef(({ 
  locations, 
  userLocation, 
  onLocationSelect,
  selectedLocationId,
  center,
  zoom = 12,
  mapLayer = 'default'
}, ref) => {
  const mapRef = useRef(null);

  useImperativeHandle(ref, () => ({
    flyTo: (latlng, zoomLevel) => {
      if (mapRef.current) {
        mapRef.current.flyTo(latlng, zoomLevel);
      }
    },
    zoomIn: () => {
      if (mapRef.current) {
        mapRef.current.zoomIn();
      }
    },
    zoomOut: () => {
      if (mapRef.current) {
        mapRef.current.zoomOut();
      }
    },
    getCenter: () => {
      if (mapRef.current) {
        return mapRef.current.getCenter();
      }
      return null;
    }
  }));


  const createCustomIcon = (color, iconType = 'default') => {
    const svgMap = {
      'drop-point': `M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z`,
      'recycle': `M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z`,
      'special': `M13 10V3L4 14h7v7l9-11h-7z`,
      'user': `M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z`
    };

    const svgString = svgMap[iconType] || svgMap['drop-point'];
    
    return new L.DivIcon({
      html: `
        <div style="
          background-color: ${color};
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        ">
          <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
            <path d="${svgString}"/>
          </svg>
        </div>
      `,
      className: 'custom-div-icon',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });
  };

  const dropPointIcon = createCustomIcon('#3b82f6', 'drop-point');
  const recyclingIcon = createCustomIcon('#10b981', 'recycle');
  const specialIcon = createCustomIcon('#8b5cf6', 'special');
  const userIcon = createCustomIcon('#4b5563', 'user');

  useEffect(() => {
    if (selectedLocationId && mapRef.current) {
      const selectedLoc = locations.find(loc => loc.id === selectedLocationId);
      if (selectedLoc) {
        mapRef.current.flyTo([selectedLoc.lat, selectedLoc.lng], 15);
      }
    }
  }, [selectedLocationId, locations]);

  const getIcon = (type) => {
    switch (type) {
      case 'drop-point': return dropPointIcon;
      case 'recycling-center': return recyclingIcon;
      case 'special-facility': return specialIcon;
      default: return dropPointIcon;
    }
  };

  const getTileLayerUrl = () => {
    switch (mapLayer) {
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'terrain':
        return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }
  };

  const getTileAttribution = () => {
    switch (mapLayer) {
      case 'satellite':
        return 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
      case 'terrain':
        return 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)';
      default:
        return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    }
  };

  const getPopupContent = (location) => `
    <div style="min-width: 220px; padding: 8px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <div style="
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: ${location.type === 'drop-point' ? '#3b82f6' : location.type === 'recycling-center' ? '#10b981' : '#8b5cf6'};
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
            <path d="${
              location.type === 'drop-point' 
                ? 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z'
                : location.type === 'recycling-center'
                ? 'M16 4l2 2m0 0l2-2m-2 2v6m0-6h-4m4 0h6m-6 0v6m0 0l-2 2m2-2l2 2m-2-2v6m0-6h-6m6 0h4m-4 0v6m0 0l-2-2m2 2l-2 2m-4-16l2 2m0 0l2-2m-2 2v6m0-6h-4m4 0H6m4 0v6m0 0l-2 2m2-2l2 2m-2-2v6m0-6H6m4 0h-4'
                : 'M13 10V3L4 14h7v7l9-11h-7z'
            }"/>
          </svg>
        </div>
        <div>
          <h3 style="margin: 0; font-weight: 600; color: #111827; font-size: 14px;">${location.name}</h3>
          <div style="display: flex; align-items: center; gap: 4px; margin-top: 2px;">
            <span style="
              display: inline-block;
              padding: 2px 8px;
              border-radius: 12px;
              font-size: 11px;
              font-weight: 500;
              background-color: ${location.type === 'drop-point' ? '#dbeafe' : location.type === 'recycling-center' ? '#d1fae5' : '#f3e8ff'};
              color: ${location.type === 'drop-point' ? '#1e40af' : location.type === 'recycling-center' ? '#065f46' : '#6b21a8'};
            ">
              ${location.type === 'drop-point' ? 'TPS' : location.type === 'recycling-center' ? 'Bank Sampah' : 'Fasilitas Khusus'}
            </span>
          </div>
        </div>
      </div>
      
      <div style="margin: 8px 0; padding: 8px 0; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb;">
        <p style="margin: 0 0 4px 0; font-size: 12px; color: #4b5563; display: flex; align-items: flex-start; gap: 4px;">
          <svg width="12" height="12" fill="#6b7280" viewBox="0 0 24 24" style="flex-shrink: 0; margin-top: 1px;">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
          </svg>
          <span>${location.address}</span>
        </p>
        <p style="margin: 0; font-size: 12px; color: #6b7280;">
          ${location.kelurahan}, Kec. ${location.kecamatan}
        </p>
      </div>
      
      <div style="margin-top: 8px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span style="font-size: 12px; color: #4b5563;">Kapasitas:</span>
          <span style="font-size: 12px; font-weight: 600; color: #111827;">
            ${location.available}/${location.capacity} kg
          </span>
        </div>
        <div style="height: 4px; background-color: #e5e7eb; border-radius: 2px; overflow: hidden;">
          <div style="
            height: 100%;
            width: ${(location.available / location.capacity) * 100}%;
            background-color: ${(location.available / location.capacity) > 0.7 ? '#10b981' : (location.available / location.capacity) > 0.4 ? '#f59e0b' : '#ef4444'};
          "></div>
        </div>
      </div>
    </div>
  `;

  return (
    <MapContainer
      center={center || [-4.3518, 119.8892]}
      zoom={zoom}
      className="h-full w-full"
      ref={mapRef}
      scrollWheelZoom={true}
      style={{ background: '#f3f4f6' }}
    >
      <TileLayer
        attribution={getTileAttribution()}
        url={getTileLayerUrl()}
      />
      

      {userLocation && (
        <>
          <Marker position={userLocation} icon={userIcon}>
            <Popup>
              <div className="font-medium">Lokasi Anda</div>
            </Popup>
          </Marker>
          <Circle
            center={userLocation}
            radius={500}
            pathOptions={{ 
              color: '#3b82f6', 
              fillColor: '#3b82f6', 
              fillOpacity: 0.1,
              weight: 1
            }}
          />
        </>
      )}
      
      {/* Locations */}
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          icon={getIcon(location.type)}
          eventHandlers={{
            click: () => onLocationSelect(location),
          }}
        >
          <Popup>
            <div dangerouslySetInnerHTML={{ __html: getPopupContent(location) }} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
});

MapComponent.displayName = 'MapComponent';

export default MapComponent;
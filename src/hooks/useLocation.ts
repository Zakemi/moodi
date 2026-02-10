import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import { useEffect, useState } from 'react';

export const useLocation = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [locationText, setLocationText] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      const permissions = await Location.getForegroundPermissionsAsync();

      if (permissions.status !== 'granted') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setLoading(false);
          return;
        }
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: LocationAccuracy.BestForNavigation,
      });
      setLocation(location);
      setLoading(false);
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
    async function getLocationText(location: Location.LocationObject) {
      const url = `https://free.geodescription.com/text/lat=${location.coords.latitude}/lon=${location.coords.longitude}`;
      const response = await fetch(url);
      const text = await response.text();
      // Free API response example, gathering some useful info from it
      // 39 Kisfaludy utca, Győr, Győri járás, Győr-Moson-Sopron vármegye, Nyugat-Dunántúl, Dunántúl, Magyarország
      const splitted = text.split(', ');
      setLocationText(`${splitted[1]}, ${splitted[2]}`);
    }
    if (location) {
      getLocationText(location);
      return;
    }
    setLocationText(null);
  }, [location]);

  return {
    loading,
    location,
    errorMsg,
    locationText,
  };
};

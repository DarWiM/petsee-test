import {useCallback, useEffect, useRef} from 'react';
import MapView, {LatLng} from 'react-native-maps';
import fetchData, {DataItem} from '@/api/fetchData';
import {useAppContext} from '@/contexts/AppContext';
import usePrevious from '@/hooks/usePrevious';
import {getMinMaxCoordinates, scale} from '@/functions';

const ZOOM_ON_ITEM_PRESS = 1.1;

export const useMainViewScreen = () => {
  const mapRef = useRef<MapView>(null);

  const defaultZoom = useRef<number>();
  const defaultCoordinates = useRef<[LatLng, LatLng]>();

  const {state, setData, setIsLoading, setCurrentPinId} = useAppContext();
  const {data, isLoading, currentPinId} = state;
  const previousPinId = usePrevious(currentPinId);

  const fitToCoordinates = useCallback((result: DataItem[]) => {
    const [min, max] = getMinMaxCoordinates(result);

    const latitudeOffset = max.latitude - min.latitude;
    const longitudeOffset = max.longitude - min.longitude;
    const offset = scale(Math.min(latitudeOffset, longitudeOffset) / 5);

    const coordinates: [LatLng, LatLng] = [
      {
        latitude: min.latitude - offset,
        longitude: min.longitude - offset,
      },
      {
        latitude: max.latitude + offset,
        longitude: max.longitude + offset,
      },
    ];

    defaultCoordinates.current = coordinates;
    defaultZoom.current = undefined;

    mapRef.current?.fitToCoordinates(coordinates, {
      animated: true,
    });
  }, []);

  const onMapReady = useCallback(() => {
    setIsLoading(true);

    fetchData()
      .then(result => {
        setData(result);
        fitToCoordinates(result);
      })
      .catch(error => {
        setData(null);
        console.log('Error:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [fitToCoordinates, setData, setIsLoading]);

  const getOnItemPress = useCallback(
    (item: DataItem) => () => {
      Promise.all([
        mapRef.current?.getCamera(),
        mapRef.current?.getMapBoundaries(),
      ]).then(([camera, boundaries]) => {
        if (!camera || !boundaries) {
          return;
        }

        if (!defaultZoom.current) {
          defaultZoom.current = camera.zoom;
        }

        const newZoom = defaultZoom.current
          ? defaultZoom.current * ZOOM_ON_ITEM_PRESS
          : undefined;

        const {northEast, southWest} = boundaries;
        const latOffset =
          (northEast.latitude - southWest.latitude) * (ZOOM_ON_ITEM_PRESS - 1);

        mapRef.current?.animateCamera({
          center: {
            latitude: item.latitude - latOffset,
            longitude: item.longitude,
          },
          zoom: newZoom,
        });
      });

      setCurrentPinId(item.id);
    },
    [setCurrentPinId],
  );

  const isPinViewClosed =
    currentPinId === null &&
    previousPinId !== null &&
    previousPinId !== undefined;

  useEffect(() => {
    if (isPinViewClosed && mapRef.current && defaultCoordinates.current) {
      mapRef.current.fitToCoordinates(defaultCoordinates.current);
      defaultZoom.current = undefined;
    }
  }, [isPinViewClosed]);

  return {
    data,
    isLoading,
    currentPinId,
    mapRef,
    onMapReady,
    getOnItemPress,
  };
};

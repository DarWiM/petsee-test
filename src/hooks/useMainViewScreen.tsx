import {useCallback, useEffect, useRef} from 'react';
import MapView, {Camera} from 'react-native-maps';
import fetchData, {DataItem} from '@/api/fetchData';
import {useAppContext} from '@/contexts/AppContext';
import usePrevious from '@/hooks/usePrevious';
import useSnapPoints from '@/hooks/useSnapPoints';
import useMapPadding from '@/hooks/useMapPadding';
import {navigateToPin} from '@/navigation';

const ZOOM_ON_ITEM_PRESS = 1.1;

export const useMainViewScreen = () => {
  const mapRef = useRef<MapView>(null);

  const prevCamera = useRef<Camera>();

  const {state, setData, setIsLoading} = useAppContext();
  const {data, isLoading, currentPinId} = state;
  const previousPinId = usePrevious(currentPinId);

  const mapPadding = useMapPadding();

  const [snapPoint] = useSnapPoints();

  const fitToCoordinates = useCallback((result: DataItem[]) => {
    const coordinates = result.map(item => ({
      latitude: item.latitude,
      longitude: item.longitude,
    }));

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
      mapRef.current?.getCamera().then(camera => {
        const basicZoom = prevCamera.current
          ? prevCamera.current.zoom
          : camera.zoom;

        if (!prevCamera.current) {
          prevCamera.current = camera;
        }

        mapRef.current?.animateCamera({
          center: {latitude: item.latitude, longitude: item.longitude},
          zoom: basicZoom ? basicZoom * ZOOM_ON_ITEM_PRESS : undefined,
        });

        mapRef.current?.setNativeProps({
          mapPadding: {
            ...mapPadding,
            bottom: mapPadding.bottom + snapPoint,
          },
        });
      });

      navigateToPin(item.id);
    },
    [mapPadding, snapPoint],
  );

  const isPinViewClosed =
    currentPinId === null &&
    previousPinId !== null &&
    previousPinId !== undefined;

  useEffect(() => {
    if (isPinViewClosed && mapRef.current && prevCamera.current) {
      mapRef.current.animateCamera(prevCamera.current);

      mapRef.current.setNativeProps({mapPadding});

      prevCamera.current = undefined;
    }
  }, [isPinViewClosed, mapPadding]);

  return {
    data,
    isLoading,
    currentPinId,
    mapRef,
    onMapReady,
    getOnItemPress,
    mapPadding,
  };
};

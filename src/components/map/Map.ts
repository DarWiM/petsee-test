import styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {baseCss} from '@/styles';

const Map = styled(MapView).attrs({provider: PROVIDER_GOOGLE})`
  ${baseCss.flex};
`;

export default Map;

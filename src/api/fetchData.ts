const uri =
  'https://raw.githubusercontent.com/fullstackPrincess/test/main/data.json';

export type DataItem = {
  id: number;
  color: string;
  title: string;
  latitude: number;
  longitude: number;
  content: string;
};

const fetchData = (config?: RequestInit): Promise<DataItem[]> =>
  fetch(uri, config).then(response => response.json());

export default fetchData;

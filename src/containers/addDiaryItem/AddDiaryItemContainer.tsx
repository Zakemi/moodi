import {
  AddDiaryItemProps,
  AddDiaryItemScreen,
} from '@/src/screens/addDiaryItem/AddDiaryItemScreen';
import { useRouter } from 'expo-router';
import { useDiary } from '@/src/hooks/useDiary';
import { useLocation } from '@/src/hooks/useLocation';
import { useWeather } from '@/src/hooks/useWeather';

export const AddDiaryItemContainer = () => {
  const router = useRouter();
  const { addItem } = useDiary();
  const locationInfo = useLocation();
  const weatherInfo = useWeather({ location: locationInfo.location });

  const handleAddDiaryItem = async ({
    text,
    moods,
    photos,
  }: AddDiaryItemProps) => {
    if (!text.length) {
      return;
    }

    await addItem({
      text,
      moods: moods.filter((mood) => mood.isSet).map((mood) => mood.mood),
      photoUrls: photos.map((photo) => `file://${photo.path}`),
    });
    router.back();
  };

  return (
    <AddDiaryItemScreen
      onAddDiaryItem={handleAddDiaryItem}
      locationInfo={locationInfo}
      weatherInfo={weatherInfo}
    />
  );
};

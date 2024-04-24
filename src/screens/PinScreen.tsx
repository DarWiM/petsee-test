import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Paragraph from '@/components/text/Paragraph';
import {Header} from '@/components/common/Header';
import {scale} from '@/functions';
import {usePinScreen} from '@/hooks/usePinScreen';

const PinScreen: FC<{id: number}> = ({id}) => {
  const {
    bottomSheetRef,
    animatedIndex,
    snapPoints,
    data,
    onPressClose,
    onClose,
  } = usePinScreen(id);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
      animatedIndex={animatedIndex}>
      <BottomSheetScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <Header
          title={data?.title}
          animatedIndex={animatedIndex}
          onPressClose={onPressClose}
        />
        <Paragraph>latitude: {data?.latitude}</Paragraph>
        <Paragraph>longitude: {data?.longitude}</Paragraph>
        <Paragraph>{data?.content}</Paragraph>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    flexShrink: 0,
    width: '100%',
    paddingHorizontal: scale(20),
    paddingVertical: scale(26),
  },
});

export default PinScreen;

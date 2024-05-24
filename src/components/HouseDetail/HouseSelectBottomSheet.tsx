import React, {useCallback, useMemo, useRef} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetHandle,
  BottomSheetHandleProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useTheme} from '@ui-kitten/components';
import {Dimensions, StyleSheet, Text} from 'react-native';

// FIXME: BottomSheetModal is undefined
// migrate to use https://github.com/stanleyugwu/react-native-bottom-sheet

export const HouseSelectBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['50%', '90%'], []);
  const theme = useTheme();

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
    return (
      <BottomSheetBackdrop
        {...props}
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            zIndex: 1200,
          },
          props.style,
        ]}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    );
  }, []);

  const renderHandle = useCallback(
    (props: BottomSheetHandleProps) => {
      return (
        <BottomSheetHandle
          {...props}
          style={{
            backgroundColor: theme['background-basic-color-3'],
          }}
        />
      );
    },
    [theme],
  );

  return (
    <BottomSheetModal
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      //   onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      handleComponent={renderHandle}
      containerStyle={{
        ...StyleSheet.absoluteFillObject,
        width: Dimensions.get('window').width,
        zIndex: 1201,
      }}>
      <BottomSheetView
        style={{
          backgroundColor: theme['background-basic-color-1'],
        }}>
        <Text>aoisjdo</Text>
      </BottomSheetView>
      <BottomSheetFlatList
        data={[{id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}, {id: '5'}]}
        keyExtractor={i => i.id}
        renderItem={_props => <Text>aosijdo</Text>}
        style={
          {
            //   backgroundColor: theme,
          }
        }
      />
    </BottomSheetModal>
  );
};

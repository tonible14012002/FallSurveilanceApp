import {Avatar, Button, Input, List} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import {SpinnerDataLoadingShowcase} from '~/components/common/SpinnerDataLoadingShowcase';
import Icon from '~/components/core/Icon';
import ListItem from '~/components/core/ListItem';
import {PAGINATION} from '~/constants/common';
import {useDebouncedText} from '~/hooks/common/useDebouncedText';
import {useSearchDeviceSpec} from '~/hooks/useSearchDeviceSpec';
import {DeviceSpecification} from '~/schema/api/house';
import {BaseResponse} from '~/schema/common';

interface StepOneProps {
  selectedSpec?: DeviceSpecification;
  disabled: boolean;
  setSelectedSpec: (spec: DeviceSpecification) => void;
  onFinished: () => void;
}

export const StepOne = ({
  selectedSpec,
  disabled,
  setSelectedSpec,
  onFinished,
}: StepOneProps) => {
  const {debouncedText, changeText} = useDebouncedText();

  const {deviceSpecCollections, isLoading} = useSearchDeviceSpec({
    page: 1,
    pageSize: PAGINATION.SMALL,
    allowFetch: true,
    search: debouncedText,
  });

  const renderDeviceSpecCollections = ({
    item,
  }: {
    item: BaseResponse<DeviceSpecification[]>;
  }) => {
    const {data} = item;
    console.log({data});
    return (
      <List
        key={item.pageable?.next_page}
        data={data}
        renderItem={({item: spec}) => {
          const isSelected = selectedSpec?.id === spec.id;
          return (
            <ListItem
              size="medium"
              onPressHandler={() => {
                console.log({selectedSpec, spec, isSelected});

                setSelectedSpec(spec);
              }}
              wrapperStyle={{
                marginHorizontal: -16,
              }}
              level="1"
              rightEle={
                isSelected ? (
                  <Icon size="small" fill="blue" name="checkmark-outline" />
                ) : null
              }
              isRightIcon
              leftIcon={
                <Avatar
                  source={{
                    uri: spec.image,
                  }}
                />
              }
              title={spec.name}
            />
          );
        }}
      />
    );
  };

  return (
    <View style={styles.formContainer}>
      <View style={{gap: 8}}>
        <Input
          style={{marginBottom: 8}}
          placeholder="Device type..."
          size="large"
          accessoryLeft={<Icon name="search-outline" />}
          value={debouncedText}
          onChangeText={changeText}
        />
        <SpinnerDataLoadingShowcase
          isLoading={isLoading}
          isShowData={!!deviceSpecCollections?.length}>
          <List
            showsVerticalScrollIndicator={false}
            scrollEnabled
            data={deviceSpecCollections ?? []}
            renderItem={renderDeviceSpecCollections}
          />
        </SpinnerDataLoadingShowcase>
      </View>

      <Button disabled={disabled} size="large" onPress={() => onFinished()}>
        Next
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    justifyContent: 'space-between',
    height: '100%',
    paddingBottom: 20,
  },
});

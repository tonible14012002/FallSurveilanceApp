import {Icon, Input, Text, Button} from '@ui-kitten/components';
import {Controller, useFormContext} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {useRenderIcon} from '~/hooks/useRenderIcon';
import {AddDeviceSchemaType} from '~/schema/form';

interface StepTwoProps {
  disabled: boolean;
  onFinished: () => void;
}

export const StepTwo = ({disabled, onFinished}: StepTwoProps) => {
  const {renderIcon} = useRenderIcon();
  const {
    control,
    formState: {errors},
    watch,
  } = useFormContext<AddDeviceSchemaType>();

  return (
    <View style={styles.formContainer}>
      <View style={{gap: 8}}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              style={{
                width: '100%',
              }}
              accessoryLeft={renderIcon('edit-2-outline')}
              size="large"
              placeholder="Device's name"
              onBlur={onBlur}
              onChangeText={val => onChange(val)}
              value={value}
            />
          )}
          name="name"
        />
        {errors.name && (
          <Text category="s2" status="danger" style={{marginTop: 5}}>
            {errors.name.message}
          </Text>
        )}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              style={{
                width: '100%',
              }}
              accessoryLeft={renderIcon('alert-circle-outline')}
              size="large"
              placeholder="Serial number"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="serial_number"
        />
        {errors.serial_number && (
          <Text category="s2" status="danger" style={{marginTop: 5}}>
            {errors.serial_number.message}
          </Text>
        )}
      </View>

      <Button
        disabled={
          disabled || !watch('name')?.length || !watch('serial_number')?.length
        }
        size="large"
        onPress={onFinished}>
        Done
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
});

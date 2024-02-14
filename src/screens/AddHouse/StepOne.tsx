import {Icon, Input, Text, Button} from '@ui-kitten/components';
import {Controller, useFormContext} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {useRenderIcon} from '~/hooks/useRenderIcon';
import {AddHouseSchemaType} from '~/schema/form';

interface StepOneProps {
  onFinished: () => void;
}

export const StepOne = ({onFinished}: StepOneProps) => {
  const {renderIcon} = useRenderIcon();
  const {
    control,
    formState: {errors},
  } = useFormContext<AddHouseSchemaType>();
  console.log({errors});

  return (
    <View style={styles.formContainer}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={{
              width: '100%',
            }}
            accessoryLeft={<Icon name="edit-2-outline" />}
            size="large"
            placeholder="House's name"
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
            accessoryLeft={renderIcon('home-outline')}
            size="large"
            placeholder="Address"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="address"
      />
      {errors.address && (
        <Text category="s2" status="danger" style={{marginTop: 5}}>
          {errors.address.message}
        </Text>
      )}
      <Button size="large" onPress={() => onFinished()}>
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
  },
});

import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {StepOne} from './StepOne';
import {StepTwo} from './StepTwo';
import {AddDeviceResponse, DeviceSpecification} from '~/schema/api/house';
import {API, API_PATH} from '~/constants/api';
import {BaseResponse} from '~/schema/common';
import {mutate} from 'swr';
import {Alert} from 'react-native';

const STEPS = {
  ONE: 'SELECT_TYPE',
  TWO: 'FILL_DETAIL',
} as const;

type AddDevice = 'SELECT_TYPE' | 'FILL_DETAIL';

export default function AddDevice() {
  const [step, setStep] = useState<(typeof STEPS)[keyof typeof STEPS]>(
    STEPS.ONE,
  );
  const [selectedSpec, setSelectedSpec] = useState<DeviceSpecification>();
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const {roomId} = route.params as {roomId: string};

  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();
  const formContext = useForm<any>({});

  const onBackPress = () => {
    navigate('Main');
    navigate('HouseDetail');
  };

  const onSubmit = formContext.handleSubmit(async (values: any) => {
    if (!selectedSpec || !roomId) return;

    try {
      setIsLoading(true);
      const {data} = await API.FALL_SURVEILANCE.post(
        {...values, device_type: 'CAMERA', specification_id: selectedSpec.id},
        API_PATH.DEVICE_SERVICES.ADD_DEVICE(roomId),
      ).json<BaseResponse<AddDeviceResponse>>(r => r);
      mutate(API_PATH.HOUSE_SERVICES.HOUSE_DETAIL);

      if (!data.id) return Alert.alert('Add Device Fail');

      navigate('DeviceDetail', {deviceId: data.id});
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  });

  const __renderTopbarTitle = () => {
    if (step === STEPS.ONE) {
      return 'Step 1: Select device type';
    }
    if (step === STEPS.TWO) {
      return 'Step 2: Fill device detail';
    }
  };

  return (
    <ScreenLayout
      topBar={<TopBar title={__renderTopbarTitle()} onBack={onBackPress} />}
      isScrollable={false}
      hasPadding>
      <FormProvider {...formContext}>
        {step === STEPS.ONE && (
          <StepOne
            selectedSpec={selectedSpec}
            disabled={!selectedSpec}
            setSelectedSpec={setSelectedSpec}
            onFinished={() => setStep(STEPS.TWO)}
          />
        )}
        {step === STEPS.TWO && (
          <StepTwo disabled={isLoading} onFinished={onSubmit} />
        )}
      </FormProvider>
      {/* )} */}
    </ScreenLayout>
  );
}

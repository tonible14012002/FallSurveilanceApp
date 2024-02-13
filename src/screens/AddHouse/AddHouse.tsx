import {useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useHouseDetailContext} from '~/components/HouseDetail';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import {API, API_PATH} from '~/constants/api';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useAuthContext} from '~/context/auth';
import {BaseResponse} from '~/schema/common';
import {AddHouseSchemaType} from '~/schema/form';
import {StepOne} from './StepOne';
import {StepTwo} from './StepTwo';
import {BasicUser} from '~/schema/api/identity';
import {RoomSchema, StepThree} from './StepThree';
import {Text} from '@ui-kitten/components';
import {Modal} from 'react-native';

const STEPS = {
  ONE: 'ONE',
  TWO: 'TWO',
  THREE: 'THREE',
} as const;

export default function AddHouse() {
  const navigation = useNavigation<PrivateScreenWithBottomBarProps>();
  const [isLoading, setIsloading] = useState(false);
  const [step, setStep] = useState<(typeof STEPS)[keyof typeof STEPS]>(
    STEPS.ONE,
  );
  const [selectedUsers, setSelectedUsers] = useState<BasicUser[]>([]);
  const [rooms, setRooms] = useState<RoomSchema[]>([]);

  const {user} = useAuthContext();
  const formContext = useForm<AddHouseSchemaType>({
    // resolver: zodResolver(AddHouseSchema),
  });
  const {handleSubmit} = formContext;

  const {setHouseId} = useHouseDetailContext();
  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const {data: respData} = await API.FALL_SURVEILANCE.post(
        {
          ...data,
          owner_ids: [user?.id],
          member_ids: [
            ...selectedUsers.map(u => u.id).filter(uid => uid !== user?.id),
            user?.id,
          ],
          rooms: rooms.map(r => ({...r, id: undefined})),
        },
        API_PATH.HOUSE_SERVICES.CREATE,
      ).json<BaseResponse<any>>(r => r);
      setHouseId(respData.id);
      navigation.navigate('Main');
      navigation.navigate('HouseDetail');
    } catch (e) {
      setIsloading(false);
      console.log(e);
    } finally {
      setIsloading(false);
    }
  });

  const getTopbarTitle = () => {
    if (step === STEPS.ONE) {
      return "Step 1: House's information";
    }
    if (step === STEPS.TWO) {
      return 'Step 2: Add house members';
    }
    if (step === STEPS.THREE) {
      return 'Step 3: Add Rooms';
    }
  };

  const onBackPress = useCallback(() => {
    switch (step) {
      case STEPS.ONE:
        navigation.navigate('Main');
        break;
      case STEPS.TWO:
        setStep(STEPS.ONE);
        break;
      case STEPS.THREE:
        setStep(STEPS.TWO);
    }
  }, [navigation, step]);

  return (
    <ScreenLayout
      topBar={<TopBar title={getTopbarTitle()} onBack={onBackPress} />}
      isScrollable={false}
      hasPadding>
      {isLoading && (
        <Modal visible>
          <Text>Loading...</Text>
        </Modal>
      )}
      {!isLoading && (
        <FormProvider {...formContext}>
          {step === STEPS.ONE && (
            <StepOne onFinished={() => setStep(STEPS.TWO)} />
          )}
          {step === STEPS.TWO && (
            <StepTwo
              onSelectedUsersChange={setSelectedUsers}
              selectedUsers={selectedUsers}
              onFinished={() => setStep(STEPS.THREE)}
            />
          )}
          {step === STEPS.THREE && (
            <StepThree
              rooms={rooms}
              onRoomsChange={setRooms}
              onConfirm={onSubmit}
            />
          )}
        </FormProvider>
      )}
    </ScreenLayout>
  );
}

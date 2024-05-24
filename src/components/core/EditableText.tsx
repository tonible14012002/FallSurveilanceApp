import {Pressable, StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import {TextInput} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {useDisclosure} from '~/hooks/common';

interface EditableTextProps {
  value?: string;
  onUpdate: (value: string) => void;
  style?: StyleProp<TextStyle>;
}

export const EditableText = (props: EditableTextProps) => {
  const {value = '', onUpdate, style} = props;
  const [internalValue, setValue] = useState<string>(value);
  const {isOpen, onOpen, onClose} = useDisclosure();

  const handlePressOut = () => {
    onClose();
    onUpdate(internalValue);
    setValue(value);
  };
  const handlePress = () => {
    onOpen();
  };
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setValue(value);
  }, [value]);

  const inputRef = useRef<TextInput>(null);
  return (
    <Pressable onPress={handlePress}>
      {_ => {
        console.log('isOpen', isOpen);
        return (
          <>
            <TextInput
              ref={inputRef}
              style={[
                {display: isOpen ? 'flex' : 'none'},
                styles.textInput,
                style,
              ]}
              defaultValue={internalValue}
              value={internalValue}
              onBlur={handlePressOut}
              onChangeText={setValue}
            />
            <Text
              style={[
                {
                  display: isOpen ? 'none' : 'flex',
                },
                styles.text,
                style,
              ]}>
              {value}
            </Text>
          </>
        );
      }}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 0,
    fontSize: 14,
  },
  text: {
    fontSize: 14,
  },
});

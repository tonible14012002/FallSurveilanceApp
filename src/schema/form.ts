import {z} from 'zod';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const LoginFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, 'Username is required!')
    .max(30, 'Username is not valid!'),
  password: z
    .string()
    .trim()
    .min(3, 'Password must contains at least 3 characters!')
    .max(20, 'Password only contains at most 20 characters!'),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

export const RegisterSchema = z.object({
  username: z
    .string()
    .trim()
    .max(30, 'Username only contains at most 30 characters!'),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, 'Phone is not valid!')
    .min(10, 'Phone must contains at least 10 characters!')
    .max(10, 'Phone is not valid!'),
  password: z
    .string()
    .trim()
    .min(3, 'Password must contain at least 3 characters!')
    .max(20, 'Password only contain at most 20 characters!'),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const AddHouseSchema = z.object({
  name: z
    .string()
    .trim()
    .max(30, 'House name only contains at most 30 characters!'),
  address: z
    .string()
    .trim()
    .min(10, 'House address must contains at least 10 characters!')
    .max(120, 'House adreess only contain at most 120 characters!'),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, 'Phone is not valid!')
    .min(10, 'Phone must contains at least 10 characters!')
    .max(10, 'Phone is not valid!'),
});

export type AddHouseSchemaType = z.infer<typeof AddHouseSchema>;

export const EditHouseSchema = z.object({
  name: z
    .string()
    .trim()
    .max(30, 'House name only contains at most 30 characters!'),
  description: z
    .string()
    .trim()
    .min(1, 'House description is required!')
    .max(30, 'House description name only contains at most 30 characters!'),
  address: z
    .string()
    .trim()
    .min(10, 'House address must contains at least 10 characters!')
    .max(120, 'House adreess only contain at most 120 characters!'),
});

export type EditHouseSchemaType = z.infer<typeof EditHouseSchema>;

export const SearchUsersSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, 'Username is required!')
    .max(30, 'Username name only contains at most 30 characters!'),
});

export type SearchUsersSchemaType = z.infer<typeof SearchUsersSchema>;

export const RoomSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Username is required!')
    .max(30, 'Username name only contains at most 30 characters!'),
  description: z
    .string()
    .trim()
    .min(1, 'Username is required!')
    .max(30, 'Username name only contains at most 30 characters!'),
});

export type RoomSchemaType = z.infer<typeof RoomSchema>;

export const UpdateProfileSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(1, 'Nickname is required!')
    .max(30, 'Nickname name only contains at most 30 characters!'),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, 'Phone is not valid!')
    .min(10, 'Phone must contains at least 10 characters!')
    .max(10, 'Phone is not valid!'),
  email: z.string().email(),
});

export type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>;

export const AddDeviceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'House address must contains at least 10 characters!')
    .max(30, 'House name only contains at most 30 characters!'),
  serial_number: z
    .string()
    .trim()
    .min(1, 'House address must contains at least 10 characters!')
    .max(120, 'House adreess only contain at most 120 characters!'),
});

export type AddDeviceSchemaType = z.infer<typeof AddDeviceSchema>;

export const EditDeviceSchema = z.object({
  name: z
    .string()
    .trim()
    .max(30, 'Device name only contains at most 30 characters!'),
});

export type EditDeviceSchemaType = z.infer<typeof EditDeviceSchema>;

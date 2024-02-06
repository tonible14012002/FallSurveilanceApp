import {z} from 'zod';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const LoginFormSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, 'Phone is not valid!')
    .min(10, 'Phone must contains at least 10 characters!')
    .max(10, 'Phone is not valid!'),
  password: z
    .string()
    .trim()
    .min(3, 'Password must contains at least 3 characters!')
    .max(20, 'Password only contains at most 20 characters!'),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

export const RegisterSchema = z.object({
  fullname: z
    .string()
    .trim()
    .max(30, 'Fullname only contains at most 30 characters!'),
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

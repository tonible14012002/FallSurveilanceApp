import {z} from 'zod';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const LoginSchema = z.object({
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

export type LoginSchemaType = z.infer<typeof LoginSchema>;

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

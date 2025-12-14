import {z, ZodError} from "zod";
import validator from 'validator';

const emailSchema = z.string().email("Email invalido")
    .refine((value) => validator.isEmail(value),{message: "Formato de email invalido"});


const passwordSchema = z.string().min(6,{message: "La contraseña debe tener al menos 6 caracteres"})
  .refine((value) => validator.isStrongPassword(value, {
    minLength: 6,
    minLowercase: 1,
    minUppercase: 0,
    minNumbers: 1,
    minSymbols: 0
  }), {
    message: "La contraseña debe tener al menos un número y una Letra minuscula "
  });


  export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "La contraseña es obligatoria")
});



export const registerSchema = z.object({
  usuario: z
    .string()
    .min(3,{ message:"El usuario debe tener mínimo 3 caracteres"})
    .max(20, {message:"Máximo 20 caracteres"})
    .refine((value) => validator.isAlphanumeric(value), {
      message: "El usuario debe ser alfanumérico"
    }),

  email: emailSchema,

  password: passwordSchema
});


export const createPostSchema = z.object({
  Titulo: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título es demasiado largo"),

  texto: z
    .string()
    .min(10, "El contenido debe ser más largo")
});
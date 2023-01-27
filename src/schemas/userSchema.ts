import joi from "joi";

const userSchema = joi.object({
    name:joi.string().required().min(3),
    age:joi.number().min(2).max(2).required(),
    email:joi.string().required()
})

export  default userSchema;
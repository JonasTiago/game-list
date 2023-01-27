import joi from "joi";

const platformSchema = joi.object({
    name:joi.string().required().min(3),
    email:joi.string().required()
})

export  default platformSchema;
import mongoose from "mongoose";

//An interface that describe the Properties
// that are required to create a new user.
interface SmsAttrs {
    number: string;
    name: string;
    msg: string;
    description: string;
    type: string;
    createdAt: Date;
}

//An interface that describe the properties
//that a user model has
interface SmsModel extends mongoose.Model<SmsDoc> {
    build(attrs: SmsAttrs): SmsDoc;
}

// An interface that describe the properties
// that a User Document has
interface SmsDoc extends mongoose.Document {
    number: string;
    name: string;
    msg: string;
    description: string;
    type: string;
    createdAt: Date;
}

const smsSchema = new mongoose.Schema(
    {
        number: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        msg: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        type: {
            type: String,
        },
        createdAt: {
            type: mongoose.Schema.Types.Date,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

smsSchema.statics.build = (attrs: SmsAttrs) => {
    return new Sms(attrs);
};

const Sms = mongoose.model<SmsDoc, SmsModel>("sms", smsSchema);

export { Sms };

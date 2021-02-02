import mongoose from 'mongoose'

interface TicketAttrs {
  userId: string
  title: string
  price: number
}

interface TicketModel extends mongoose.Model<any> {
  build(attrs: TicketAttrs): TicketDoc
}

interface TicketDoc extends mongoose.Document {
  userId: string
  title: string
  price: number
}

const ticketSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      },
      versionKey: false,
    },
  }
)

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs)
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema)

export { Ticket }

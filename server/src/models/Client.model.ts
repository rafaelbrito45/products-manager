import { Schema, model } from "mongoose";

interface Client {
  id: number;
  name: string;
  surname: string;
}

const clientSchema = new Schema<Client>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
});

const ClientModel = model<Client>("Client", clientSchema);

export default ClientModel;

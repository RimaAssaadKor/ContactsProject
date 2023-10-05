export interface Contact {
    id:string;
    name: string;
    email: string;
    phone: string;
    isEditing?: boolean;
    address?:string
  }
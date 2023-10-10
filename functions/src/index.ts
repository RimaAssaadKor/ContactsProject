
import * as functions from 'firebase-functions';
import * as express from 'express';
import * as admin from 'firebase-admin';

const app = express();
admin.initializeApp();
const db = admin.firestore();
const contactsCollection = db.collection('customers/customerId/contacts');

app.use(express.json());

interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    address?: string;
  }
  //Hello World function
  exports.helloWorld = functions.https.onCall((data, context) => {
    console.log('Hello world');
    functions.logger.log("welcome to firebase")
    return 'Hello world';
  });
//create contact call function
  exports.createNewContact = functions.https.onCall(async (data) => {
    try {
      const { name, email, phone, address } = data;
  
      // Create a new contact document in Firestore
      const newContactRef = await contactsCollection.add({
        name,
        email,
        phone,
        address,
      });
      return { id: newContactRef.id };
    } catch (error) {
      console.error('Error creating contact', error);
      return error
    }
  });

//get all contacts
app.get('/contacts', async (req: express.Request, res: express.Response) => {
    try {
      const contactsSnapshot = await contactsCollection.get();
      const contacts: Contact[] = [];
      contactsSnapshot.forEach((doc) => {
        const contact = doc.data() as Contact;
        contact.id = doc.id;
        contacts.push(contact);
      });
      res.json(contacts);
    } catch (error) {
      console.error('Error getting contacts', error);
      res.status(500).json({ error: 'Could not retrieve contacts' });
    }
  });
// Get a contact by ID
app.get('/contacts/:id', async (req: express.Request, res: express.Response) => {
    try {
      const contactId = req.params.id;
      const contactDoc = await contactsCollection.doc(contactId).get();
      if (!contactDoc.exists) {
        res.status(404).json({ error: 'Contact not found' });
      } else {
        const contactData = contactDoc.data() as Contact;
        res.json({contactData});
      }
    } catch (error) {
      console.error('Error getting contact by ID', error);
      res.status(500).json({ error: 'Could not retrieve contact' });
    }
  });
  //update a contact
  app.put('/contacts/:id', async (req: express.Request, res: express.Response) => {
    try {
      const contactId = req.params.id;
      const updatedContact = req.body as Contact;
      
      const updatedContactObject = { ...updatedContact };
  
      await contactsCollection.doc(contactId).update(updatedContactObject);
      res.json({ message: 'Contact updated successfully' });
    } catch (error) {
      console.error('Error updating contact', error);
      res.status(500).json({ error: 'Could not update contact' });
    }
  });
  //add a contact
  app.post('/contacts', async (req: express.Request, res: express.Response) => {
    try {
      const newContact = req.body as Contact;
      const contactRef = await contactsCollection.add(newContact);
      res.json(contactRef);
    } catch (error) {
      console.error('Error creating contact', error);
      res.status(500).json({ error: 'Could not create contact' });
    }
  });

  //delete a contact
  app.delete('/contacts/:id', async (req: express.Request, res: express.Response) => {
    try {
      const contactId = req.params.id;
      await contactsCollection.doc(contactId).delete();
      res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
      console.error('Error deleting contact', error);
      res.status(500).json({ error: 'Could not delete contact' });
    }
  });
  //triggered function
  export const onContactCreated = functions.region('europe-west3').firestore
  .document('contacts/{id}')
  .onCreate(async () => {
    return functions.logger.log("you created a contact")
  });

  export const v1 = functions.region('europe-west3')
  .runWith({
    timeoutSeconds: 300,
    memory: '128MB' // 28MB 256MB 512MB 1GB 2GB 4GB 8GB
  }).https.onRequest(app); 



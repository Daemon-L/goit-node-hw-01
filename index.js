const contacts = require("./contacts");
const { program } = require('commander');

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts();
            console.log(allContacts);
            break;

        case "get":
            const oneContact = await contacts.getContactById(id);
            console.log(oneContact);
            break;

        case "add":
            const newContact = await contacts.addContact(name, email, phone);
            console.log(newContact);
            break;

        case "remove":
            const removeContact = await contacts.removeContact(id);
            console.log(removeContact);
            break;
        default:
            console.log("Unknown action");
    }
}

program
    .option("-a --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
invokeAction(options);
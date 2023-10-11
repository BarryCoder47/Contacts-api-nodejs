const asyncHandler = require('express-async-handler');
const contact = require('../models/contactModel');
// @desc Get all contacts
// @route GET /api/contacts
// access public

const getContacts =  asyncHandler(async(req, res) => {
    const contacts = await contact.find();
    res.status(200).json(contacts);
});
// asyncHandler for not to use try catch method

// @desc Create a contact
// @route POST /api/contacts
// access public

const createContact = asyncHandler(async (req, res) => {
    console.log("this is the body", req.body);
    const {name, email, phone} = req.body;

    if(!name || !email || !phone){
        res.status(400);
        throw new Error('All fields are empty!');
    }
    const conta = await contact.create({
        name, email, phone
    });

    res.status(200).json(conta);
});

// @desc Get a single contact by ID
// @route GET /api/contacts/:id
// access public

const getContact = asyncHandler(async (req, res) => {
     const findContact =  await contact.findById(req.params.id);
     if(!findContact) {
        res.status(404);
        throw new Error("Contact not found");
     } 
     res.status(200).json(findContact);
});

// @desc Update a contact by ID
// @route PUT /api/contacts/:id
// access public

const updateContact = asyncHandler(async (req, res) => {
    try {
        const findContact = await contact.findById(req.params.id);
        if (!findContact) {
            res.status(404).json({ error: "Contact not found" });
            return;
        }

        const updatedContact = await contact.findByIdAndUpdate(
            req.params.id, 
            req.body,
            { new: true }
        );

        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// @desc Delete a contact by ID
// @route DELETE /api/contacts/:id
// access public

const deleteContact = asyncHandler(async (req, res) => {
    try {
        const findContact = await contact.findById(req.params.id);
        if (!findContact) {
            res.status(404).json({ error: "Contact not found" });
            return;
        }

        await findContact.deleteOne();
        res.status(200).json(findContact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});



module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };

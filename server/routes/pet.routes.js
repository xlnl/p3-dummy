const pet = require("../controllers/pet.controller")
const journalEntry = require("../controllers/journalEntry.controller")
const milestone = require("../controllers/milestone.controller")

let router = require("express").Router();

module.exports = app => {
    // get user's pet's profile to render journal entries
    router.get("/:petId", pet.findOne)

    //Form to add pet a pet to user profile
    router.post('/pet', pet.create)
    
    //Update a pet with id
    router.put('/:petId', pet.update)

    //Delete a pet
    router.delete('/:petId', pet.delete)

    // // post route for user's pet's journal entry
    // router.post("/:petId/journal", journalEntry.create)

    // // update route for user's pet's journal entry
    // router.update("/:petId/:journalId", journalEntry.update)
    
    // // delete route for user's pet's journal entry
    // router.delete("/:petId/:journalId", journalEntry.delete)

    // // post route for user's pet's milestone
    // router.post("/:petId/milestone", milestone.create)

    // // update route for user's pet's milestone
    // router.update("/:petId/:milestoneId", milestone.update)
    
    // // delete route for user's pet's milestone
    // router.delete("/:petId/:milestoneId", milestone.delete)

    app.use('/profile', router)
}

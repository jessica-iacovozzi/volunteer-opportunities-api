const { Organization } = require('./models/organization')
const { Opportunity } = require('./models/opportunity')
const { Sector } = require('./models/sector')

// const createOrganization = (name, email, link, registration_number, sectorId) => {
//   let organization = new Organization({
//     name,
//     email,
//     link,
//     registration_number,
//     sectorId
//   })

//   organization.save()
// }

// createOrganization()

// const createOpportunity = (title, description, organizationId) => {
//   let opportunity = new Opportunity({
//     title,
//     description,
//     organizationId
//   })

//   opportunity.save()
// }

// createOpportunity()

const createSector = async (name) => {
  let sector = new Sector({
    name
  })

  await sector.save()
}

createSector("Animal Welfare")

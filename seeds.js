const { Organization } = require('./models/organization')

const createOrganization = (name, email, link, registration_number, sectorId) => {
  let organization = new Organization({
    name,
    email,
    link,
    registration_number,
    sectorId
  })

  organization = organization.save()
}

createOrganization()

# Use the official Cypress base image with Node.js 14
FROM cypress/browsers:node-20.9.0-chrome-118.0.5993.88-1-ff-118.0.2-edge-118.0.2088.46-1

# Set the working directory
WORKDIR /Qa-BDD-Cypress

# Copy only the package.json and package-lock.json first
COPY package*.json ./

# Install dependencies to ensure better caching
RUN npm ci

# Copy the remaining application code
COPY cypress.config.js .
COPY cucumber-html-report.js .
COPY ./cypress ./cypress

# Run your test command
CMD ["npm", "run", "TestWithDocker"]

# Create a docker image from the Dockerfile : docker build -t qa-bdd-cypress:version/tag . "docker build -t bdd-cypress-image:1.0.0 ."
# Run the docker image : docker run -it --rm --name qa-bdd-cypress qa-bdd-cypress:version/tag "docker run -it --rm --name bdd-cypress-container bdd-cypress-image:1.0.0"
# Run the docker image with volume : docker run -it --rm --name qa-bdd-cypress -v $PWD:/Qa-BDD-Cypress qa-bdd-cypress:version/tag "docker run -it --rm --name bdd-cypress-container -v $PWD:/Qa-BDD-Cypress bdd-cypress-image:1.0.0"

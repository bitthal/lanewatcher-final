FROM node:14-alpine

# Create app directory
WORKDIR /app

# Install specific version of npm
RUN npm install -g npm@9.8.0

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Perform a security audit and automatically fix problems
RUN npm audit fix

# Bundle app source
COPY . .

# Build the application
RUN npm run build

# Expose the app port
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]

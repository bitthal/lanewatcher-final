# base image
FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN npm i --save-dev --ignore-scripts

COPY . .

CMD ["npm", "run", "now"]

# # create & set working directory
# RUN mkdir -p /usr/src
# WORKDIR /usr/src

# # copy source files
# COPY . /usr/src

# # install dependencies
# #RUN npm install
# RUN npm i --save-dev --ignore-scripts

# # start app
# #RUN npm run build
# EXPOSE 3000
# #CMD npm run start
# CMD npm run now
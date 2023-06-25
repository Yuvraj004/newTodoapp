FROM node:alpine
WORKDIR /
COPY package*.json ./
RUN npm install
RUN npm rebuild bcrypt 
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]

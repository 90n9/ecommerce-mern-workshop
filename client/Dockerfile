FROM node:alpine
ENV CI=true

#set work directory
WORKDIR /app
#Install app dependencies
COPY package.json .
RUN npm install --only=prod
#Copy all Sourcecode
COPY . .

#Expose port and start application
EXPOSE 3000
CMD ["npm", "start"]
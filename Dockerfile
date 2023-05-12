FROM node:16-alpine


# Copy files from local computer to inside container
COPY ./package.json ./

# Install some dependencues
RUN npm install

COPY ./ ./

# Default command
CMD ["npm", "run", "start"]

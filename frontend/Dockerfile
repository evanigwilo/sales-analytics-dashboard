# Use Node.js Alpine image with build dependencies
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /frontend

# Install build dependencies and Python
RUN apk add --no-cache \
    python3 \
    g++ \
    make \
    cairo-dev \
    pango-dev \
    libjpeg-turbo-dev \
    giflib-dev

# A wildcard is used to ensure both package.json and lock file are copied
COPY package*.json ./
COPY yarn.lock ./

# Install packages only if 'package.json' or 'yarn.lock' changes
RUN yarn install

# Copy source files
COPY . ./
# Copy the sample environmental variables file
COPY .env.example ./.env
# Conditional copy to update the environmental variables file if it exists
COPY .env* ./

# Expose the port for documentation purposes on which the app will be running 
# (3000 is the default port 'React' uses)
EXPOSE 3000

# Start the app 
CMD [ "yarn", "dev" ]

# Pull the Node.js Docker image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /backend

# Copy package.json, package-lock.json, and yarn.lock to the working directory
COPY package*.json yarn.lock ./

# Define build arguments and environment variables
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Install dependencies based on the environment
RUN if [ "$NODE_ENV" = "production" ]; \
    then yarn install --production --frozen-lockfile; \
    else yarn install; \
    fi 

# Copy the rest of the application source code
COPY . .

# Copy the sample environment variables file
COPY .env.example ./.env

# Conditionally copy the actual environment variables file if it exists
COPY .env* ./

# Build the application only in production
RUN if [ "$NODE_ENV" = "production" ]; \
    then yarn build; \
    else echo "Skipping build"; \
    fi

# Expose the application port (adjust as necessary)
EXPOSE 4000

# Define the default command to run the application
CMD yarn "$(if [ "$NODE_ENV" == "development" ]; \
    then echo "dev"; \
    else echo "start"; \
    fi)"

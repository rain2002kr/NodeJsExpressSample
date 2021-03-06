# Use the official image as a parent image.
FROM node:current-slim

# Set the working directory.
WORKDIR /app

# Copy the file from your host to your current location.
COPY . .

# Run the command inside your image filesystem.
RUN npm install

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 5001

# Run the specified command within the container.
CMD [ "npm", "start" ]

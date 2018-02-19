FROM node:8.9-alpine

MAINTAINER Suhail Taj<suhailtajshaik@gmail.com>

# Copy dist or your code folder to /opt/project folder in the container.
COPY . /opt/project


# Switch to /opt/project as your working directory.
WORKDIR /opt/project

# Use below format to setup environment variables.
ENV SERVER_PROTOCOL=http SERVER_PORT=9000 SERVER_HOST=192.168.86.114 USER_NAME=pi USER_GROUP=pi


# Add User and Group and give permisions.
RUN adduser -S ${USER_NAME} && \
    addgroup -S ${USER_GROUP} && \
    chown -R ${USER_GROUP}:${USER_NAME} /opt/project

# Set the ${USER_NAME} as the user to execute.
USER ${USER_NAME}

# Expose the ${SERVER_PORT} to access outside of container.
EXPOSE ${SERVER_PORT}

# Command to start application when the container starts.
CMD ["node", "index.js"]

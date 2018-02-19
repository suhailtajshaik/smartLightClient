FROM node:8.9-alpine

MAINTAINER Suhail Taj<suhailtajshaik@gmail.com>

# Copy dist or your code folder to /opt/project folder in the container.
COPY . /usr/src/app


# Switch to /opt/project as your working directory.
WORKDIR /usr/src/app

# Use below format to setup environment variables.
ENV SERVER_PROTOCOL=http SERVER_PORT=3000 SERVER_HOST=192.168.86.114 USER_NAME=smart-light USER_GROUP=smart-light

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies


# # Add User and Group and give permisions.
# RUN adduser -S ${USER_NAME} && \
#     addgroup -S ${USER_GROUP} && \
#     chown -R ${USER_GROUP}:${USER_NAME} /opt/project

# # Set the ${USER_NAME} as the user to execute.
# USER ${USER_NAME}

# Expose the ${SERVER_PORT} to access outside of container.
EXPOSE 3000

# Command to start application when the container starts.
CMD ["npm", "start"]

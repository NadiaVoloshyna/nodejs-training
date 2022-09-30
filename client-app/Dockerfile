# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:16-alpine as build-stage

# Create app directory
WORKDIR '/app'

# A wildcard is used to ensure both package.json 
# AND package-lock.json are copied
COPY package.json .

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.19-alpine as base-stage
EXPOSE 8080

# COPY nginx-default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build-stage /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]



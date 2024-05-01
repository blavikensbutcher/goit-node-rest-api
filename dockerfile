FROM node
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
# The command to run the service remotely should be in "package.json/scripts"
# CMD ["npm", "run", "remote"]
CMD ["node", "server"]

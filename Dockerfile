FROM node:8.1.3
RUN npm install pm2@latest -g
COPY . /opt/app
EXPOSE 4201
ENTRYPOINT ["./opt/app/start.sh"]

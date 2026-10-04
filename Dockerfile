# Optional: run as a Node web service (Render "Web Service" with Docker, or any container host)
FROM node:20-alpine
WORKDIR /app
COPY package.json server.js ./
COPY public ./public
ENV PORT=10000
EXPOSE 10000
CMD ["node", "server.js"]

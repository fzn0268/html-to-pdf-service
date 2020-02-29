FROM alekzonder/puppeteer:latest

USER root

RUN sed -i 's/deb.debian.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list; \
  sed -i 's/security.debian.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list; \
  apt-get update; \
  apt-get install -y --no-install-recommends \
    xfonts-encodings \
    xfonts-utils \
    xfonts-base \
    xfonts-75dpi \
    xfonts-wqy; \
  rm -rf /var/lib/apt/lists/*

USER pptruser

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 8080

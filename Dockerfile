FROM alekzonder/puppeteer:latest

USER root

RUN sed -i 's/deb.debian.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list; \
  sed -i 's/security.debian.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list; \
  apt-get update; \
  apt-get install -y --no-install-recommends \
    curl \
    xfonts-encodings \
    xfonts-utils \
    xfonts-base \
    xfonts-75dpi \
    fontconfig; \
  curl -LO https://github.com/wang-tf/Chinese_OCR_synthetic_data/raw/master/fonts/STSONG.TTF; \
  chmod 644 STSONG.TTF; \
  mv STSONG.TTF /usr/local/share/fonts; \
  apt-get purge curl -y; \
  apt-get autoremove -y; \
  fc-cache -fv; \
  rm -rf /var/lib/apt/lists/*

USER pptruser

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 8080

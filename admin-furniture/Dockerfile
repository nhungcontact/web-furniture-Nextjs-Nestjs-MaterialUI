FROM --platform=linux/amd64 node:slim

ENV TZ="Asia/Ho_Chi_Minh"

WORKDIR /home/app

EXPOSE 3000

RUN corepack enable \
  && corepack prepare pnpm@latest --activate \
  && pnpm config set store-dir .pnpm-store

COPY . .

RUN pnpm install

RUN pnpm build

CMD [ "pnpm", "start" ]

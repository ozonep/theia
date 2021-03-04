FROM node:12.21.0-buster

RUN apt-get update && apt-get install -y libx11-dev libxkbfile-dev expect
# Install Python 3 from source
# Install latest stable CMake
RUN mkdir -p /home/app \
    mkdir -p /home/theia \
    && mkdir -p /home/project

WORKDIR /home/theia
COPY . .
COPY /.npmmegarc /root/.npmrc
RUN yarn
# RUN yarn config set registry http://host.docker.internal:4873
# RUN yarn run next:publish

# WORKDIR /home/app
# ADD next.pkg /home/app/package.json
# RUN yarn --registry http://host.docker.internal:4873
# RUN yarn --pure-lockfile
# RUN NODE_OPTIONS="--max_old_space_size=4096" yarn theia build
# RUN yarn theia download:plugins

# ENV SHELL=/bin/bash
# ENV THEIA_DEFAULT_PLUGINS=local-dir:/home/app/plugins

# EXPOSE 3000

# ENTRYPOINT ["node", "/home/app/src-gen/backend/main.js", "/home/project", "--hostname=0.0.0.0"]

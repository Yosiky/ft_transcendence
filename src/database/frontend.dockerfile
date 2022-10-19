FROM node:lts

RUN apt-get update && \
	apt-get -y --no-install-recommends install tzdata && \
	ln -sf /usr/share/zoneinfo/Europe/Paris /etc/localtime && \
	echo "Russia/Moscow" > /etc/timezone && \
	dpkg-reconfigure -f noninteractive tzdata && \
	apt-get autoremove -y && \
	apt-get clean && \
	rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN npm install -g serve

EXPOSE 3001

ENTRYPOINT ["/bin/sh", "-c", "npm install --non-interactive && npm run build && serve -s build"]
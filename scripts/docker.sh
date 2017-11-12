docker rm -f url-shortener-api
docker rmi -f url-shortener-api:1.0.0
docker build -t url-shortener-api:1.0.0 .
docker run -d --name=url-shortener-api -p 3001:3001 -v $(pwd):/src url-shortener-api:1.0.0
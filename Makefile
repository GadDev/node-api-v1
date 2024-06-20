# Description: Makefile for building and running the application

## Build the application
dc-build:
	docker build -f dockerfile -t myapp:latest .
## Run the application
dc-run:
	docker run -d -p 8080:8080 myapp:latest

clean-up:
	rm -rf ./coverage ./dist ./node_modules
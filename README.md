# builder-bootcamp-nodejs-starter-kit

## Requirements

* AWS CLI already configured with Administrator permission
* [NodeJS 8.10+ installed](https://nodejs.org/en/download/)
* [Docker installed](https://www.docker.com/community-edition)


## Initial setup & deployment

**Prepare the infrastructure**

1. Create an S3 bucket
```bash
aws s3 mb s3://bootcamp-starter-kit-adamulvi
```

2. Edit `infrastructure/deploy.sh` and set the Configuration options to match your environment

3. Run `make infra` to deploy the infrastructure

**Deploy the application**

1. Add a `git remote` and point it at the CodeCommit repo created by `make infra`.
2. `git push` your changes and the pipeline should kick off a build


## Local development

### Requirements

* AWS CLI
* AWS SAM CLI
* [NodeJS 8.10+ installed](https://nodejs.org/en/download/)
* [Docker installed](https://www.docker.com/community-edition)

**Run unit tests**

1. Run the unit tests
```bash
make test
```

2. Hope they work!


**Start the local dev server**

1. Start up the dev server
```bash
make dev
```

2. Write code, it will be automatically recompiled on save.

3. Test your work at the address returned

**Running the Swagger editor**

1. Start the service
```bash
make swagger-start
```

2. Point your browser to http://0.0.0.0:8080

3. When done, stop the service
```bash
make swagger-stop
```

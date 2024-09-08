GREEN = \033[1;32m
RED = \033[1;31m
YELLOW = \033[1;33m
NC = \033[0m

up: up_dynamo up_staging

up_staging:
	NODE_ENV=Staging npm run start:dev

up_dynamo:
	@ echo "${GREEN}Starting containers...${NC}"
	@ docker-compose up -d --build

down_dynamo:
	@ echo "${RED}Stopping containers...${NC}"
	@ docker-compose down

re: down_dynamo up_dynamo

rm:
	@ echo "${YELLOW}Removing containers...${NC}"
	@ docker-compose down --rmi all

create_tables:
	NODE_ENV=Staging npx ts-node src/scripts/create-tables.ts
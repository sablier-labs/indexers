FROM ghcr.io/joshstevens19/rindexer:latest

WORKDIR /app/project

COPY rindexer.yaml .
COPY abi/ ./abi/

ENV PROJECT_PATH=/app/project

EXPOSE 3001

CMD ["start", "--path", "/app/project", "all"]

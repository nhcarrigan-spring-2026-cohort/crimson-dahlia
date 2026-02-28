# Backend installation

## Install uv

```bash
curl -LsSf https://astral.sh/uv/install.sh | bash
```

## Create virtual environment

```bash
uv venv
source .venv/bin/activate
```

## Install dependencies

```bash
uv sync
```

## Run the server

```bash
uv run python run.py
```

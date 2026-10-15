from logging.config import fileConfig
from alembic import command
from alembic.config import Config
import os

HERE = os.path.dirname(__file__)
ALEMBIC_INI = os.path.join(HERE, 'alembic.ini')
if not os.path.exists(ALEMBIC_INI):
    ALEMBIC_INI = os.path.join(HERE, 'alembic', 'env.py')


def run_upgrade(revision: str = 'head'):
    cfg_path = os.path.join(HERE, 'alembic.ini')
    cfg = Config(cfg_path)
    # allow DATABASE_URL env override
    db_url = os.getenv('DATABASE_URL')
    if db_url:
        cfg.set_main_option('sqlalchemy.url', db_url)
    command.upgrade(cfg, revision)


if __name__ == '__main__':
    run_upgrade()

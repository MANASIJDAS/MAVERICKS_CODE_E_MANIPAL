from sqlalchemy.future import select
from sqlalchemy.exc import IntegrityError
from ..models.measurement import Measurement


def create_measurement(db, measurement: Measurement) -> Measurement:
    db.add(measurement)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        q = db.execute(select(Measurement).where(Measurement.id == measurement.id))
        return q.scalars().first()
    db.refresh(measurement)
    return measurement


def get_unsynced(db, limit: int = 100):
    q = db.execute(select(Measurement).where(Measurement.synced == False).limit(limit))
    return q.scalars().all()


def mark_synced(db, ids):
    q = db.execute(select(Measurement).where(Measurement.id.in_(ids)))
    for m in q.scalars().all():
        m.synced = True
    db.commit()

import enum
from app.db.sql import base
from sqlalchemy import (
    Column,
    DateTime,
    String,
    Integer,
    Boolean,
    Enum,
    ForeignKey,
    Date,
    func,
)
from sqlalchemy.orm import relationship


class StatusEnum(str, enum.Enum):
    TO_DO = "TO_DO"
    IN_PROGRESS = "IN_PROGRESS"
    DONE = "DONE"


class PriorityEnum(str, enum.Enum):
    CRITICAL = "CRITICAL"
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"


class TokenTypeEnum(str, enum.Enum):
    AUTHENTICATION = "AUTHENTICATION"
    VERIFICATION = "VERIFICATION"
    FORGOT_PASSWORD = "FORGOT_PASSWORD"


class BaseModel(base.Base):
    __abstract__ = True

    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())


class User(BaseModel):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    full_name = Column(String(60), nullable=False)
    email = Column(String(60), nullable=False, unique=True)
    password = Column(String(100), nullable=False)
    is_active = Column(Boolean, default=True)

    task = relationship("Task", back_populates="user")
    user_token = relationship("UserToken", back_populates="user")

    def __repr__(self):
        return f"<User {self.id})>"


class UserToken(BaseModel):
    __tablename__ = "user_token"

    id = Column(Integer, primary_key=True)
    token = Column(String(200), nullable=False, unique=True)
    expiry_date = Column(DateTime, nullable=False)
    is_valid = Column(Boolean, default=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    token_type = Column(Enum(TokenTypeEnum, name="token_type"), nullable=False)

    user = relationship("User", back_populates="user_token")

    def __repr__(self):
        return f"<UserToken {self.id}>"


class Task(BaseModel):
    __tablename__ = "task"

    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    description = Column(String(600))
    status = Column(Enum(StatusEnum, name="task_status"), default=StatusEnum.TO_DO)
    priority = Column(
        Enum(PriorityEnum, name="task_priority"), default=PriorityEnum.HIGH
    )
    due_date = Column(Date)
    completion_date = Column(Date)

    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    user = relationship("User", back_populates="task")

    def __repr__(self):
        return f"<Task {self.id}>"

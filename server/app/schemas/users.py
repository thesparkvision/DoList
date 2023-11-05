from pydantic import BaseModel

class UserSchema(BaseModel):
    full_name: str
    email: str
    
class UserRegisterSchema(BaseModel):
    full_name: str
    email: str
    password: str

class UserLoginSchema(BaseModel):
    email: str
    password: str
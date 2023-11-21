from pydantic import BaseModel, EmailStr, validator
from zxcvbn import zxcvbn
from fastapi import HTTPException, status

from app.misc.exceptions import WeakPasswordError
from app.misc.constants import FULL_NAME_LETTER_LIMIT


class UserSchema(BaseModel):
    full_name: str
    email: str


class UserRegisterSchema(BaseModel):
    full_name: str
    email: EmailStr
    password: str

    @validator("full_name")
    def validate_full_name(cls, full_name, **kwargs):
        """
        Validates the full name satisfies constraints of the system
        """

        if len(full_name) > FULL_NAME_LETTER_LIMIT:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Name greater than system constrained {FULL_NAME_LETTER_LIMIT} letters limit",
            )

        return full_name

    @validator("password")
    def validate_password(cls, password, **kwargs):
        """
        Validates that password is strong enough for usage using zxcvbn library.
        Usage: https://github.com/dropbox/zxcvbn#usage
        """

        results = zxcvbn(password)
        score = results.get("score", 0)

        if score >= 3:
            return password

        feedback = results.get("feedback", {})
        warning = feedback.get("warning", "")
        suggestions = feedback.get("suggestions", [])

        if warning:
            warning = "Warning: " + warning

        if len(suggestions) > 0:
            suggestions = "Suggestions: " + "".join(suggestions)

        final_feedback = ", ".join((warning, suggestions))

        raise WeakPasswordError(feedback=final_feedback)


class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str


class TokenSchema(BaseModel):
    access_token: str
    token_type: str

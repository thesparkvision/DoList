from fastapi import HTTPException, status

class RecordDoesNotExist(Exception):

    def __init__(self):
        self.message = "Record does not exist"
        super().__init__(self.message)

class RecordIsInactive(Exception):

    def __init__(self):
        self.message = "Record is inactive"
        super().__init__(self.message)

class RecordAlreadyExist(Exception):

    def __init__(self):
        self.message = "Record already exist"
        super().__init__(self.message)

class SomethingWentWrong(Exception):

    def __init__(self):
        self.message = "Something Went Wrong"
        super().__init__(self.message)

class WeakPasswordError(HTTPException):

    def __init__(self, feedback = ""):
        detail = "Weak Password! " + feedback

        super().__init__(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=detail
        )

class WeakPasswordError(HTTPException):

    def __init__(self, feedback = ""):
        detail = "Weak Password! " + feedback

        super().__init__(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=detail
        )
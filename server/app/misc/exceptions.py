class RecordAlreadyExist(Exception):

    def __init__(self):
        self.message = "Record already xist"
        super().__init__(self.message)

class SomethingWentWrong(Exception):

    def __init__(self):
        self.message = "Something Went Wrong"
        super().__init__(self.message)
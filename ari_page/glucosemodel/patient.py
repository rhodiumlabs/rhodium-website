class Patient(object):
    """ A patient's profile """
    #
    # Class members
    #
    name = "John Doe"
    age = 20
    body_weight = 70
    malady = "healthy"

    #
    # Class methods
    #
    def __init__(self, name="John Doe", age=0, body_weight=70, malady="healthy"):
        """Initialize patient"""

        # Patient Info
        self.name = name
        self.age = age
        self.body_weight = body_weight
        self.malady = malady

    def display(self):
        """Display patient parameters"""
        print("Name =", self.name)
        print("Age =", self.age)
        print("Body Weight =", self.body_weight)
        print("Malady =", self.malady)

    def get_name(self):
        """Get the patient's name"""
        return self.name

    def set_age(self, age):
        """Set patient age"""
        self.age = age

    def get_age(self):
        """Get the patient's age"""
        return self.age

    def set_body_weight(self, body_weight):
        """Set the patient's body weight"""
        self.body_weight = body_weight

    def get_body_weight(self):
        """Get the patient's body weight"""
        return self.body_weight

    def set_malady(self, malady):
        """Set the patient's malady"""
        self.malady = malady

    def get_malady(self):
        """ Get the patient's malady"""
        return self.malady

    def set_parameters(self, malady):
        """Set the appropriate model parameters
        """
        import parameters as parameters
        import parametersType1 as PARAMETERSTYPE1
        import parametersType2 as PARAMETERSTYPE2
        import parametersExercise as PARAMETERSEXERCISE
        self.malady = malady
        if self.malady == "healthy":
            self.p = parameters
        elif self.malady == "type1":
            self.p = PARAMETERSTYPE1
        elif self.malady == "type2":
            self.p = PARAMETERSTYPE2
        elif self.malady == "exercise":
            self.p = PARAMETERSEXERCISE
        return self.p

if __name__ == '__main__':
    patient_object = Patient()
    print patient_object

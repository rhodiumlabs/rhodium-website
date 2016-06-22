__author__ = 'turbosnail9'
#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Created on Thu Apr 24 15:00:48 2014

@author: turbosnail9
"""
import numpy as np
from scipy.integrate import trapz

class Exercise():
    """ Create an exercise """

    # Class members

    hour = 7
    minute = 0
    carb_amount = 0
    meal_time = 30

    def __init__(self, hour=7, minute=0, exercise_time=30,
                 insulin_time=15, basal_heart_rate = 60, intensity = "mild"):
        """Initialize meal"""
        self.hour = hour
        self.minute = minute
        self.exercise_time = exercise_time
        self.insulinTime = insulin_time
        self.basal_heart_rate = basal_heart_rate
        self.intensity = intensity

    def set_start_time(self, hour=7, minute=0):
        """Set the exercise starting time"""
        self.hour = hour
        self.minute = minute

    def get_start_time(self):
        """Get exercise starting time"""
        h = self.hour
        m = self.minute
        time = np.array([h,m])
        return time

    def set_duration(self, exercise_time = 30):
        """Set the duration of the exercise"""
        self.exercise_time = exercise_time

    def get_duration(self):
        """Get the meal's duration"""
        return self.exercise_time


    def get_all_times(self):
        """Get times associated with consuming a meal"""
        before_eating = self.hour*60 + self.minute - self.exercise_time
        start_eating = self.hour*60 + self.minute
        after_eating = self.hour*60 + self.minute + self.exercise_time
        return np.array([before_eating, start_eating, after_eating])

    def get_end_of_day(self):
        """Return time for end of day"""
        return 24*60

    def get_exercise_intensity(self):
        if self.intensity == "mild":
            return 1.5
        elif self.intensity == "moderate":
            return 2

    def predict_heart_rate(self, basal_heart_rate = 60, exercise_time = 30):
        begin_ex = self.get_start_time()[0]
        end_ex = self.get_start_time()[0] + exercise_time
        intensity = self.get_exercise_intensity()
        T_ex = 600

        # Initialize Heart Rate vector
        heart_rate = np.array([basal_heart_rate]*1440)
        # Initialize W_ex vector
        W_ex = np.zeros((1440,1))
        t_z = 3*T_ex
        for i in range (begin_ex,end_ex):
            heart_rate[i] = basal_heart_rate*intensity
            W_ex[i] = trapz(heart_rate - basal_heart_rate,axis=0)
        return basal_heart_rate,heart_rate,W_ex

    def display(self):
        """Display the meal details"""
        print("Exercise starts at:", self.hour, ":", self.minute)
        print("Exercise duration = ", self.exercise_time)

if __name__ == '__main__':
    exercise_object = Exercise()
    print exercise_object

#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Created on Thu Apr 24 15:00:48 2014

@author: turbosnail9
"""
import numpy as np 

class Meal():
    """ Create a meal """

    # Class members

    hour = 7
    minute = 0
    carb_amount = 0
    meal_time = 30

    def __init__(self, hour=7, minute=0, carb_amount=0, meal_time=30,
                 insulin_time=15):
        """Initialize meal"""
        self.hour = hour
        self.minute = minute
        self.carb_amount = carb_amount
        self.meal_time = meal_time
        self.insulinTime = insulin_time

    def set_start_time(self, hour=7, minute=0):
        """Set the meal's starting time"""
        self.hour = hour
        self.minute = minute

    def get_start_time(self):
        """Get the meal's starting time"""
        h = self.hour
        m = self.minute
        time = np.array([h,m])
        return time

    def set_carb_input(self, carb_amount=0):
        """Set the amount of carbs in the meal"""
        self.carb_amount = carb_amount

    def get_carb_input(self):
        """Get the carb input"""
        return self.carb_amount

    def set_duration(self, meal_time = 30):
        """Set the duration of the meal"""
        self.meal_time = meal_time

    def get_duration(self):
        """Get the meal's duration"""
        return self.meal_time

    def set_insulin_time(self, insulin_time):
        """Set the insulin bolus administration time"""
        self.insulinTime = insulin_time

    def get_insulin_time(self):
        """Get the insulin bolus administration time"""
        return self.insulin_time

    def get_all_times(self):
        """Get times associated with consuming a meal"""
        before_eating = self.hour*60 + self.minute - self.insulinTime
        start_eating = self.hour*60 + self.minute
        after_eating = self.hour*60 + self.minute + self.meal_time
        return np.array([before_eating, start_eating, after_eating])

    def get_end_of_day(self):
        """Return time for end of day"""
        return 24*60

    def display(self):
        """Display the meal details"""
        print("Meal starts at:", self.hour, ":", self.minute)
        print("Meal duration = ", self.meal_time)
        print("Amount of carbs = ", self.carb_amount)

if __name__ == '__main__':
    meal_object = Meal()
    print meal_object
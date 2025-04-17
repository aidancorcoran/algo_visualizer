#
# Created by Aidan Corcoran: 04-16-2025
#                               

# Class to handle an array data structure

import random

class Array():
    def __init__(self, num_elements):
        self.num_elements = num_elements
        self.array = []
    
    def generate_random_values(self):
        for i in range(self.num_elements):
            self.array.append(random.randint(1, 20))
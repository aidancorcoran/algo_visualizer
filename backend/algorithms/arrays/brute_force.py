#
# Created by Aidan Corcoran: 04-16-2025
#                               

# Class to handle brute force searching of an Array object

from ...data_structures import array

class BruteForce():
    def __init__(self, custom_array_object: array.Array):
        """
        Init the BruteForce search of an Array

        Args:
            custom_array_object: Instance of custom array.Array class
        """
        self.array = custom_array_object.array

    def brute_force_search(self, element_to_find):
        """
        Function to perform a BruteForce search of the self.array variable

        Args:
            element_to_find: A value to be searched for in the randomly generated array
        """
        for i in range(len(self.array)):
            if self.array[i] == element_to_find:
                print(f"Found element {element_to_find} at index: {i}")
                return i
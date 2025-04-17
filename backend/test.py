from data_structures import array
from algorithms.arrays import brute_force

test_array = array.Array(20)

print(test_array.array)

test_array.generate_random_values()

print(test_array.array)

brute_force_algo = brute_force.BruteForce(test_array)

brute_force_algo.brute_force_search(4)
# Solution: Russian Doll Envelopes



#### **Description:**

> You are given a 2D array of integers `envelopes` where `envelopes[i] = [wi, hi]` represents the width and the height of an envelope.
>
> One envelope can fit into another if and only if both the width and height of one envelope is greater than the width and height of the other envelope.
>
> Return *the maximum number of envelopes can you Russian doll (i.e., put one inside the other)*.
>
> **Note**: You cannot rotate an envelope.



#### **Examples:**

> | Example 1:   |                                                              |
> | :----------- | :----------------------------------------------------------- |
> | Input:       | envelopes = [[5,4],[6,4],[6,7],[2,3]]                        |
> | Output:      | 3                                                            |
> | Explanation: | The maximum number of envelopes you can Russian doll is 3 ([2,3] => [5,4] => [6,7]). |
>
> | Example 2: |                                 |
> | :--------- | :------------------------------ |
> | Input:     | envelopes = [[1,1],[1,1],[1,1]] |
> | Output:    | 1                               |

------

#### **Constraints:**

> - `1 <= envelopes.length <= 5000`
> - `envelopes[i].length == 2`
> - `1 <= wi, hi <= 10^4`

------

#### **Idea:**


(*Jump to*: [*Problem Description*](https://dev.to/seanpgallivan/solution-russian-doll-envelopes-459i#description) || *Code*: [*JavaScript*](https://dev.to/seanpgallivan/solution-russian-doll-envelopes-459i#javascript-code) | [*Python*](https://dev.to/seanpgallivan/solution-russian-doll-envelopes-459i#python-code) | [*Java*](https://dev.to/seanpgallivan/solution-russian-doll-envelopes-459i#java-code) | [*C++*](https://dev.to/seanpgallivan/solution-russian-doll-envelopes-459i#c-code))

The naive approach here would be to try every single permutation of our envelope array (**E**), but that would be a **time complexity** of **O(N!)** which is frankly an incomprehensible number when **N** goes up to **5000**.

As the naive approach would involve repeating many of the same individual comparisons over and over again, we can quickly see that a **dynamic programming** (**DP**) solution would be beneficial.

In order for a DP solution to be effective, however, we'd need to find a way to progress from the easiest subsolution and build from there for each successively more complex subsolution. The best way to do this would be to sort **E** first by **width** (**E[i][0]**), and then by **height** (**E[i][1]**).

Then we could start with the smallest envelope and work our way up, storing in our DP array (**dp**) the result of how many smaller envelopes it is possible to fit in the corresponding envelope. That way we could simplify each iteration to checking to see which of the entries in **dp** corresponding to smaller envelopes is the largest. This would drop the time complexity to **O(N^2)**, which is a definite improvement.

But it should also be apparent that if we were to define a **subsequence** of **E** that was the ideal nesting order of envelopes for the solution, then that array would be strictly increasing in *both* width and height.

If we've already sorted **E** primarily by width, we should then be able to consider a corresponding array of just the heights and realize that the solution would be defined as the [**longest increasing subsequence**](https://en.wikipedia.org/wiki/Longest_increasing_subsequence) of that.

The only difficulty would be for consecutive envelopes with the *same* sorted width. To avoid that, we can simply make sure that our sort function sorts height in descending order so that the first envelope encountered for any given width would be the largest one.

At the end of the longest increasing subsequence algorithm, the length of **dp** is equal to the length of the subsequence. Due to the sort function and the binary searches required for the algorithm, the time complexity now shrinks to **O(N log N)**.

------

#### **Implementation:**

Python has a built-in binary search function, **bisect()**.

Java has a built-in binary search function as well (**Arrays.binarySearch()**), but in order to use the more performant **int[]** rather than a **List< Integer >**, we'll need to specify a max length for **dp** and then keep track of the current index of the longest subsequence separately in **ans**.

C++ has a built-in binary search function, **lower_bound()**.
---
title: "Activity Question Lecture 4 - Not Graded :: IITM Online Degree"
---

# Activity Question Lecture 4 - Not Graded :: IITM Online Degree

Activity Question Lecture 4 - Not Graded

# Activity Question Lecture 4 - Not Graded

This assignment will not be graded and is only for practice.

JavaScript should be enabled to grade this question.

**Random variable  
  
  
**A random variable is a function with domain as the sample space of an experiment and range as the real numbers, i.e. a function from the sample space to the real line.  
  
For example  

*   Toss a coin, Sample space = { H, T }
*   Random variable : X(H) = 0, X(T) = 1

We can define many random variables on same sample space.  
Toss a coin, Sample space = { H, T }  

*   Random variable X: X(H) = 1, X(T) = 0
*   Random variable Y: Y(H) = -10, Y(T) = 200
*   Random variable Z: Z(H) = √2, Z(T) = π
*   Random variable U: U(H) = 0, U(T) = 0

  

Random variables and events  
  
  
X is a random variable, (X < x) = {s ∊ S: X(s) < x} is an event for all real x.  
  
If So, (X > x), (X = x), (X ≤ x), (X ≥ x) are all events.  
  
Throw a die, Sample space = { 1, 2, 3, 4, 5, 6 }  

*   X(1) = 1, X(2) = 2, X(3) = 3, X(4) = 4, X(5) = 5, X(6) = 6
*   X = 1: die shows 1, X < 4: event {1, 2, 3}
*   Any event can be expressed in terms of X Event {2, 5}: (X=2) ⋂ (X=5)

JavaScript should be enabled to grade this question.

_1 point_

An urn contains $10$ balls numbered from $1$ to $10$. Choose a ball randomly and observe the number.  
  
  
$S = \\{ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 \\}$  
  
  
Define random variable $X$ as $X(i) = i$ for all $i = 1, 2,...10$. Find the events corresponding to $X = 1, X < 1, X ≤ 4 \\, \\text{and}\\, X > 8$.

$(X = 1) = \\{1\\}$

$(X = 1) = \\{2, 4\\}$

$(X < 1)$ = null event

$(X < 1) = \\{0\\}$

$(X <= 4) = \\{1, 2, 3\\}$

$(X > 8) = \\{8, 9, 10\\}$

$(X > 8) = \\{9, 10\\}$

$(X <= 4) = \\{4\\}$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$(X = 1) = \\{1\\}$

$(X < 1)$ = null event

$(X > 8) = \\{9, 10\\}$

JavaScript should be enabled to grade this question.

_1 point_

An urn contains $10$ balls numbered from $1$ to $10$. Choose a ball randomly and observe the number.  
  
  
$S = \\{ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 \\}$  
  
  
Define random variable $X$ as $X\\text{(even number)} = 100$,$X\\text{(Odd number)} = -100$.  
Find the events corresponding to $X = 100,X=-100, X < 0, \\text{and}\\, X > 100$.

$(X = 100) = \\{2, 4, 6, 8, 10\\}$

$(X = 100) = \\{1, 3, 5, 7, 9\\}$

$(X = -100) = \\{2, 4, 6, 8, 10\\}$

$(X = -100) = \\{1, 3, 5, 7, 9\\}$

$(X < 0) = \\{2, 4, 6, 8, 10\\}$

$(X > 100) = \\{1, 3, 5, 7, 9\\}$

$(X > 100)$ = null event

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$(X = 100) = \\{2, 4, 6, 8, 10\\}$

$(X = -100) = \\{1, 3, 5, 7, 9\\}$

$(X > 100)$ = null event

JavaScript should be enabled to grade this question.

_1 point_

An urn contains $10$ balls numbered from $1$ to $10$. Choose a ball randomly and observe the number.  
  
  
$S = \\{ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 \\}$  
  
  
Define random variable $X$ as $X(1) = X(3) = X(4) = X(5) = X(6) = X(7) = X(8) = X(9) = - 0.5$,$X(2) = -2 \\,\\,\\text{and}\\,\\, X(10) = 20$. Find the events corresponding to $X = 1, X = -2, X ≤ - 0.5 \\,\\,\\text{and}\\,\\, X > - 0.5.$.

$(X = 1) = \\{1\\}$

$(X = -2) = \\{2\\}$

$(X = -2) = \\{1, 3, 4, 5, 6\\}$

$(X <= -0.5) = \\{1, 2, 3, 4, 5, 6, 7, 8, 9\\}$

$(X <= -0.5) = \\{1, 3, 4, 5, 6, 7, 8, 9\\}$

$(X > -0.5) = \\{2, 10\\}$

$(X > -0.5) = \\{10\\}$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$(X = -2) = \\{2\\}$

$(X <= -0.5) = \\{1, 2, 3, 4, 5, 6, 7, 8, 9\\}$

$(X > -0.5) = \\{10\\}$

  
  

JavaScript should be enabled to grade this question.

Range of a random variable X is the set of all possible values that X can take.  
  
For example:  
  
Let a random variable X be defined as the number of tosses required to get the first head on tossing of a coin. What is the range of the random variable X?  
  
Solution: While tossing a coin we can get first head either in the first toss or second toss or third toss or we can also say that we got first head in 100th toss or 10000th toss or any positive integer value.  
  
So the random variable can take values in {1, 2, 3, 4,..........} = Range of X (by def)

JavaScript should be enabled to grade this question.

_1 point_

Toss a coin $1000$ times. Let $X$ be the number of heads observed.  
  
Find the range of $X$.

$\\{1, 2, 3,........,1000\\}$

$\\{0, 1, 2, 3,........,1000\\}$

$\\{2, 3,........,1000\\}$

$\\{0, 1, 2, 3,........,999\\}$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\{0, 1, 2, 3,........,1000\\}$

JavaScript should be enabled to grade this question.

_1 point_

Suppose a pair of dice is rolled. Let the random variable $X$ denote their sum.  
  
Find the range of $X$.

$\\{1, 2, 3,.......,11, 12\\}$

$\\{0, 1, 2, 3,.......,11, 12\\}$

$\\{2, 3,.......,11, 12\\}$

$\\{2, 3,.......,13, 14\\}$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\{2, 3,.......,11, 12\\}$

  
  
**Probability mass function (PMF)  
**  
The probability mass function (PMF) of a discrete random variable (r.v.) $X$ with range set $T$ is the function $f\_X: T → \[0, 1\]$ defined as  
  
                  $f\_X(t) = P(X = t)$ for $t ∈ T$.  
  

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

_1 point_

Suppose a pair of dice is rolled. Let the random variable $X$ denote their sum.  
 Assuming that each of the $36$ possible outcomes of the experiment is equally likely.  
 Find $P(X = 7)$.

$\\displaystyle\\frac{1}{2}$

$\\displaystyle\\frac{1}{3}$

$\\displaystyle\\frac{1}{4}$

$\\displaystyle\\frac{1}{6}$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\displaystyle\\frac{1}{6}$

JavaScript should be enabled to grade this question.

_1 point_

Suppose that $3$ batteries are chosen from a bin containing $12$ batteries, out of which $10$ are good and $2$ are defective. Let $X$ denote the number of defective batteries chosen.  
Find the possible values taken by $X$.

$\\{1, 2, 3\\}$

$\\{0, 1, 2\\}$

$\\{1, 2\\}$

$\\{0, 1, 2, 3\\}$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\{0, 1, 2\\}$

JavaScript should be enabled to grade this question.

_1 point_

Suppose that $3$ batteries are chosen from a bin containing $12$ batteries, out of which $10$ are good and $2$ are defective. Let $X$ denote the number of defective batteries chosen.  
Find the probability distribution of $X$.

{$P(X = 0) = 6/11, P(X = 1) = 9/22, P(X = 2) = 1/22$ }

{$P(X = 0) = 9/22, P(X = 1) = 6/11, P(X = 2) = 1/22$ }

{ $P(X = 0) = 1/22, P(X = 1) = 6/11, P(X = 2) = 9/22$ }

{$P(X = 0) = 9/22, P(X = 1) = 1/22, P(X = 2) = 1/22$}

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

{$P(X = 0) = 6/11, P(X = 1) = 9/22, P(X = 2) = 1/22$ }

JavaScript should be enabled to grade this question.

_1 point_

Nandini has four keys out of which two keys can open the door of her office. She attempts to open the door of the office (Assume that she does not know which key will open the door) and if she fails to open the door then she keeps that key apart from the remaining keys. Find the range of the number of attempts she requires to open the door.

{$1, 2, 3, 4$}

{$1, 2, 3$}

{$1, 2$}

{$2, 3, 4$}

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

{$1, 2, 3$}

JavaScript should be enabled to grade this question.

_1 point_

Nandini has four keys out of which two keys can open the door of her office. She attempts to open the door of the office (Assume that she does not know which key will open the door) and if she fails to open the door then she keeps that key apart from the remaining keys. Find the probability distribution of the number of attempts she requires to open the door.

{$P(X = 1) = \\frac{1}{6} , P(X = 2) = \\frac{1}{2} , P(X = 3) = \\frac{1}{3}$ }

{$P(X = 1) = \\frac{1}{2} , P(X = 2) = \\frac{1}{3} , P(X = 3) = \\frac{1}{6}$ }

{$P(X = 1) = \\frac{1}{3} , P(X = 2) = \\frac{1}{6} , P(X = 3) = \\frac{1}{2}$ }

{$P(X = 1) = \\frac{1}{2} , P(X = 2) = \\frac{1}{6} , P(X = 3) = \\frac{1}{3}$ }

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

{$P(X = 1) = \\frac{1}{2} , P(X = 2) = \\frac{1}{3} , P(X = 3) = \\frac{1}{6}$ }

  
  

JavaScript should be enabled to grade this question.

Working with PMF  
  
Consider a random variable $X$ with range $T = \\{ t\_1, t\_2, …., t\_k\\}, PMF\\,f\_X(t)\\,or\\, P(X = t)$.  
  
Properties of $PMF$  

*   $0 ≤ f\_X(t) ≤ 1$
*   $∑\_{t∈T}\\,f\_X(t) = 1$

  
Suppose we have question that relates with the pmf then we need to check these two properties of pmf. We can simply put these two conditions into other words as  

*   $P(X = t) ≥ 0$ and $P(X = t) ≤ 1$ for all t.
*   Sum of probabilities of all outcomes should be $1$.

JavaScript should be enabled to grade this question.

_1 point_

Consider the function in the following table. Can this be a probability mass function for any random variable $X$?  
  
![](extracted/assets/Term-Feb-to-May_Statistics-II_Week0Part3_ActivityQuestionLecture4-NotGraded_IITMOnlineDegree13_5_20267_27_22am_17.jpg)  

 Yes

 No

 Can not say

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

No

JavaScript should be enabled to grade this question.

_1 point_

Consider the function in the following table. Can this be a probability mass function for any random variable $X$?  
![](extracted/assets/Term-Feb-to-May_Statistics-II_Week0Part3_ActivityQuestionLecture4-NotGraded_IITMOnlineDegree13_5_20267_27_22am_18.jpg)  

 Yes

 No

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

No

JavaScript should be enabled to grade this question.

_1 point_

Consider the function in the following table. Can this be a probability mass function for any random variable $X$?  
![](extracted/assets/Term-Feb-to-May_Statistics-II_Week0Part3_ActivityQuestionLecture4-NotGraded_IITMOnlineDegree13_5_20267_27_22am_19.jpg)  

 Yes

 No

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

No

JavaScript should be enabled to grade this question.

_1 point_

A discrete random variable $X$ has the following pmf:  
  
![](extracted/assets/Term-Feb-to-May_Statistics-II_Week0Part3_ActivityQuestionLecture4-NotGraded_IITMOnlineDegree13_5_20267_27_22am_20.jpg)  
  
Find the value of $k$.  

$\\displaystyle\\frac{1}{5}$

$\\displaystyle\\frac{1}{10}$

$\\displaystyle\\frac{1}{20}$

$\\displaystyle\\frac{1}{4}$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\displaystyle\\frac{1}{10}$

JavaScript should be enabled to grade this question.

_1 point_

A discrete random variable $X$ has the following pmf:  
  
![](extracted/assets/Term-Feb-to-May_Statistics-II_Week0Part3_ActivityQuestionLecture4-NotGraded_IITMOnlineDegree13_5_20267_27_22am_20.jpg)  
  
Find $P(X <3)$ and $P(X >2)$.

$\\{ P(X < 3) = \\frac{7}{10}, P(X > 2) = \\frac{3}{10}\\}$

$\\{ P(X < 3) = \\frac{3}{10}, P(X > 2) = \\frac{7}{10}\\}$

$\\{ P(X < 3) = \\frac{7}{10}, P(X > 2) = \\frac{13}{10}\\}$

$\\{ P(X < 3) = \\frac{13}{10}, P(X > 2) = \\frac{7}{10}\\}$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\{ P(X < 3) = \\frac{7}{10}, P(X > 2) = \\frac{3}{10}\\}$

JavaScript should be enabled to grade this question.

_1 point_

Let $X$ be a discrete random variable with following probability mass function:  
  
![](extracted/assets/Term-Feb-to-May_Statistics-II_Week0Part3_ActivityQuestionLecture4-NotGraded_IITMOnlineDegree13_5_20267_27_22am_21.jpg)  
  
  
Find the value of $k$.

$\\displaystyle\\frac{1}{22}$

$\\displaystyle\\frac{1}{9}$

$\\displaystyle\\frac{1}{11}$

$\\displaystyle\\frac{1}{18}$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\displaystyle\\frac{1}{11}$

JavaScript should be enabled to grade this question.

_1 point_

Gauri tosses an unfair coin for which $P(T) = p\\,(0 < p < 1)$. She tosses the coin repeatedly till a tail is obtained. While performing this experiment she calculated the probability distribution of X, defined as the number of tosses required to get the first tail, as  
  
$P(X = x) = (1 - p)^{(x-1)}p$ for $x = 1, 2, 3,......$  
  
Is the above a valid probability mass function?

 Yes

 No

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

Yes

  

Check Answers

Your score is: 0/17

Please enable JavaScript to continue using this application.
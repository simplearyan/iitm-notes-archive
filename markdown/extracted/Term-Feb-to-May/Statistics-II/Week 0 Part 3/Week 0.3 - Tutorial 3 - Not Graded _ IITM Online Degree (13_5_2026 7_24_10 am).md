---
title: "Week 0.3 - Tutorial 3 - Not Graded :: IITM Online Degree"
---

# Week 0.3 - Tutorial 3 - Not Graded :: IITM Online Degree

Week 0.3 - Tutorial 3 - Not Graded

# Week 0.3 - Tutorial 3 - Not Graded

This assignment will not be graded and is only for practice.

**Uniform random variable**  
  
$X$ ~ Uniform($T),$ where $T$ is some finite set  
  
Range: Finite set T  
  
$PMF: f\_X(t) = 1/|T|$ for all $t ∈ T$  
  
Example:   

*   Toss a fair coin, $X$ ~ Uniform({ $0, 1$}), where 0 - heads, 1 - tails.
*   Throw a fair die, $X$ ~ Uniform({ $1, 2, 3, 4, 5, 6$ })

JavaScript should be enabled to grade this question.

A fair die is rolled such that each outcome is equally likely. What is the probability that the outcome is an even number?

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

(Type: Numeric) 0.5

_1 point_

  
  
**Bernoulli random variable  
  
**$X$ ~ Bernoulli(p), where $0 ≤ p ≤ 1$  
  
Range: { $0, 1$ }  
  
PMF: $f\_X(0) = 1 - p, f\_X(1) = p$  
  
Example:  

*   Bernoulli trial, $p$ = prob of success, $X$ ~ Bernoulli($p$)

JavaScript should be enabled to grade this question.

_1 point_

A fair die is rolled twice.Let a random variable $X$ is defined as:  
  
$X$ =$\\begin{cases}1 & \\text {If some of both the outcomes is 8}\\\\0 & \\text {otherwise}\\end{cases}$  
  
Find the probability mass function of $X$.  
  
Note that $X$ is a Bernoulli random variable.  
  
  

$P(X= 0) = 31 / 36 ;\\, P(X = 1) = 5 / 36$

$P(X= 0) = 30 / 36 ; P(X = 1) = 6 / 36$

$P(X= 0) = 5 / 36 ; P(X = 1) = 31 / 36$

$P(X= 0) = 6/ 36 ; P(X = 1) = 30 / 36$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$P(X= 0) = 31 / 36 ;\\, P(X = 1) = 5 / 36$

  
**Binomial random variable  
  
**$X$ ~ Binomial($n, p$), where $n$: positive integer, $0 ≤ p ≤ 1$  
  
Range: { $0, 1, 2, …., n$}  
  
PMF: $f\_X(k) = {^n}C\_k \\,p^{k} (1-p)^{n-k}$  
  
Example:  

*   Number of successes in $n$ independent Bernoulli($p$) trials  
      
    

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

_1 point_

A traffic control engineer reports that 75% of the vehicles passing through a checkpoint are from within the state. The state of origin of different vehicles crossing the checkpoint are independent.  
What is the probability that no vehicle out of the next $9$ vehicles are from out of the state?

$0.75^9$

$0.25^9$

$10(0.75^9)$

$10(0.25^9)$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$0.75^9$

JavaScript should be enabled to grade this question.

_1 point_

A traffic control engineer reports that 75% of the vehicles passing through a checkpoint are from within the state. The state of origin of different vehicles crossing the checkpoint are independent.  
  
 What is the probability that fewer than $4$ of the next $9$ vehicles are from out of state?

$10(0.75)^9 + 9(0.25)(0.75)^8 + 36(0.25) ^2(0.75)^7 + 84(0.25)^3(0.75)^6$

$(0.75)^9 + 9(0.25)(0.75)^8 + 36(0.25)^2(0.75)^7 + 84(0.25)^3(0.75)^6$

$(0.75)^9 + 9(0.25)(0.75)^8 + 36(0.25)^2(0.75)^7$

$10(0.75)^9 + 9(0.25)(0.75)^8 + 36(0.25)^2(0.75)^7$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$(0.75)^9 + 9(0.25)(0.75)^8 + 36(0.25)^2(0.75)^7 + 84(0.25)^3(0.75)^6$

  

**Geometric random variable  
  
  
**$X$ ~ Geometric($p$), where $0 < p < 1$  
         Range: { $1, 2, 3, ….$}  
      PMF: $f\_X(k) = (1-p)^{k-1} p$  
  
 Example:  

*   Number of trials for first success in repeated independent Bernoulli($p$) trials

JavaScript should be enabled to grade this question.

_1 point_

Aditi rolls a fair die repeatedly and independently until a number larger than $4$ is observed. Let $X$ be the total number of times Aditi rolls the die.  
  
 Find the probability that $X= k$ where $k$ is in range of $X$.

$(1/3)^{k-1}(2/3)$

$(1/3)^{k}(2/3)$

$(2/3)^{k-1}(1/3)$

$(2/3)^{k}(1/3)$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$(2/3)^{k-1}(1/3)$

  

**Negative Binomial random variable**  
  
$X$ ~ Negative Binomial$(r, p)$, where $r$: positive integer, $0 < p < 1$  
 Range: { $r, r+1, r+2, ….$ }  
 PMF: $f\_X(k) = (k-1)C\_{r-1} (1-p)^{k-r} p^r$  
 Example:  

*   Number of trials for $r$ success in repeated independent Bernoulli$(p)$ trials 

*   $r = 1$: geometric random variable

  

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

_1 point_

Aditi rolls a fair die repeatedly and independently until three numbers larger than $4$ are observed. Let $X$ be the total number of times that Aditi rolls the die.  
  
Find the probability that $X = k$ where $k$ is in the range of $X$.

${^k}C\_3( \\frac{2}{3})^{k-3}( \\frac{1}{3})^{3}$

${^k}C\_3( \\frac{2}{3})^{k-2}( \\frac{1}{3})^{3}$

$^{k-1}C\_2( \\frac{2}{3})^{k-2}( \\frac{1}{3})^{3}$

$^{k-1}C\_2( \\frac{2}{3})^{k-3}( \\frac{1}{3})^{3}$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$^{k-1}C\_2( \\frac{2}{3})^{k-3}( \\frac{1}{3})^{3}$

JavaScript should be enabled to grade this question.

In an NBA (National Basketball Association) championship series, the team that wins at least four games out of seven is the winner. Suppose that teams A and B face each other in the championship games and that team A has probability $0.55$ of winning a game over team B. Win or loss in different games are independent of each other.  
  
  
What is the probability that team A will win the series in 6th game?

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

(Type: Range) 0.17,0.20

_1 point_

  
  
**Hypergeometric random variable**  

  
$X$ ~ HyperGeo$(N, r, m)$, where $N, r, m$: positive integers  

*   Consider a population of $‘N’$ persons with $‘r’$ of Type $1$ and $‘N - r’$ of Type $2$
*   Select $‘m’$ persons uniformly at random without replacement
*   $X$ = number of persons of Type $1$ selected

Range of $X$  

*   $N = 100, r = 50, m = 20 => X ∈ 0, 1, 2, …, 20$
*   $N = 100, r = 10, m = 20 => X ∈ 0, 1, 2, …, 10$
*   $N = 100, r = 90, m = 20 => X ∈ 10, 11, 12, …, 20$

$X ∈$ max$(0, m - (N-r))$, …, min$(r, m)$  
  
**PMF of Hypergeometric random variable**  
  
$X$ ~ HyperGeo$(N, r, m)$, where $N, r, m$: positive integers  
Range: {max$(0, m - (N-r))$, …, min$(r, m)$}  
PMF: $f\_X(k) = rC\_k (N-r)C\_{m-k} / NC\_m$  

*   Arises in sampling for trials

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

_1 point_

An urn contains $15$ Red and $25$ Black balls. $20$ balls are drawn one by one without replacement. Let $X$ be the number of Black balls drawn.  
What is the range of $X$?

{$1, 2, 3, … ,20$}

{$1, 2, 3, … ,25$}

{$5, 6, 7, … ,20$}

{$5, 6, 7, … , 25$}

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

{$5, 6, 7, … ,20$}

JavaScript should be enabled to grade this question.

An urn contains $15$ Red and $25$ Black balls. $20$ balls are drawn one by one without replacement. Let $X$ be the number of Black balls drawn.  
Find the value of $P(X = 10)$.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

(Type: Range) 0.05,0.09

_1 point_

  

Check Answers

Your score is: 0/9

Please enable JavaScript to continue using this application.
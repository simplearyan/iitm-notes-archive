---
title: "Week 0.2 - Tutorial 1 - Non graded :: IITM Online Degree"
---

# Week 0.2 - Tutorial 1 - Non graded :: IITM Online Degree

Week 0.2 - Tutorial 1 - Non graded

# Week 0.2 - Tutorial 1 - Non graded

This assignment will not be graded and is only for practice.

**Key Point:1  
**  
Occurrence of Event $A$ in a sample space is considered “success”. Non-occurrence of $A$ is considered “failure”. Let $p$ = $P(A).$  
  
Bernoulli trial: Sample space is {success, failure} with P(success) = $p$  
                                                                                 
                                                                                 or  
                                                             
                                                           {$0, 1$} with P($1$) = $p$, P($0$) = $1$ - $p$  
                         
                                        This distribution is denoted as Bernoulli(p).  
  

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

In a lottery scheme, tickets are numbered from $1$ to $100.$ When you purchase a ticket you will get a random ticket number and you will win the lottery if the number turns out to be $37$.What is the probability that you will win the lottery? Each number is equally likely to be chosen.

### No, the answer is incorrect.  
Score: 0

### Feedback:

We can interpret this lottery scheme as an experiment having two outcomes, success or failure i.e. either you win or do not win.  
If you get a ticket numbered $37,$ you win or else you do not win.  
So, probability of winning is equivalent to probability of getting number $37.$  
Since each outcome is equally likely,  
P(Win) = probability of success(p) = $1/100$

### Accepted Answers:

(Type: Numeric) 0.01

_1 point_

  
  
**Key Point:2  
**  
  
Repeat a Bernoulli trial multiple times independently.  
  
Perform n independent Bernoulli(p) trials.  
  
Outcome: 0 or 1 (Trial 1), 0 or 1 (Trial 2), 0 or 1 (Trial 3), … … , 0 or 1 (Trial n)  
  
Sample space: $2^n$ outcomes  
                Eg: n = 3, S = { 000, 001, 010, 011, 100, 101, 110, 111 }  
                       n = 4, S = { 0000, 0001, 0010, 0011, 0100, 0101, 0110, 0111, 1000, 1001, 1010, 1011, 1100, 1101, 1110, 1111 }  
  
Probabilities: Use independence.  
  
Let n = 3.  
P(000) = P(trial 1 is 0 and trial 2 is 0 and trial 3 is 0) = (1-p) x (1-p) x (1-p) = $(1-p)^3$  
P(101) = P(trial 1 is 1 and trial 2 is 0 and trial 3 is 1) = p x (1-p) x p = $p^2$(1-p)  
  

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

_1 point_

In a $3$ match ODI cricket series between India and Australia, any team will win the series if it wins atleast $2$ out of $3$ matches. The series is announced to play in India and the probability of winning a match by India is $60$%. Also assume that the result of each match is independent. Assume that every cricket match results in win (W) or loss (L). List out the probability of possible winning situations of India.

{$P(011) =0.144 , P(101) = 0.144, P(110) = 0.144, P(111) = 0.216$}

{$P(011) =0.144 , P(101) = 0.0.216, P(110) = 0.144, P(111) = 0.144$}

{$P(100) = 0.144, P(111) = 0.144, P(010) = 0.288, P(110) = 0.424$}

### No, the answer is incorrect.  
Score: 0

### Feedback:

We can interpret this as three Bernoulli($60/100$) trials where we consider match won by India as success.  
  
So $n = 3$ and $p = 0.6.$ Assume that each match win is considered as $1$ and loss is $0.$  
  
\=> $S$ = {$000, 001, 010, 011, 100, 101, 110, 111$ }  
  
Possible combinations of winning the series is { $011, 101, 110, 111$ } i.e. at least two success out of three.  
  
Since outcomes of each match is independent of each other.  
  
$P(011)$ = P(loss, win, win) = $0.4 \* 0.6 \* 0.6 = 0.144$  
  
$P(101)$ = P(win, loss, win) = $0.6 \* 0.4 \* 0.6 = 0.144$  
  
$P(110)$ = P(win, win, loss) = $0.6 \* 0.6 \* 0.4 = 0.144$  
  
$P(111)$ = P(win, win, win) = $0.6 \* 0.6 \* 0.6 = 0.216$

### Accepted Answers:

{$P(011) =0.144 , P(101) = 0.144, P(110) = 0.144, P(111) = 0.216$}

  
  
**Key Point:3  
**  
  
Perform n independent Bernoulli(p) trials.  
  
Outcome: number of successes, which we will denote B(n,p) or B in short  
  
Sample space: { 0, 1, 2, …, n }  
  
In general, what is P(B(n,p) = k)? (k = 0, 1, 2, …, n)  
  
P(B(n,p) = k) = P(trial results in $b\_1b\_2….b\_n$ with exactly k 1s)                (where each $b\_i$ is 0 or 1)  
   
                    = (no of $b\_1b\_2….b\_n$ with exactly k 1s) $p^k$ (1 - p)${^n - k}$  
  
         No of $b\_1b\_2….b\_n$ with exactly k 1s = n $C\_k$ = n! / (k! (n-k)!)  
  
                           P(B(n,p) = k) = n $C \_k$ $p^k$ (1 - p)${n - k}$  
  

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

In a $3$ match ODI cricket series between India and Australia, any team will win the series if it wins atleast $2$ out of $3$ matches. The series is announced to play in India and the probability of winning a match by India is $60$%. Also assume that the result of each match is independent. Assume that every cricket match results in win (W) or loss (L). What is the probability that India will win the series?

### No, the answer is incorrect.  
Score: 0

### Feedback:

We can interpret this as three Bernoulli($60/100$) trials where we consider success as match won by India.  
  
So $n = 3$ and $p = 0.6.$ Assume that each match win is considered as $1$ and lose is $0.$  
  
\=> $S$ = { $000, 001, 010, 011, 100, 101, 110, 111$ }  
  
P(winning the series) = P({$011, 101, 110, 111$})  
                                   = P($011) + P(101) + P(110) + P(111)$  
                                   = $0.144 + 0.144 + 0.144 + 0.216$  
                                   = $0.648$  
We can also directly use binomial distribution formula here with p = $0.6$ and n = $3.$  
  
P(winning the series) = P(winning at least two matches out of three)  
  
                                   = P(winning two matches out of three) + P(winning all three matches)  
  
                                   = $3C2 \* 0.62 \* (1-0.6) + 3C3 \* 0.63$  
                                   = $0.432 + 0.216$  
                                   = $0.648$

### Accepted Answers:

(Type: Range) 0.62,0.66

_1 point_

  

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

The probability that a film made by the director XYZ will make a box office collection of more than $100$ crores is $0.7$. Suppose that the director is planning to make $7$ more movies.  
Assume that the collection of each movie is independent of other.  
What is the probability that exactly $5$ out of $7$ movies will make collection of more than $100$ crores rupees?  
Hint: $P(B(n,p) = k) = n C\_{k}p^{k} (1 - p)^{n - k}$

### No, the answer is incorrect.  
Score: 0

### Feedback:

Movie either will make a collection of more than 100 crores rupees or not.  
 It has two outcome:  
Success: collection more than 100 crores rupees  
$p = 0.7, n = 7$, Need to find$P(B(7, 0.7) = 5)$.  
 $P(B(7, 0.7) = 5) = 7C5 \* (0.7)^{5} \* (1 - 0.7)^{(7 - 5)}$  
                           =$21 \* (0.7)^{5} \* (0.3)^{2}$  
                           = $0.3176$

### Accepted Answers:

(Type: Range) 0.28,0.34

_1 point_

  
  
**Key Point:4  
**  
Geometric(p): Geometric distribution  
  
Perform independent Bernoulli(p) trials indefinitely.  
  
Outcome: Number of trials needed for first success, which we denote G(p) or G  
  
Sample space: { $1, 2, 3, 4, 5, 6, ….$(goes on and on)}  
  
P(G = 1) = P(first trial is success) = $p$  
  
P(G = 2) = P(first trial is failure and second trial is failure) = $(1-p) p$  
  
P(G = 3) = P(trial result: 001) = $(1-p)^{2}p$  
  
….  
  
P(G = k) = P(first k-1 trials result in 0 and k-th trial is 1) = $(1-p)^{k-1}p$  
  
….  

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

A company manufactures watches of a certain brand and it is known that in the manufacturing process, on an average, $1$ out of $20$ watches is defective.  
Assume that different watches are defective independently.  
What is the probability that the fourth watch inspected is the first defective watch found?

### No, the answer is incorrect.  
Score: 0

### Feedback:

P(a watch being defective) = $1/20 = p$  
Here we can define success(p) as probability of a watch being defective.  
Need to find the probability that the fourth watch inspected is the first defective watch found i.e. fourth trial is success $(P(G = 4))$.  
And $P(G = 4) = (1 - p)(1 - p)(1 - p)p$  
                      = $(1 - 1/20)^{3} \* (1/20)$  
                      = $0.0428$

### Accepted Answers:

(Type: Range) 0.03,0.05

_1 point_

JavaScript should be enabled to grade this question.

The probability that a student passes the qualifier test of IITM online degree is $0.6$ in each attempt.  
Assume that successive attempts are independent.  
What is the probability that a given student will pass the qualifier test before the fourth attempt?  
Hint: $P(G ≤ k) = 1 - (1 - p)^{k}$

### No, the answer is incorrect.  
Score: 0

### Feedback:

The probability that a student pass the qualifier test of IITM online degree is $0.6$ in each attempt.  
That means probability of success(p) is $0.6$.  
Need to find that the student will pass the qualifier test before the fourth attempt i.e. $P(G ≤ 3)$. Here $k = 3$ and $p= 0.6$  
\=> probability that a given student will pass the qualifier test before the fourth attempt  
            = $P(G ≤ 3) = 1 - (1 - 0.6)^{3}$  
            = $1 - 0.4^{3}$  
            = $0.936$

### Accepted Answers:

(Type: Range) 0.90,0.96

_1 point_

  

Check Answers

Your score is: 0/6

Please enable JavaScript to continue using this application.
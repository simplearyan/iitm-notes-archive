---
title: "Week 0.3 - Tutorial 1 - Non graded :: IITM Online Degree"
---

# Week 0.3 - Tutorial 1 - Non graded :: IITM Online Degree

Week 0.3 - Tutorial 1 - Non graded

# Week 0.3 - Tutorial 1 - Non graded

This assignment will not be graded and is only for practice.

Key Concept:  
  
$X$ ~ Poisson(λ), where λ > 0  
   
Range: { $0, 1, 2, 3, ….$}  
  
PMF: fX(k) = e\-λ λk / k!  
  
  
  
![](extracted/assets/Term-Feb-to-May_Statistics-II_Week0Part3_Week03-Tutorial1-Nongraded_IITMOnlineDegree13_5_20267_23_32am_17.jpg)  
  
Key Concept:  
  
In 41876 football matches since 1877 to 2020, a total of 73044 goals were scored by the home teams. Number of matches in which x goals were scored by the home teams for x=0,1,2,... is recorded here:  
  
#goals →      0          1         2        3        4        5        6       7       8       9     10    >10  
  
\# times→ 10087   12388  9233  4913  2532  1212   665   358   194   119   62    113  
  
Number of goals scored by the home team in a match follows the Poisson distribution.  
  

JavaScript should be enabled to grade this question.

Find the value of $\\lambda$.

### No, the answer is incorrect.  
Score: 0

### Feedback:

λ = Average number of goals scored by the home team in a match  
              = Total number of goals scored by home teams / Total number of matches  
  
              = 73044 / 41876  
              = 1.74 (Approximately)

### Accepted Answers:

(Type: Range) 1.70, 1.80

_1 point_

  
  
Key Concept:  
  
In 41876 football matches since 1877 to 2020, total 73044 goals were scored by the home teams. Number of goals scored by the home teams is recorded here:  
  
#goals →       0          1            2        3         4         5         6        7       8       9     10    >10  
  
\# times→  10087   12388   9233   4913   2532   1212     665   358   194    119    62    113  
  
Number of goals scored by the home team in a match follows the Poisson distribution.  
  

JavaScript should be enabled to grade this question.

Find the probability that in a given match, home team scores $4$ goals.

### No, the answer is incorrect.  
Score: 0

### Feedback:

Let X be the number of goals scored by home team in a match and A be the event that home team scores 4 goals.  
  
X ~ Poisson(λ) where λ = 1.74  
  
P(A)= P(X=4) = e\-λ λ4 / 4!  
  
                                               = e\-1.74 (1.74)4 / 4!  
                                               = 0.06  
  
From the data, P(A)= number of times 4 goals were scored / total matches  
  
                                              = 2532 / 41876 = 0.06

### Accepted Answers:

(Type: Range) 0.03, 0.08

_1 point_

  
  
Key Concept:  
  

In 41876 football matches since 1877 to 2020, total 73044 goals were scored by the home teams. Number of goals scored by the home teams is recorded here:  
  
#goals →         0          1          2        3          4         5       6       7       8       9     10   >10  
  
\# times→   10087   12388   9233   4913   2532   1212   665   358   194   119    62    113  
  
Number of goals scored by the home team in a match follows the Poisson distribution.  
  

JavaScript should be enabled to grade this question.

Find the probability that in a given match, home team scores $5$ goals.

### No, the answer is incorrect.  
Score: 0

### Feedback:

Let X be the number of goals scored by home team in a match and B be the event that home team scores 5 goals.  
   
X ~ Poisson(λ) where λ = 1.74  
  
P(B)= P(X=5) = e\-λ λ5 / 5!  
  
                                       = e\-1.74 (1.74)5 / 5!  
  
                                       = 0.02  
  
From the data, P(B)= number of times 5 goals were scored / total matches  
  
                                                         = 665 / 41876 = 0.0158

### Accepted Answers:

(Type: Range) 0.01,0.03

_1 point_

  
  
Key Concept:  
  

In 41876 football matches since 1877 to 2020, total 73044 goals were scored by the home teams. Number of goals scored by the home teams is recorded here:  
  
#goals →          0          1         2        3          4         5       6        7       8      9    10   >10  
  
\# times→   10087   12388   9233   4913   2532   1212   665   358   194   119   62   113  
  
Number of goals scored by the home team in a match follows the Poisson distribution.  
  

JavaScript should be enabled to grade this question.

Find the probability that in a given match, home team scores either $4$ goals or $5$ goals.

### No, the answer is incorrect.  
Score: 0

### Feedback:

From the previous preludes:  
  
P(A)= 0.06, P(B) = 0.02  
  
To find: P(A ∪ B)  
  
Notice that P(A ∩ B) = P(Home team scores both 4 and 5 goals in a match)  
  
                             ⇒P(A ∩ B) = 0  
  
By the addition rule:  
  
P(A ∪ B)= p(A) + P(B) - P(A ∩ B) = 0.06 + 0.02 = 0.08

### Accepted Answers:

(Type: Range) 0.06, 0.10

_1 point_

  
  

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

_1 point_

Numbers of overseas visitors (excluding Indians) to the Pashupati area every month follows the Poisson distribution with an average of $10,000$ visitors every month. What is the probability that exactly $5000$ overseas visitors will come to the Pashupati area in a given month?

$e^{10000}(10000)^{5000}/5000!$

$e^{5000}(10000)^{5000}/5000!$

$e^{-10000}(10000)^{5000}/5000!$

$e^{-5000}(10000)^{5000}/5000!$

### No, the answer is incorrect.  
Score: 0

### Feedback:

Let X be the number of overseas visitors to the Pashupati area in a given month.  
  
Then by given information, X ~ Poisson(λ), where λ is the average number of visitors in the given month.  
  
λ = 10000  
  
  
PMF: fX(k) = e\-λ λk / k!  
  
                                     P(X=5000)= e\-10000 (10000)5000 / 5000!

### Accepted Answers:

$e^{-10000}(10000)^{5000}/5000!$

JavaScript should be enabled to grade this question.

_1 point_

Numbers of overseas visitors (excluding Indians) to the Pashupati area every month follows the Poisson distribution with an average of $10,000$ visitors every month. What is the probability that number of overseas visitors to the Pashupati area in a given month will be more than or equal to $5000$?

$\\sum\\limits\_{k=0}^{5000}{\\dfrac{e^{-10000}(10000)^k}{k!}}$

$\\sum\\limits\_{k=0}^{\\infty}{\\dfrac{e^{-10000}(10000)^k}{k!}}$

$\\sum\\limits\_{k=5000}^{\\infty}{\\dfrac{e^{-10000}(10000)^k}{k!}}$

$\\sum\\limits\_{k=5000}^{\\infty}{\\dfrac{e^{-10000}(10000)^5000}{5000!}}$

### No, the answer is incorrect.  
Score: 0

### Feedback:

Let X be the number of overseas visitors to the Pashupati area in a given month.  
  
Then by given information, X ~ Poisson(λ), where λ is the average number of visitors in the given month.  
  
λ = 10000  
  
PMF: fX(k) = e\-λ λk / k!  
  
                          ![](extracted/assets/Term-Feb-to-May_Statistics-II_Week0Part3_Week03-Tutorial1-Nongraded_IITMOnlineDegree13_5_20267_23_32am_18.jpg)

### Accepted Answers:

$\\sum\\limits\_{k=5000}^{\\infty}{\\dfrac{e^{-10000}(10000)^k}{k!}}$

JavaScript should be enabled to grade this question.

_1 point_

Numbers of overseas visitors (excluding Indians) to the Pashupati area every month follows the Poisson distribution with an average of $10,000$ visitors every month. What is the probability that number of overseas visitors to the Pashupati area in a given month will be more than or equal to $5000$ but less than or equal to $12000$?

$\\sum\\limits\_{k=5000}^{\\infty}{\\dfrac{e^{-10000}(10000)^k}{k!}}$

$\\sum\\limits\_{k=12000}^{\\infty}{\\dfrac{e^{-10000}(10000)^k}{k!}}$

$\\sum\\limits\_{k=0}^{12000}{\\dfrac{e^{-10000}(10000)^k}{k!}}$

$\\sum\\limits\_{k=5000}^{12000}{\\dfrac{e^{-10000}(10000)^k}{k!}}$

### No, the answer is incorrect.  
Score: 0

### Feedback:

Let X be the number of overseas visitors to the Pashupati area in a given month.  
  
Then by given information, X ~ Poisson(λ), where λ is the average number of visitors in the given month.  
  
λ = 10000  
  
  
PMF: fx(k) = e\-λ λk / k!  
  
![](extracted/assets/Term-Feb-to-May_Statistics-II_Week0Part3_Week03-Tutorial1-Nongraded_IITMOnlineDegree13_5_20267_23_32am_19.jpg)  

### Accepted Answers:

$\\sum\\limits\_{k=5000}^{12000}{\\dfrac{e^{-10000}(10000)^k}{k!}}$

JavaScript should be enabled to grade this question.

_1 point_

Numbers of overseas visitors (excluding Indians) to the Pashupati area every month follows the Poisson distribution with an average of $10,000$ visitors every month. What is the conditional probability that number of overseas visitors to the Pashupati area in a given month will be more than or equal to $5000$ given that number of visitors are less than or equal to $12000$?

$\\dfrac{\\sum\\limits\_{k=5000}^{12000}{\\dfrac{e^{-10000}(10000)^k}{k!}}}{\\sum\\limits\_{k=5000}^{\\infty}{\\dfrac{e^{-10000}(10000)^k}{k!}}}$

$\\dfrac{\\sum\\limits\_{k=5000}^{12000}{\\dfrac{e^{-10000}(10000)^k}{k!}}}{\\sum\\limits\_{k=12000}^{\\infty}{\\dfrac{e^{-10000}(10000)^k}{k!}}}$

$\\dfrac{\\sum\\limits\_{k=5000}^{12000}{\\dfrac{e^{-10000}(10000)^k}{k!}}}{\\sum\\limits\_{k=0}^{12000}{\\dfrac{e^{-10000}(10000)^k}{k!}}}$

$\\dfrac{\\sum\\limits\_{k=5000}^{12000}{\\dfrac{e^{-10000}(10000)^k}{k!}}}{\\sum\\limits\_{k=0}^{\\infty}{\\dfrac{e^{-10000}(10000)^k}{k!}}}$

### No, the answer is incorrect.  
Score: 0

### Feedback:

Let X be the number of overseas visitors to the Pashupati area in a given month.  
  
Then by given information, X ~ Poisson(λ), where λ is the average number of visitors in the given month.  
  
λ = 10000  
  
  
PMF: fX(k) = e\-λ λk / k!  
  
  
                        P(X≥5000| X≤ 12000)=P(X≥5000 and X≤ 12000) / P(X≤ 12000)  
  
                                                                            ![](extracted/assets/Term-Feb-to-May_Statistics-II_Week0Part3_Week03-Tutorial1-Nongraded_IITMOnlineDegree13_5_20267_23_32am_20.jpg)  

### Accepted Answers:

$\\dfrac{\\sum\\limits\_{k=5000}^{12000}{\\dfrac{e^{-10000}(10000)^k}{k!}}}{\\sum\\limits\_{k=0}^{12000}{\\dfrac{e^{-10000}(10000)^k}{k!}}}$

  
  
  

Check Answers

Your score is: 0/8

Please enable JavaScript to continue using this application.
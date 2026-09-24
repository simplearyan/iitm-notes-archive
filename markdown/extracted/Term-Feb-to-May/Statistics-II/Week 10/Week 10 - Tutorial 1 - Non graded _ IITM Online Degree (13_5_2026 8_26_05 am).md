---
title: "Week 10 - Tutorial 1 - Non graded :: IITM Online Degree"
---

# Week 10 - Tutorial 1 - Non graded :: IITM Online Degree

Week 10 - Tutorial 1 - Non graded

# Week 10 - Tutorial 1 - Non graded

This assignment will not be graded and is only for practice.

**Note : This activity is only for practice purpose and it will not be counted towards the Final score.  
  
****(Use the below information to answer questions 1 and 2.)**  

JavaScript should be enabled to grade this question.

Consider the samples $12, 8, 10, 4, 6, 12, 3, 14, 7, 12$ from Binomial($15$, **p**), where $p$ is unknown.

JavaScript should be enabled to grade this question.

_1 point_

Find the posterior distribution of $p$ using Beta$(2, 5)$ prior.

 Beta(89, 66)

 Beta(88, 62)

 Beta(90, 67)

 Beta(78, 63)

### No, the answer is incorrect.  
Score: 0

### Feedback:

![](extracted/assets/Term-Feb-to-May_Statistics-II_Week10_Week10-Tutorial1-Nongraded_IITMOnlineDegree13_5_20268_26_05am_23.png)  
It implies that posterior density = Beta(90, 67)

### Accepted Answers:

Beta(90, 67)

JavaScript should be enabled to grade this question.

Find the posterior mean of $p$. Write your answer correct to two decimal places.

### No, the answer is incorrect.  
Score: 0

### Feedback:

![](extracted/assets/Term-Feb-to-May_Statistics-II_Week10_Week10-Tutorial1-Nongraded_IITMOnlineDegree13_5_20268_26_05am_24.png)

### Accepted Answers:

(Type: Range) 0.55,0.59

_1 point_

JavaScript should be enabled to grade this question.

_1 point_

Let $X\_1, X\_2, \\ldots ,X\_n$ be $n$ i.i.d. samples from the Geometric$(\\textbf{p})$ distribution. Find the posterior mean of $\\textbf{p}$ using Beta$(\\alpha, \\beta)$ prior.

$\\dfrac{n+\\alpha}{X\_1+X\_2+ \\ldots +X\_n - n + \\beta}$

$\\dfrac{n+\\alpha}{X\_1+X\_2+ \\ldots +X\_n + \\alpha + \\beta}$

$\\dfrac{\\alpha + \\beta}{X\_1+X\_2+ \\ldots +X\_n - n + \\beta}$

$\\dfrac{\\alpha+ \\beta}{X\_1+X\_2+ \\ldots +X\_n + \\alpha + \\beta}$

### No, the answer is incorrect.  
Score: 0

### Feedback:

![](extracted/assets/Term-Feb-to-May_Statistics-II_Week10_Week10-Tutorial1-Nongraded_IITMOnlineDegree13_5_20268_26_05am_25.png)![](extracted/assets/Term-Feb-to-May_Statistics-II_Week10_Week10-Tutorial1-Nongraded_IITMOnlineDegree13_5_20268_26_05am_26.png)

### Accepted Answers:

$\\dfrac{n+\\alpha}{X\_1+X\_2+ \\ldots +X\_n + \\alpha + \\beta}$

  
  
**(Use the below information to answer questions 4, 5 and 6.)  
**  

JavaScript should be enabled to grade this question.

Consider $X\_1, ....., X\_n \\sim \\text{i.i.d. Poisson}(\\lambda)$ with prior $\\text{Gamma}(\\alpha, \\beta)$.

JavaScript should be enabled to grade this question.

_1 point_

Find the likelihood function for a given sampling.

$\\dfrac{1}{x\_1! \\cdots x\_n!} e^{-\\lambda} \\lambda^{(x\_1 + x\_2 + \\dots + x\_n)}$

$\\dfrac{1}{x\_1! \\cdots x\_n!} e^{-n\\lambda} \\lambda^{(x\_1 + x\_2 + \\dots + x\_n)}$

$\\dfrac{1}{x\_1! \\cdots x\_n!} e^{-n\\lambda} \\lambda^{n}$

$\\dfrac{1}{x\_1! \\cdots x\_n!} e^{-n\\lambda} \\lambda^{(x\_1 + x\_2 + \\dots + x\_n - n)}$

### No, the answer is incorrect.  
Score: 0

### Feedback:

![](extracted/assets/Term-Feb-to-May_Statistics-II_Week10_Week10-Tutorial1-Nongraded_IITMOnlineDegree13_5_20268_26_05am_27.png)

### Accepted Answers:

$\\dfrac{1}{x\_1! \\cdots x\_n!} e^{-n\\lambda} \\lambda^{(x\_1 + x\_2 + \\dots + x\_n)}$

JavaScript should be enabled to grade this question.

_1 point_

Find the posterior distribution of λ.

$\\text{Gamma}(x\_1 + x\_2 + \\dots + x\_n + \\alpha , n + \\beta)$

$\\text{Beta}(x\_1 + x\_2 + \\dots + x\_n + \\alpha , n + \\beta)$

$\\text{Gamma}(x\_1 + x\_2 + \\dots + x\_n, n + \\beta)$

### No, the answer is incorrect.  
Score: 0

### Feedback:

![](extracted/assets/Term-Feb-to-May_Statistics-II_Week10_Week10-Tutorial1-Nongraded_IITMOnlineDegree13_5_20268_26_05am_28.png)

### Accepted Answers:

$\\text{Gamma}(x\_1 + x\_2 + \\dots + x\_n + \\alpha , n + \\beta)$

JavaScript should be enabled to grade this question.

If $x\_1 = 3 , x\_2 = 3 , x\_3 = 5, x\_4 = 5, x\_5 = 0$, find the posterior mean of $\\lambda$ using $\\text{Gamma}(4,5)$ prior.

### No, the answer is incorrect.  
Score: 0

### Feedback:

![](extracted/assets/Term-Feb-to-May_Statistics-II_Week10_Week10-Tutorial1-Nongraded_IITMOnlineDegree13_5_20268_26_05am_29.png)

### Accepted Answers:

(Type: Numeric) 2

_1 point_

  
**(Use the below information to answer questions 7, 8 and 9.)**  
Let $X$ be a discrete random variable with the following probability mass function:  
  
![](extracted/assets/Term-Feb-to-May_Statistics-II_Week10_Week10-Tutorial1-Nongraded_IITMOnlineDegree13_5_20268_26_05am_30.jpg)  
 In a particular sampling, $1$ occurs $10$ times, $2$ occurs $20$ times, $3$ occurs $20$ times.  
  

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

_1 point_

Find the likelihood function for a given sampling.

$\\left(\\frac{\\theta}{2}\\right)^{30} \\times (1-\\theta)^{20}$

$\\left(\\theta\\right)^{30} \\times (1-\\theta)^{20}$

$(1-\\theta)^{20}$

### No, the answer is incorrect.  
Score: 0

### Feedback:

![](extracted/assets/Term-Feb-to-May_Statistics-II_Week10_Week10-Tutorial1-Nongraded_IITMOnlineDegree13_5_20268_26_05am_31.png)

### Accepted Answers:

$\\left(\\frac{\\theta}{2}\\right)^{30} \\times (1-\\theta)^{20}$

JavaScript should be enabled to grade this question.

_1 point_

Using a Uniform\[$0,2$\] prior, find the posterior density.

Beta($31 , 21$)

Beta($29 , 19)$

Gamma($31 , 21)$

Gamma($29 , 19$

### No, the answer is incorrect.  
Score: 0

### Feedback:

![](extracted/assets/Term-Feb-to-May_Statistics-II_Week10_Week10-Tutorial1-Nongraded_IITMOnlineDegree13_5_20268_26_05am_32.png)

### Accepted Answers:

Beta($31 , 21$)

JavaScript should be enabled to grade this question.

Find the posterior mean.(Enter the answer correct to two decimal places)

### No, the answer is incorrect.  
Score: 0

### Feedback:

![](extracted/assets/Term-Feb-to-May_Statistics-II_Week10_Week10-Tutorial1-Nongraded_IITMOnlineDegree13_5_20268_26_05am_33.png)

### Accepted Answers:

(Type: Range) 0.57,0.61

_1 point_

  
**(Use the below information to answer questions 10 and 11.)  
**  

JavaScript should be enabled to grade this question.

The lifetime of a bulb (in hours) follow an exponential distribution with the parameter $\\lambda$. The lifetime (in hours) of a sample of ten bulbs is found to be $113, 96, 315, 77, 438, 67, 79, 159, 85, 200$.

JavaScript should be enabled to grade this question.

Find the posterior mean of $\\lambda$ using $\\text{Uniform}\[0, 1\]$ prior.(Enter the answer correct to three decimal places)

### No, the answer is incorrect.  
Score: 0

### Feedback:

![](extracted/assets/Term-Feb-to-May_Statistics-II_Week10_Week10-Tutorial1-Nongraded_IITMOnlineDegree13_5_20268_26_05am_34.png)  
![](extracted/assets/Term-Feb-to-May_Statistics-II_Week10_Week10-Tutorial1-Nongraded_IITMOnlineDegree13_5_20268_26_05am_35.png)  

### Accepted Answers:

(Type: Range) 0.006,0.007

_1 point_

JavaScript should be enabled to grade this question.

Find the posterior mean of $\\lambda$ using $\\text{Gamma}(5, 5)$ prior. (Enter the answer correct to Four decimal places)

### No, the answer is incorrect.  
Score: 0

### Feedback:

![](extracted/assets/Term-Feb-to-May_Statistics-II_Week10_Week10-Tutorial1-Nongraded_IITMOnlineDegree13_5_20268_26_05am_36.png)![](extracted/assets/Term-Feb-to-May_Statistics-II_Week10_Week10-Tutorial1-Nongraded_IITMOnlineDegree13_5_20268_26_05am_37.jpg)

### Accepted Answers:

(Type: Range) 0.008,0.01

_1 point_

  
  

Check Answers

Your score is: 0/11

Please enable JavaScript to continue using this application.
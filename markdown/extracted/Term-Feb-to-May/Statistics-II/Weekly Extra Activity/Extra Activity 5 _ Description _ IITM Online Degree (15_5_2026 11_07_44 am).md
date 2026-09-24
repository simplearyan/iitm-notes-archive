---
title: "Extra Activity 5 : Description :: IITM Online Degree"
---

# Extra Activity 5 : Description :: IITM Online Degree

Extra Activity 5 : Description

                             #                              Extra Activity 5 Sample Solution

Note : Submit your [**analysis document**](https://docs.google.com/document/d/1vNrEkphO8XRzIHCuedJr7By7PKTWn10a72gJzdbsJwg/edit?tab=t.0) along with Google Colab file / Excel Sheet under section “Extra Activity 5” in Statistics 2. 

  

This report presents a simulation study to illustrate the Central Limit Theorem (CLT) using the Height data from the [](https://www.kaggle.com/datasets/mustafaali96/weight-height)[Weight-Height.csv](https://www.kaggle.com/datasets/mustafaali96/weight-height) dataset. Note : Do the citation of your dataset. **What is the Central Limit Theorem?** The Central Limit Theorem states that, for a population with any shape of distribution having finite mean (μ) and finite standard deviation (σ), the distribution of sample means (or standardized sums) will approximately be a normal distribution as the sample size increases.

 Let $X\_1, X\_2, X\_3, \\ldots, X\_n \\sim \\text{i.i.d. } X$ with $\\mathbb{E}(X) = \\mu$ and $\\operatorname{Var}(X) = \\sigma^2$ , then  
  

**Case I:** $\\frac{\\overline{X} - \\mu}{\\sigma / \\sqrt{n}} \\rightarrow \\mathcal{N}(0, 1) \\quad \\text{as } n \\to \\infty$  
  
**Case II:** If $Y =X\_{1}+X\_{2}+X\_{3}+......+X\_{n}$ = $\\sum\_{i=1}^{n} X\_i$, then  
  
  
             $\\frac{Y - n\\mu}{\\sigma \\sqrt{n}} \\approx \\mathcal{N}(0, 1) \\quad \\text{as } n \\to \\infty$  
  
  

Steps Required  to perform CLT for sample means 

1.  Calculate the Population Statistics :
    

*   Compute the population mean and population standard deviation.
    
*   Plot a histogram of the population data to visualize its distribution.
    

2.  Choose Sample Size and Number of Samples:
    

*   Select multiple sample sizes such as n = 5, 10, 30, 50, 100.
    
*   Draw 100 random samplings of n samples for each sample size n. 
    

3.   Compute mean and store the values:  For each sample size, we compute the mean of each of the 100 random samplings and store these values.
    
4.  Analyze the Sampling Distributions:  For each sample size n,
    

*   Plot the histogram of the 100 sample means.
    
*   Compute the mean and standard deviation of the sample means.
    
*   Compare these to the population mean and population standard deviation.
    

5.  Interpret the results : 
    

*   Discuss how the shape of the sampling distribution becomes more normal as n increases.
    
*   Comment on how the sample mean approaches the population mean.
    
*   Observe how the standard deviation of sample means decreases with increasing n and compare with population standard deviation. 
    

Repeat the above procedures to validate the CLT for the case $Y = X\_1 + X\_2 + X\_3 + \\cdots + X\_n = \\sum\_{i=1}^{n} X\_i.$  
  

Grading Criteria

Criteria

Weight

Absent (0 Point)

Sufficient (1 Point)

Exemplary (2 Points)

Presence of data and analysis document

5

The required data is not present or an appropriate data is not shared (i.e. peer shared a random image or file instead of data)

Only Data (without citation) is present and the analysis document is not present.

The data (with citation) presented is valid along with the analysis document.

Choose any two random samples of sizes N <= 30 and perform CLT for both cases

20

The steps required for validating the CLT have not been fully carried out for either case.

CLT validation has been performed for only one case. 

All necessary steps for validating the CLT have been completed for both cases.

Choose any two random samples of sizes N > 30 and perform CLT for both cases

20

The steps required for validating the CLT have not been fully carried out for either case.

CLT validation has been performed for only one case. 

All necessary steps for validating the CLT have been completed for both cases.

Final table for the comparison for different values of N for both cases.

5

No final comparison table for different values of N has been provided for either case.

All the relevant information along with comparison for different values of N is present in the final table only for one case. 

The final table effectively summarizes all relevant information, including a detailed comparison for different N values, to support CLT validation for both cases.

  
  
  
  
  

  
Submission Due Date : 15th April (Wednesday) till 23:59pm IST.  
Peer Review Due Date : 19th April (Sunday) till 23:59 pm IST.                                                                                                                 

Please enable JavaScript to continue using this application.